const Drug = require('../db').collection('Drugs');
const ObjectId = require('mongodb').ObjectId;

const getDrugs = async (req, res) => {
  const user = req.user._id;

  const drugs = await Drug.find({ user: user }).toArray();
  res.json(drugs);
};

const getDrug = async (req, res) => {
  const user = req.user._id;
  const id = req.params.id;
  const drug = await Drug.findOne({ _id: new ObjectId(id), user: user });
  res.json(drug);
};

const postDrug = async (req, res) => {
  const user = req.user._id;
  const { name, ingredients, description } = req.body;
  await Drug.insertOne({ name, ingredients, user, description });
  res.json({ message: 'Drug added successfully' });
};

const updateDrug = async (req, res) => {
  const user = req.user._id;
  const id = req.params.id;
  const { name, ingredients, description } = req.body;

  await Drug.updateOne(
    { _id: new ObjectId(id), user: user },
    { $set: { name, ingredients, description } }
  );
  res.json({ message: 'Drug updated successfully' });
};

const deleteDrug = async (req, res) => {
  const user = req.user._id;
  const id = req.params.id;

  await Drug.deleteOne({ _id: new ObjectId(id), user: user });
  res.json({ message: 'Drug deleted successfully' });
};

module.exports = { getDrugs, postDrug, deleteDrug, getDrug, updateDrug };
