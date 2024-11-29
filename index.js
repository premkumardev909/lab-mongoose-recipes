const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany();
  })
  .then(() => {
    const newRecipe = {
      title: "Asian Glazed Chicken Thighs",
      level: "Amateur Chef",
      ingredients: [
        // ingredients here
      ],
      cuisine: "Asian",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40,
      creator: "Chef LePapu"
    };

    return Recipe.create(newRecipe);
  })
  .then(result => {
    console.log(`Object inserted - ${result.title}`);
    return Recipe.insertMany(data);
  })
  .then(results => {
    results.forEach(recipe => {
      console.log(`Inserted - ${recipe.title}`);
    });
    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' }, 
      { duration: 100 }, 
      { new: true }
    );
  })
  .then(updatedRecipe => {
    console.log(`Updated ${updatedRecipe.title} successfully!`);
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(() => {
    console.log('Carrot Cake removed successfully!');
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error:', error);
    mongoose.connection.close();
});