const recipes = [
  {
    name: "Chocolate Cake",
    ingredients: [
      { ingredient_id: "id1", name: "flour", quantity: "2 cups" },
      { ingredient_id: "id2", name: "sugar", quantity: "1 cup" },
      { ingredient_id: "id3", name: "cocoa powder", quantity: "1/2 cup" },
      { ingredient_id: "id4", name: "baking powder", quantity: "1 tsp" },
      { ingredient_id: "id5", name: "eggs", quantity: "2" },
      { ingredient_id: "id6", name: "milk", quantity: "1 cup" },
    ],
    steps: [
      "Preheat oven to 350°F (175°C). Grease and flour a cake pan.",
      "In a large bowl, mix flour, sugar, cocoa powder, and baking powder.",
      "Add eggs, milk, and mix until smooth.",
      "Pour batter into the prepared pan.",
      "Bake for 30 minutes or until a toothpick inserted comes out clean.",
      "Let cool before serving.",
    ],
    prepTime: 60,
  },
  {
    name: "Spaghetti Carbonara",
    ingredients: [
      { ingredient_id: "id7", name: "spaghetti", quantity: "400g" },
      { ingredient_id: "id8", name: "bacon", quantity: "150g" },
      { ingredient_id: "id5", name: "eggs", quantity: "4" },
      { ingredient_id: "id9", name: "parmesan cheese", quantity: "1/2 cup" },
      { ingredient_id: "id10", name: "garlic", quantity: "2 cloves" },
      { ingredient_id: "id11", name: "black pepper", quantity: "1 tsp" },
    ],
    steps: [
      "Cook spaghetti according to package instructions.",
      "In a skillet, cook bacon until crisp. Remove and set aside.",
      "In a bowl, whisk eggs and Parmesan together.",
      "Add cooked spaghetti to the skillet with bacon. Remove from heat.",
      "Quickly stir in egg mixture and cooked bacon. The heat will cook the eggs.",
      "Season with garlic and black pepper. Serve immediately.",
    ],
    prepTime: 30,
  },
  {
    name: "Vegetarian Pizza",
    ingredients: [
      { ingredient_id: "id12", name: "pizza dough", quantity: "1 base" },
      { ingredient_id: "id13", name: "tomato sauce", quantity: "1/2 cup" },
      { ingredient_id: "id14", name: "mozzarella cheese", quantity: "1 cup" },
      {
        ingredient_id: "id15",
        name: "bell peppers",
        quantity: "1/2 cup, sliced",
      },
      { ingredient_id: "id16", name: "mushrooms", quantity: "1/2 cup, sliced" },
      { ingredient_id: "id17", name: "red onion", quantity: "1/4 cup, sliced" },
      { ingredient_id: "id18", name: "olives", quantity: "1/4 cup" },
    ],
    steps: [
      "Preheat oven to 475°F (245°C).",
      "Spread tomato sauce on pizza dough.",
      "Top with mozzarella, bell peppers, mushrooms, red onion, and olives.",
      "Bake in the preheated oven for 12-15 minutes.",
      "Slice and serve hot.",
    ],
    prepTime: 45,
  },
  {
    name: "Chicken Curry",
    ingredients: [
      { ingredient_id: "id19", name: "chicken breast", quantity: "500g" },
      { ingredient_id: "id20", name: "curry powder", quantity: "2 tbsp" },
      { ingredient_id: "id21", name: "coconut milk", quantity: "400ml" },
      { ingredient_id: "id22", name: "onion", quantity: "1" },
      { ingredient_id: "id10", name: "garlic", quantity: "3 cloves" },
      { ingredient_id: "id23", name: "ginger", quantity: "1 inch piece" },
      { ingredient_id: "id24", name: "vegetable oil", quantity: "2 tbsp" },
    ],
    steps: [
      "Cut chicken into bite-sized pieces.",
      "In a pot, heat oil and sauté onion, garlic, and ginger.",
      "Add chicken and curry powder, cook until chicken is browned.",
      "Pour in coconut milk and bring to a simmer.",
      "Cook until chicken is tender, about 20 minutes.",
      "Serve with rice.",
    ],
    prepTime: 60,
  },
  {
    name: "Caesar Salad",
    ingredients: [
      { ingredient_id: "id25", name: "romaine lettuce", quantity: "1 head" },
      { ingredient_id: "id26", name: "croutons", quantity: "1 cup" },
      { ingredient_id: "id27", name: "Caesar dressing", quantity: "1/2 cup" },
      { ingredient_id: "id28", name: "parmesan cheese", quantity: "1/4 cup" },
      {
        ingredient_id: "id8",
        name: "bacon",
        quantity: "100g, cooked and crumbled",
      },
    ],
    steps: [
      "Chop romaine lettuce and place in a large bowl.",
      "Add croutons and Parmesan cheese.",
      "Drizzle Caesar dressing over the salad.",
      "Toss the salad to coat evenly.",
      "Top with cooked and crumbled bacon. Serve chilled.",
    ],
    prepTime: 15,
  },
  {
    name: "Beef Stew",
    ingredients: [
      { ingredient_id: "id29", name: "beef chuck", quantity: "1 kg" },
      { ingredient_id: "id30", name: "carrots", quantity: "3, chopped" },
      { ingredient_id: "id31", name: "potatoes", quantity: "4, chopped" },
      { ingredient_id: "id22", name: "onion", quantity: "1, chopped" },
      { ingredient_id: "id10", name: "garlic", quantity: "4 cloves" },
      { ingredient_id: "id32", name: "beef broth", quantity: "4 cups" },
      { ingredient_id: "id33", name: "tomato paste", quantity: "2 tbsp" },
      {
        ingredient_id: "id34",
        name: "Worcestershire sauce",
        quantity: "1 tbsp",
      },
      { ingredient_id: "id35", name: "dried thyme", quantity: "1 tsp" },
      { ingredient_id: "id36", name: "olive oil", quantity: "2 tbsp" },
    ],
    steps: [
      "In a large pot, heat oil and brown beef chunks.",
      "Add chopped carrots, potatoes, and onion.",
      "Stir in garlic, beef broth, tomato paste, and Worcestershire sauce.",
      "Season with thyme. Bring to a boil.",
      "Reduce heat, cover, and simmer for 1.5 hours.",
      "Serve hot with bread.",
    ],
    prepTime: 120,
  },
  {
    name: "Tomato Soup",
    ingredients: [
      { ingredient_id: "id37", name: "tomatoes", quantity: "800g, canned" },
      { ingredient_id: "id22", name: "onion", quantity: "1" },
      { ingredient_id: "id10", name: "garlic", quantity: "3 cloves" },
      { ingredient_id: "id38", name: "vegetable broth", quantity: "2 cups" },
      { ingredient_id: "id39", name: "basil", quantity: "1/4 cup, fresh" },
      { ingredient_id: "id40", name: "cream", quantity: "1/2 cup" },
      { ingredient_id: "id41", name: "butter", quantity: "2 tbsp" },
      { ingredient_id: "id42", name: "salt", quantity: "to taste" },
      { ingredient_id: "id43", name: "pepper", quantity: "to taste" },
    ],
    steps: [
      "In a pot, sauté onion and garlic in butter.",
      "Add tomatoes, vegetable broth, and basil. Bring to a boil.",
      "Reduce heat and simmer for 30 minutes.",
      "Puree the soup in a blender or with an immersion blender.",
      "Stir in cream. Season with salt and pepper.",
      "Serve hot.",
    ],
    prepTime: 45,
  },
  {
    name: "Pancakes",
    ingredients: [
      { ingredient_id: "id1", name: "flour", quantity: "1 1/2 cups" },
      { ingredient_id: "id2", name: "sugar", quantity: "2 tbsp" },
      { ingredient_id: "id4", name: "baking powder", quantity: "2 tsp" },
      { ingredient_id: "id44", name: "salt", quantity: "1/2 tsp" },
      { ingredient_id: "id5", name: "eggs", quantity: "1" },
      { ingredient_id: "id6", name: "milk", quantity: "1 1/4 cups" },
      { ingredient_id: "id45", name: "vanilla extract", quantity: "1 tsp" },
      { ingredient_id: "id41", name: "butter", quantity: "2 tbsp, melted" },
    ],
    steps: [
      "In a bowl, mix flour, sugar, baking powder, and salt.",
      "In another bowl, whisk egg, milk, vanilla, and melted butter.",
      "Combine wet and dry ingredients. Stir until smooth.",
      "Heat a lightly oiled griddle over medium heat.",
      "Pour batter onto the griddle. Cook until bubbles form and edges are dry.",
      "Flip and cook until browned. Serve hot.",
    ],
    prepTime: 20,
  },
  {
    name: "Fried Rice",
    ingredients: [
      { ingredient_id: "id46", name: "rice", quantity: "2 cups, cooked" },
      { ingredient_id: "id47", name: "eggs", quantity: "2, beaten" },
      { ingredient_id: "id8", name: "bacon", quantity: "100g, diced" },
      { ingredient_id: "id22", name: "onion", quantity: "1, diced" },
      { ingredient_id: "id48", name: "green peas", quantity: "1/2 cup" },
      { ingredient_id: "id49", name: "carrots", quantity: "1/2 cup, diced" },
      { ingredient_id: "id50", name: "soy sauce", quantity: "3 tbsp" },
      { ingredient_id: "id36", name: "olive oil", quantity: "1 tbsp" },
    ],
    steps: [
      "Heat oil in a large skillet. Add onion, garlic, and cook until soft.",
      "Stir in carrots and peas. Cook until vegetables are tender.",
      "Push vegetables to the side. Add beaten eggs and scramble.",
      "Add cooked rice, soy sauce, and cooked bacon. Stir well.",
      "Cook until everything is heated through. Serve immediately.",
    ],
    prepTime: 30,
  },
  {
    name: "Grilled Cheese Sandwich",
    ingredients: [
      { ingredient_id: "id51", name: "bread", quantity: "2 slices" },
      {
        ingredient_id: "id14",
        name: "mozzarella cheese",
        quantity: "2 slices",
      },
      { ingredient_id: "id41", name: "butter", quantity: "1 tbsp" },
    ],
    steps: [
      "Butter one side of each bread slice.",
      "Place bread, buttered side down, on a skillet over medium heat.",
      "Top bread with cheese slices.",
      "Cover with the second slice of bread, buttered side up.",
      "Cook until golden brown, then flip and cook the other side.",
      "Serve hot.",
    ],
    prepTime: 10,
  },
  {
    name: "Greek Salad",
    ingredients: [
      { ingredient_id: "id52", name: "cucumber", quantity: "1" },
      { ingredient_id: "id53", name: "tomatoes", quantity: "2" },
      { ingredient_id: "id54", name: "red onion", quantity: "1/2" },
      { ingredient_id: "id55", name: "feta cheese", quantity: "100g" },
      { ingredient_id: "id56", name: "olives", quantity: "1/4 cup" },
      { ingredient_id: "id57", name: "olive oil", quantity: "2 tbsp" },
      { ingredient_id: "id58", name: "lemon juice", quantity: "1 tbsp" },
      { ingredient_id: "id59", name: "oregano", quantity: "1 tsp" },
      { ingredient_id: "id42", name: "salt", quantity: "to taste" },
      { ingredient_id: "id43", name: "pepper", quantity: "to taste" },
    ],
    steps: [
      "Chop cucumber, tomatoes, and red onion. Place in a salad bowl.",
      "Crumble feta cheese over the vegetables.",
      "Add olives.",
      "In a small bowl, mix olive oil, lemon juice, oregano, salt, and pepper.",
      "Drizzle the dressing over the salad and toss gently.",
      "Serve chilled as a fresh side dish.",
    ],
    prepTime: 15,
  },
  {
    name: "Banana Smoothie",
    ingredients: [
      { ingredient_id: "id60", name: "banana", quantity: "2" },
      { ingredient_id: "id61", name: "Greek yogurt", quantity: "1/2 cup" },
      { ingredient_id: "id6", name: "milk", quantity: "1 cup" },
      { ingredient_id: "id62", name: "honey", quantity: "1 tbsp" },
      { ingredient_id: "id63", name: "vanilla extract", quantity: "1/2 tsp" },
      { ingredient_id: "id64", name: "ice cubes", quantity: "1 cup" },
    ],
    steps: [
      "Peel bananas and place them in a blender.",
      "Add Greek yogurt, milk, honey, vanilla extract, and ice cubes.",
      "Blend until smooth and creamy.",
      "Taste and adjust sweetness, if necessary.",
      "Pour into glasses and serve immediately, ideally chilled.",
    ],
    prepTime: 5,
  },
];

const db = require("./firebaseAdminConfig");

async function seedDatabase() {
  const recipeCollection = db.collection("recipes");

  for (const recipe of recipes) {
    await recipeCollection
      .add(recipe)
      .catch((error) => console.error("Error seeding recipe:", error));
  }

  console.log("Database seeding completed.");
}

seedDatabase();
