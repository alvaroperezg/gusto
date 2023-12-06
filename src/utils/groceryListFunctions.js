import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firestore/config";

export async function fetchGroceryList(setGroceryList, planningId) {
    try {
      const docRef = doc(db, "plannings", planningId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const fetchedList = docSnap.data().groceryList || [];
        fetchedList.sort((a, b) => (a.purchased ? 1 : -1));
        setGroceryList(fetchedList);
      } else {
        console.log("No such planning!");
      }
    } catch (error) {
      console.error("Error fetching grocery list: ", error);
    }
  };

  export async function togglePurchased(ingredientId, groceryList, setGroceryList, planningId){
    const newList = groceryList.map((item) =>
      item.ingredient_id === ingredientId
        ? { ...item, purchased: !item.purchased }
        : item
    );
    newList.sort((a, b) => {
      if (a.purchased === b.purchased) {
        return 0;
      }
      return a.purchased ? 1 : -1;
    });
    setGroceryList(newList);
    try {
      const docRef = doc(db, "plannings", planningId);
      await updateDoc(docRef, { groceryList: newList });
    } catch (error) {
      console.error("Error updating grocery list: ", error);
    }
  };
