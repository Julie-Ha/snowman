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
      'select ?cell (group_concat(?c3) as ?css) where { ?cell a :Cell . OPTIONAL {?cell :css ?c1} BIND (exists{?cell :css ?c2} AS ?existsCSS ) BIND (IF(?existsCSS , ?c1, "free") as ?c3)} group by ?cell order by ?cell',
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

app.get("/move/:direction", async (req, res) => {
  let direction = req.params.direction;
  let directionProperty = 'has'+(direction.charAt(0).toUpperCase() + direction.slice(1));

  await query
    .execute(
      conn,
      "myDB",
      "DELETE  {   ?cellPlayer rdf:type :CellPlayer.   ?nextCell1 rdf:type ?class1.   ?nextCell2 rdf:type ?class2}  INSERT {   ?cellPlayer rdf:type :CellFree.   ?nextCell1 rdf:type :CellPlayer.   ?nextCell2 rdf:type ?class1}WHERE {	?cellPlayer rdf:type :CellPlayer.	?cellPlayer :"+directionProperty+" ?nextCell1.	{		VALUES ?class1 {:CellFree}		?nextCell1 rdf:type ?class1	}   UNION   {             VALUES ?class1 {:CellBigBall :CellSmallBall :CellMediumBall}      ?nextCell1 rdf:type ?class1.      ?nextCell1 :"+directionProperty+" ?nextCell2.      VALUES ?class2 {:CellFree }       ?nextCell2 rdf:type ?class2    }   UNION   {             VALUES ?class1 {:CellMediumBall}      ?nextCell1 rdf:type ?class1.      ?nextCell1 :"+directionProperty+" ?nextCell2.      VALUES ?class3 {:CellBigBall }       ?nextCell2 rdf:type ?class3   }   UNION   {             VALUES ?class1 {:CellSmallBall}      ?nextCell1 rdf:type ?class1.      ?nextCell1 :"+directionProperty+" ?nextCell2.      VALUES ?class3 {:CellHalfSnowman}       ?nextCell2 rdf:type ?class3   }}",
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
