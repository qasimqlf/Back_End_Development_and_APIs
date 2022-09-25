require('dotenv').config();
let mongoose = require('mongoose');
const mySecret = process.env['MONGO_URI'];
mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true });

//Create a Model
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    favoriteFoods: [String]
})

let Person = mongoose.model('Person', personSchema);

//Create and Save a Record of a Model
let qasim = new Person({ name: 'Mr Qasim', age: 25, favoriteFoods: ['Biryani'] });
let andy = new Person({ name: 'Andy', age: 24, favoriteFoods: ['Meat'] });
let arrayOfPeople = [qasim, andy];

const createAndSavePerson = (done) => {
  qasim.save(function(err, data) {
    if(err) {
      done(err);
    } else {
      done(null, data);
    }
  });
  
};

const createManyPeople = (arrayOfPeople, done) => {
  done(null /*, data*/);
};

const findPeopleByName = (personName, done) => {
  done(null /*, data*/);
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
