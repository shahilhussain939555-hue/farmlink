let cart = [];

let quantities = {
    egg: 1,
    milk: 1,
    paneer: 1
};

function increaseQty(item){
    quantities[item]++;
    document.getElementById(item + "-qty").innerText = quantities[item];
}

function decreaseQty(item){
    if(quantities[item] > 1){
        quantities[item]--;
        document.getElementById(item + "-qty").innerText = quantities[item];
    }
}

function addToCart(product, price, qty){

    let existing = cart.find(item => item.name === product);

    if(existing){
        existing.qty += qty;
    }else{
        cart.push({
    name: product,
    price: price,
    qty: qty,
    image:
        product === "Fresh Eggs"
        ? "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=500"
        : product === "Pure Milk"
        ? "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500"
        : "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=500"
});
    }

    quantities = {
        egg:1,
        milk:1,
        paneer:1
    };

    document.getElementById("egg-qty").innerText = 1;
    document.getElementById("milk-qty").innerText = 1;
    document.getElementById("paneer-qty").innerText = 1;

    updateCart();
}

function updateCart(){

    const cartItems=document.getElementById("cart-items");
    const totalPrice=document.getElementById("total-price");
    const cartCount=document.getElementById("cart-count");

    cartItems.innerHTML="";

    let total=0;
    let count=0;

    if(cart.length===0){

        cartItems.innerHTML=
        `<p class="empty-cart">
        Your cart is empty.
        </p>`;

        totalPrice.innerText=0;
        cartCount.innerText=0;
        return;
    }

    cart.forEach((item,index)=>{

        total += item.price*item.qty;
        count += item.qty;

         cartItems.innerHTML += `
<div class="cart-card">

    <img src="${item.image}" class="cart-img">

    <div class="cart-info">
        <h3>${item.name}</h3>
        <p>₹${item.price} each</p>
    </div>

    <div class="cart-qty">
        <button onclick="changeQty(${index},-1)">−</button>
        <span>${item.qty}</span>
        <button onclick="changeQty(${index},1)">+</button>
    </div>

    <h2 class="cart-price">₹${item.price * item.qty}</h2>

    <button class="delete-btn" onclick="removeItem(${index})">
        🗑
    </button>

</div>
`;
    });

    totalPrice.innerText=total;
    cartCount.innerText=count;
}
function removeItem(index){
    cart.splice(index,1);
    updateCart();
}

function buyNow(product,price,qty){

    let total = price * qty;

    let message =
`Hello FarmLink!

I want to order

${product}
Quantity : ${qty}

Total : ₹${total}`;

    window.open(
        "https://wa.me/919395556997?text="+encodeURIComponent(message),
        "_blank"
    );
}

function placeOrder(){

    if(cart.length===0){
        alert("Your cart is empty!");
        return;
    }

    let message="Hello FarmLink!\n\nI want to order:\n\n";

    let total=0;

    cart.forEach(item=>{

        message +=
`${item.name}
Quantity : ${item.qty}
Subtotal : ₹${item.price*item.qty}

`;

        total += item.price*item.qty;

    });

    message += `Total Amount : ₹${total}`;

    window.open(
        "https://wa.me/919395556997?text="+encodeURIComponent(message),
        "_blank"
    );
}
function changeQty(index, change){

    cart[index].qty += change;

    if(cart[index].qty <= 0){
        cart.splice(index,1);
    }

    updateCart();
}