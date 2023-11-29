const admin = require("firebase-admin");

const serviceAccount = require("./gusto-74b76-firebase-adminsdk-8akmc-3995ae4026.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;
