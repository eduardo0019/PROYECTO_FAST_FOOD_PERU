import React from 'react'

export default function Inicio() {
  return (
    <div>
        <div class="row">
  <div class="row row-cols-1 text-center mt-5 mb-3">
    <h2>Planes</h2>
  </div>
  <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
    <div class="col">
      <div class="card mb-4 rounded-3 shadow-sm">
        <div class="card-header py-3">
          <h4 class="my-0 fw-normal">Free</h4>
        </div>
        <div class="card-body">
          <h1 class="card-title pricing-card-title">$0 <small class="text-muted fw-light">/mensual</small>
          </h1>
          <ul class="list-unstyled mt-3 mb-4">
            <li>10 usuarios</li>
            <li>2 GB de almacenamiento</li>
            <li>Soporte email</li>
            <li>Acceso al centro de ayuda</li>
          </ul>
          <button type="button" class="w-100 btn btn-lg btn-outline-primary">Elegir</button>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card mb-4 rounded-3 shadow-sm">
        <div class="card-header py-3">
          <h4 class="my-0 fw-normal">Plata</h4>
        </div>
        <div class="card-body">
          <h1 class="card-title pricing-card-title">$15 <small class="text-muted fw-light">/mensual</small>
          </h1>
          <ul class="list-unstyled mt-3 mb-4">
            <li>20 usuarios</li>
            <li>10 GB de almacenamiento</li>
            <li>Soporte email</li>
            <li>Acceso al centro de ayuda</li>
          </ul>
          <button type="button" class="w-100 btn btn-lg btn-primary">Elegir</button>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card mb-4 rounded-3 shadow-sm border-primary">
        <div class="card-header py-3 text-white bg-primary border-primary">
          <h4 class="my-0 fw-normal">Oro</h4>
        </div>
        <div class="card-body">
          <h1 class="card-title pricing-card-title">$29 <small class="text-muted fw-light">/mensual</small>
          </h1>
          <ul class="list-unstyled mt-3 mb-4">
            <li>30 usuarios</li>
            <li>15 GB de almacenamiento</li>
            <li>Soporte email y m vil</li>
            <li>Acceso al centro de ayuda</li>
          </ul>
          <button type="button" class="w-100 btn btn-lg btn-primary">Elegir</button>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="row">
          <div class="row row-cols-1 text-center mt-5 mb-3">
            <h2>Newsletter</h2>
          </div>
          <div class="row">
            <form action="" method="">
              <div class="row justify-content-center">
                <div class="col-lg-6">
                
                  <div class="input-group">
                    <input type="email" class="form-control" id="email" name="email" placeholder="micorreo@mail.com" required/> 
                    <span class="input-group-btn">
                      <button class="btn btn-primary" type="submit">Aceptar</button>
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <hr />
    </div>
  )
}
