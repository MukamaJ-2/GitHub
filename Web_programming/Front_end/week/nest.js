let number = -3;
if (number>=0) {
    if (number === 0) {
        console.log("The number is zero")
    }else{
        console.log("The number is positive.");   
    }
}else{
    console.log("The number is negative.");  
}

// exercise
let expired = false;
let quality = 7;
if (expired ) {
    console.log("Do not use");
} else{
    if (quality> 8){
        console.log("Good Quality.");
    } else if(quality>= 5 && quality<=8){
        console.log("Average Quality.");
    }else{
        console.log("Poor Qaulity.");
        
    }
}