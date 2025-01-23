// sigle coment
/**
 * multiple
 */

//variables
//var
//const(this value shouldn't be changed)
const PI = 3.14; //flt
console.log(PI);

//let
let numberOne = 3;
let numberTwo = 5;


//var numberSix = 6;

/*function addNumbers(){
    let numberFour = 34;

}
console.log(numberFour);
*/
/**
 * DataTypes
 */

console.log(numberOne + numberTwo);
console.log(numberOne - numberTwo);
console.log(numberOne * numberTwo);

// string
let name = "Joseph"; // str
let firstName = 'Mukama'
let lastName = `Simon`;
console.log(lastName);

let welcome = `Welcome back ${lastName} 🤣 `;
console.log(" welcome back" + " "+ firstName);
console.log(welcome);

console.log(firstName.toUpperCase());

console.log(firstName.length);




// Booleans
let isStudent = false;
let isInHall = true;
//logical operators
console.log(isStudent && isInHall);
console.log(isStudent || isInHall);

// arrays
 let fruits = ["oranges", "grapes", "apples"]
console.log(fruits);

// adding items to the array
fruits.push("berries");
fruits.push("avacado");
console.log(fruits);

//removing
fruits.pop()
console.log(fruits);

// Objects
let credentials = {
    "email": "joseph2@gmail.com",
    "password": "123456"
}



// appending to objects
console.log(credentials);
credentials["username"] = "Mukama";
console.log(credentials);

let signUp = {
    "firstName": "Joseph",
    "lastName":"Mukama",
    "email": "joseph2@gmail.com",
    "contact": "+256-706807724",
    "username": "Joseph",
    "password": "12345@6",
    "confirmPassword": "12345@6",
}

// comparison Operators
console.log(signUp);
console.log(signUp.password == signUp.confirmPassword);
console.log(signUp.password === signUp.confirmPassword);