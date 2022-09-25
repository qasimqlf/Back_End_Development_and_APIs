require('dotenv').config();
let mongoose = require('mongoose');
const mySecret = process.env['MONGO_URI'];
mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    favoriteFoods: [String]
})

let Person = mongoose.model('Person', personSchema);
let qasim = new Person({ name: 'Mr Qasim', age: 25, favoriteFoods: ['Biryani'] });
let andy = new Person({ name: 'Andy', age: 24, favoriteFoods: ['Meat'] });
let arrayOfPeople = [qasim, andy];

const createAndSavePerson = (done) => {
  //   ...do your stuff here...
  qasim.save(function(err, data) {
    if(err) {
      done(err);
    } else {
      done(null, data);
    }
  });
  
};

//Create Many Records with model.create()
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if(err) {
      done(err);
    } else {
      done(null, data);
    }
  });
};

//Use model.find() to Search Your Database
const findPeopleByName = (personName, done) => {
  Person.find( {name : personName}, function(err, data) {
    if(err) {
      done(err);
    } else {
      done(null, data);
    }
  });
};

//Use model.findOne() to Return a Single Matching Document from Your Database
const findOneByFood = (food, done) => {
  Person.findOne( {favoriteFoods : food}, function(err, data) {
    if(err) {
      done(err);
    } else {
      done(null, data);
    }
  });
};

//Use model.findById() to Search Your Database By _id
const findPersonById = (personId, done) => {
  Person.findById( personId, function(err, data) {
    if(err) {
      done(err);
    } else {
      done(null, data);
    }
  });
};

//Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById( personId, function(err, person) {
    if(err) {
      done(err);
    } 
    person.favoriteFoods.push(foodToAdd);
    person.save(function(err, person) {
      if(err) {
        done(err);
      } else {
        done(null, person);
      }
    });
    
  });
};

//Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate( {name : personName}, { age: ageToSet }, { new : true}, function(err, person) {
      if(err) {
        done(err);
      } else {
        done(null, person);
      }
  });
};

//Delete One Document Using model.findByIdAndRemove
const removeById = (personId, done) => {
  Person.findByIdAndRemove( personId, function(err, person) {
      if(err) {
        done(err);
      } else {
        done(null, person);
      }
  });
};

//Delete Many Documents with model.remove()
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove( {name : nameToRemove}, function(err, person) {
      if(err) {
        done(err);
      } else {
        done(null, person);
      }
  });
};

//Chain Search Query Helpers to Narrow Search Results
const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find( {favoriteFoods : foodToSearch}).sort({ name: 1 })
        .limit(2)
        .select({ age: 0 }).exec( function(err, person) {
      if(err) {
        done(err);
      } else {
        done(null, person);
      }
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
