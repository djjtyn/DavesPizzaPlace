//JQUERY FUNCTIONS TO BE AVAILABLE WHEN PAGE LOADS
$(document).ready(function () {
    //PIZZA SIZE FUNCTIONALITY AND VALIDATION
    //pizza size dropdown listens for a change in the option selected*/
    $("#pizzaSize").change(function () {
        //assign the selected option value to variable pizzaSize
        var pizzaSize = $("#pizzaSize").val();
        if (pizzaSize == 'supersize') {
            //show supersize warning
            alert("For health and safety we have to recommend that the supersize option you selected should not be consumed by one person only");
        }
        //The selected pizza will show in the output area
        $("#sizeOutput").html(pizzaSize + " size pizza selected");
    });
    //PIZZA QUANTITY FUNCTIONALITY
    //pizza quantity input field listens for a change in its value
    $("#pizzaQuantity").change(function () {
        //assign the selected number to variable pizzaQuantity
        var pizzaQuantity = $("#pizzaQuantity").val();
        if (pizzaQuantity == 1) {
            $("#quantityOutput").html(pizzaQuantity + " pizza selected").addClass('formSuccess');
        } else if (pizzaQuantity > 1) {
            $("#quantityOutput").html(pizzaQuantity + " pizza's selected").addClass('formSuccess');
        } else {
            $("#quantityOutput").html("You haven't selected a quantity!").addClass('formError');
        }
    });
});


//JAVASCRIPT FUNCTIONS

//initialise a global discount variable
var discountApplied = false;

//USERNAME VALIDATION
function validateUsername() {
    //assign username variable to empty string which user populates
    var userName = "";
    userName = document.getElementById("username").value;
    //get output p for javascript message
    var output = document.getElementById("usernameOutput");
    //if username is not valid display message in red else display alternative message in default color
    if (!userName) {
        output.innerHTML = "The username field cannot be empty";
        output.classList.add("formError");
        output.classList.remove("formSuccess");
    } else {
        output.innerHTML = "Username successfully validated with " + userName;
        output.classList.add("formSuccess");
    }
}

//PASSWORD VALIDATION
function validatePassword() {
    //assign password variable to empty string which user populates
    var password = "";
    password = document.getElementById("password").value;
    //get output p for javascript message
    var output = document.getElementById("passwordOutput");
    //if password is not 7 characters in length display message in red else display alt message in default color
    if (password.length < 7) {
        output.innerHTML = "Your password must be 7 characters in length at minumum";
        output.classList.add("formError");
        output.classList.remove("formSuccess");
    } else {
        output.innerHTML = "Password successfully validated";
        output.classList.add("formSuccess");
    }
}

//DISCOUNT FUNCTIONALITY AND VALIDATION
function addDiscount() {
    //get discount input value
    var discount = document.getElementById("discount").value;
    //get output p for javascript message
    var discountOutput = document.getElementById("discountOutput");
    if (discount == "extracheese") {
        //if correct code entered confirmation appears and global discountApplied variable is set to true
        discountOutput.classList.remove("formError");
        discountOutput.innerHTML = "Discount Applied: 10% off total price!";
        discountApplied = true;
    } else {
        //if invalid code entered error message appears and global discountApplied variable is set to false
        discountOutput.classList.add("formError");
        discountOutput.innerHTML = "Discount Code not valid";
        discountApplied = false;
    }
}

function calculateCost() {
    //declare variables
    var large = 5;
    var extraLarge = 7;
    var supersize = 17;
    var total;
    var discount;
    var initialCostOutput = document.getElementById("cost");
    var sizeOutputError = document.getElementById("pizzaSizeError");
    var pizzaQuantityError = document.getElementById("pizzaQuantityError");

    //call functions 
    validateUsername();
    validatePassword();
    addDiscount();

    //Get pizza size and quantity values
    var pizzaQuantity = document.getElementById("pizzaQuantity").value;
    var pizzaSize = document.getElementById("pizzaSize").value;


    //if pizzaSize hasn't been selected display error
    if (pizzaSize == "Choose Pizza Size") {
        sizeOutputError.innerHTML = "You have not selected a pizza size";
    } else {
        sizeOutputError.innerHTML = "";
        //do calculataions in switch statment for the different pizza sizes
        switch (pizzaSize) {
            case "large":
                total = pizzaQuantity * large;
                break;
            case "extra-large":
                total = pizzaQuantity * extraLarge;
                break;
            case "supersize":
                total = pizzaQuantity * supersize;
                break;
            default:
                alert("An error has occured");
        }
    }

    //if pizza quantity hasn't been selected display error
    if (pizzaQuantity < 1) {
        pizzaQuantityError.innerHTML = "You have not selected a pizza quantity!";
    } else {
        pizzaQuantityError.innerHTML = "";
    }

    //Only show the costs output if all choices user makes are valid choices
    if (total > 0) {
        initialCostOutput.innerHTML = "Cost: &euro;" + total;

        //Apply discount if available
        var discountShown = document.getElementById("showDiscount");
        var totalCost = document.getElementById("totalCost");

        if (discountApplied) {
            discount = total * 0.10;
            discountShown.innerHTML = "Discount Applied: &euro;" + discount.toFixed(2);
        }
        else {
            discount = 0;
            discountShown.innerHTML = "No Discounts Applied";
        }

        //Get new total cost with discount applied
        total -= discount;
        totalCost.innerHTML = "Total Cost: &euro;" + total.toFixed(2);
    }
}





