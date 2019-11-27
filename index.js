const express = require("express"); // import express library
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express(); // initialize express app
const port = process.env.PORT || 3000;
console.log(true);

let movies = [
	{
		id: 1,
		judul: "frozen",
		tahun: 2019
	},
	{
		id: 2,
		judul: "joker",
		tahun: 2019
	}
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// setup a `/` endpoint
app.get("/", (req, res, next) => res.send("<h1>Welcome Danny!</h1>"));

// setup a `/movies` endpoint
app.get("/movies", (request, response, next) => {
	response.status(200).send(movies);
});

//setup a `/movies/:id for single display
app.get("/movies/:id", (req, res) => {
	const idParams = req.params.id;
	const movie = movies.find(item => item.id == idParams);
	res.send(movie);
});

app.post("/movies", (req, res) => {
	//inner data for the object
	const lastIndex = movies.length - 1;
	const id = movies[lastIndex].id + 1;
	const judul = req.body.judul;
	const tahun = req.body.tahun;

	//to call those vars in 1 call
	const movie = { id, judul, tahun };

	//to push those new vars into 'movies' at global
	movies.push(movie);
	res.send({
		message: "add data success",
		movies
	});
});

//to delete data from [movies]
app.delete("/movies/:id", (req, res) => {
	const targetToDelete = req.params.id;

	let newMovies = movies.filter(item => item.id != targetToDelete);

	movies = newMovies;

	res.send({
		message: "delete success",
		movies
	});
});

//update [movies]
app.put("/movies/:id", (req, res) => {
	// const targetToUpdate = movies.findIndex(data=>data.id == req.params.id)
	// console.log(targetToUpdate)
	movies.map(data => {
		if (data.id == req.params.id) {
			data.judul = req.body.judul;
		}
	});
	res.send({
		message: "update success",
		movies
	});
});

// setup server to listen on port :3000
app.listen(port, () => console.log("Express server is ready on localhost: " + port));
