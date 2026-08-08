import React from 'react'

export default function Contacto() {
  return (
    <div>
        <div class="row mb-5">
  <div class="col-md-12 text-center">
    <h1>Contacto</h1>
    <p class="mt-3"> Puedes usar los siguientes medios para contactarnos </p>
  </div>
</div>

<div class="col-md-6 container">

  <h4 class="mb-4">Formulario</h4>
  <form>
    <div class="mb-3">
      <label for="nya" class="form-label txt_negrita">Nombres y Apellidos</label>
      <input type="text" class="form-control" id="nya" aria-describedby="nyaHelp" required/>
      <div id="nyaHelp" class="form-text">Ejemplo: Carlos Torres Rojas</div>
    </div>
    <div class="mb-3">
      <label for="email" class="form-label txt_negrita">Email</label>
      <input type="email" class="form-control" id="email" aria-describedby="emailHelp" required/>
      <div id="emailHelp" class="form-text">Ejemplo: miemail@mail.com</div>
    </div>
    <div class="mb-3">
      <label for="asunto" class="form-label txt_negrita">Asunto</label>
      <input type="text" class="form-control" id="asunto" aria-describedby="asuntoHelp" required/>
      <div id="asuntoHelp" class="form-text">Ejemplo: Solicitud de Compra</div>
    </div>
    <div class="mb-3">
      <label for="mensaje" class="form-label txt_negrita">Mensaje</label>
      <textarea class="form-control" id="mensaje" rows="3" required></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Aceptar</button>
  </form>
</div>


<div class="row container">
<div class="col-sm-6">
  <h4 class="mb-4">Datos de Contacto</h4>
  <div class="mb-3">
    <img src="iconos/house-door.svg" alt="Direcci n" width="32" height="32"/> Av. Lunitas # 386 - Codelandia
  </div>
  <div class="mb-3">
    <img src="iconos/telephone-forward-fill.svg" alt="Tel fono" width="32" height="32"/> 444 4444 | 999 999 999
  </div>
  <div class="mb-3">
    <img src="iconos/envelope.svg" alt="Email" width="32" height="32"/> mail@miproyecto.com
  </div>
  </div>
  <div class="col-sm-6">
  <h4>Redes Sociales</h4>
  <ul class="lrs">
    <li>
      <a href="#">
        <img src="iconos/twitter.svg" title="Twitter" alt="Twitter" width="32" height="32"/>
      </a>
    </li>
    <li>
      <a href="#">
        <img src="iconos/facebook.svg" title="Facebook" alt="Facebook" width="32" height="32"/>
      </a>
    </li>
    <li>
      <a href="#">
        <img src="iconos/youtube.svg" title="YouTube" alt="YouTube" width="32" height="32"/>
      </a>
    </li>
    <li>
      <a href="#">
        <img src="iconos/instagram.svg" title="Instagram" alt="Instagram" width="32" height="32"/>
      </a>
    </li>
    <li>
      <a href="#">
        <img src="iconos/tiktok.svg" title="TikTok" alt="TikTok" width="32" height="32"/>
      </a>
    </li>
    <li>
      <a href="#">
        <img src="iconos/spotify.svg" title="Spotify" alt="Spotify" width="32" height="32"/>
      </a>
    </li>
    <li>
      <a href="#">
        <img src="iconos/whatsapp.svg" title="WhatsApp" alt="WhatsApp" width="32" height="32"/>
      </a>
    </li>
  </ul>


  </div>
</div>


    </div>
  )
}
