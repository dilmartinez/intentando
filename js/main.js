let contenedorProductos = document.getElementById('contenedor-producto')
let contenedorCarrito = document.getElementById('modal-body')

const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const precioTotal = document.getElementById('precioTotal')

let carritoDecompras = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carritoDecompras')){
        carritoDecompras = JSON.parse(localStorage.getItem('carritoDecompras'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', ()=> {
    carritoDecompras.length = 0
    actualizarCarrito()
})

//mostrar productos
function mostrarProductos(){
     stockProductos.forEach((product)=>{
    const div = document.createElement('div')
    div.classList.add('pro')
    div.innerHTML = `
        <img class="product-image" src="${product.img}" alt="">
        <div class="desc">
        <span>${product.nombre}</span>
        <h5>${product.desc}</h5>
        <h4>$ ${product.precio}</h4>
        </div>
        <button id="${product.id}" class="btn btn-outline-danger"><i class="fa-solid fa-cart-shopping"></i></button>
         `
    
    contenedorProductos.appendChild(div)
    let button = document.getElementById(`${product.id}`)
    button.addEventListener("click", ()=>{
        agregarCarrito(product.id)
    })

    })
}
mostrarProductos()

//agregar al carrito
const agregarCarrito = (prodid) => {
    const existe = carritoDecompras.some (prod => prod.id === prodid)

    if (existe){
        const prod = carritoDecompras.map (prod => {
            if (prod.id === prodid){
                prod.cantidad++
            }
        })
    }else{
    const encontrado = stockProductos.find((prod) => prod.id === prodid)
    carritoDecompras.push(encontrado)
    console.log(carritoDecompras)
}
    actualizarCarrito()
}

//eliminar producto del carrito
const eliminarDelCarrito = (prodid) => {
    const item = carritoDecompras.find((prod)=> prod.id === prodid)
    const indice = carritoDecompras.indexOf(item)
    carritoDecompras.splice(indice,1)
    actualizarCarrito()
}

//actualizar el carrito
const actualizarCarrito =()=>{
    contenedorCarrito.innerHTML = ""

   carritoDecompras.forEach((product)=>{
        const div= document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML= `
        <p>${product.nombre}</p>
        <p>Precio: $ ${product.precio}</p>
        <p>Cantidad: <span id="cantidad">${product.cantidad}</p>
        <button onclick="eliminarDelCarrito(${product.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `
        contenedorCarrito.appendChild(div)

        localStorage.setItem('carritoDecompras',JSON.stringify(carritoDecompras))
    })
    contadorCarrito.innerText = carritoDecompras.length
    precioTotal.innerText = carritoDecompras.reduce((acc, prod) => acc + prod.precio, 0)
 }








