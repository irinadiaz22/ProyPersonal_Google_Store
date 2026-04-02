//Seleccionar color
const colorsCar = document.querySelectorAll('input[name="color"]');
let productColor = "black"; // Valor por defecto

colorsCar.forEach(color => {
    color.addEventListener("change", () => {
        productColor = color.value;
    });
}); 

//cantidad de productos
const quantity = document.getElementById("cantidad");
quantity.addEventListener("change", () => {
    const qty = parseInt(quantity.value);
    if (isNaN(qty) || qty < 1) {
        quantity.value = 1;
    } else {
        console.log("Cantidad seleccionada:", qty);
    }
});

//Seleccionar  producto y precio
let currentPrice = "";
let productCar = "";
let precio = 0;

productCar = document.querySelector("h1").textContent;

if (productCar.includes("Pixel Buds Pro")) {
    const priceEarbuds = document.querySelector(".priceEarbuds");
    currentPrice = priceEarbuds.textContent;
}
else{
    const priceWatch = document.querySelector(".priceWatch");  
    currentPrice = priceWatch.textContent;
}
 precio = parseFloat(currentPrice.replace("€", "").trim());

//boton de compra
const button = document.querySelector(".addCompra");

button.addEventListener("click", (e) => {
    e.preventDefault();

    console.log("Producto seleccionado:", productCar);
    console.log("Cantidad seleccionada:", quantity.value);
    console.log("Precio unitario:", currentPrice);
    CalcultarTotal(precio, quantity.value);
   
    agregarAlCarrito(productCar, quantity.value, precio, productColor);
    alert("Producto agregado al carrito");

});

function CalcultarTotal(precio, cantidad) {
    const qty = parseInt(cantidad);
    const price = parseFloat(precio);
    const total = qty * price;
}

//crear objeto de compra
function agregarAlCarrito(producto, cantidad, precio, productColor) {

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const productoExistente = carrito.find(item => item.nombre === producto && item.color === productColor);
    let precioTotal = 0;

    const prod = {
        nombre: producto,
        cantidad: Number(cantidad),
        precioUnitario: precio,
        color: productColor,
        precioTotal: precio * Number(cantidad)
    };

    if (productoExistente) {
        productoExistente.cantidad += prod.cantidad;
        productoExistente.precioTotal += prod.precioTotal; 
        console.log("Producto existente actualizado en el carrito:", productoExistente.precioTotal);
    } else {
        carrito.push(prod);
    }   
   
    localStorage.setItem("carrito", JSON.stringify(carrito));
    console.log("Producto agregado al carrito:", producto);

}



