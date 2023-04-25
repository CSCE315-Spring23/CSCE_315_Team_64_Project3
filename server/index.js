
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

//ROUTES//

//create an order

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

app.post("/inventory/:item_id", async (req, res) => { //Listening for added inventory items
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

app.get("/smoothies", async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  try {
    const allSmoothies = await pool.query("SELECT * FROM smoothies;");
    res.json(allSmoothies.rows);
  } catch (err) {
    console.error("ERROR GETTING SMOOTHIES");
  }
});

app.get("/inventory", async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  try {
    const allItems = await pool.query("SELECT * FROM items;")
    res.json(allItems.rows);
  } catch (err) {
    console.error("ERROR GETTING ITEMS");
  }
});


