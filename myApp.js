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
  Person.find({ name: personName }, (error, docs) => {
    if (error) console.log(error);
    done(null, docs);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (error, docs) => {
    if (error) console.log(error);
    done(null, docs);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (error, doc) => {
    if (error) console.log(error);
    done(null, doc);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (error, doc) => {
    if (error) console.log(error);
    doc.favoriteFoods.push(foodToAdd);
    doc.save();
    done(null, doc);
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (error, document) => {
    if (error) console.log(error);
    done(null, document);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (error, doc) => {
    if (error) console.log(error);
    done(null, doc);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (error, outcome) => {
    if (error) console.log(error);
    done(null, outcome);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort('name')
    .limit(2)
    .select({ age: 0 })
      .exec((error, results) => {
        if (error) console.log(error);
        console.log(results);
        done(null, results);
      });
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
