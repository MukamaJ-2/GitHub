// exercise 1
for (let i=1; i<=10; i++){
    console.log(i);   
}

// exercise 2
// Write your for loop here
for (let i = 1; i <= 10; i++) {
    console.log("5 x " + i + " = " + (5 * i));
  }
  

//exercise 3
let sum = 0;  // Initialize sum to 0
let number = 1;  
while (number <= 100) {
    sum += number;  
    number++;  
}

console.log("The sum of numbers from 1 to 100 is: " + sum);

//exercise 4

let userInput;

do {
    userInput = prompt("Enter a number between 1 and 10:");
    userInput = Number(userInput);
} while (userInput < 1 || userInput > 10 || !Number.isInteger(userInput));

alert("Valid number entered: " + userInput);

// Exercise 5: Break at 7
console.log("Break at 7");
for (let i = 1; i <= 10; i++) {
  if (i === 7) {
    break; 
  }
  console.log(i);
}

// Exercise 6: Skip Even Numbers
console.log("\nSkip Even Numbers");
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    continue; 
  }
  console.log(i);
}

// exercise 7
for (let i = 1; i <= 5; i++) {
    let row = '';
    for (let j = 1; j <= i; j++) {
        row += '*';
    }
    console.log(row);
}
