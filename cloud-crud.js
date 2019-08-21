// const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

admin.initializeApp();

exports.addData = functions.https.onRequest(async (req, res) => {
  const params = req.query;

  const snapshot = await admin.database().ref('/demo/' + params.id + '/').set({
    message: params.message,
  });

  res.status(200).send('{"Success": "1"}');
});

exports.readData = functions.https.onRequest(async (req, res) => {
  const params = req.query;

  return admin.database().ref('demo/' + params.id).once('value', (snapshot) => {
    var event = snapshot.val();
    res.send(event.message);
  });
});

exports.updateData = functions.https.onRequest(async (req, res) => {
  const params = req.query;

  const snapshot = await admin.database().ref('/demo/' + params.id + '/').update({
    message: params.message,
  });

  res.status(200).send('{"Success": "1"}');
});

exports.deleteData = functions.https.onRequest(async (req, res) => {
  const params = req.query;

  const snapshot = await admin.database().ref('/demo/' + params.id + '/').remove();

  res.status(200).send('{"Success": "1"}');
});