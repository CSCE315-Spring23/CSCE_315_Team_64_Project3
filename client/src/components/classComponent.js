import { Form, Button, Table } from "react-bootstrap";
import { createRef, Component } from 'react';
import './comp.css';


export default class AddInventory extends Component{
    constructor() {
        super();
        this.state = {
            products: []
        }
        this.formData = createRef();
    }8
    
    // addproduct handler method
    add = (event) => {
        event.preventDefault();
        //console.log(formData.current)
        const newProduct = {
            product_name: this.formData.current.product_name.value,
            price: this.formData.current.price.value,
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
                        <Form.Label class="product">Product Name:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Item Name" name="product_name" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPrice">
                        <Form.Label class="product">Price:</Form.Label>
                        <Form.Control type="decimal" placeholder="Price in USD" name="price" />
                    </Form.Group>

                    <Form.Group controlId="formBasicQty">
                        <Form.Label class="product">Quantity:</Form.Label>
                        <Form.Control type="decimal" placeholder="How many: qty (lbs.)" name="qty" />
                    </Form.Group>
                    <Form.Group>
                        <span></span>
                    </Form.Group>
                    <div class="addButton"></div>
                    <Button  class="btn btn-primary btn-lg btn-block" variant="primary" type="submit">
                        Add to Inventory
            </Button>
            <div class="addButton"></div>
                </Form>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            {/* <th>Index</th> */}
                            <th class="product2">Product Name:</th>
                            <th class="product2">Price</th>
                            <th class="product2">Qty</th>
                            <th class="product2">Options</th>
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
                                        <td>{item.qty}</td>
                                        <td class="spacer">
                                            <Button onMouseEnter={(this.changeBackground)} onMouseLeave={(this.changeAddBack)} variant="success" onClick={event => this.increQty(event)} value={index}>+</Button>
                                            <Button onMouseEnter={(this.changeBackground)} onMouseLeave={(this.changeSubBack)} variant="danger" onClick={event => this.decreQty(event)} value={index}>-</Button>
                                            <Button onMouseEnter={(this.changeBackground)} onMouseLeave={(this.changeSubBack)} variant="danger" onClick={event => this.delVal(event)} value={index}>Delete</Button>
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