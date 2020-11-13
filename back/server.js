const express = require("express");
const app = express();

const { Connection, query } = require("stardog");

const conn = new Connection({
  username: "admin",
  password: "admin",
  endpoint: "http://localhost:5820",
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.get("/", async (req, res) => {
  let result = "";
  let myJson = "";

  await query
    .execute(
      conn,
      "myDB",
      'select ?cell ?x ?y ?css where { ?cell a :Cell . ?cell :hasX ?x . ?cell :hasY ?y . OPTIONAL {?cell :css ?c1} BIND (exists{?cell :css ?c2} AS ?existsCSS ) BIND (IF(?existsCSS , ?c1, "free") as ?css)} order by ?cell',
      "application/sparql-results+json",
      {
        reasoning: true,
      }
    )
    .then(({ body }) => {
      result = body.results.bindings;
      myJson = JSON.stringify(result);
    });

  res.send(myJson);
});

app.get("/move/north", async (req, res) => {
  await query
    .execute(
      conn,
      "myDB",
      'DELETE  {?cellP rdf:type :CellPlayer.?cellE rdf:type ?class.?nextCell rdf:type ?bigball}  INSERT {?cellP rdf:type :CellFree.?cellE rdf:type :CellPlayer.?nextCell rdf:type ?class} WHERE {?cellP rdf:type :CellPlayer.?cellP :hasNorth ?cellE.{ VALUES ?class {:CellFree} ?cellE rdf:type ?class } UNION { VALUES ?class {:CellBigBall :CellSmallBall :CellMediumBall} ?cellE rdf:type ?class.?cellE :hasNorth ?nextCell.VALUES ?bigball {:CellFree } ?nextCell rdf:type ?bigball }}',
      "application/sparql-results+json",
      {
        reasoning: true,
      }
    )
    .then(({ body }) => {

    });
    res.send("ok");
});

app.get("/move/south", async (req, res) => {
  await query
    .execute(
      conn,
      "myDB",
      'DELETE  {?cellP rdf:type :CellPlayer.?cellE rdf:type ?class.?nextCell rdf:type ?bigball}  INSERT {?cellP rdf:type :CellFree.?cellE rdf:type :CellPlayer.?nextCell rdf:type ?class} WHERE {?cellP rdf:type :CellPlayer.?cellP :hasSouth ?cellE.{ VALUES ?class {:CellFree} ?cellE rdf:type ?class } UNION { VALUES ?class {:CellBigBall :CellSmallBall :CellMediumBall} ?cellE rdf:type ?class.?cellE :hasSouth ?nextCell.VALUES ?bigball {:CellFree } ?nextCell rdf:type ?bigball }}',
      "application/sparql-results+json",
      {
        reasoning: true,
      }
    )
    .then(({ body }) => {

    });
    res.send("ok");
});

app.get("/move/east", async (req, res) => {
  await query
    .execute(
      conn,
      "myDB",
      'DELETE  {?cellP rdf:type :CellPlayer.?cellE rdf:type ?class.?nextCell rdf:type ?bigball}  INSERT {?cellP rdf:type :CellFree.?cellE rdf:type :CellPlayer.?nextCell rdf:type ?class} WHERE {?cellP rdf:type :CellPlayer.?cellP :hasEast ?cellE.{ VALUES ?class {:CellFree} ?cellE rdf:type ?class } UNION { VALUES ?class {:CellBigBall :CellSmallBall :CellMediumBall} ?cellE rdf:type ?class.?cellE :hasEast ?nextCell.VALUES ?bigball {:CellFree } ?nextCell rdf:type ?bigball }}',
      "application/sparql-results+json",
      {
        reasoning: true,
      }
    )
    .then(({ body }) => {

    });
    res.send("ok");
});

app.get("/move/west", async (req, res) => {
  await query
    .execute(
      conn,
      "myDB",
      'DELETE  {?cellP rdf:type :CellPlayer.?cellE rdf:type ?class.?nextCell rdf:type ?bigball}  INSERT {?cellP rdf:type :CellFree.?cellE rdf:type :CellPlayer.?nextCell rdf:type ?class} WHERE {?cellP rdf:type :CellPlayer.?cellP :hasWest ?cellE.{ VALUES ?class {:CellFree} ?cellE rdf:type ?class } UNION { VALUES ?class {:CellBigBall :CellSmallBall :CellMediumBall} ?cellE rdf:type ?class.?cellE :hasWest ?nextCell.VALUES ?bigball {:CellFree } ?nextCell rdf:type ?bigball }}',
      "application/sparql-results+json",
      {
        reasoning: true,
      }
    )
    .then(({ body }) => {

    });
    res.send("ok");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
