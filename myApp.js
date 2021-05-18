require('dotenv').config();
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const config = require('./config.json');

mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);

const myInstance = new Person({
  name: 'Some Name',
  age: 99,
  favoriteFoods: ['tum', 'yum', 'bum']
});
const createAndSavePerson = (done) => {
  myInstance.save((error) => {
    if (error) console.log(error);
  });
  done(null, myInstance);
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (error) => {
    if (error) console.log(error);
    done(null, arrayOfPeople);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (error, docs) => {
    if (error) console.log(error)
    done(null, docs);
  });
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
