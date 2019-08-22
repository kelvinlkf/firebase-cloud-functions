# Firebase Cloud Functions
This project will show you the codes used in firebase cloud functions for Create, Read, Update & Delete data from realtime database
<br>
# Setup A Google Firebase Project
Please follow the link to setup your project if you have not created one yet. https://firebase.google.com/docs/functions/get-started
<br>
# CRUD Operations
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

# Send Email Via Cloud Functions
To send email via cloud functions, you need to install dependancies to work correctly. First, we will install the cors package to allow cross platform operations
```
npm install nodemailer cors
```

Next, we need to include the tools in the file as below
```js
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });
```

After including the tools, let's create a new function in the file
```js
exports.sendMail = functions.https.onRequest((req, res) => {
  // Your Operation Will Go Here
});
```

Before adding the send mail operation in the function, we will need to define our email authentication outside the function.
```js
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yourgmailaccount@gmail.com',
        pass: 'yourgmailaccpassword'
    }
});
```
 Next, let's add in the codes into the function as below
 ```js
 exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
      
        // getting dest email by query string
        const dest = req.query.dest;

        const mailOptions = {
            from: 'Your Account Name <yourgmailaccount@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
            to: dest,
            subject: 'Hello World', // email subject
            html: `<p style="font-size: 16px;">Good Morning</p>
            // email content in HTML
        };
  
        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if(erro){
                return res.send(erro.toString());
            }
            return res.send('Sended');
        });
    });    
});
```

Next, we will deploy the function and run the testing by calling the link using *dest* as the query parameter.
```
https://<firebase-project-id-link>/sendMail?dest=<user-target-email>
```

# Cloud Functions Trigger Background Process [ Realtime Database ]
1. onWrite(), which triggers when data is created, updated, or deleted in the Realtime Database. <br>
2. onCreate(), which triggers when new data is created in the Realtime Database. <br>
3. onUpdate(), which triggers when data is updated in the Realtime Database. <br>
4. onDelete(), which triggers when data is deleted from the Realtime Database. <br>

Sample Codes
```js
exports.respondOnCreate = functions.database.ref('/demo/{pushId}/message').onCreate((snapshot, context) => {
  // Grab the current value of what was written to the Realtime Database.
  const original = snapshot.val();
  const uppercase = original.toUpperCase();
  // You must return a Promise when performing asynchronous tasks inside a Functions such as
  // Writing to the Firebase Realtime Database.
  return snapshot.ref.parent.child('uppercase').set(uppercase);
});
```

