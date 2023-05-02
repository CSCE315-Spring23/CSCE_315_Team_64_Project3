import './pages.css';
import MainLayout from '../layouts/MainLayout';
import NavbarComp from '../components/NavbarComp';
// bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useRef, useState} from 'react';
import { Form, Button, Table } from "react-bootstrap";

function ExcessReport() {
  const [hasExcess, setHasExcess] = useState([{ Item: "Item", Quantity: "0" }, { Item: "Item", Quantity: "0" }]);

  async function handleItems() {
    try {
      const response = await fetch("http://localhost:8000/excess", {
        method : "GET",
        headers: { 'Content-Type': 'application/json' },
      });
      const jsonData = await response.json()
      setHasExcess(jsonData)
      console.log(jsonData)
    } catch (err) {
      console.log(err.message)
    }
  }


  return (
    <MainLayout>
      <div className="App">
        <NavbarComp/>
        <header className="App-header" style={{color: "black"}}>
          
          <h1 class="inv">Excess Report</h1>
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