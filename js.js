const name = document.querySelector("#name")
const price = document.querySelector("#price")
const img = document.querySelector("#imgurl")
const addbutton = document.querySelector("#addbutton")
const maindiv = document.querySelector("#maindiv")
const bill = document.querySelector("#bill")
const searchitem = document.querySelector("#itemsearch")
const card = JSON.parse(localStorage.getItem("shopping"))||[]
datacollection();
calculateTotal();
saveAndrefresh();


addbutton.addEventListener("click",()=>{
  
    const alldata={
nameVal:name.value,
priceval: Number(price.value),
imgval : img.value,
billval: bill.value,
qty: 1,
    }
    card.push(alldata);
    datacollection();
    name.value = "";
    price.value = "";
    img.value =  "";
    

})
searchitem.addEventListener("input",(e)=>{
   
    const value = e.target.value.toLowerCase();
    if(value===""){
     datacollection();
        return;
    }
    const filteritem= card.filter((item)=>{
 return
item.nameVal.toLowerCase().includes(value);
    });
    render(filteritem);
});
function render(data){
    maindiv.innerHTML="";
    if(data.length===0){
        maindiv.innerHTML="<h1>No product found</h1>"
          calculateTotal();
        return;
    }
  
}
function datacollection(){
    maindiv.innerHTML = "";
    if(card.length===0){
        maindiv.innerHTML="<h1>Your Card is empty! add some items.</h1>";
calculateTotal();
return;
        }
    card.map((item,index)=>{
const newdiv = document.createElement("div")
newdiv.innerHTML =
`<h1>${item.nameVal}</h1>
<p>subtotal:${item.priceval*item.qty}Pkr</p>
<img src = "${item.imgval}" style:"width:100%; height:auto">

<div class =qtycontrol>
<button class = "plus"><i class="fa-solid fa-cart-plus"></i></button>
<span>${item.qty}</span>
<button class = "minus">-</button>
</div>`;
  //remove item data
  const remove = document.createElement("button")
remove.innerText = "remove"

remove.addEventListener("click",()=>{
card.splice(index,1)

  saveAndrefresh();
  }) 


///plus button data
  const plusbtn = newdiv.querySelector(".plus")
  plusbtn.addEventListener("click",()=>{
    item.qty++;
    saveAndrefresh();
    })

//minus button data
  const minusbtn = newdiv.querySelector(".minus")
  minusbtn.addEventListener("click",()=>{
    if(item.qty>0){
        item.qty--;
        saveAndrefresh();
    }
  })


newdiv.appendChild(remove)
maindiv.appendChild(newdiv)
    
    })
}

function calculateTotal(){
    let sum=0
    card.map((item)=>{
sum = sum+(item.priceval*item.qty)

    })
    bill.innerText =`${sum}PKR`;
}
function saveAndrefresh(){
    localStorage.setItem("shopping",JSON.stringify(card));
    datacollection();
    calculateTotal();
  
}
addbutton.addEventListener("click",()=>{
    if(card.lenth===0){
        maindiv.innerHTML = "Add some item"
    }
})

























































































































