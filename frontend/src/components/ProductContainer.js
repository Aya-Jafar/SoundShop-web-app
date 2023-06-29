import "bootstrap/dist/css/bootstrap.min.css";
import baseUrl from "../urls";


function addToCard(prod_id) {
    console.log(prod_id);

    // fetch(`${baseUrl}/store/add-to-card/`, {
    //     method: "POST",
    //     headers: {
    //         'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //         id: prod_id
    //     }),
    // })
    //     .then((response) => response.json())
    //     .then((data) => console.log(data))
    //     .catch((error) => console.error(error));
}

export default function ProductContainer(props) {
    // console.log(props);

    return (
        <div className="col-lg-4" style={{ textAlign: "left" }}>
        <div className="container" id="prod-section">
            <img
                className="thumbnail"
                src={`${baseUrl}/${props.image}`}
            ></img>
            <div className="box-element">
            <h6 style={{ margin: 0, display: "inline-block" }}>
                <strong>{props.name}</strong>
            </h6>
            <hr />
            <button
                className="btn btn-outline-secondary add-btn update-cart"
                onClick={() => addToCard(props.id)} // Use callback function instead of calling the function directly
            >
                Add to Card
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
