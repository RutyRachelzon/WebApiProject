window.addEventListener("load", getCart);


function getCart(){
    console.log("hhhhh");
    var cart = sessionStorage.getItem("cart");
    if (cart) {
       cart= JSON.parse(cart);
    }
    document.getElementById("itemCount").innerHTML = cart.length;
    document.getElementById("totalAmount").innerHTML = totalCart(cart);
    drowCart(cart);
}

function totalCart(cart) {
    var sum=0;
    cart.forEach(product => {
        sum += product.price;
    })
    return sum;
}

function drowCart() {

}
