import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import BASEURL from "../urls";


export default function CardData() {
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
    };

    return { responseData , items }
}

module.exports = {
  // Other configuration options...

    module: {
        rules: [
        {
            test: /\.css$/,
            use: [
            // Existing CSS loaders
            // ...
            {
                loader: 'css-loader',
                options: {
                // Other options
                sourceMap: false, // Disable source map generation
                },
            },
            ],
        },
        // Other rules
        // ...
        ],
    },

  // Other configuration options...
};
