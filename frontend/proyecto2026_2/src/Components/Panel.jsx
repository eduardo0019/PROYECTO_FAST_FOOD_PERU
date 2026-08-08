import React from 'react';
import { Outlet } from 'react-router-dom'; // Importa Outlet
import { Panelbarra } from './Panelbarra';
import { Panelmenu } from './Panelmenu';

export const Panel = () => {
  return (
    <div>
      <Panelbarra />
      <div id="layoutSidenav">
        <Panelmenu />
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              {/* Aquí se renderizará el componente hijo (Listarmesa, Horarios, etc.) */}
              <Outlet /> 
            </div>
          </main>
          {/* ... footer ... */}
        </div>
      </div>
    </div>
  );
}