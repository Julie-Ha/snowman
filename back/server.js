const express = require("express");
const app = express();
let a = ''
let myJson =''


const { Connection, query } = require('stardog');
 
const conn = new Connection({
  username: 'admin',
  password: 'admin',
  endpoint: 'http://localhost:5820',
});
 
query.execute(conn, 'myDB', 'select ?c where {?c a :Cell} order by ?c', 'application/sparql-results+json', {
  reasoning:true
}).then(({ body }) => {
   a = body.results.bindings;
  myJson = JSON.stringify(a);
});


const port = 3000

app.get('/', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send(myJson)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

