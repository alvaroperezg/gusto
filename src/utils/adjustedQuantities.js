// Function to adjust quantities for each ingredient in the array
async function adjustIngredientQuantities(ingredients, servings) {
  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    console.error("No ingredients provided or invalid ingredients array");
    return [];
  }

  const adjustedIngredients = [];

  for (const ingredient of ingredients) {
    try {
      const adjustedQuantity = await getAdjustedQuantity(
        ingredient.quantity,
        servings,
        ingredient.name
      );
      adjustedIngredients.push({
        ...ingredient,
        quantity: adjustedQuantity, // Update the quantity with the adjusted value
      });
    } catch (error) {
      console.error(`Error adjusting quantity for ${ingredient.name}:`, error);
    }
  }

  return adjustedIngredients;
}

function getAdjustedQuantity(quantityInGrams, servings) {
  const adjustedQuantity = quantityInGrams * servings;
  return adjustedQuantity;
}

export { adjustIngredientQuantities };
