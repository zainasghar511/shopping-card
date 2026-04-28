const name = document.querySelector("#name");
const price = document.querySelector("#price");
const img = document.querySelector("#imgurl");
const addbutton = document.querySelector("#addbutton");
const maindiv = document.querySelector("#maindiv");
const bill = document.querySelector("#bill");
const searchitem = document.querySelector("#itemsearch");

let card = JSON.parse(localStorage.getItem("shopping")) || [];

// Initial Load
datacollection();
calculateTotal();

addbutton.addEventListener("click", () => {
    if (name.value === "" || price.value === ""){
       alert("Please enter product name and price") 
       return;
    } 

    const alldata = {
        nameVal: name.value,
        priceval: Number(price.value),
        imgval: img.value,
        qty: 1,
    };
    card.push(alldata);
    
  
    saveToStorage();
    datacollection();
    calculateTotal();

    name.value = ""; price.value = ""; img.value = "";
});

// Search Logic
searchitem.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    const filteritem = card.filter((item) => item.nameVal.toLowerCase().includes(value));
    datacollection(filteritem); 
});

function datacollection(data = card) {
    maindiv.innerHTML = "";

    if (data.length === 0) {
        maindiv.innerHTML = "<h1>No products found!</h1>";
        return; // Function stop here
    }

    data.map((item, index) => {
        const newdiv = document.createElement("div");
        newdiv.innerHTML = `
            <h1>${item.nameVal}</h1>
            <p>subtotal: ${item.priceval * item.qty} Pkr</p>
            <img src="${item.imgval}" style="width:100px; height:auto">
            <div class="qtycontrol">
                <button class="plus">+</button>
                <span>${item.qty}</span>
                <button class="minus">-</button>
            </div>`;

        const remove = document.createElement("button");
        remove.innerText = "remove";
        remove.className ="remove-btn"
        remove.addEventListener("click", () => {
            if(confirm("Are you sure you want to remove this item")){
                card.splice(index,1)
            }
            // using filter
            card = card.filter((el) => el !== item);
            saveToStorage();
            datacollection();
            calculateTotal();
        });

        const plusbtn = newdiv.querySelector(".plus");
        plusbtn.addEventListener("click", () => {
            item.qty++;
            saveToStorage();
            datacollection(); 
            calculateTotal();
        });

        const minusbtn = newdiv.querySelector(".minus");
        minusbtn.addEventListener("click", () => {
            if (item.qty > 0) {
                item.qty--;
                saveToStorage();
                datacollection();
                calculateTotal();
            }
        });

        newdiv.appendChild(remove);
        maindiv.appendChild(newdiv);
    });
}

function calculateTotal() {
    let sum = 0;
    card.forEach((item) => {
        sum += (item.priceval * item.qty);
    });
    bill.innerText = `${sum} PKR`;
}

function saveToStorage() {
    localStorage.setItem("shopping", JSON.stringify(card));
}