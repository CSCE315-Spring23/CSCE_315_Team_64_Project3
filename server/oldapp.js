const express = require('express');
const mysql = require('mysql2');

const app = express();
const Pool = require("pg").Pool;


// const connection = mysql.createConnection({
// //   host: '3000',
// //   user: 'csce315331_team_64_master',
// //   password: 'profbigfoot88',
// //   database: 'csce315331_team_64' // arbitrary
//     user: "csce315331_team_64_master",
//     password:"profbigfoot88",
//     host: "csce-315-db.engr.tamu.edu",
//     port:5432,
//     connectTimeout: 90000
// });

const pool = new Pool({
    user: "csce315331_team_64_master",
    password:"profbigfoot88",
    host: "csce-315-db.engr.tamu.edu",
    port:5432,
});

module.exports = pool;

// grab all smoothie items for menu and customer
app.get('/smoothies', (req, res) => {
  connection.query('SELECT * FROM smoothies;', (sm_id, sm_price, sm_ingredients) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});

app.listen(5432, () => {
  console.log('Server started on port 5432');
});