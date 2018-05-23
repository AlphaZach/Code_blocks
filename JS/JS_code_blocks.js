/*forEach*/
var strings = ["my", "forEach", "example"];
var result = " ";
//s -> str, i -> index, a -> array
strings.forEach(function(s, i, a) {
    if (a.length - 1 !== i) {
       result += s + " ";
    } else {
      result += s + "!!!";
    }
});
// >console.log(result)
// my forEach example!!!
/*-------------------------------------------------*/

/*setTimeout*/
var Id = setTimeout(function() { 
	console.log("this function runs in 30 seconds"); 
}, 3000);

setTimeout(function() { 
	console.log("cancel", Id); 
	clearTimeout(Id);
}, 2000);
// < 68594         //The id for setTimeout
// > cancel 68593
/*-------------------------------------------------------*/

/*setInterval*/
var intervalId = setInterval(function() {
num ++;
console.log("num:", num);
if (num === 3) {
clearInterval(intervalId);
}
}, 1000);
//> num: 1
//> num: 2
//> num: 3
/*-----------------------------------------------------*/

/*Queue and Stack*/
setTimeout(function() {
	console.log("Hello from the timeout");
},0);
for(var i = 0; i < 1000000000; i++) {
	var x = i^2;
}
console.log("done with loop");
//> done with the loop
//> Hello from the timeout
// the function in setTimeout is in a queue, and can't be invoked until the stack is empty
/*---------------------------------------------------------*/

/*Promise*/
 var p1 = new Promise(function(resolve, reject) {
   var num = Math.random();
   if (num < 0.5) {
     resolve(num);
   } else {
     reject(num);
   }
 });

 p1.then(function(result) {
   console.log("Success:", result);
 }).catch(function(error) {
   console.log("Error:", error);
 });
 // note 'then' is fired when resolve, catch is for reject
 /*------------------------------------------------------------*/

/*Promise Chain*/
//example a counter count each second, up tp 3
 var counter = 0;
 function incCounter() {
   counter++;
   console.log("Counter:", counter);
 }

 function runLater(callback, timeInMs) {
   var p = new Promise(function(resolve, reject) {
     setTimeout(function() {
       var res = callback();
       resolve(res);
     }, timeInMs);
   });
   return p;
 }

 runLater(incCounter, 1000).then(function() {
   return runLater(incCounter, 1000);
 }).then(function() {
   return runLater(incCounter, 1000);
 });
/*---------------------------------------------------*/

/*XMLHttpRequest*/
var XHR = new XMLHttpRequest();

XHR.onreadystatechange = function() {
	//readyState == 4 means the operation is complete
  if(XHR.readyState == 4) {
  	//status == 200 means a succueesful request
    if(XHR.status == 200) {
      console.log(XHR.responseText);
    } else {
      console.log("There was a problem!");
    }
  }
}

XHR.open("GET", "https://api.github.com/zen");
XHR.send();
/*------------------------------------------------------*/
