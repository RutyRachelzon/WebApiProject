//window.addEventListener("load", getAndDrowProduct);

//function getCartFromSession() {
//    var cart = sessionStorage.getItem("cart");
//    if (cart) {
//        cart = JSON.parse(cart);
//        return cart;
//    }
//    return null;
//}
//function saveCartToSessionStorsge(myCart) {
//    sessionStorage.setItem("cart", JSON.stringify(myCart));
//}

//function getAndDrowProduct() {
//    const cart = getCartFromSession();
//    drowAllCart(cart);
//}

//function totalCart(cart) {
//    var sum = 0;
//    cart.forEach(product => {
//        sum += product.price;
//    })
//    return sum;
//}
//function drowAllCart(cart) {
//    document.getElementById("itemCount").innerHTML = cart.length;
//    document.getElementById("totalAmount").innerHTML = totalCart(cart);
//    cart.forEach((product,i)=>{
//        drowProduct(product,i)
//    });


//}
//function drowProduct(product, i) {
//    var temp = document.getElementsByTagName("template")[0];
//    var clon = temp.content.cloneNode(true);
//    console.log(`url(./images/${product.image})`);
//    clon.querySelector(".image").style.backgroundImage = `url(./images/${product.image})`;
//    clon.querySelector(".itemName").innerHTML = product.productName;
//    clon.querySelector(".price").innerHTML = product.price;
//    clon.querySelector(".showText").addEventListener("click", () => removeProduct(i))
//    document.querySelector("#tbodyItems").appendChild(clon);

//}

//function removeAllProducts() {
//    document.getElementById("tbodyItems").innerHTML="";
//}

//function removeProduct(i) {
//    removeAllProducts();
//    const myCart = getCartFromSession();
//    myCart.splice(i,1);
//    saveCartToSessionStorsge(myCart);
//    drowAllCart(myCart);


//}
//async function postOrder(order) {
//    const response = await fetch("https://localhost:44335/api/order", {
//        headers: { "Content-type": "application/json" },
//        method: 'POST',
//        body: JSON.stringify(order)
//    });
//    if (response.ok)
//        alert("✌");
//    else {
//        alert("😢");
//    }
//    sessionStorage.setItem("cart", JSON.stringify([]));
//    removeAllProducts();
//}

//function placeOrder() {
//    var cart = getCartFromSession();
//    const order = {
//        "orderId": 0,
//        "date": new Date(),
//        "price": document.getElementById("totalAmount").innerHTML,
//        "userId": 302,
//        "orderItems": []
//    }
//    for (var i = 0; i < cart.length; i++) {
//        var orderItem = {
//            "orderItemId": 0,
//            "orderId": 0,
//            "productId": cart[i].productId,
//            "quantity": 1
//        }
//        order.orderItems.push(orderItem);
//    }
//    postOrder(order);
//}

//refactor
window.addEventListener("load", getAndDrowProduct);

function getUserFromSession() {
    var user = sessionStorage.getItem("user");
    if (user) {
        user = JSON.parse(user);
        return user;
    }
    return null;
}

function getCartFromSession() {
    var cart = sessionStorage.getItem("cart");
    if (cart) {
        cart = JSON.parse(cart);
        return cart;
    }
    return null;
}
function saveCartToSessionStorsge(myCart) {
    sessionStorage.setItem("cart", JSON.stringify(myCart));
}

function getAndDrowProduct() {
    const cart = getCartFromSession();
    drowAllCart(cart);
}

function showCartLength(cart) {
    if (cart) {
        var count = 0;
        cart.forEach(product => {
            count += product.quantity;
        })
        document.getElementById("itemCount").innerHTML = count;
    }
}

function totalCart(cart) {
    var sum = 0;
    cart.forEach(product => {
        sum += product.productType.price * product.quantity;
    })
    return sum;
}
function drowAllCart(cart) {
    showCartLength(cart);
    document.getElementById("totalAmount").innerHTML = totalCart(cart);
    cart.forEach((product, i) => {
        drowProduct(product, i)
    });


}
function drowProduct(product, i) {
    var temp = document.getElementsByTagName("template")[0];
    var clon = temp.content.cloneNode(true);
    console.log(`url(./images/${product.productType.image})`);
    clon.querySelector(".image").style.backgroundImage = `url(./images/${product.productType.image})`;
    clon.querySelector(".itemName").innerHTML = product.productType.productName;
    clon.querySelector(".itemNumber").innerHTML = product.quantity;
    clon.querySelector(".price").innerHTML = product.productType.price * product.quantity;
    clon.querySelector(".showText").addEventListener("click", () => removeProduct(i))
    document.querySelector("#tbodyItems").appendChild(clon);

}

function removeAllProducts() {
    document.getElementById("tbodyItems").innerHTML = "";
}

function removeProduct(i) {
    removeAllProducts();
    const myCart = getCartFromSession();
    if (myCart[i].quantity == 1) {
        myCart.splice(i, 1);
    }
    else {
        myCart[i].quantity--;
    }
    saveCartToSessionStorsge(myCart);
    drowAllCart(myCart);
}
async function postOrder(order) {
    const response = await fetch("https://localhost:44335/api/order", {
        headers: { "Content-type": "application/json" },
        method: 'POST',
        body: JSON.stringify(order)
    });
    if (response.ok)
        alert("✌");
    else {
        alert("😢");
    }
    sessionStorage.setItem("cart", JSON.stringify([]));
    removeAllProducts();
}

function placeOrder() {
    
    var user = getUserFromSession();
    if (!user) {
        window.location.href = "home.html";
    }
    var cart = getCartFromSession();
    if (!cart)
        alert("sorry you didnt buy anything")
    else if (cart.length==0)
        alert("sorry you didnt buy anything")
    else { 
    const order = {
        "orderId": 0,
        "date": new Date(),
        "price": document.getElementById("totalAmount").innerHTML,
        "userId": user.userId,
        "orderItems": []
    }
    for (var i = 0; i < cart.length; i++) {
        var orderItem = {
            "orderItemId": 0,
            "orderId": 0,
            "productId": cart[i].productType.productId,
            "quantity": cart[i].quantity
        }
        order.orderItems.push(orderItem);
    }
    postOrder(order);
}}

