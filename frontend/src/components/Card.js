

import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'
// import {getProducts} from './components/HomePage'

export default function Card() {
    // let products = getProducts();




    return (
        <div class="row">
            <div class="col-lg-12">
                <div class="box-element">

                    <Link class="btn btn-outline-dark" to="/">&#x2190; Continue Shopping</Link>

                    <br />
                    <br />
                    <table class="table">
                        <tr>
                            <th><h5>Items: <strong>{ }</strong></h5></th>
                            <th><h5>Total:<strong> ${ }</strong></h5></th>
                            <th>
                                <a style={{float:'right', margin:'5px'}} class="btn btn-success" href="{% url 'checkout' %}">Checkout</a>
                            </th>
                        </tr>
                    </table>


                    <br />
                    <div class="box-element">
                        <div class="cart-row">
                            <div style={{ flex: "2" }}></div>
                            <div style={{ flex: "2" }}><strong>Item</strong></div>
                            <div style={{ flex: "1" }}><strong>Price</strong></div>
                            <div style={{ flex: "1" }}><strong>Quantity</strong></div>
                            <div style={{ flex: "1" }}><strong>Total</strong></div>
                        </div>
                        <div class="cart-row">
                            <div style={{ flex: "2" }}><img class="row-image" src="" /></div>
                            <div style={{ flex: "2" }}><p>{ }</p></div>
                            <div style={{ flex: "1" }}><p>${ }</p></div>
                            <div style={{ flex: "1" }}>
                                <p class="quantity">{ }</p>
                                <div class="quantity">
                                    <img data-action="add" class="chg-quantity update-cart" src="'images/arrow-up.png'" alt="img"/>

                                    <img data-action="remove" class="chg-quantity update-cart" src="'images/arrow-down.png'" alt="img"/>
                                </div>
                            </div>
                            <div style={{ flex: "1" }}><p>${ }</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}