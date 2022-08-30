/*
    Ocultar y mostrar el carrito de compras
 */
const cartIcon = document.querySelector('.cart-icon');
const cartDesign = document.querySelector('.cartDesign');

cartIcon.addEventListener('click', () => {
	cartDesign.classList.toggle('cart_visible');
});
console.log(cartIcon);

/*--CARRITO DE COMPRAS--*/
const cart = document.querySelector('#cart');
const cartList = document.querySelector('#cart-list tbody');
const emptyCartBtn = document.querySelector('#empty-cart');
const ProductList = document.querySelector('#container-cards');

//Array para el carrito de compras
let cartItems = [];
cleanCart();

//Funcion para cargar todos los eventos
cargarEventListener();
function cargarEventListener() {
	//Agregar un producto al carrito
	ProductList.addEventListener('click', agregarCurso);

	cart.addEventListener('click', deleteProduct);

	emptyCartBtn.addEventListener('click', () => {
		cartItems = [];
		cleanCart();
	});
}

//FUNCIONES
//*Agregar al carrito
function agregarCurso(e) {
	e.preventDefault();
	if (e.target.classList.contains('add-cart')) {
		//Traversing para seleccionar la card completa a partir del clik en el boton
		const selectedProduct = e.target.parentElement.parentElement;

		readDataProduct(selectedProduct);
	}
}

//*Eliminar producto del carrito
function deleteProduct(e) {
	if (e.target.classList.contains('delete-card')) {
		const cardID = e.target.getAttribute('data-id');

		//Eliminar producto del arreglo del carrito
		cartItems = cartItems.filter((product) => product.id !== cardID);

		cartHTML(); //Iterar sobre el carrito y mostrar su HTML
	}
}

//*Leer contenido del curso y extraer la informacion del curso
function readDataProduct(card) {
	//Crear objeto con la informacion del curso
	const infoCard = {
		imagen: card.querySelector('img').src,
		titulo: card.querySelector('h4').textContent,
		precio: card.querySelector('.precio').textContent,
		id: card.querySelector('a').getAttribute('data-id'),
		cantidad: 1,
	};

	//Revisa si un elemento ya existe en el carrito
	const exist = cartItems.some((card) => card.id === infoCard.id);

	if (exist) {
		//Actualizamos la cantidad
		const cards = cartItems.map((card) => {
			if (card.id === infoCard.id) {
				card.cantidad++;
				return card;
			} else {
				return card;
			}
		});
		cartItems = [...cards];
	} else {
		//Agregamos el curso a carrito
		//Agrega elementos al arreglo del carrito
		cartItems = [...cartItems, infoCard];
	}

	cartHTML();
}

//*Mostrar el carrito en el HTML
function cartHTML() {
	cleanCart();

	//Iterar el carrito y generar el HTMl
	cartItems.forEach((card) => {
		//Destrucutring del objeto
		const { imagen, titulo, precio, cantidad, id } = card;
		const row = document.createElement('tr');

		row.innerHTML = `
        <td><img src= "${imagen}" width="100"></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
        <a href="#" class="delete-card" data-id="${id}"> X </a>
        </td>


    `;

		cartList.appendChild(row);
	});
}

//*Eliminar los cursos del tbody
function cleanCart() {
	while (cartList.firstChild) {
		cartList.removeChild(cartList.firstChild);
	}
}
