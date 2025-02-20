for (let i = 1; i<=5; i++){
    console.log(i);  
}

// example 2
for (let i=1; i<=10; i++){
    if(i%2 ===0){
        console.log(i);      
    }
}

// exercisen 1
for (let i=1; i<=10; i++){
    console.log(i);   
}

//exercise 2



// while ex 1
let i = 1;

while (i<=5){
    console.log(i);
    i++;
}

//example 4
let answer;
while (answer !== "yes"){
    answer = prompt("Do you want to continue? (yes/no)");
}


//exercise 3
let sum = 0;  // Initialize sum to 0
let number = 1;  
while (number <= 100) {
    sum += number;  
    number++;  
}

console.log("The sum of numbers from 1 to 100 is: " + sum);
