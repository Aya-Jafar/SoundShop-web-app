
import React from "react";
import { Link, Routes, Route, Navigate } from "react-router-dom"



export default function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-black" style={{ backgroundColor: "black" }}>
            <Link className="navbar-brand" to='/' style={{fontSize:"30px"}}>Sound<em>Shop</em></Link>


            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav mr-auto">


                <li className="navbar-nav">
                    <Link className="nav-link" to='/'>OUR PRODUCTS</Link>
                </li>


                <li className="navbar-nav">
                    <Link className="nav-link" to="/my-card/">MY CARD</Link>
                </li>
                <li className="navbar-nav active">
                    <Link className="nav-link" to="/login/">LOGIN</Link>
                </li>
            </ul>
            </div>

        </nav>
    )
}


