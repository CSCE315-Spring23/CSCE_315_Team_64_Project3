CREATE TABLE items(
    item_id int PRIMARY KEY,
    item_quantitylbs float,
    item_name text,
    item_ppp float
);

CREATE TABLE smoothies(
    sm_id int PRIMARY KEY,
    sm_name text,
    sm_price float,
    sm_ingredients text
);

CREATE TABLE shift(
    shift_id int PRIMARY KEY,
    shift_monstart text,
    shift_monend text,
    shift_tuestart text,
    shift_tueend text,
    shift_wedstart text,
    shift_wedend text,
    shift_thursstart text,
    shift_thursend text,
    shift_fristart text,
    shift_friend text,
    shift_satstart text,
    shift_satend text,
    shift_sunstart text,
    shift_sunend text
);

CREATE TABLE employee(
    emp_name text PRIMARY KEY,
    emp_hours int,
    emp_startday text,
    shift_id int
);

CREATE TABLE transactions(
    trans_id int PRIMARY KEY,
    trans_date text,
    trans_dayofweek text,
    sm_name text,
    trans_size text,
    trans_price float,
    trans_cost float
);

-- pk here is also fk from transactions.... don't know how to do in sql
CREATE TABLE transactions_summary(
    trans_date text PRIMARY KEY,
    transsum_dayofweek text,
    transsum_rev float,
    transsum_expenditures float,
    transsum_profit float
);



