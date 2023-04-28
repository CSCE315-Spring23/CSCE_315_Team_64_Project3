
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
const pool = require("./db");

app.use(
  cors(corsOptions)
);

app.use(express.json()); //req.body

app.listen(8000, () => {
    console.log("server has started on port 8000");
});

app.post("/orders", async (req, res) => { //Listening for new orders to be placed
    try {
        const { trans_date, trans_dayofweek, sm_name, trans_price} = req.body;
        console.log(sm_name)
        let trans_id = 0
        await pool.query(
            'SELECT COUNT(*) FROM transactions;',
            (err, res) => {
              if (err) {
                console.error(err);
              } else {
                trans_id = res.rows[0].count + 1;
                console.log(trans_id)
                const query = 'INSERT INTO transactions (trans_id, trans_date, trans_dayofweek, sm_name, trans_size, trans_price, trans_cost) VALUES ($1, $2, $3, $4, $5, $6, $7)';
                const values = [trans_id, trans_date, trans_dayofweek, sm_name, "small", trans_price, trans_price];
                pool.query(query, values);
              }
            }
        );
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

app.post("/inventory", async (req, res) => { //Listening for added inventory items
  try {
      console.log(1)
      const {item_quantitylbs, item_name, item_ppp} = req.body;
      await pool.query(
          'SELECT COUNT(*) FROM items;',
          (err, res) => {
            if (err) {
              console.error(err);
            } else {
              item_id = Number(res.rows[0].count) + 1;

              const query = 'INSERT INTO items (item_id, item_quantitylbs, item_name, item_ppp) VALUES ($1, $2, $3, $4)';
              const values = [item_id, item_quantitylbs, item_name, item_ppp];
              pool.query(query, values);
            }
          }
      );
  } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
  }
});

app.post("/employees", async (req, res) => { //Listening for added inventory items
  try {
      console.log(1)
      const {emp_name, emp_hours, emp_startday, shift_id} = req.body;
      const query = 'INSERT INTO employee (emp_name, emp_hours, emp_startday, shift_id) VALUES ($1, $2, $3, $4)';
      const values = [emp_name, emp_hours, emp_startday, shift_id];
      pool.query(query, values);
    
  } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
  }
});


app.post("/oauth", async (req, res) => {
    const {emailText, passwordText} = req.body
    await pool.query('SELECT * FROM oauth WHERE oauth_email = $1 AND oauth_pass = $2', [emailText, passwordText], 
      (err, res1) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Authentication occurred")
          if (res1.rows.length > 0) {
            res.status(200).json({ message: 'Authentication successful' });
          } else {
            res.status(401).json({ message: 'Invalid credentials' });
          }
          console.log(res1.rows.length)
        }
      }
    );

});

app.post("/inventory/:item_id", async (req, res) => { //Listening to increment inventory items
  try {
      const {item_id, val} = req.body
      await pool.query(
        `UPDATE items SET item_quantitylbs = item_quantitylbs + $1 WHERE item_id = $2`, [val, item_id],
          (err, res) => {
            if (err) {
              console.error(err);
            } else {
              console.log("Incremented successfully")
            }
          }
      );
  } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
  }
});

app.delete("/inventory", async (req, res) => { //Listening for deleted inventory items
  try {
      const {item_id} = req.body
      await pool.query(
          'DELETE FROM items WHERE item_id = $1', [item_id], 
          (err, res) => {
            if (err) {
              console.error(err);
            } else {
              console.log("Item deleted successfully")
            }
          }
      );
  } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
  }
});

app.get("/smoothies", async (req, res) => { //retrieving the smoothies in the database. Called when the customer and server pages are loaded. 
  res.set('Access-Control-Allow-Origin', '*');
  try {
    const allSmoothies = await pool.query("SELECT * FROM smoothies;");
    res.json(allSmoothies.rows);
  } catch (err) {
    console.error("ERROR GETTING SMOOTHIES");
  }
});

app.get("/inventory", async (req, res) => { //Loading in the inventory, in the manager side
  res.set('Access-Control-Allow-Origin', '*');
  try {
    const allItems = await pool.query("SELECT * FROM items;")
    res.json(allItems.rows);
  } catch (err) {
    console.error("ERROR GETTING ITEMS");
  }
});

app.get("/employees", async (req, res) => { //Loading in the employee, in the manager side
  res.set('Access-Control-Allow-Origin', '*');
  try {
    const allItems = await pool.query("SELECT * FROM employee;")
    res.json(allItems.rows);
  } catch (err) {
    console.error("ERROR GETTING EMPLOYEES");
  }
});

app.post("/salesreport", async (req, res) => { //Loading in the employee, in the manager side
  res.set('Access-Control-Allow-Origin', '*');
  const {startDate, endDate, type} = req.body
  let allItems = null
  console.log(type)
  if (Number(type)==1) {
    allItems = await pool.query("SELECT sm_name, COUNT(*) as count FROM transactions WHERE trans_date BETWEEN $1 AND $2 GROUP BY sm_name ORDER BY count DESC;", 
    [startDate, endDate]);
  } else {
    allItems = await pool.query("SELECT sm_name, COUNT(*) as count FROM transactions WHERE trans_date BETWEEN $1 AND $2 GROUP BY sm_name ORDER BY count ASC;", 
    [startDate, endDate]);
  }
  res.json(allItems.rows);

});



