window.addEventListener("load", getCart);


function getCart(){
    
    var cart = sessionStorage.getItem("cart");
    if (cart) {
       cart= JSON.parse(cart);
    }
    document.getElementById("itemCount").innerHTML = cart.length;
    document.getElementById("totalAmount").innerHTML = totalCart(cart);
    drowAllCart(cart);
}

function totalCart(cart) {
    var sum=0;
    cart.forEach(product => {
        sum += product.price;
    })
    return sum;
}
function drowAllCart(cart) {
    cart.forEach(product => {
        drowCart(product)
    })
}
function drowCart(product) {
    var temp = document.getElementsByTagName("template")[0];    
    var clon = temp.content.cloneNode(true);
    console.log(`url(./images/${product.image})`);
    clon.querySelector(".image").style.backgroundImage = `url(./images/${ product.image})`;
    clon.querySelector(".itemName").innerHTML = product.productName;
    clon.querySelector(".price").innerHTML = product.price;
    document.querySelector(".cart").appendChild(clon);

}
async function placeOrder() {
    var cart = sessionStorage.getItem("cart");
    if (cart) {
        cart = JSON.parse(cart);
    }
    const response = await fetch("https://localhost:44335/api/order", {
        headers: { "Content-type": "application/json" },
        method: 'POST',
        body:[
        {
        "orderId": 0,
        "date": Date(),
        "price": document.getElementById("totalAmount").innerHTML,
        "userId": 304,

            "orderItems": cart
        }]
    });
    if (response.ok)
        alert("✌");
    else {
        alert("😢");
    }
}