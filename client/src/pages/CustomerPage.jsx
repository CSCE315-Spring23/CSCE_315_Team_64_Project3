import React, {useEffect, useRef, useState} from 'react'
import MainLayout from '../layouts/MainLayout'
import axios from "axios"
import { toast } from 'react-toastify';
import { ComponentToPrint } from '../components/ComponentToPrint';
import { useReactToPrint } from 'react-to-print';

function CustomerPage() {

  {/* Define variables */}
  const [smoothieTypes, setSmoothieTypes] = useState(['Feel Energized', 'Get Fit', 'Manage Weight', 'Be Well', 'Enjoy a Treat']);
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState(['Napkins', 'Cups', 'Straws']);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [productType, setProductType] = useState('Be Well');

  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  }

  {/* Get Smoothies from Backend */}
  const fetchProducts = async() => {
    try {
      const response = await fetch("http://localhost:8000/smoothies")
      const jsonData = await response.json()
      setProducts(jsonData)
      console.log(jsonData)
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  {/* Add a smoothie to the customer cart */}
  const addProductToCart = async(product) =>{
    // check if the adding product exist
    let findProductInCart = await cart.find(i=>{
      return i.id === product.id
    });

    {/* Increment the count on the quantity for the smoothie */}
    if(findProductInCart){
      let newCart = [];
      let newItem;

      cart.forEach(cartItem => {
        if(cartItem.id === product.id){
          newItem = {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            totalAmount: cartItem.price * (cartItem.quantity + 1)
          }
          newCart.push(newItem);
        }else{
          newCart.push(cartItem);
        }
      });

      {/* Set the cart and display the update */}
      setCart(newCart);
      toast(`Added ${newItem.name} to cart`,toastOptions)

    {/* Copy over items into a new cart array */}
    }else{
      let addingProduct = {
        ...product,
        'quantity': 1,
        'totalAmount': product.price,
      }
      setCart([...cart, addingProduct]);
      toast(`Added ${product.name} to cart`, toastOptions)
    }

  }

  {/* Remove smoothie from the cart */}
  const removeProduct = async(product) => {
    const newCart = cart.filter(cartItem => cartItem.id !== product.id);
    setCart(newCart);
  }

  const componentRef = useRef();

  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    handleReactToPrint();
  }


  {/* Update the cart total */}
  useEffect(() => {
    let newTotalAmount = 0;
    cart.forEach(icart => {
      newTotalAmount = newTotalAmount + parseInt(icart.totalAmount);
    })
    setTotalAmount(newTotalAmount);
  },[cart])

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

  {/* Main page HTML */}
  return (
    <MainLayout>
    <div id="google_translate_element"></div>
      <h1>Self-Order</h1>
      <div className='row'>
        <div className='col-lg-8'>
          <div className='row'>
            <h2>Smoothie Types</h2>
          </div>
          <div className='row'>
            {isLoading ? 'Loading' : <div className='row'>
              <div className='pos-item px-3 text-center border' onClick={() => setProductType('coffee')}>
                <p>Coffee</p>
              </div>
              <div className='pos-item px-3 text-center border' onClick={() => setProductType('strawberry')}>
                <p>Strawberry</p>
              </div>
              <div className='pos-item px-3 text-center border' onClick={() => setProductType('blueberry')}>
                <p>Blueberry</p>
              </div>
              <div className='pos-item px-3 text-center border' onClick={() => setProductType('greens')}>
                <p>Greens</p>
              </div>
              <div className='pos-item px-3 text-center border' onClick={() => setProductType('mango')}>
                <p>Mango</p>
              </div>
              <div className='pos-item px-3 text-center border' onClick={() => setProductType('raspberry')}>
                <p>Raspberry</p>
              </div>
            </div>}
          </div>
          <div className='row'>
            <h2>{productType} Smoothies</h2>
          </div>
          <div className='row'>
            {isLoading ? 'Loading' : <div className='row'>
              {products.map((product, key) => {
                if (product.sm_type == productType) {
                  return <div key={key} className='col-lg-3 mb-5'>
                    <div className='pos-item px-3 text-center border' onClick={() => addProductToCart(product)}>
                      <p>{product.sm_name}</p>
                      <img src={product.sm_img} className="img-fluid" alt={product.sm_name} />
                      <p>${product.sm_price}</p>
                    </div>
                  </div>
                }
              })}
            </div>}
          </div>
          <div className='row'>
            <h2>Extras</h2>
          </div>
          <div className='row'>
            <div className='pos-item px-3 text-center border'>
              <p>Napkins</p>
            </div>
            <div className='pos-item px-3 text-center border'>
              <p>Cups</p>
            </div>
            <div className='pos-item px-3 text-center border'>
              <p>Straws</p>
            </div>
          </div>
        </div>
        <div className='col-lg-4'>
              <div style={{display: "none"}}>
                <ComponentToPrint cart={cart} totalAmount={totalAmount} ref={componentRef}/>
              </div>
              <div className='table-responsive bg-dark'>
                <table className='table table-responsive table-light table-hover'>
                  <thead>
                    <tr>
                      <td>#</td>
                      <td>Name</td>
                      <td>Price</td>
                      <td>Qty</td>
                      <td>Total</td>
                      <td>Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    { cart ? cart.map((cartProduct, key) => <tr key={key}>
                      <td>{cartProduct.id}</td>
                      <td>{cartProduct.name}</td>
                      <td>${cartProduct.price}</td>
                      <td>{cartProduct.quantity}</td>
                      <td>${cartProduct.totalAmount}</td>
                      <td>
                        <button className='btn btn-danger btn-sm' onClick={() => removeProduct(cartProduct)}>Remove</button>
                      </td>

                    </tr>)

                    : 'No Item in Cart'}
                  </tbody>
                </table>
                <h2 className='px-2 text-white'>Total Amount: ${totalAmount}</h2>
              </div>

              <div className='mt-3'>
                { totalAmount !== 0 ? <div>
                  <button className='btn btn-primary' onClick={handlePrint}>
                    Pay Now
                  </button>

                </div> : 'Please add a product to the cart'

                }
              </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default CustomerPage