const express = require("express");
const { animals } = require("./data/animals.json");


const app = express();
// parse incoming string or array data
app.use(express.urlencoded({extended: true}));
// parse incoming json data
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get("/api/animals", (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

app.get('/api/animals/:id', (req,res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

app.post('/api/animals', (req, res) => {
    //req.body is where our incoming content will be
    console.log(req.body);
    res.json(req.body);
})


function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id == id[0]);
    return result;
}


function filterByQuery(query, animalsArray) {
  let personalityTraitsArray = [];
  // note that we save the animalsArray as filteredResults here
  let filteredResults = animalsArray;

  if (query.personalityTraitsArray) {
    // save personality as dedicated array
    // if personalityTrait is a string place it into a new array and save
    if (typeof query.personalityTraits === "string") {
      personalityTraitsArray = [query.personalityTraits];
    } else {
      personalityTraitsArray = query.personalityTraits;
    }
    // loop though each trait in the personality trait array
    personalityTraitsArray.forEach((trait) => {
      // check the trait against each animal in the filterResulst Array.
      // remember, it is initially a copy of the animalsArray,
      // but here we are updating it for each trait in the .forEach() loop
      // for each trait being targeted by the filter, the filteredResuts
      // array will then contain only the entries that contain the trait
      // so at the end we'll then contain only the entries that contain the trait
      // so at the end we'll have an array of animals that have every one
      // of the traits when the .forEach() loop is finished.

      filteredResults = filteredResults.filter(
        (animal) => animal.personalityTraits.indexOf(trait) !== -1
      );
    });
  }

  if (query.diet) {
    filteredResults = filteredResults.filter(
      (animal) => animal.diet === query.diet
    );
  }
  if (query.species) {
    filteredResults = filteredResults.filter(
      (animal) => animal.species === query.species
    );
  }
  if (query.name) {
    filteredResults = filteredResults.filter(
      (animal) => animal.name === query.name
    );
  }
  return filteredResults;
}

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}`);
});
