let rows = 5; // Number of rows in the triangle

// Outer loop for rows
for (let i = 1; i <= rows; i++) {
  let pattern = ""; // Initialize an empty string for each row

  // Inner loop for columns (stars)
  for (let j = 1; j <= i; j++) {
    pattern += "*"; 
  }

  console.log(pattern); 
}

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
