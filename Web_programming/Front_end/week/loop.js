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

