const express = require("express");
const app = express();

const { Connection, query } = require("stardog");

const conn = new Connection({
  username: "admin",
  password: "admin",
  endpoint: "http://localhost:5820",
});

let result = "";
let myJson = "";
query
  .execute(
    conn,
    "myDB",
    "select ?c ?x ?y ?css where {?c a :Cell . ?c :hasX ?x . ?c :hasY ?y . ?c :css ?css} order by ?c",
    "application/sparql-results+json",
    {
      reasoning: true,
    }
  )
  .then(({ body }) => {
    result = body.results.bindings;
    myJson = JSON.stringify(result);
  });

app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send(myJson);
});


const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
