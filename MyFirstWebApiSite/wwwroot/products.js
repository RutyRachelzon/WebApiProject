var cart = [];


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
        throw Error(`Error😒 you have some problem in status ${response.status}, try again later`)
    }
    else return await response.json();
}

async function drowCategories() {
    const res = await fetch("https://localhost:44335/api/Category");
    if (!res.ok) {
        throw Error(`Error😒 you have some problem in status ${res.status}, try again later`)
    }
    else {
        const categories = await res.json();
        for (i = 0; i < categories.length; i++) {
            drowCategory(categories[i]);
        }
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

function removeAllProducts() {
    var cards = document.getElementById("ProductList");
    if (cards) {
        cards.innerHTML = "";
    }
}

async function filterProducts() {
    let url = "https://localhost:44335/api/product?";
    var name = document.getElementById("nameSearch").value;
    if(name)
    url = url + `name=${name}` 
    var minPrice = document.getElementById("minPrice").value;
    if (minPrice)
    url = url + `&minPrice=${minPrice}`;
    var maxPrice = document.getElementById("maxPrice").value;
    if (maxPrice)
    url = url + `&maxPrice=${maxPrice}`;
    var categories = document.getElementsByClassName("opt");
    for (var i = 0; i < categories.length; i++) {
        if(categories[i].checked)
            url = url + `&categoryIds=${categories[i].value}`;
    }
    console.log(url);
    await drowProductsAndGetCartFromSession(url);
}