import React from 'react'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';





export default function Navegacion() {
  return (
    <div>

        <div class="container mb-5">
 
    <header class="d-flex flex-wrap py-3 mb-5 border-bottom">
  
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <div class="container">
          <a class="navbar-brand" href="#">Mi Proyecto</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
  
              <li class="nav-item">
                <Link to="/">
                <a class="nav-link" href="" ariaCurrentWhenActive="page">Home</a>   
                 </Link>                
              </li>
  
              <li class="nav-item">
                <Link to="/nosotros">
                <a class="nav-link" aria-current="page"  href="">Nosotros</a>                    
                </Link>
              </li>
			   <li class="nav-item">
                <Link to="/servicios">
                <a class="nav-link" aria-current="page"  href="">Servicios</a>                    
                </Link>
              </li>
  
              <li class="nav-item">
                <Link to="/contacto">
                <a class="nav-link" aria-current="page"  href="">Contacto</a>                    
                </Link>
              </li>

              <li class="nav-item">
                <Link to="/Login">
                <a class="nav-link" aria-current="page"  href="">Login</a>                    
                </Link>
              </li>
  
            
  
            </ul>
          </div>
        </div>
      </nav>
  
    </header>
  </div>








    </div>
  )
}
