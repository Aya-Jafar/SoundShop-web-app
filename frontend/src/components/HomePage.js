
import ImageSlider from "./ImageSlider";
import { useState, useEffect } from 'react'
import ProductContainer from "./ProductContainer";
import pic3 from './copy1.png'

const textStyle= {
    fontSize: '20px',
    fontWeight: 300,
    lineHeight: 2,
    color: 'rgb(20, 20, 20)',
    textAlign: 'center',
    backgroundColor: '#fff',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
    borderRadius: '7px',

    paddingLeft:'300px',
    paddingRight: '300px',
    paddingTop:'20px',
    paddingBottom: '20px',


}
export default function HomePage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/store/")
            .then((response) => {
                return response.json()
            }).then((result) => {
                setData(result)
            }).catch((e) => console.log(e))
    }, []);
    return (
        <div>
            < ImageSlider slides={data.slice(0, 3)} />
            <br/>

            <div 
                style={{
                    // color:'red',
                    // width:"95%",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '10vh',
                    padding:'150px',
                    backgroundColor: '#f7f7f7',
                    // content: "",
                    position: 'absolute',
                    // background: 'inherit',

                }}>
                    <p style={textStyle}>
                        Welcome to our online store, where you can find a wide variety of high-quality musical instruments at affordable prices.
                        <br />
                        We specialize in selling instruments for all types of musicians, from beginners to professionals.
                        {/* <br /> */}
                        Whether you're a seasoned musician or just starting out, we have everything you need to create your own unique sound. Shop with us today and discover the joy of making music!
                    </p>
               
                
            </div>


            <div className="row">
                {   
                    data.map((product) =>
                        <ProductContainer
                            key={product.id}
                            name={product.name}
                            price={product.price}
                            image={product.image} />
                    )
                }
            </div>


            {/* <section id="about">
                <h2>About</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.</p>
            </section> */}
        </div>
    )
}


