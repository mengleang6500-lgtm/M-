document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // CART ELEMENTS
    // =========================

    const cartIcon = document.getElementById("cart-icon");
    const closeCart = document.getElementById("close-cart");
    const cartBox = document.querySelector(".cart");

    const cartContent = document.querySelector(".cart-content");
    const cartCount = document.getElementById("cart-count");
    const totalPrice = document.getElementById("total-price");

    let cartItems = [];


    // =========================
    // OPEN CART
    // =========================

    cartIcon.addEventListener("click", function () {

        cartBox.classList.add("active");

    });


    // =========================
    // CLOSE CART
    // =========================

    closeCart.addEventListener("click", function () {

        cartBox.classList.remove("active");

    });


    // =========================
    // ADD TO CART
    // =========================

    const addCartButtons =
        document.querySelectorAll(".add-cart");


    addCartButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const productBox =
                button.closest(".product-box");


            const title =
                productBox
                    .querySelector(".product-title")
                    .textContent
                    .trim();


            const price =
                parseFloat(
                    productBox
                        .querySelector(".price")
                        .textContent
                        .replace("$", "")
                        .trim()
                );


            const image =
                productBox
                    .querySelector(".product-img")
                    .src;


            const existingProduct =
                cartItems.find(function (item) {

                    return item.title === title;

                });


            if (existingProduct) {

                existingProduct.quantity++;

            } else {

                cartItems.push({

                    title: title,
                    price: price,
                    image: image,
                    quantity: 1

                });

            }


            updateCart();

        });

    });


    // =========================
    // UPDATE CART
    // =========================

    function updateCart() {

        cartContent.innerHTML = "";

        let total = 0;
        let quantity = 0;


        cartItems.forEach(function (item, index) {

            total +=
                item.price * item.quantity;

            quantity +=
                item.quantity;


            const cartItem =
                document.createElement("div");


            cartItem.className =
                "cart-box";


            cartItem.innerHTML = `

                <img
                    src="${item.image}"
                    class="cart-img"
                    alt="${item.title}"
                >

                <div>

                    <h3 class="cart-product-title">
                        ${item.title}
                    </h3>

                    <p class="cart-price">
                        $${item.price.toFixed(2)}
                    </p>

                    <input
                        type="number"
                        min="1"
                        value="${item.quantity}"
                        class="cart-quantity"
                        data-index="${index}"
                    >

                </div>

                <i
                    class="bx bx-trash cart-remove"
                    data-index="${index}">
                </i>

            `;


            cartContent.appendChild(cartItem);

        });


        // CART COUNT

        cartCount.textContent =
            quantity;


        // TOTAL PRICE

        totalPrice.textContent =
            "$" + total.toFixed(2);


        // =========================
        // REMOVE ITEM
        // =========================

        document
            .querySelectorAll(".cart-remove")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(button.dataset.index);


                        cartItems.splice(
                            index,
                            1
                        );


                        updateCart();

                    }
                );

            });


        // =========================
        // CHANGE QUANTITY
        // =========================

        document
            .querySelectorAll(".cart-quantity")
            .forEach(function (input) {

                input.addEventListener(
                    "change",
                    function () {

                        const index =
                            Number(input.dataset.index);


                        let value =
                            parseInt(input.value);


                        if (
                            isNaN(value) ||
                            value < 1
                        ) {

                            value = 1;

                        }


                        cartItems[index].quantity =
                            value;


                        updateCart();

                    }
                );

            });

    }


    // =========================
    // CHECKOUT
    // =========================

    const checkoutButton =
        document.querySelector(".checkout-btn");


    checkoutButton.addEventListener(
        "click",
        function () {

            if (cartItems.length === 0) {

                alert(
                    "Your cart is empty!"
                );

                return;

            }


            alert(
                "Thank you for shopping at M-Mart!"
            );

        }
    );


    // =================================================
    // SEARCH & CATEGORY FILTER
    // =================================================

    const searchInput =
        document.getElementById("search-input");

    const productBoxes =
        document.querySelectorAll(".product-box");

    const categoryButtons =
        document.querySelectorAll(".category-btn");


    let selectedCategory = "all";


    // =========================
    // FILTER FUNCTION
    // =========================

    function filterProducts() {

        const searchText =
            searchInput.value
                .toLowerCase()
                .trim();


        productBoxes.forEach(function (product) {

            const productName =
                product
                    .querySelector(".product-title")
                    .textContent
                    .toLowerCase()
                    .trim();


            const productCategory =
                product.dataset.category;


            const matchesSearch =
                productName.includes(searchText);


            const matchesCategory =
                selectedCategory === "all" ||
                productCategory === selectedCategory;


            if (
                matchesSearch &&
                matchesCategory
            ) {

                product.style.display = "";

            } else {

                product.style.display = "none";

            }

        });

    }


    // =========================
    // SEARCH
    // =========================

    searchInput.addEventListener(
        "input",
        function () {

            filterProducts();

        }
    );


    // =========================
    // CATEGORY BUTTONS
    // =========================

    categoryButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                categoryButtons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add("active");


                selectedCategory =
                    button.dataset.category;


                filterProducts();

            }
        );

    });

});