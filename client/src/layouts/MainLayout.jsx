import React, {useEffect, useRef, useState} from 'react'
import {Link} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MainLayout({children}) {

  const [weather, setWeather] = useState('');
  const [currTemp, setCurrTemp] = useState(0);
  const [highTemp, setHighTemp] = useState(0);
  const [lowTemp, setLowTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);

  {/* Call weather API once upon mounting */}
  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat=30.628&lon=-96.334&units=imperial&appid=703f1d8f031ba9041b4de2e90e795853')
    xhr.send();
    xhr.onload = () => {
      {/* Set data from API call locally */}
      const data = JSON.parse(xhr.response);
      setWeather(JSON.parse(JSON.stringify(data['weather'][0]))['description']);
      setCurrTemp(JSON.parse(JSON.stringify(data['main']))['temp']);
      setHighTemp(JSON.parse(JSON.stringify(data['main']))['temp_max']);
      setLowTemp(JSON.parse(JSON.stringify(data['main']))['temp_min']);
      setHumidity(JSON.parse(JSON.stringify(data['main']))['humidity']);
      console.log(data)
    };
  }, []);

  return (
    <div>
    <header>
      <nav className="navbar navbar-light bg-secondary">
        <div className="container">
          <img src="https://skprod.objects.frb.io/images/static/smoothie-king-logo.svg"className="smoothie-logo" />
          <h4>Today's weather: {weather}. Humidity: {humidity}. Low/High: {lowTemp}°F / {highTemp}°F. Now: {currTemp}°F.</h4>
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