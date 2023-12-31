import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import BASEURL from "../urls";
// import CardData from "../api-fetch/card";


export default function Card() {
    // let {responseData , items} = CardData()
    // console.log(responseData, items );

    const [responseData, setResponseData] = useState(null);

    useEffect(() => {
        getCard();
    }, []);

    const getCard = () => {
        fetch(`${BASEURL}/store/order/`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setResponseData(data);
        })
        .catch((error) => {
            console.log("Error:", error);
        });
    };

    const [items, setItemsData] = useState(null);

    useEffect(() => {
        getItems();
    }, []);

    const getItems = () => {
        fetch(`${BASEURL}/store/order-items/`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setItemsData(data);
        })
        .catch((error) => {
            console.log("Error:", error);
        });
    }


    const [checkOutData, setCheckOutData] = useState(null);

    useEffect(() => {
        checkout();
    }, []);

    const checkout = () => {
        fetch(`${BASEURL}/store/checkout/`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            setCheckOutData(data);
        })
        .catch((error) => {
            console.log("Error:", error);
        });
    }

    // console.log(checkOutData);



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
                    <strong>
                        {responseData && responseData.count_order_items}
                    </strong>
                    </h5>
                </th>
                <th>
                    <h5>
                    Total:{" "}
                    <strong>${responseData && responseData.total_price}</strong>
                    </h5>
                </th>

                <th className="checkout-button">
                    <Link to={checkOutData && checkOutData.ZC_url} className="btn btn-primary">
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

                {items &&
                items.map((item) => (
                    <div className="cart-row" key={item.id}>
                    <div className="flex-column" style={{ flex: "2" }}>
                        <div className="image-container">
                        <img
                            className="row-image"
                            src={`${BASEURL}/${item.product_image}`}
                            alt="item"
                        />
                        </div>
                    </div>
                    <div className="flex-column" style={{ flex: "2" }}>
                        <p>{item.product_name}</p>
                    </div>
                    <div className="flex-column" style={{ flex: "1" }}>
                        <p>${item.total}</p>
                    </div>
                    <div className="flex-column" style={{ flex: "1" }}>
                        <div className="quantity">
                        <div>&#9650;</div>
                        <p className="quantity" style={{ marginLeft: "10px" }}>
                            {item.qnt}
                        </p>
                        <div>&#9660;</div>
                        </div>
                    </div>
                    <div className="flex-column" style={{ flex: "1" }}>
                        <p>${item.total}</p>
                    </div>
                    </div>
                ))}
            </div>
            </div>
        </div>
        </div>
    );
}
