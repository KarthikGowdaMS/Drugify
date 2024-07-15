const OpenAI = require('openai');
const Result = require('../db').collection('Results');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const assistantIdToUse = process.env.OPENAI_ASSISTANT_ID;
let threadByUser = {};

const getDrugDetails = async (req, res) => {
  const userId = req.user._id;
  const drugName = req.params.drugName; // Expecting the message content from request body

  // Create a new thread if it's the user's first message
  if (!threadByUser[userId]) {
    try {
      const myThread = await openai.beta.threads.create();
      console.log('New thread created with ID: ', myThread.id, '\n');
      threadByUser[userId] = myThread.id; // Store the thread ID for this user
    } catch (error) {
      console.error('Error creating thread:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
  }

  // Add a Message to the Thread
  try {
    const myThreadMessage = await openai.beta.threads.messages.create(
      threadByUser[userId], // Use the stored thread ID for this user
      {
        role: 'user',
        content: `Provide information about the following drug :${drugName}\n\n### Fields:\n- **Name**: The name of the drug.\n- **Permitted**: Is the drug permitted for use by athletes?. If (yes) give the permitted quantity of consumption\n- **Description**: A brief description of the drug, its uses, and why it might be prohibited.\n- **Ingredients**: [the common name of  main ingredients in the drug.]\n- **Alternatives**: Alternative drugs that are not prohibited with name and quantity in number format. return the json object only.\n\n`,
      }
    );
    console.log('This is the message object: ', myThreadMessage, '\n');

    // Run the Assistant
    const myRun = await openai.beta.threads.runs.create(
      threadByUser[userId], // Use the stored thread ID for this user
      {
        assistant_id: assistantIdToUse,
        instructions:
          "You're an advanced AI assistant and you provide details about the specific drug which are related to sports. Provide your response in json object only. Do not give response in string", // Your instructions here
      }
    );
    console.log('This is the run object: ', myRun, '\n');

    // Periodically retrieve the Run to check on its status
    const retrieveRun = async () => {
      let keepRetrievingRun;

      while (myRun.status !== 'completed') {
        keepRetrievingRun = await openai.beta.threads.runs.retrieve(
          threadByUser[userId], // Use the stored thread ID for this user
          myRun.id
        );

        // console.log(`Run status: ${keepRetrievingRun.status}`);

        if (keepRetrievingRun.status === 'completed') {
          console.log('\n');
          break;
        }
      }
    };
    await retrieveRun();

    // Retrieve the Messages added by the Assistant to the Thread
    const allMessages = await openai.beta.threads.messages.list(
      threadByUser[userId] // Use the stored thread ID for this user
    );

    // Send the response back to the front end
    const assistantMessage = allMessages.data.find(
      (message) => message.role === 'assistant'
    );
    const assistantResponseContent = assistantMessage.content[0].text.value;

    let response = assistantResponseContent;
    // console.log('Assistant response:', response);
    const jsonResponse = response.replace(/```json\n|```/g, '').trim();
    const parsedJson = JSON.parse(jsonResponse);

    const convertObjectKeysToLowercase = (obj) => Object.keys(obj).reduce((acc, key) => {
      const value = obj[key];
      acc[key.toLowerCase()] = typeof value === 'string' ? value.toLowerCase() : value;
      return acc;
    }, {});
    
    const parsedJsonLowercase = Object.keys(parsedJson).reduce((acc, key) => {
      if (key.toLowerCase() === 'alternatives' && Array.isArray(parsedJson[key])) {
        acc[key.toLowerCase()] = parsedJson[key].map(alternative => convertObjectKeysToLowercase(alternative));
      } else {
        acc[key.toLowerCase()] = parsedJson[key];
      }
      return acc;
    }, {});
    
    // Save the result in the database
    if (parsedJsonLowercase.name === null) {
      return res.status(404).json({ message: 'Drug not found' });
    }
    
    await Result.insertOne({
      user: userId,
      name: parsedJsonLowercase.name,
      permitted: parsedJsonLowercase.permitted,
      description: parsedJsonLowercase.description,
      ingredients: parsedJsonLowercase.ingredients,
      alternatives: parsedJsonLowercase.alternatives,
    });
    res.status(200).json({ response: parsedJsonLowercase });

    console.log('User: ', myThreadMessage.content[0].text.value);
    console.log('Assistant: ', assistantResponseContent);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const searchHistory = async (req, res) => {
  console.log("here");
  const userId = req.user._id;
  if (!userId) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Exclude _id and user fields from the results
  const results = await Result.find({ user: userId }, { projection: { _id: 0, user: 0 } }).toArray();
  if (!results) {
    return res.status(404).json({ message: 'No search history found' });
  }
  res.status(200).json({ results });
};

// Export the controller
module.exports = { getDrugDetails, searchHistory };
