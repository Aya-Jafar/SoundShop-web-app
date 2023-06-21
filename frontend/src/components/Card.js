import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import baseUrl from "../urls";


export default function Card() {
    const [responseData, setResponseData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch(`${baseUrl}/store/order/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwayI6IjQiLCJjcmVhdGVkIjoiMjAyMy0wNi0yMVQxMTozMzowNy45MDI1MzgifQ.R_LkMCaVMhpn5DflYcVlnWQ-BH6lH-HwvVwiXNVrzd4` ,// Replace <token> with the actual JWT token
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            setResponseData(data);
        })
        .catch(error => {
            console.log('Error:', error);
        });
    };
    console.log(responseData);

    return (
        <div className="row">
        <div className="col-lg-12">
            <div className="box-element">
            <Link className="btn btn-outline-dark" to="/">
                &#x2190; Continue Shopping
            </Link>

            <br />
            <br />
            <table className="table">
                <tr>
                <th>
                    <h5>
                        Items:{" "}
                        <strong>{responseData && responseData.total_qnt}</strong>
                    </h5>
                </th>
                <th>
                    <h5>
                        {/* {
                            !responseData 
                        }?{"$0"} : {responseData.total_price}  */}

                        Total:{" "}
                        <strong>${responseData && responseData.total_price} </strong>
                    </h5>
                </th>

                <th className="checkout-button">
                    <Link to="/checkout" className="btn btn-primary">
                        Checkout
                    </Link>
                </th>
                </tr>
            </table>

            <br />
            <div className="box-element">
                <div className="cart-row">
                <div className="flex-column" style={{ flex: "2" }}></div>
                <div className="flex-column" style={{ flex: "2" }}>
                    <strong>Item</strong>
                </div>
                <div className="flex-column" style={{ flex: "1" }}>
                    <strong>Price</strong>
                </div>
                <div className="flex-column" style={{ flex: "1" }}>
                    <strong>Quantity</strong>
                </div>
                <div className="flex-column" style={{ flex: "1" }}>
                    <strong>Total</strong>
                </div>
                </div>
                <div className="cart-row">
                <div className="flex-column" style={{ flex: "2" }}>
                    <img className="row-image" src="" alt="item" />
                </div>
                <div className="flex-column" style={{ flex: "2" }}>
                    <p>{}</p>
                </div>
                <div className="flex-column" style={{ flex: "1" }}>
                    <p>${}</p>
                </div>
                <div className="flex-column" style={{ flex: "1" }}>
                    <p className="quantity">{}</p>
                    <div className="quantity">
                    <img
                        data-action="add"
                        className="chg-quantity update-cart"
                        src="'images/arrow-up.png'"
                        alt="increase"
                    />
                    <img
                        data-action="remove"
                        className="chg-quantity update-cart"
                        src="'images/arrow-down.png'"
                        alt="decrease"
                    />
                    </div>
                </div>
                <div className="flex-column" style={{ flex: "1" }}>
                    <p>${}</p>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}
