import ImageSlider from "./ImageSlider";
import { useState, useEffect } from "react";
import ProductContainer from "./ProductContainer";
import BASEURL from "../urls";

const textStyle = {
  fontSize: "20px",
  fontWeight: 300,
  lineHeight: 2,
  color: "rgb(20, 20, 20)",
  textAlign: "center",
  backgroundColor: "#fff",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.332)",
  borderRadius: "7px",
  padding: "40px",
};

export default function HomePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${BASEURL}/store`)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setData(result); 
      })
      .catch((e) => console.log(e));
  }, []); // The empty array refers that this Hook will be called only once
  // if we pass some value, it will run whenever that value changes it's state

  return (
    <div>
      <ImageSlider slides={data.slice(0, 3)} />
      <br />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f7f7f7",
          width: "70%",
          margin: "0 auto", // Center horizontally
        }}
      >
        <p style={textStyle}>
          Welcome to our online store, where you can find a wide variety of
          high-quality musical instruments at affordable prices.
          <br />
          We specialize in selling instruments for all types of musicians, from
          beginners to professionals.
          {/* <br /> */}
          Whether you're a seasoned musician or just starting out, we have
          everything you need to create your own unique sound. Shop with us
          today and discover the joy of making music!
        </p>
      </div>

      <div className="row" style={{ marginTop: "20px" }}>
        {data.map((product) => (
          <ProductContainer
            id={product.id}
            key={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
}
