const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();

// pour permettre l'upload et le stockage des fichiers images
app.use(fileUpload());
// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,multipart/form-data"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

// toute les requêtes POST envoyé à ce Route sera un fichier image
app.post("/upload", (req, res) => {
  if (req.files && req.body) {
    console.log(
      "🚀 ~ file: app.js:35 ~ app.post ~ req.body:",
      req.body.message
    );
    console.log(
      "🚀 ~ file: app.js:35 ~ app.post ~ req.files:",
      req.files
    );
    // Renver un statuts 200
    res.status(200).send({
      msg: `fichier, message uploadé avec success`,
    });
  } else {
    res.status(400).send({ msg: `aucun fichier trouve` });
  }
});

app.listen(3000, () => console.log("Le server écoute sur le port 3000"));
