
 
 
 
const alfaka = document.querySelector(`.alfaka`)
const contenedorPlanes = document.querySelector(`#contenedor-cajas-planes`)
const botonAnual = document.querySelector(`#boton-anual`)

function renderizarPlanes(planes){

    planes.forEach(plan => {
            const { tipo, precio, beneficio1, beneficio2, beneficio3} = plan;

    const cajaPlanes = document.createElement(`div`)
    cajaPlanes.classList.add("contenedor-cajas-planes")

    cajaPlanes.innerHTML = ` <div class="caja-planes">
    <h4>${tipo}</h4>
    <p class="precio-planes">${precio}</p>
    <h5>Incluye</h5>
    <p class="beneficios-planes">${beneficio1}</p>
    <p class="beneficios-planes">${beneficio2}</p>
    <p class="beneficios-planes">${beneficio3}</p>

    <button class="boton-planes">Quiero saber mas</button>
</div>`
    


alfaka.appendChild(cajaPlanes)
}) 
}

