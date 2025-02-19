 // prints 3x3 grid of numbers
for (let i = 1; i <= 3; i++) { 
    for (let j = 1; j <= 3; j++) { 
        console.log(`Row ${i}, Column ${j}`); 
    } 
} 


// exercise 7
for (let i = 1; i <= 5; i++) {
    let row = "";
    for (let j = 1; j <= i; j++) {
        row += "*";
    }
    console.log(row);
  }
  