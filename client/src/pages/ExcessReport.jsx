import './pages.css';
import MainLayout from '../layouts/MainLayout';
import NavbarComp from '../components/NavbarComp';
// bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useRef, useState} from 'react';
import { Form, Button, Table } from "react-bootstrap";

function ExcessReport() {
  const [hasExcess, setHasExcess] = useState([{ Item: "Item", Quantity: "0" }, { Item: "Item", Quantity: "0" }]);
  const [startDate, setStartDate] = useState("1/1/2020")
  const [endDate, setEndDate] = useState("4/1/2023")

  const changeStartDate = (event) => {
    setStartDate(event.target.value);
    console.log(startDate)
  }

  const changeEndDate = (event) => {
    setEndDate(event.target.value);
  }
  function handleItems() {
  }
  return (
    <MainLayout>
      <div className="App">
        <NavbarComp/>
        <header className="App-header" style={{color: "black"}}>
          
          <h1 class="inv">Excess Report</h1>
          <Form>
            <Form.Group controlId="formStartDate">
                <Form.Label class="product">Start Date:</Form.Label>
                <Form.Control onChange = {changeStartDate} type="text" placeholder="mm/dd/yy" name="startDate" />
            </Form.Group>

            <Form.Group controlId="formEndDate">
                <Form.Label class="product">End Date:</Form.Label>
                <Form.Control onChange = {changeEndDate} type="text" placeholder="mm/dd/yy" name="endDate" />
            </Form.Group>
            <Form.Group>
                <span></span>
            </Form.Group>
            <div class="addButton"></div>
            <Button  onClick = {handleItems} class="btn btn-primary btn-lg btn-block" >
                Query Excess Items
            </Button>
            <div class="addButton"></div>
          </Form>
          <table>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
            </tr>
            {hasExcess.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.Item}</td>
                  <td>{val.Quantity}</td>
                </tr>
              )
            })}
          </table>
        </header>
      </div>
    </MainLayout>
  );
}

export default ExcessReport;