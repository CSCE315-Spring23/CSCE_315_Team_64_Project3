import React from 'react'
import {Link} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MainLayout({children}) {
  return (
    <div>
    <header>
      <nav className="navbar navbar-light bg-secondary">
        <div className="container">
          <img src="https://skprod.objects.frb.io/images/static/smoothie-king-logo.svg"className="smoothie-logo" />
          <Link to="/" className="navbar-brand">Back to Login</Link>
        </div>
      </nav>
    </header>
    <main>
      <div className='container mt-3'>
        {children}
      </div>
      <ToastContainer/>
    </main>
  </div>
  )
}

export default MainLayout