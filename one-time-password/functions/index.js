const functions = require('firebase-functions');
const admin = require('firebase-admin');
const createUser = require('./creture_user');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://onetp-8ec3c.firebaseio.com"
});
 
exports.createUser = functions.https.onRequest(createUser);
