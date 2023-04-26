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
import XReport from './pages/XReport';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/pos" element={<POSPage/>} />
        <Route path="/customer" element={<CustomerPage/>} />
        <Route path="/man" element={<Inventory/>} />
        <Route path="/emp" element={<Employee/>} />
        <Route path="/xrep" element={<XReport/>} />
      </Routes>
    </Router>
  );
}

export default App;
