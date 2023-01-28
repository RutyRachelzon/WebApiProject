var cart = [];
//1

//window.addEventListener("load", drowProducts("https://localhost:44335/api/product"));
//window.addEventListener("load", drowCategories());

//async function drowProducts(url) {
//    await removeAllProducts();
//    const products = await getProducts(url);
//    console.log(products[0].price);
//    document.getElementById("minPrice").value = products[0].price;
//    document.getElementById("maxPrice").value = products[products.length-1].price;

//    console.log(products);
//    for (i = 0; i < products.length; i++) {
//         drowProduct(products[i]);
//    }
//    document.getElementById("counter").innerHTML = products.length;
//    showCartLength();
//}

//async function getProducts(url) {
//    const response = await fetch(url);
//    if (!response.ok) {
//        throw Error(`Error😒 you have some problem in status ${response.status}, try again later`)
//    }
//    else return await response.json();
//}
//1

//refactor 1
window.addEventListener("load", () => {
    drowProducts("https://localhost:44335/api/product");
    drowCategories();
});

async function drowProducts(url) {
    await removeAllProducts();

    try {
        const products = await getProducts(url);
        console.log(products[0].price);
        document.getElementById("minPrice").value = products[0].price;
        document.getElementById("maxPrice").value = products[products.length - 1].price;

        products.forEach(drowProduct);
        document.getElementById("counter").innerHTML = products.length;
        showCartLength();
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

async function getProducts(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error: ${response.status}, try again later`);
    }

    return await response.json();
}
//refactor 1

//2
//async function drowCategories() {
//    const res = await fetch("https://localhost:44335/api/Category");
//    if (!res.ok) {
//        throw Error(`Error😒 you have some problem in status ${res.status}, try again later`)
//    }
//    else {
//        const categories = await res.json();
//        for (i = 0; i < categories.length; i++) {
//            drowCategory(categories[i]);
//        }
//    }
//}

//function drowProduct(product) {
//    var temp = document.getElementsByTagName("template")[0];
//    var clon = temp.content.cloneNode(true);
//    clon.querySelector("h1").innerText = product.productName;
//    clon.querySelector("img").src = "./images/" + product.image;
//    clon.querySelector(".price").innerText = product.price;
//    clon.querySelector(".description").innerText = product.desc;
//    clon.querySelector("button").addEventListener("click", () => addToCart(product));
//    document.getElementById("ProductList").appendChild(clon);
//}

//async function showCartLength() {
//    if (sessionStorage.getItem("cart"));
//    var box = sessionStorage.getItem("cart");
//    if (box) {
//        var cartLen = JSON.parse(box);
//        document.getElementById("ItemsCountText").innerHTML = cartLen.length;
//    }
//}


//function addToCart(product) {
//    if (sessionStorage.getItem("cart")) {
//        var oldCart = sessionStorage.getItem("cart");
//        const c = JSON.parse(oldCart);
//        cart = c;
//    }
//    cart.push(product);
//    console.log(cart);
//    sessionStorage.setItem("cart", JSON.stringify(cart));
//    document.getElementById("ItemsCountText").innerHTML = cart.length;
//}
//2


//refactor2

async function fetchCategories() {
    try {
        const res = await fetch("https://localhost:44335/api/Category");
        const categories = await res.json();
        return categories;
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
}

function drowProduct(product) {
    const temp = document.getElementsByTagName("template")[0];
    const clon = temp.content.cloneNode(true);
    clon.querySelector("h1").innerText = product.productName;
    clon.querySelector("img").src = "./images/" + product.image;
    clon.querySelector(".price").innerText = product.price;
    clon.querySelector(".description").innerText = product.desc;
    clon.querySelector("button").addEventListener("click", () => addToCart(product));
    document.getElementById("ProductList").appendChild(clon);
}

async function renderCategories() {
    try {
        const categories = await fetchCategories();
        categories.forEach(category => drowCategory(category));
    } catch (error) {
        console.error(error.message);
    }
}

let cart = [];

function addToCart(product) {
    cart.push(product);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = sessionStorage.getItem("cart");
    if (!cart) {
        document.getElementById("ItemsCountText").innerHTML = 0;
    } else {
        document.getElementById("ItemsCountText").innerHTML = JSON.parse(cart).length;
    }
}

//initial call to update the cart count
updateCartCount();


//refactor2

//3
//function drowCategory(category) {
//    var temp = document.getElementsByTagName("template")[1];
//    var clon = temp.content.cloneNode(true);
//    clon.querySelector(".OptionName").innerText = category.categoryName;
//    clon.querySelector(".opt").value = category.categoryId;
//    clon.querySelector(".opt").addEventListener("click", filterProducts);
//    document.querySelector("#categoryList").appendChild(clon);
//}

//function removeAllProducts() {
//    var cards = document.getElementById("ProductList");
//    if (cards) {
//        cards.innerHTML = "";
//    }
//}

//async function filterProducts() {
//    let url = "https://localhost:44335/api/product?";
//    var name = document.getElementById("nameSearch").value;
//    if(name)
//    url = url + `name=${name}`
//    var minPrice = document.getElementById("minPrice").value;
//    if (minPrice)
//    url = url + `&minPrice=${minPrice}`;
//    var maxPrice = document.getElementById("maxPrice").value;
//    if (maxPrice)
//    url = url + `&maxPrice=${maxPrice}`;
//    var categories = document.getElementsByClassName("opt");
//    for (var i = 0; i < categories.length; i++) {
//        if(categories[i].checked)
//            url = url + `&categoryIds=${categories[i].value}`;
//    }
//    console.log(url);
//    await drowProducts(url);
//}
//3


//refactor  3
function renderCategory(category) {
    const template = document.getElementsByTagName("template")[1];
    const clone = template.content.cloneNode(true);
    clone.querySelector(".OptionName").innerText = category.categoryName;
    clone.querySelector(".opt").value = category.categoryId;
    clone.querySelector(".opt").addEventListener("click", filterProducts);
    document.querySelector("#categoryList").appendChild(clone);
}

function clearAllProducts() {
    const productCards = document.getElementById("ProductList");
    if (productCards) {
        productCards.innerHTML = "";
    }
}

async function filterProducts() {
    let url = "https://localhost:44335/api/product?";
    const nameSearchValue = document.getElementById("nameSearch").value;
    if (nameSearchValue) {
        url += `name=${nameSearchValue}`;
    }
    const minPriceValue = document.getElementById("minPrice").value;
    if (minPriceValue) {
        url += `&minPrice=${minPriceValue}`;
    }
    const maxPriceValue = document.getElementById("maxPrice").value;
    if (maxPriceValue) {
        url += `&maxPrice=${maxPriceValue}`;
    }
    const categoryElements = document.getElementsByClassName("opt");
    for (let i = 0; i < categoryElements.length; i++) {
        if (categoryElements[i].checked)
            url += `&categoryIds=${categoryElements[i].value}`;
    }
    console.log(url);
    await drowProducts(url);
}



//refactor 3