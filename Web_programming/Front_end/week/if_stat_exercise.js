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

// exercise 4
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