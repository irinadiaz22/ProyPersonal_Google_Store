//Carga del documento
document.addEventListener("DOMContentLoaded", () => {
    console.log("Documento cargado y listo");
});

//Variables globales
const mainImage = document.querySelector(".image-principal img");
const thumbnails = document.querySelectorAll(".galeria-images img");

let selectedColor;   

//Menu desplegable
const menuBtn = document.querySelector(".menu-mobile");
const menuMobile = document.querySelector(".menu-mobile-content");

menuBtn.addEventListener("click", () => {
    menuMobile.classList.toggle("active");
});

//seleccionar producto 
const producto = document.querySelector("h1").textContent;

//seleccionar color del producto e imagenes si es reloj o earbuds
const colors = document.querySelectorAll('input[name="color"]');

colors.forEach(color => {
    color.addEventListener("change", () => {
        selectedColor = color.value;

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
        }
        else {
            if (img.src.includes("pink")) {
                selectedColor = "pink";
            } else if (img.src.includes("yellow")) {
                selectedColor = "yellow";
            } else if (img.src.includes("black")) {
                selectedColor = "black";
            }

            const colorInput = document.querySelector(`input[name="color"][value="${selectedColor}"]`);
            if (colorInput) {
                colorInput.checked = true;
            }

            img.src = `../img/smartwatch/smartwatch_${selectedColor}.png`;
            mainImage.src = img.src;
        }

    });
});


