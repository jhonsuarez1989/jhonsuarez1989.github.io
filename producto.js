function nombrei(){
  let nombreIngresado = prompt("Ingresar Nombre Completo");
  let documento = prompt("Ingresar Numéro de cedula");
  let domicilio = prompt("Ingresar Dirección");
  console.log(nombreIngresado);
  console.log(domicilio);
  console.log(documento);
  alert("Gracias por su compra " + nombreIngresado);
}
const addShopBtn = document.querySelectorAll('.addCart'); /*addShopBtn=addCart "se asigna al btn-primary con la clase addCart que son 9 en total"*/
addShopBtn.forEach((addCartbtn) => { /*forEach, funcion por cada botón*/
  addCartbtn.addEventListener('click', addCartClick); /*se agrega un eventlistener a la funcion addCartClick*/
});

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', nombrei);

const shopCartItem = document.querySelector(
  '.shopCartItem'
); //Variables declaradas de manera global

/**/
function addCartClick(event) {
  const button = event.target;
  const item = button.closest('.item'); /*Se asigna la clase item, al dar click captura todo lo que esta en esa clase, imagen, precio y cantidad por defecto*/
  const itemTitulo = item.querySelector('.item-titulo').textContent; /*se asigna la clase item-titulo para que lo traiga al carrito*/
  const itemPrecio = item.querySelector('.item-precio').textContent; /*se asigna la clase item-precio para que lo traiga al carrito*/
  const itemImagen = item.querySelector('.item-imagen').src; /*se asigna la clase item-imagen para que lo traiga al carrito*/

  addItemCart(itemTitulo, itemPrecio, itemImagen);
}
/*Se asigna los id itemTitulo, itemPrecio, itemImagen*/
function addItemCart(itemTitulo, itemPrecio, itemImagen) {
  const elementsTitle = shopCartItem.getElementsByClassName(
    'shoppingCartItemTitle'
  );
  //Se clea un bucle for para que el contador lo aumente
  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === itemTitulo) {
      let elementQuantity = elementsTitle[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        '.shoppingCartItemQuantity'
      );
      elementQuantity.value++;
      $('.toast').toast('show');
      updateShoppingCartTotal();
      return;
    }
  }

  const shopCart = document.createElement('div'); /*Se ingresa el div en la sección carrito*/
  // En lugar de usar el concatenar con + se utiliza el template (``)"
  const shoppingCartContent = `
  <div class="row shoppingCartItem">
    <div class="col-6">
        <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
            <img src=${itemImagen} class="shopping-cart-image">
            <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitulo}</h6>
        </div>
    </div>
    <div class="col-2">
        <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
            <p class="item-price mb-0 shoppingCartItemPrice">${itemPrecio}</p>
        </div>
    </div>
    <div class="col-4">
        <div
            class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
            <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                value="1">
            <button class="btn btn-outline-primary btnborrar" type="button">X</button>
        </div>
    </div>
  </div>`;
  shopCart.innerHTML = shoppingCartContent;
  shopCartItem.append(shopCart);

  shopCart
    .querySelector('.btnborrar')
    .addEventListener('click', removeShoppingCartItem);

  shopCart
    .querySelector('.shoppingCartItemQuantity')
    .addEventListener('change', quantityChanged);

  updateShoppingCartTotal();
}
function updateShoppingCartTotal() {
  let total = 0;
  const shoppingCartTotal = document.querySelector('.shoppingCartTotal');  //Se ultiza nuevamente el template que resume mas que los +

  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
      '.shoppingCartItemPrice'
    );
    const shoppingCartItemPrice = Number(
      shoppingCartItemPriceElement.textContent.replace('col$', '')
    );
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
      '.shoppingCartItemQuantity'
    );
    const shoppingCartItemQuantity = Number(
      shoppingCartItemQuantityElement.value
    );
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
  });
  shoppingCartTotal.innerHTML = `${total}col$`;
}

function removeShoppingCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest('.shoppingCartItem').remove();
  updateShoppingCartTotal();
}

//función para que el valor no baje de 0 o 1 con <=
function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  updateShoppingCartTotal();
}

function comprarButtonClicked() {
  shopCartItem.innerHTML = '';
  updateShoppingCartTotal();
}
