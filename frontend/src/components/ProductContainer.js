import "bootstrap/dist/css/bootstrap.min.css";

function addToCard(prod_id, qnt) {
    const data = {
        product_id: prod_id,
        qnt: qnt,
    };
    console.log(data);

    // fetch("http://127.0.0.1:20000/store/add-to-card/", {
    //     method: "POST",
    //     headers: {
    //     "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    // })
    //     .then((response) => response.json())
    //     .then((data) => console.log(data))
    //     .catch((error) => console.error(error));
}

export default function ProductContainer(props) {
    return (
        <div className="col-lg-4" style={{ textAlign: "left" }}>
        <div className="container" id="prod-section">
            <img
            className="thumbnail"
            src={"http://127.0.0.1:20000" + props.image}
            ></img>
            <div className="box-element">
            <h6 style={{ margin: 0, display: "inline-block" }}>
                <strong>{props.name}</strong>
            </h6>
            <hr />
            <button
                className="btn btn-outline-secondary add-btn update-cart"
                onClick={addToCard(props.key, 1)}
            >
                Add to Cart
            </button>
            {/* <a className="btn btn-outline-success" href="#">View</a> */}
            <h4 style={{ display: "inline-block", float: "right" }}>
                <strong>${props.price}</strong>
            </h4>
            </div>
        </div>
        </div>
    );
}
