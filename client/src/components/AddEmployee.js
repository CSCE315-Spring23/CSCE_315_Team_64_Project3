import { Form, Button, Table } from "react-bootstrap";
import { createRef, Component } from 'react';
import './comp.css';


export default class AddEmployee extends Component{
    constructor() {
        super();
        this.state = {
            products: []
        }
        this.fetchEmployees()
    }

    fetchEmployees = async() => {
        try {
          const response = await fetch("http://localhost:8000/inventory")
          const jsonData = await response.json()
          this.setState({
            products: jsonData
          });
        } catch (err) {
          console.log(err.message)
        }
    }
    
    // addproduct handler method
    add = (event) => {
        event.preventDefault();
        //console.log(formData.current)
        const newProduct = {
            product_name: this.formData.current.product_name.value,
            price: this.formData.current.price.value,
            age: this.formData.current.age.value,
            qty: Number(this.formData.current.qty.value)
        }
        // add a new product inside products array
        this.state.products.push(newProduct);
        this.setState({
            products: this.state.products
        });
        //console.log(products);
    }
    // increment qty value by 1
    increQty = (event) => {
        //console.log(event.target.value)
        const indexOfArray = event.target.value;
        this.state.products[indexOfArray].qty = this.state.products[indexOfArray].qty + 1;
        this.setState({
            products: this.state.products
        });
    }
    // decrement qty value by 1
    decreQty = (event) => {
        const indexOfArray = event.target.value;
        if (this.state.products[indexOfArray].qty == 0) {
            return;
        }
        this.state.products[indexOfArray].qty = this.state.products[indexOfArray].qty - 1;
        this.setState({
            products: this.state.products
        });
    }
    delVal = (event) => {
        const indexOfArray = event.target.value;
        delete this.state.products[indexOfArray];
        
        this.setState({
            products: this.state.products
        });
    }

    changeBackground(e) {
        e.target.style.background = 'grey';
    }
    changeAddBack(e) {
        e.target.style.background = 'green';
    }
    changeSubBack(e) {
        e.target.style.background = 'red';
    }


    render() {
        return (
            <div>
                <Form onSubmit={this.add} ref={this.formData}>
                    <Form.Group controlId="formBasicProductName">
                        <Form.Label class="product">Name:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Employee Name" name="product_name" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPrice">
                        <Form.Label class="product">Hours:</Form.Label>
                        <Form.Control type="decimal" placeholder="Hours Worked" name="price" />
                    </Form.Group>

                    <Form.Group controlId="formBasicQty">
                        <Form.Label class="product">Age:</Form.Label>
                        <Form.Control type="decimal" placeholder="Employee Age" name="age" />
                    </Form.Group>
                    <Form.Group controlId="formBasicQty">
                        <Form.Label class="product">Shift:</Form.Label>
                        <Form.Control type="decimal" placeholder="Shift" name="qty" />
                    </Form.Group>
                    <Form.Group>
                        <span></span>
                    </Form.Group>
                    <div class="addButton"></div>
                    <Button  class="btn btn-primary btn-lg btn-block" variant="primary" type="submit">
                        Add to Employees
            </Button>
            <div class="addButton"></div>
                </Form>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            {/* <th>Index</th> */}
                            <th class="product2">Name:</th>
                            <th class="product2">Hours</th>
                            <th class="product2">Age</th>
                            <th class="product2">Shift</th>
                            <th class="product2">View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.products.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        {/* <td>{index}</td> */}
                                        <td>{item.product_name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.age}</td>
                                        <td>{item.qty}</td>
                                        <td class="spacer">
                                            <Button onMouseEnter={(this.changeBackground)} onMouseLeave={(this.changeSubBack)} variant="danger" onClick={event => this.delVal(event)} value={index}>Delete</Button>

                                            <Button onMouseEnter={(this.changeBackground)} onMouseLeave={(this.changeSubBack)} variant="danger" onClick={event => this.delVal(event)} value={index}>Select</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        )
    }

}