import { addDoc, collection, getDocs, doc, getDoc, query, limit} from 'firebase/firestore';
import { db } from './config.js'; // Asegúrate de que la ruta es correcta

// Función para obtener los datos de la subcolección específica de un producto
async function dameDocBro(productoId) {
    try {
        const docRef = doc(db, `productos/${productoId}`);
        const documento = await getDoc(docRef);
        const datosDoc = documento.data();
        return datosDoc;
    } catch (error) {
        console.error("Error al obtener los documentos de la subcolección: ", error);
    }
}
async function dameDocsChacho() { //COGE LOS 10 PRIMEROS PRODUCTOS E IMPRIME EN CONSOLA LOS NOMBRES(NOMBRE_REFERENCIA) 
    try {
        const q = query(collection(db, "productos"), limit(10));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
            console.log(doc.data().NOMBRE_REFERENCIA);
        });
    } catch (error) {
        console.error("Error al obtener nombres de productos: ", error);
    }
}

async function setPlanningManin(datosPlanningJSON) {
    try {
        const datosPlanning= typeof datosPlanningJSON === 'string' ? JSON.parse(datosPlanningJSON) :datosPlanningJSON;
        const coleccionRef = collection(db, 'planings');
        const promises = datosPlanning.map(async (planing) => {
            const docRef = await addDoc(coleccionRef, planing);
        });
        await Promise.all(promises);
    } catch (e) {
        console.error("Error setPlanningManin: ", e);
    }
}

async function getPlanningManin(){
    try {
        const coleccionRef = collection(db, 'planings');
        const querySnapshot = await getDocs(coleccionRef);
        const planingsArray = querySnapshot.docs.map(doc => {
            return {
                ...doc.data() 
            };
        });
        // console.log(planingsArray);
        return planingsArray;
    } catch (error) {
        console.error("Error getPlanningManin: ", error);
    }
}

export {dameDocBro,dameDocsChacho,setPlanningManin,getPlanningManin};
