DROP TABLE IF EXISTS Restaurants;
DROP TABLE IF EXISTS Restraunts;
CREATE TABLE Restaurants(
	RestaurantID SERIAL PRIMARY KEY, 
	RestaurantName TEXT,
	RestaurantType TEXT,
	RestaurantGoogleLink TEXT,
	RestaurantIMG TEXT,
	is_deleted INT DEFAULT 0
);
