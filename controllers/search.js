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
        content: `Provide information about the following drug :${drugName}\n\n### Fields:\n- **Name**: The name of the drug.\n- **Permitted**: Is the drug permitted for use by athletes? (Yes/No)\n- **Description**: A brief description of the drug, its uses, and why it might be prohibited.\n- **Ingredients**: [the common name of  main ingredients in the drug.]\n- **Alternatives**: Alternative drugs that are not prohibited with name and quantity in mg in number format. return the json object only.\n\n`,
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
    const jsonResponse = response.replace(/```json\n|```/g, '').trim();
    const parsedJson = JSON.parse(jsonResponse);

    // Save the result in the database
    await Result.insertOne({
      user: userId,
      Name: parsedJson.Name,
      Permitted: parsedJson.Permitted,
      Description: parsedJson.Description,
      Ingredients: parsedJson.Ingredients,
      Alternatives: parsedJson.Alternatives,
    });

    res.status(200).json({ response: parsedJson });

    console.log('User: ', myThreadMessage.content[0].text.value);
    console.log('Assistant: ', assistantResponseContent);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const searchHistory = async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    return res.status(400).json({ message: 'User not found' });
  }

  const results = await Result.find({ user: userId }).toArray();
  if (!results) {
    return res.status(404).json({ message: 'No search history found' });
  }
  res.json(results);
};

// Export the controller
module.exports = { getDrugDetails, searchHistory };
