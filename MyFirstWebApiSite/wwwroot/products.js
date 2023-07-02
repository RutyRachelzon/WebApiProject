var cart = [];
//1

//window.addEventListener("load", drowProducts("https://localhost:44335/api/product"));
//window.addEventListener("load", drowCategories());

window.addEventListener("load", drowProductsAndGetCartFromSession("https://localhost:44335/api/product"));
window.addEventListener("load", drowCategories());

async function drowProductsAndGetCartFromSession(url) {
    await removeAllProducts();
    let products = await getProducts(url);
    document.getElementById("minPrice").value = products[0].price;
    document.getElementById("maxPrice").value = products[products.length - 1].price;
    const productsWithQuantity = products.map(createProductWithQuantity);
    productsWithQuantity.forEach(drowProduct);
    document.getElementById("counter").innerHTML = products.length;
    getCartFromSession();
}

const createProductWithQuantity = (product) => {
    const newProduct = {
        productType: product,
        quantity: 1
    }
    return newProduct
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

function drowProduct(Quantityproduct) {
    const product = Quantityproduct.productType;
    const temp = document.getElementsByTagName("template")[0];
    const clon = temp.content.cloneNode(true);
    clon.querySelector("h1").innerText = product.productName;
    clon.querySelector("img").src = "./images/" + product.image;
    clon.querySelector(".price").innerText = product.price;
    clon.querySelector(".description").innerText = product.desc;
    clon.querySelector("button").addEventListener("click", () => addToCart(Quantityproduct));
    document.getElementById("ProductList").appendChild(clon);
}

async function getCartFromSession() {
    const box = sessionStorage.getItem("cart");
    if (box) {
        let cartFromSession = JSON.parse(box);
        cart = cartFromSession;
        let count = 0;
        cart.forEach(product => {
            count += product.quantity;
        })  
        document.getElementById("ItemsCountText").innerHTML = count;
    }
}

let cart = [];

function addToCart(product) {
    let isInCart = false;
    for (let i = 0; i < cart.length; i++) {

        const tmpProduct = cart[i];
        if (tmpProduct.productType.productId === product.productType.productId) {
            isInCart = true;
            tmpProduct.quantity++;
        }
    }
    if (!isInCart) {
        if (sessionStorage.getItem("cart")) {
            const oldCart = sessionStorage.getItem("cart");
            const c = JSON.parse(oldCart);
            cart = c;
        }
        cart.push(product);
        
        
    }
    console.log(cart);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    count = document.getElementById("ItemsCountText");
    count.innerText = parseInt(count.innerText) + 1;
}

function drowCategory(category) {
    let temp = document.getElementsByTagName("template")[1];
    let clon = temp.content.cloneNode(true);
    clon.querySelector(".OptionName").innerText = category.categoryName;
    clon.querySelector(".opt").value = category.categoryId;
    clon.querySelector(".opt").addEventListener("click", filterProducts);
    document.querySelector("#categoryList").appendChild(clon);
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
    await drowProductsAndGetCartFromSession(url);
}