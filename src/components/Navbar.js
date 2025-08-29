import { Link } from "react-router-dom";
import React from 'react'
import About from "./About";


function Navbar(props) {



  return (

   <nav className="navbar navbar-expand-lg bg-body-dark bg-dark" data-bs-theme="dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">TaskManager</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
         <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/About">About</Link>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" onChange={(e) =>{props.onSearchChange(e.target.value)}} type="search" placeholder="Search a category" aria-label="Search"/>
        <button className="btn btn-outline-success" onClick={(e) =>{e.preventDefault();}} disabled type="submit">

<i className="fa-brands fa-searchengin"></i></button>
      </form>
    </div>
  </div>
</nav>
    );
    }

export default Navbar;