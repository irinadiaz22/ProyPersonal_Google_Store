//Carga del documento
document.addEventListener("DOMContentLoaded", () => {
    console.log("Documento cargado y listo");
});

//Variables globales
const colors = document.querySelectorAll('input[name="color"]');
const mainImage = document.querySelector(".image-principal img");
const thumbnails = document.querySelectorAll(".galeria-images img");

let selectedColor;   // = colors[0].value;
//thumbnails[0].classList.add("active");

//Menu desplegable
const menuBtn = document.querySelector(".menu-mobile");
const menuMobile = document.querySelector(".menu-mobile-content");

menuBtn.addEventListener("click", () => {
    menuMobile.classList.toggle("active");
});

//seleccionar producto 
const producto = document.querySelector("h1").textContent;

//seleccionar color del producto e imagenes si es reloj o earbuds
colors.forEach(color => {
    color.addEventListener("change", () => {
        selectedColor = color.value;
        console.log("Color seleccionado:", selectedColor);
        console.log(color);

        // Cambiar imagen principal según el color seleccionado
        if (producto.includes("Pixel Buds Pro")) {
            console.log("Producto es Pixel Buds Pro, cambiando imagen principal");
        } else {
            console.log("Producto es Reloj Pro, cambiando color de la imagen principal " + selectedColor);
            mainImage.src = `../img/smartwatch/smartwatch_${selectedColor}.png`;
        }
    });
});

//Seleccion de imagenes principales y miniaturas

thumbnails.forEach(img => {
    img.addEventListener("click", () => {
        if (producto.includes("Pixel Buds Pro")) {
            mainImage.src = img.src;
            // quitar activo anterior
            thumbnails.forEach(i => i.classList.remove("active"));
            // agregar activo
            img.classList.add("active");
            console.log("color seleccionado:", selectedColor);
        }
        else {
            if (img.src.includes("pink")) {
                selectedColor = "pink";
            } else if (img.src.includes("yellow")) {
                selectedColor = "yellow";
            } else if (img.src.includes("black")) {
                selectedColor = "black";
            }
            img.src = `../img/smartwatch/smartwatch_${selectedColor}.png`;
            mainImage.src = img.src;
            console.log("color seleccionado:", selectedColor);
        }

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

//Seleccionar precio del producto
let currentPrice = "";
currentPrice = document.querySelector("h2").textContent;

if (document.getElementById("priceEarbuds")) {
    currentPrice = priceEarbuds.textContent;
    producto = "Google Pixel Buds Pro";
    console.log("Precio de los Google Pixel Buds Pro:", currentPrice);
}
else if (document.getElementById("priceWatch")) {
    currentPrice = priceWatch.textContent;
    producto = "Reloj Pro";
    console.log("Precio del Reloj Pro:", currentPrice);
}


//boton de compra
const button = document.querySelector(".addCompra");

button.addEventListener("click", (e) => {
    e.preventDefault();

    if (selectedColor === null) {
        alert("Por favor, seleccione un color antes de comprar.");
        return;
    }

    console.log("Producto seleccionado:", producto);
    console.log("Botón de compra presionado");
    console.log("Color seleccionado:", selectedColor);
    console.log("Cantidad seleccionada:", quantity.value);
    console.log("Precio unitario:", currentPrice);
    CalcultarTotal();

    console.log("Compra realizada con éxito");
    alert("¡Gracias por tu compra! Has comprado " + quantity.value + " " + producto + " en color " + selectedColor + ". Total a pagar: " + (quantity.value * parseFloat(currentPrice.replace("€", "").trim())).toFixed(2) + " €");
});


function CalcultarTotal() {
    const qty = parseInt(quantity.value);
    const price = parseFloat(currentPrice.replace("€", "").trim());
    const total = qty * price;
    console.log("Total a pagar por " + producto + ":", total + " €");
}


