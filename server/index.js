const express = require("express");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const Response = require("./response");

const URL =
  "mongodb+srv://muratmelih:bdYX3R7498Xqrvx@cluster0.kotww.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/card", (req, res) => {
  MongoClient.connect(URL, (err, client) => {
    if (err) throw err;

    const db = client.db("getirLocal");

    db.collection("card")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(new Response(true, result, ""));
        client.close();
      });
  });
});

app.delete("/card/all", (req, res) => {
  MongoClient.connect(URL, (err, client) => {
    if (err) throw err;

    const db = client.db("getirLocal");

    db.collection("card").deleteMany({});
    res.json(new Response(true, null, ""));
  });
});

app.delete("/card", (req, res) => {
  MongoClient.connect(URL, (err, client) => {
    if (err) throw err;

    const db = client.db("getirLocal");

    db.collection("card").deleteOne({ slug: req.query.slug });
    res.json(new Response(true, null, ""));
  });
});

app.post("/card/add", (req, res) => {
  MongoClient.connect(URL, (err, client) => {
    if (err) throw err;

    const db = client.db("getirLocal");
    let data = {
      name: req.body.name,
      slug: req.body.slug,
      quantity: Number(req.body.quantity),
      price: req.body.price,
    };
    db.collection("card").insertOne(data, (err, result) => {
      if (err) throw err;
      client.close();
      res.json(new Response(true, data, ""));
    });
  });
});

app.post("/card/update", (req, res) => {
  MongoClient.connect(URL, (err, client) => {
    if (err) throw err;

    const db = client.db("getirLocal");
    let query = { slug: req.body.slug };
    let newValue = { $set: { quantity: req.body.quantity } };
    db.collection("card").updateOne(query, newValue, (err, result) => {
      if (err) throw err;
      res.json(new Response(true, req.body.slug, ""));
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
