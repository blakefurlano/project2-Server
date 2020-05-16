const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

let credentials = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
let connection = mysql.createConnection(credentials);
connection.connect();

function rowToObject(row){
return {
	id: row.RestaurantID,
	name: row.RestaurantName,
	type: row.RestaurantType,
	link: row.RestaurantGoogleLink,
	image: row.RestaurantIMG,
};
}

app.get('/restraunt/:RestaurantID', (request, response) => {
const query = 'SELECT RestaurantID, RestaurantName, RestaurantType, RestaurantGoogleLink, RestaurantIMG FROM Restaurants WHERE is_deleted = 0 AND RestaurantID = ?';
	const params = [request.params.RestaurantID];
	connection.query(query, params, (error, rows) => {
		response.send({
			ok: true,
			restraunt: rows.map(rowToObject),
		});
	});

});


app.post('/restraunt', (request, response) => {
const query = 'INSERT INTO Restaurants(RestaurantID, RestaurantName, RestaurantType, RestaurantGoogleLink, RestaurantIMG) VALUES (?, ?, ?, ?, ?)';
	const params = [request.body.RestaurantID, request.body.RestaurantName, request.body.RestaurantType, request.body.RestaurantGoogleLink, request.body.RestaurantIMG];
	connection.query(query, params, (error, result) => {
		response.send({
			ok: true,
			id: result.insertId,
		});
	});

});


app.patch('/restraunt/:RestaurantID', (request, response) => {
const query = 'UPDATE Restaurants SET RestaurantName = ?, RestaurantType = ?, RestaurantGoogleLink = ?, RestaurantIMG = ? WHERE RestaurantID = ?';
	const params = [request.body.RestaurantID, request.body.RestaurantName, request.body.RestaurantType, request.body.RestaurantGoogleLink, request.body.RestaurantIMG, request.params.RestaurantID];
	connection.query(query, params, (error, rows) => {
		response.send({
			ok: true,
		});
	});

});


app.delete('/restraunt/:RestaurantID', (request, response) => {
const query = 'UPDATE Restaurants SET is_deleted = 1 WHERE RestaurantID = ?';
	const params = [request.params.RestaurantID];
	connection.query(query, params, (error, rows) => {
		response.send({
			ok: true,
		});
	});

});




const port = 3443;
app.listen(port, () => {
console.log(`We are live on port ${port}!`);

});
