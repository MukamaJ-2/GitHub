//if statement
/** 
if (condition) {
    
}
else if(condition){

}else{

}
*/




let age = 20;

if (age >= 18) {
  console.log("You are an adult.");
} else {
  console.log("You are a minor.");
}


//for loop
/*
for(intitialization, condition,increment){
    results
}*/

for (i=1;i<=100;i = i+1){
    console.log(i);
}
i=1
while 
(i<=100) {
  console.log(i);
  i = i+1;
}

//for
let fruits = ["oranges", "grapes", "apples"]
for (i in fruits){
  console.log(fruits[i])
}
for (let i in fruits){
  console.log(fruits[i])
}

for (let i of fruits){
  console.log([i])
}



switch (key) {
  case value:
    
    break;

  default:
    break;
}


      switch (day) {
          case "Monday":
              activity = "Start the week with a meeting.";
              console.log(activity)
              break;
          case "Tuesday":
              activity = "Work on the project deliverables.";
              break;
          case "Wednesday":
              activity = "Mid-week review session.";
              break;
          case "Thursday":
              activity = "Team brainstorming session.";
              break;
          case "Friday":
              activity = "Wrap up tasks and prepare for the weekend.";
              break;
          case "Saturday":
              activity = "Enjoy leisure activities.";
              break;
          
      }