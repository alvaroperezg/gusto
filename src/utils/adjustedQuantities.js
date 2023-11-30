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

// Function to get adjusted quantity for a single ingredient using Chat API
async function getAdjustedQuantity(quantity, servings, name) {
  try {
    const messages = [
      { role: "system", content: "Process this command." },
      {
        role: "user",
        content: `If a recipe calls for ${quantity} of ${name} for one serving, how much would be needed for ${servings} servings?`,
      },
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer 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`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages,
      }),
    });

    const data = await response.json();

    if (
      !data.choices ||
      data.choices.length === 0 ||
      !data.choices[0].message.content
    ) {
      throw new Error("Invalid response from OpenAI API");
    }

    return data.choices[0].message.content.trim(); // Return the adjusted quantity as a string
  } catch (error) {
    console.error(`Error adjusting quantity for ${name}:`, error);
    throw error;
  }
}

export { adjustIngredientQuantities };
