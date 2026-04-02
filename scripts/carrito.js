
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function renderCarrito() {
    const carrito = obtenerCarrito();
    const emptyBox = document.querySelector(".carrito-vacio");
    const carProducts = document.querySelector(".car-products");
    const totalEl = document.querySelector(".tot-carrito-content h3");

    if (!carProducts || !emptyBox || !totalEl) {
        return;
    }

    if (carrito.length === 0) {
        emptyBox.style.display = "flex";
        carProducts.style.display = "none";
        totalEl.textContent = "Total: 0,00 €";
        return;
    }

    emptyBox.style.display = "none";
    carProducts.style.display = "block";
    carProducts.innerHTML = "";

    let total = 0;

    carrito.forEach((item, index) => {
        const productEl = document.createElement("div");
        productEl.className = "cart-item";

        productEl.innerHTML = `
            <br><hr><br>
            <p class="product-name">Producto: ${item.nombre}</p>
            <p class="product-color">Color: ${item.color || "N/A"}</p>
            <p class="product-price">Precio unitario: ${Number(item.precioUnitario).toFixed(2)} €</p>
            <p class="product-qty">Cantidad: ${Number(item.cantidad)}</p>
            <p class="product-subtotal">Subtotal: ${Number(item.precioTotal).toFixed(2)} €</p>
        `;

        const removeBtn = document.createElement("button");
        removeBtn.className = "remove-product";
        removeBtn.textContent = "Eliminar";
        removeBtn.style.marginTop = "10px";
        removeBtn.style.padding = "5px 10px";
        removeBtn.style.backgroundColor = "#ff4d4d";
        removeBtn.style.color = "#fff";
        removeBtn.style.border = "none";
        removeBtn.style.borderRadius = "5px";
        removeBtn.style.cursor = "pointer";
        removeBtn.addEventListener("click", () => {
            carrito.splice(index, 1);
            guardarCarrito(carrito);
            renderCarrito();
        });
        
        carProducts.appendChild(productEl);
        productEl.appendChild(removeBtn);
        
        total += Number(item.precioTotal);
    });

    totalEl.textContent = `Total: ${total.toFixed(2)} €`;
}

const pagarBtn = document.querySelector(".checkout-btn");
if (pagarBtn) {
    pagarBtn.addEventListener("click", () => {
        alert("Gracias por tu compra.");
        localStorage.removeItem("carrito");
        renderCarrito();
        
    });
}

document.addEventListener("DOMContentLoaded", renderCarrito);