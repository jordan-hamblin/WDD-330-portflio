const express = require('express');
const app = express();
const path = require('path');

app.set('views', path.join(__dirname, 'views')) ;
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));//support url encoded bodies
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const { Pool } = require("pg"); 

const connectionString = process.env.DATABASE_URL || "postgres://dwkqhyiuhejisa:15183dd5d2cc0e448de3ac9751d9ea85b784f701f3d3ef993acc8708a9a6a683@ec2-54-211-210-149.compute-1.amazonaws.com:5432/dc6vo60a35h923?ssl=true";

const pool = new Pool({connectionString: connectionString});


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.post("/getMovies", function(req, res) {
  
  let name = req.body.name;
  let select = req.body.select1;
  let title = req.body.title;  

  getMovie(res, name, select, title);
});

app.get('/', (req, res)=>res.render("movie"));


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


function getMovie(res, name, select, title) {
	getMovieFromDb(res, name, select, title, function(error, result) {
		if (error || result == null || result.length == 0) {
      res.render("movie");
    } 
    else {
      if(select == "view"){
      console.log(result);
      const results = {'result': result};
      console.log(results);
      res.render("view", results);
      }
      else if(select == "new"){
        
        res.render("movie");
        }
		}
	});
}

function getMovieFromDb(res, name, select, title, callback) {
  let sql = "";
  params = "";
  if(select == "view"){
    sql = "SELECT movie_title FROM movie_owner WHERE first_name = $1::text";
    params = [name];
  }
  else if (select == "add"){
    sql = "INSERT INTO movie_owner (first_name, movie_title) VALUES ($1::text, $2::text)";
    params = [name, title];
  }

	pool.query(sql, params, function(err, result) {

		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}
		callback(null, result.rows);
	});

}




	

	

	
  






