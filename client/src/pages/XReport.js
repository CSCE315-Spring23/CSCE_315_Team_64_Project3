import './pages.css';
import NavbarComp from '../components/NavbarComp';
// bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import AddInventory from '../components/classComponent';
import React from 'react'

 
const data = [
  { Item: "The Hulk", Date: "01/01/2023", Price: "5.5" },
  { Item: "The Gladiator", Date: "01/01/2023", Price: "5.5" },
  { Item: "Protien Plus", Date: "01/01/2023", Price: "7.5"},
]
  
function XReport() {
  return (
    <div className="XReport">
        <NavbarComp/>
        <h1 class="inv">Inventory</h1>
      <table>
        <tr>
          <th>Item</th>
          <th>Date</th>
          <th>Price</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.Item}</td>
              <td>{val.Date}</td>
              <td>{val.Price}</td>
            </tr>
          )
        })}
      </table>
    </div>
  );
}
  
export default XReport;