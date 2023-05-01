import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import POSPage from './pages/POSPage';
import CustomerPage from './pages/CustomerPage';
import Inventory from './pages/Inventory';
import Employee from './pages/Employee';
import SalesReport from './pages/SalesReport';
import XReport from './pages/XReport';
import Menu from './pages/Menu'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/pos" element={<POSPage/>} />
        <Route path="/customer" element={<CustomerPage/>} />
        <Route path="/man" element={<Inventory/>} />
        <Route path="/emp" element={<Employee/>} />
        <Route path="/srep" element={<SalesReport/>} />
        <Route path="/xrep" element={<XReport/>} />
        <Route path="/menu" element={<Menu/>} />
      </Routes>
    </Router>
  );
}

export default App;