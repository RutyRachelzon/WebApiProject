﻿
window.addEventListener("load", drowProducts("https://localhost:44335/api/product"));
window.addEventListener("load", drowCategories());

async function drowProducts(url) {
    await removeAllProducts();
    const products = await getProducts(url);
    for (i = 0; i < products.length; i++) {
         drowProduct(products[i]);
    }
    document.getElementById("counter").innerHTML = products.length;
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

function drowProduct(product) {
    var temp = document.getElementsByTagName("template")[0];
    var clon = temp.content.cloneNode(true);
    clon.querySelector("h1").innerText = product.productName;
    clon.querySelector("img").src = "./images/" + product.image;
    clon.querySelector(".price").innerText = product.price;
    clon.querySelector(".description").innerText = product.desc;
    clon.querySelector("button").addEventListener("click", () => addToCart(product));
    document.getElementById("ProductList").appendChild(clon);
}

const cart=[];

function addToCart(product) {
    cart.push(product);
    console.log(cart);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    document.getElementById("ItemsCountText").innerHTML = cart.length;
}

function drowCategory(category) {
    var temp = document.getElementsByTagName("template")[1];
    var clon = temp.content.cloneNode(true);
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
    await drowProducts(url);
}