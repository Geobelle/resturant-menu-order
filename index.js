import { menuArray } from "./data.js";

const modal = document.getElementById('modal')
const paymentDetails = document.getElementById('payment-details')
const body = document.getElementById("body")
const costItem = document.getElementById('cost-item')
const costs = document.getElementById('costs')
let foodOrder =[]

const menuItem = menuArray.map(function(indvidualItem){
    return `
            <div class="individual-item"> 
                <img src="${indvidualItem.Image}">
                <div class="individual-item-details"> 
                    <h2>${indvidualItem.name} </h2>
                    <p>${indvidualItem.ingredients.join(', ')} </p>
                    <h3>$${indvidualItem.price} </h3>
                </div>
                <button id ="${indvidualItem.id}"> + </button>
            </div>
            <hr>
            `
}).join('')
document.getElementById('menu-item').innerHTML = menuItem

menuArray.forEach(function(itemId){
    document.getElementById(`${itemId.id}`).addEventListener('click', function(){
        foodOrder.push(itemId)
        render(foodOrder)
        document.getElementById('thank-you').style.display ="none"
       
        foodOrder.forEach(function(food){
            document.getElementById(`${food.id}-remove`).addEventListener('click', function(){
                 foodOrder = foodOrder.filter(function(currentItem){
                    return currentItem.id !== food.id
                })
                render(foodOrder)
            })

           
        })

        document.getElementById("complete-order").addEventListener('click', function(){
            modal.style.display ="block"
            
        })

    }
    )

})

paymentDetails.addEventListener("submit",function(e){
    e.preventDefault()
    const paymentDetailsData = new FormData(paymentDetails)
    const name = paymentDetailsData.get ('name')

    modal.style.display ="none"
    foodOrder =[]
    document.getElementById('cost-item').style.display ="none"
    document.getElementById('thank-you').style.display ="flex"
    document.getElementById('thank-you').innerHTML =
                                            `
                                                <div class="thank-you">
                                                    <h2> Thanks, ${name}! Your order is on its way!</h2>                          
                                                </div>
                                            `

})

body.addEventListener("click", function (e){
    if (!e.target.closest("#modal")  && !e.target.closest("#complete-order") && modal.style.display === 'block'){
          modal.style.display='none'
    }
 
})
function render (arr){
    const cost = arr.map(function(food){
     return`
                                                         
                                                         <div class ="order-details">
                                                             <div class="order-name">
                                                                 <h2>${food.name} </h2>
                                                                 <button id='${food.id}-remove'>remove</button>
                                                             </div>
                                                             <h3>$${food.price} </h3>
                                                         </div>
                                                         `
    }).join(' ')
     costItem.style.display ="flex"
     costs.innerHTML = cost
     const total = arr.reduce((total, currentItem) => {
        return total + currentItem.price
    },0)
    document.getElementById("totalPrice").innerHTML = `$${total}`
}
          