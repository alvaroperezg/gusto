import { getFirestore, collection, getDocs, doc, getDoc, query, limit} from 'firebase/firestore';
import { db } from './config.js'; // Asegúrate de que la ruta es correcta

// Función para obtener los datos de la subcolección específica de un producto
async function dameDocManin(productoId) {
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

async function tomaPlanningPrimo(datosPlanningJSON) {
    try {
        const docRef = doc(db, 'planings');
        const datosPlanning= typeof datosPlanningJSON === 'string' ? JSON.parse(datosPlanningJSON) :datosPlanningJSON;
        await setDoc(docRef,datosPlanning);
    } catch (e) {
        console.error("Error al agregar o actualizar documento: ", e);
    }
}


// Exporta la función para su uso en otros archivos
export { dameDocManin ,dameDocsChacho, tomaPlanningPrimo};
