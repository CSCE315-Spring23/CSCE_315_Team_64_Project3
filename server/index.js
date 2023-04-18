const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create an order

app.listen(8000, () => {
    console.log("server has started on port 8000");
});

app.post("/orders", async (req, res) => {
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
                pool.end()
              }
            }
        );
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});
