import React from 'react'
import { Panelbarra } from './Panelbarra'
import { Panelmenu } from './Panelmenu'
export const Listarmesa = () => {
  return (
    <div>
<Panelbarra/>
    <div id="layoutSidenav">

    <Panelmenu/>

            <div id="layoutSidenav_content">
                <main>
                    <div class="container-fluid px-4">
                        <h1 class="mt-4">Listar Mesas</h1>
                        
                        
                       
                    </div>
                </main>
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid px-4">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">Copyright &copy; Your Website 2023</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>



    </div>



    </div>
  )
}
