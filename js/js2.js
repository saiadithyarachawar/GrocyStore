
document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const shoppingCart = document.querySelector('.shopping-cart');
    const totalElement = shoppingCart.querySelector('.total');
    const itemCountElement = document.querySelector('.fa-shopping-cart');
    let total = 0;
    let itemCount = 0;
    let scrollTimeout;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const productName = this.dataset.name;
            const productPrice = parseFloat(this.dataset.price);
            addToCart(productName, productPrice);
        });
    });

    function addToCart(name, price) {
        total += price;
        itemCount++;
        updateItemCount();

        const cartItem = document.createElement('div');
        cartItem.classList.add('box');
        cartItem.innerHTML = `
  <i class="fas fa-trash delete-item"></i>
  <img src="/Grocy project/images/cart-img-placeholder.png" alt="">
    <div class="content">
      <h3>${name}</h3>
      <span class="price">$${price}/-</span>
      <span class="quantity">qty : 1</span>
    </div>
    `;
        shoppingCart.insertBefore(cartItem, totalElement);
        updateTotal();

        const deleteButton = cartItem.querySelector('.delete-item');
        deleteButton.addEventListener('click', function () {
            const itemPrice = parseFloat(cartItem.querySelector('.price').innerText.slice(1));
            total -= itemPrice;
            itemCount--;
            updateItemCount();
            shoppingCart.removeChild(cartItem);
            updateTotal();
        });
    }

    function updateTotal() {
        totalElement.textContent = `total: $${total.toFixed(2)}/-`;
    }

    function updateItemCount() {
        itemCountElement.textContent = itemCount;
    }

    shoppingCart.addEventListener('scroll', function () {
        shoppingCart.classList.add('scroll-visible');
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            shoppingCart.classList.remove('scroll-visible');
        }, 1000);
    });
});
