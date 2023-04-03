-- shows all contents of all tables
SELECT * FROM items LIMIT 10;
SELECT * FROM smoothies LIMIT 10;
SELECT * FROM employee LIMIT 10;
SELECT * FROM shift LIMIT 10;
SELECT * FROM transactions LIMIT 10;
SELECT * FROM transactions_summary LIMIT 10;

-- query, that will also be used by manager, to view total revenue (for year)
SELECT SUM(transsum_rev) FROM transactions_summary;

-- used by manager, to view overall expenditures (for year)
SELECT SUM(transsum_expenditures) FROM transactions_summary;

-- another query, used by manager, to view overall profit (for year)
SELECT SUM(transsum_profit) FROM transactions_summary;

-- another query, used by manager, to view average profit per day
SELECT AVG(transsum_profit) FROM transactions_summary;

-- manager or clerk query, check inventory of straws
-- CREATE VIEW strawcount AS 
-- SELECT item_id, item_quantitylbs, item_name, item_ppp
-- FROM items
-- WHERE (item_id = 71);
SELECT * FROM strawcount; -- made a view that shows the straw count instance

-- REDO
-- manager or clerk, query the instances of game day in sales
-- CREATE VIEW gamedays AS 
-- SELECT trans_date, transsum_dayofweek, transsum_rev, transsum_expenditures, transsum_profit
-- FROM transactions_summary
-- WHERE transsum_rev > 6000.0;
SELECT * FROM gamedays;

-- manager or clerk, view of all ingredients and misc items in inventory (unless there is none left!)
-- CREATE VIEW allitems AS
-- SELECT item_name
-- FROM items
-- WHERE item_quantitylbs > 0;
SELECT * FROM allitems;

-- manager or clerk, view of all ingredients that are close to running out (<= 100)
-- CREATE VIEW lowitems AS
-- SELECT item_name
-- FROM items
-- WHERE item_quantitylbs <= 100;
SELECT * FROM lowitems;

-- manager or clerk, view of all names of employees
-- CREATE VIEW allemployeenames AS
-- SELECT emp_name
-- FROM employee
-- WHERE emp_hours > 0;
SELECT * FROM allemployeenames;

-- REDO
-- manager or clerk, view of the paste 52 weeks of data
-- CREATE VIEW allweeks AS
-- SELECT trans_date
-- FROM transactions_summary
-- WHERE transsum_rev > 0;
SELECT * FROM allweeks;

-- proof that there is 52 weeks of data
SELECT (COUNT(trans_date) / 7) FROM transactions_summary;

-- joins...
SELECT * FROM employee NATURAL JOIN shift;
SELECT * FROM items NATURAL JOIN smoothies;
SELECT * FROM transactions NATURAL JOIN transactions_summary;

-- does just list all employees bc all employees have shifts in shift entity, but still correct
SELECT employee.shift_id, employee.emp_name
FROM employee
INNER JOIN shift ON employee.shift_id = shift.shift_id;

-- left join (bc its essentially the same as above, it looks the same, but it's still correct)
-- and also lists employees in alphabetical order
SELECT employee.shift_id, employee.emp_name
FROM employee
LEFT JOIN shift ON employee.shift_id = shift.shift_id
ORDER BY employee.emp_name;

-- union cus y not, union of both tables by id, id in numerical order
-- actually just shows how many shift types there are lol
SELECT shift_id FROM employee
UNION
SELECT shift_id FROM shift
ORDER BY shift_id;










