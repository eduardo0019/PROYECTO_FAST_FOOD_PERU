import React from 'react';
import { Link } from 'react-router-dom';

export const Panelmenu = () => {
  return (
    <div id="layoutSidenav_nav">
      <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div className="sb-sidenav-menu">
          <div className="nav">
            {/* ENLACE CORRECTO */}
            <Link className="nav-link" to="/listarmesa">
              <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
              Gestionar Mesas
            </Link>

            {/* ENLACE PARA HORARIOS */}
            <Link className="nav-link" to="/gestionar-horarios">
              <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
              Gestionar Horarios
            </Link>

            {/* ENLACE PARA REPORTES */}
            <Link className="nav-link" to="/reportes">
              <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
              Reportes
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}