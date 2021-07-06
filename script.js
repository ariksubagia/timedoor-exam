/**
 * ################## DECLARATIONS
 */
let pizzas = [
    {
        image : "https://www.delonghi.com/Global/recipes/multifry/pizza_fresca.jpg",
        name : "pizza1",
        price : 8,
        toppings : [ "avocado", "broccoli", "onions", "zucchini", "tuna", "ham" ]
    },{
        image : "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dominos-1586183311.jpg?resize=980:*",
        name : "pizza2",
        price : 10,
        toppings : [ "broccoli", "onions", "zucchini", "lobster", "oyster", "salmon", "bacon", "ham" ]
    },{
        image : "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-190731-air-fryer-pizza-0202-landscape-pf-1565820595.jpg?crop=0.6668421052631579xw:1xh;center,top&resize=980:*",
        name : "pizza3",
        price : 12,
        toppings : [ "broccoli", "onions", "zucchini", "tuna" ,"bacon", "duck", "ham", "sausage" ]
    }
];

let sizes = [
    { type : "small", reducer : -1 },
    { type : "medium", reducer : 0 },
    { type : "large", reducer : 2 }
];

let toppings = [
    { name : "avocado", reducer : 1 },
    { name : "broccoli", reducer : 1 },
    { name : "onions", reducer : 1 },
    { name : "zucchini", reducer : 1 },
    { name : "lobster", reducer : 2 },
    { name : "oyster", reducer : 2 },
    { name : "salmon", reducer : 2 },
    { name : "tuna", reducer : 2 },
    { name : "bacon", reducer : 3 },
    { name : "duck", reducer : 3 },
    { name : "ham", reducer : 3 },
    { name : "sausage", reducer : 3 }
];

let input = {
    pizza : undefined,
    size : undefined,
    toppings : []
}

//set default size to medium
input.size = sizes.find(x => x.type === "medium");

/**
 * #################### INITIATION
 */
renderPizzas(document.querySelector('.pizzas'))
renderSizes(document.querySelector('.sizes'))
renderToppings(document.querySelector('.toppings'))

document.addEventListener('change', function( e ){
    if( e.target.classList.contains('pizza-input') ){
        selectPizza(e.target.value);
        renderToppings(document.querySelector('.toppings'), input.pizza.toppings)
        input.toppings = [];
        renderPrice();
        return;
    }

    if( e.target.classList.contains('size-input') ){
        selectSize(e.target.value);
        renderPrice();
        return;
    }

    if( e.target.classList.contains('topping-input') ){
        if( e.target.checked ){
            addTopping(e.target.value);
        }else{
            removeTopping(e.target.value);
        }

        renderPrice();

        return;
    }
}, true)

/**
 * #################### FUNCTIONS
 */
function calculatePrice(){
    let total = 0;

    if( input.pizza ){
        total +=  input.pizza.price;
    }

    if( input.size ){
        total += input.size.reducer;
    }

    if( input.toppings.length > 0 ){
        for( let topping of input.toppings ){
            total += topping.reducer;
        }
    }

    return total;
}

function selectPizza( pizza ){
    input.pizza = pizzas.find(x => x.name === pizza);
}

function selectSize( size ){
    input.size = sizes.find(x => x.type === size);
}

function addTopping(toppingName){
    let topping = toppings.find(x => x.name === toppingName)

    let existingTopping = input.toppings.find(x => x.name === topping.name)

    if( existingTopping ){
        return
    }

    input.toppings.push(topping)
}

function removeTopping(toppingName){
    input.toppings = input.toppings.filter(x => x.name != toppingName);
}

function renderPrice(){
    let element = document.querySelector('.grand-price');

    element.innerHTML = calculatePrice()
}

function renderPizzas( container ){
    for( let pizza of pizzas ){
        container.appendChild(
            createNode(`
                <label class="pizza">
                    <div class="pizza-image"><img src="${pizza.image}" /></div>
                    <div class="pizza-name">${ucfirst(pizza.name)}</div>
                    <div class="pizza-price">$ ${pizza.price}</div>
                    <div class="indicator"><input type="radio" name="pizza" value="${pizza.name}" class="pizza-input" /></div>
                </label>
            `)
        );
    }
}

function renderSizes( container ){
    for( let size of sizes ){
        container.appendChild(
            createNode(`
            <label class="size">
                <input type="radio" name="size" value="${size.type}" class="size-input" ${input.size.type === size.type ? "checked" : ""} />
                <div>${ucfirst(size.type)}</div>
            </label>
            `)
        );
    }
}

function renderToppings( container, allowedList ){
    allowedList = allowedList ?? []

    container.innerHTML = "";

    for( let topping of toppings ){
        container.appendChild(
            createNode(`
                <div class="topping">
                    <label><input type="checkbox" name="topping" class="topping-input" value="${topping.name}" ${!allowedList.includes(topping.name) ? "disabled" : ""} /><span>${ucfirst(topping.name)}</span></label>
                </div>
            `)
        );
    }
}

function createNode( str ){
    str = str.trim();
    let template = document.createElement("template");
    template.innerHTML = str;
    return template.content.firstChild;
}

function ucfirst( str ){
    return str.charAt(0).toUpperCase() + str.slice(1);
}