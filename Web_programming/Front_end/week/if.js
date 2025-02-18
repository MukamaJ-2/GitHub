let number = 5;
if (number>0) {
    console.log("it is a positive")
}


// example 2

let isRaining = true;
if (isRaining) {
    console.log("Don't forget your umbrella")
}

// example 3
let age = 18;
if (age>= 18){
    console.log("You are eligible to vote")
}

//example 4
if (number % 2 === 0) {
    console.log("the number is even")
} else{
    console.log("the number is odd")
}

// example 5
let score = 75; 
if (score >= 80) { 
    console.log("You got an A."); 
} else if (score >= 60) { 
    console.log("You got a B."); 
} else { 
    console.log("You need to improve."); 
} 

// exercise 1
let temp = 25;

if (temp > 30) {
  console.log("It's too hot");
} else if (temp >= 20 && temp <= 30) {
  console.log("It's moderate");
} else if (temp < 20) {
  console.log("It's cold.");
}

//exercise 2
let scor = 55;
if (scor>=70) {
    console.log("Eligible for Admission.")
}else if(scor>=50 && scor<=69){
    console.log("Admission on probation.")
}else if(scor<50){
    console.log("Not Eligible for Admission.")
}

//exercise 3
let waterAvailable = 300;
if (waterAvailable>500) {
    console.log("Enough water");
    
    
}else if(waterAvailable>=200 && waterAvailable<= 500){
    console.log("Water is limited");    
}else if(waterAvailable<200){
    console.log("Water shortage")
}