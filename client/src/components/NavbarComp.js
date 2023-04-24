import {Link} from 'react-router-dom'
export default function Navbar() {
  return (
    <div class="nav_container">
      <nav class="navbar navbar-light bg-light">
  <form class="container-fluid justify-content-start">
    <Link to='/man' class="btn btn-outline-success me-2" type="button">Inventory</Link>
    <Link to='/emp' class="btn btn-outline-success me-2" type="button">Employees</Link>
    <button class="btn btn-outline-success me-2" type="button">Sales Report</button>
    <button class="btn btn-outline-success me-2" type="button">Restock Items</button>
    <button class="btn btn-outline-success me-2" type="button">Excess Items</button>
    <button class="btn btn-outline-success me-2" type="button">X Report</button>
    <button class="btn btn-outline-success me-2" type="button">Z Report</button>
    <button class="btn btn-outline-success me-2" type="button">Log Out</button>
  </form>
</nav>
    </div>
  )
}