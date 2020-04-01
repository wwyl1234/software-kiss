/* This is the server code */
var http = require('http');
var fs = require('fs');
var express = require('express');
const bodyParser = require('body-parser')
const {Pool, Client } = require('pg');

var app = express();
var router = express.Router();
const PORT =  process.env.PORT || 80; 

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

/* Create the Pool to connect to the database */
const POOL = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});


// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
POOL.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err) // your callback here
  process.exit(-1)
})

console.log(process.env.DATABASE_URL)

/* Load the homepage */
app.use(express.static('public'));

app.get('/', function(req, res){
  res.render('index.html');
});


app.listen(PORT, function() {
    console.log(`Example app listening on port ${PORT}!`);
  });
  


/* RESTAPI call GET /posts gets all the posts from the database.*/
 app.get("/posts", (req, response, next) => {
  client.connect();
  let query = `SELECT (name, to_char("date", 'YYYY-MM-DD'), time,content, meta_tags) 
  FROM posts
  ORDER BY
      date DESC;`
 // use a promise to checkout a client
 POOL
 .connect()
 .then(client => {
   return client
     .query(query)
     .then(res => {
       response.send(res.rows);
       client.release()
       console.log(res.rows)
   })
   .catch(err => {
     client.release()
     console.log(err.stack)
   })
 })
});


 /* RESTAPI call GET /posts/recent/{start}/{num} gets the recent posts from the database.
 start indicates the position (0 being the most recent, 1 being the second most recent) 
 and num indicates the number of posts from the start */
 app.get("/posts/recent/:start/:num", (req, response, next) => {
   console.log(req);
   let start = parseInt(req.params.start);
   let num = parseInt(req.params.num);
   console.log(start, num);
   let query = `
   SELECT *
   FROM posts
   ORDER BY
       date DESC
  OFFSET ${start} ROWS
  FETCH FIRST ${num} ROW ONLY;`

  // use a promise to checkout a client
  POOL
    .connect()
    .then(client => {
      return client
        .query(query)
        .then(res => {
          response.send(res.rows);
          client.release()
          console.log(res.rows)
      })
      .catch(err => {
        client.release()
        console.log(err.stack)
      })
    })
 });


 /* RESTAPI call POST /auth with email and psw */
 app.post("/auth", (req, response, next) => {
  console.log(req);
  let email = req.body.email;
  let psw = req.body.psw;
  let query = `SELECT psw FROM credentials WHERE email = '${email}';`
  console.log(query);

 // use a promise to checkout a client
 POOL
   .connect()
   .then(client => {
     return client
       .query(query)
       .then(res => {
         // Check that res is not empty and matches with password
         let result = {}
         if (res.rows.length != 0 && res.rows[0]["psw"] == psw) {
            result["sucess"] = true;
         } else {
          result["sucess"] = false;
         }
         response.send(result);
         client.release()
         console.log(result)
     })
     .catch(err => {
       client.release()
       console.log(err.stack)
     })
   })
});