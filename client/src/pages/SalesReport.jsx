import React, {useEffect, useRef, useState} from 'react';
import { Form, Button, Table } from "react-bootstrap";
import './pages.css';
import NavbarComp from '../components/NavbarComp';
// bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import AddInventory from '../components/classComponent';

function SalesReport() {
  const [best, setBest] = useState([{ Item: "Item", Sales: "0.0" }, { Item: "Item", Sales: "0.0" }, { Item: "Item", Sales: "0.0" }]);
  const [worst, setWorst] = useState([{ Item: "Item", Sales: "0.0" }, { Item: "Item", Sales: "0.0" }, { Item: "Item", Sales: "0.0" }]);

  return (
    <div className="App">
      <NavbarComp/>
      <header className="App-header" style={{color: "black"}}>
      <h1 class="inv">Sales Report</h1>
        <Form>
          <Form.Group controlId="formStartDate">
              <Form.Label class="product">Start Date:</Form.Label>
              <Form.Control type="text" placeholder="mm/dd/yy" name="startDate" />
          </Form.Group>

          <Form.Group controlId="formEndDate">
              <Form.Label class="product">End Date:</Form.Label>
              <Form.Control type="text" placeholder="mm/dd/yy" name="endDate" />
          </Form.Group>
          <Form.Group>
              <span></span>
          </Form.Group>
          <div class="addButton"></div>
          <Button  class="btn btn-primary btn-lg btn-block" variant="primary" type="submit">
              Query Orders
          </Button>
          <div class="addButton"></div>
        </Form>
      <h2 class="inv">Best Selling Items</h2>
        <table>
          <tr>
            <th>Item</th>
            <th>Sales</th>
          </tr>
          {best.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.Item}</td>
                <td>{val.Sales}</td>
              </tr>
            )
          })}
        </table>
      <h2 class="inv">Worst Selling Items</h2>
        <table>
          <tr>
            <th>Item</th>
            <th>Sales</th>
          </tr>
          {worst.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.Item}</td>
                <td>{val.Sales}</td>
              </tr>
            )
          })}
        </table>
      </header>
    </div>
  );
}

export default SalesReport;