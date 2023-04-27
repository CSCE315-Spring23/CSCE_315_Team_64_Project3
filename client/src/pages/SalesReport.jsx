import './pages.css';
import MainLayout from '../layouts/MainLayout';
import NavbarComp from '../components/NavbarComp';
// bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useRef, useState} from 'react';
import { Form, Button, Table } from "react-bootstrap";

function SalesReport() {
  const [best, setBest] = useState([{ Item: "Item", Sales: "0.0" }, { Item: "Item", Sales: "0.0" }, { Item: "Item", Sales: "0.0" }]);
  const [worst, setWorst] = useState([{ Item: "Item", Sales: "0.0" }, { Item: "Item", Sales: "0.0" }, { Item: "Item", Sales: "0.0" }]);

  {/* Add the google translate element to the document */}
  function addTranslateScript() {
    var addScript = document.createElement("script");
      addScript.setAttribute(
        "src",
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      );
      document.body.appendChild(addScript);
      window.googleTranslateElementInit = googleTranslateElementInit;
  };

  {/* Create google translate element and initialize it to english */}
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false
      },
      "google_translate_element"
    );
  };

  {/* Add google translate script upon mounting */}
  const useMountEffect = (fun) => useEffect(fun, [])
  {
    useMountEffect(addTranslateScript);
  }

  return (
    <MainLayout>
      <div id="google_translate_element"></div>
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
    </MainLayout>
  );
}

export default SalesReport;