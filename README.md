# Firebase Cloud Functions
This project will show you the codes used in firebase cloud functions for Create, Read, Update & Delete data from realtime database
<br>
# Setup A Google Firebase Project
Please follow the link to setup your project if you have not created one yet. https://firebase.google.com/docs/functions/get-started
<br>
# Sample Codes
1. Add Data
```js
exports.addData = functions.https.onRequest(async (req, res) => {
  const params = req.query;

  const snapshot = await admin.database().ref('/demo/' + params.id + '/').set({
    message: params.message,
  });

  res.status(200).send('{"Success": "1"}');
});
```

2. Read Data
```js
exports.readData = functions.https.onRequest(async (req, res) => {
  const params = req.query;

  return admin.database().ref('demo/' + params.id).once('value', (snapshot) => {
    var event = snapshot.val();
    res.send(event.message);
  });
});
```

3. Update Data
```js
exports.updateData = functions.https.onRequest(async (req, res) => {
  const params = req.query;

  const snapshot = await admin.database().ref('/demo/' + params.id + '/').update({
    message: params.message,
  });

  res.status(200).send('{"Success": "1"}');
});
```

4. Delete Data
```js
exports.deleteData = functions.https.onRequest(async (req, res) => {
  const params = req.query;

  const snapshot = await admin.database().ref('/demo/' + params.id + '/').remove();

  res.status(200).send('{"Success": "1"}');
});
```
