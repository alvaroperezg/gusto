import {
  addDoc,
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  limit,
  where,
} from "firebase/firestore";
import { db } from "./config.js"; // Asegúrate de que la ruta es correcta

// Función para obtener los datos de la subcolección específica de un producto
async function dameDocBro(productoId) {
  try {
    const docRef = doc(db, `productos/${productoId}`);
    const documento = await getDoc(docRef);
    const datosDoc = documento.data();
    return datosDoc;
  } catch (error) {
    console.error(
      "Error al obtener los documentos de la subcolección: ",
      error
    );
  }
}
async function getDocsChacho() {
  try {
    const q = query(collection(db, "productos"), limit(10));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data().NOMBRE_REFERENCIA);
    });
  } catch (error) {
    console.error("Error al obtener nombres de productos: ", error);
  }
}

async function setPlanningManin(datosPlanningJSON) {
  try {
    const datosPlanning =
      typeof datosPlanningJSON === "string"
        ? JSON.parse(datosPlanningJSON)
        : datosPlanningJSON;
    const coleccionRef = collection(db, "planings");
    const promises = datosPlanning.map(async (planing) => {
      const docRef = await addDoc(coleccionRef, planing);
    });
    await Promise.all(promises);
  } catch (e) {
    console.error("Error setPlanningManin: ", e);
  }
}

async function createPlanning(planningData) {
  try {
    const collectionRef = collection(db, "plannings");
    const docRef = await addDoc(collectionRef, planningData);
    console.log("Planning created with ID:", docRef.id);
    return docRef; // Return the document reference
  } catch (e) {
    console.error("Error createPlanning: ", e);
    throw e; // It's a good practice to re-throw the error so it can be handled by the caller
  }
}

// Function to get recipe details by ID
export const fetchRecipeDetails = async (recipeId) => {
  try {
    const recipeRef = doc(db, "recipes", recipeId);
    const recipeSnap = await getDoc(recipeRef);

    if (recipeSnap.exists()) {
      console.log("Recipe data:", recipeSnap.data());
      return {
        name: recipeSnap.data().name,
        prepTime: recipeSnap.data().prepTime,
        ingredients: recipeSnap.data().ingredients,
      };
    } else {
      console.log("No such recipe!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching recipe details: ", error);
    return null;
  }
};

async function getPlanningManin() {
  try {
    const coleccionRef = collection(db, "planings");
    const querySnapshot = await getDocs(coleccionRef);
    const planingsArray = querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
      };
    });
    // console.log(planingsArray);
    return planingsArray;
  } catch (error) {
    console.error("Error getPlanningManin: ", error);
  }
}

async function buscaCampoCompa(coleccionBuscar, campoBuscar, valorBuscar) {
  try {
    const coleccionRef = collection(db, coleccionBuscar);
    const q = query(coleccionRef, where(campoBuscar, "==", valorBuscar));
    const querySnapshot = await getDocs(q);
    const arrayDatos = [];
    querySnapshot.forEach((doc) => {
      arrayDatos.push(doc.data());
    });
    return arrayDatos;
  } catch (error) {
    console.error(
      "Error buscaCampoCompa,Se ha intentado buscar ",
      valorBuscar,
      " en ",
      campoBuscar
    );
    return [];
  }
}

async function getIdRecetasPlanning() {
  try {
    const coleccionRef = collection(db, "recetas");
    const querySnapshot = await getDocs(coleccionRef);
    const recetasArray = querySnapshot.docs.map((doc) => doc.data().ID);
    console.log(recetasArray);
    // return planingsArray;
  } catch (error) {
    console.error("Error getPlanningManin: ", error);
  }
}

async function getDatosRecetasParguelas(idsRecetas) {
  try {
    const detallesRecetas = [];
    for (const idReceta of idsRecetas) {
      buscaCampoCompa("recetas", "ID", idReceta).then((data) => {
        // console.log(data)
        detallesRecetas.push(data);
      });
    }
    // console.log(detallesRecetas);
    // return detallesRecetas;
  } catch (error) {
    console.error("Error al obtener detalles de recetas: ", error);
    return [];
  }
}

async function construirMealPlans() {
  let mealPlans = [];
  let fechas = ["2023-11-28"];

  for (let fecha of fechas) {
    let datosPlaning = await buscaCampoCompa("planings", "date", fecha);
    console.log(datosPlaning);
    let datosComida = await buscaCampoCompa(
      "recetas",
      "ID",
      datosPlaning[0].idComida
    );
    let titleComida = datosComida[0].NOMBRE;
    let durationComida = datosComida[0].TIEMPO;
    let countComida = datosPlaning[0].lunch;

    let datosCena = await buscaCampoCompa(
      "recetas",
      "ID",
      datosPlaning[0].idCena
    );
    let titleCena = datosCena[0].NOMBRE;
    let durationCena = datosCena[0].TIEMPO;
    let countCena = datosPlaning[0].lunch;

    let planDeComidas = {
      date: new Date(fecha),
      meals: {
        lunch: {
          title: titleComida,
          duration: durationComida,
          peopleCount: countComida,
        },
        dinner: {
          title: titleCena,
          duration: durationCena,
          peopleCount: countCena,
        },
      },
    };
    mealPlans.push(planDeComidas);
  }

  return mealPlans;
}

export {
  dameDocBro,
  getDocsChacho,
  setPlanningManin,
  createPlanning,
  getPlanningManin,
  buscaCampoCompa,
  getDatosRecetasParguelas,
  construirMealPlans,
};
