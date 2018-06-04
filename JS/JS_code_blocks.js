/*forEach*/
//forEach() always return 'undefined'
var strings = ["my", "forEach", "example"];
var result = " ";
//s -> str(each in the array), i -> index, a -> array
strings.forEach(function(s, i, a) {
    if (a.length - 1 !== i) {
       result += s + " ";
    } else {
      result += s + "!!!";
    }
});
// >console.log(result)
// < my forEach example!!!
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
// < cancel 68593
/*-------------------------------------------------------*/

/*setInterval*/
var intervalId = setInterval(function() {
num ++;
console.log("num:", num);
if (num === 3) {
clearInterval(intervalId);
}
}, 1000);
//< num: 1
//< num: 2
//< num: 3
/*-----------------------------------------------------*/

/*Queue and Stack*/
setTimeout(function() {
	console.log("Hello from the timeout");
},0);
for(var i = 0; i < 1000000000; i++) {
	var x = i^2;
}
console.log("done with loop");
//< done with the loop
//< Hello from the timeout
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

/*fetch()*/
//fetch() method returns a promise that resolves to the Response object 
//representing the response to your request.
fetch(url)
.then(function(response){
  console.log(response);
  return response.json() //return a Promise object that resolve the json data
})
.then(function(data){
  console.log(data);
});
/*-------------------------------------------------------------*/

/*fetch options*/
//JSON.stringify() can convert a Javascript value to a JSON string
fetch(url, {
  method: 'POST',
  body: JSON.stringify({
        name: 'blue',
        login: 'bluecat',
    })
})
.then(function(response){
  console.log(response);
  return response.json()
})
.then(function(data){
  console.log(data.bpi.EUR.rate);
});
/*----------------------------------------------------*/

/*fetch handling Errors*/
  var url = 'https://api.github.com/users/alphazach';
  fetch(url)
  .then(handleErrors)
  .then(function(request){
    console.log("EVERYTHING IS FINE!");
    console.log(request);
  })
  // .catch() only run if there is a problem with internet or the request itself, eventhough the status is 404
  .catch(function(error){
    console.log(error);
  });

  // A Error handling function to check if the request get a proper response.
  function handleErrors (request){
  if(!request.ok) {
    throw Error(request.status);
  }
  return request;
}
/*------------------------------------------------------*/


/*jQuery $.ajax $.get $.post $.getJSON*/
$.ajax({
  method: "GET",
  url: "some.api.com",
})
.done(function(res){
  //res is a JSON object by default
  //do something
})
.fail(function(){
  //do something
})

$.get('https://api.github.com/users/colt')
.done(function(data){
console.log(data);
})
.fail(function(){
console.log("ERROR!");
})

var data = {name: "Charlie", city: "Florence"};
$.post("www.catsarecoolandsoaredogs.com", data)
.done(function(data){
 console.log("HI!");
})
.fail(function(){
 console.log("ERROR!");
})

$.getJSON("https://api.github.com/users/colt")
.done(function(data){
  console.log(data);
})
.fail(function(){
  console.log("PROBLEM!");
})
/*----------------------------------------------------------*/

/*Axios*/
var btn = document.querySelector("button");
var section = document.querySelector("#comments");
btn.addEventListener("click", sendRequest);

function sendRequest(){
  axios.get("https://jsonplaaskjldceholder.typicode.com/comments", {
    params: {
      postId: 1
    }
  })
  .then(addComments)
  .catch(handleErrors)
 }

function addComments(res){
  res.data.forEach(function(comment){
    appendComment(comment);
  });
}

function appendComment (comment){
  var newP = document.createElement("p");
  newP.innerText = comment.email;
  section.appendChild(newP);
}

function handleErrors(err) {
    if (err.response) {
      console.log("Problem With Response ", err.response.status);
    } else if (err.request) {
      console.log("Problem With Request!");
    } else {
      console.log('Error', err.message);
    }
  }
/*--------------------------------------------------------------------*/


/*Testing with Jasmine*/

//Matchers
   describe("Jasmine Matchers", function() {
    //toBe compares with === and toEqual compares with different pobjects as well
    it("allows for === and deep equality", function() {
      expect(1+1).toBe(2);
      expect([1,2,3]).toEqual([1,2,3]);
    });
    it("allows for easy precision checking", function() {
      expect(3.1415).toBeCloseTo(3.14,2);
    });
    it("allows for easy truthy / falsey checking", function() {
      expect(0).toBeFalsy();
      expect([]).toBeTruthy();
    });
    it("allows for easy type checking", function() {
      expect([]).toEqual(jasmine.any(Array));
      expect(function(){}).toEqual(jasmine.any(Function));
    });
    it("allows for checking contents of an object", function() {
      expect([1,2,3]).toContain(1);
      expect({name:'Elie', job:'Instructor'}).toEqual(jasmine.objectContaining({name:'Elie'}));
    });
  });

//BeforeEach: run before each 'it' callback
describe("Arrays", function(){
  var arr;
  beforeEach(function(){
    arr = [1,3,5];
  });
  it("adds elements to an array", function(){
    arr.push(7);
    expect(arr).toEqual([1,3,5,7]);
  });

  it("returns the new length of the array", function(){
    expect(arr.push(7)).toBe(4);
  });

  it("adds anything into the array", function(){
    expect(arr.push({})).toBe(4);
  });
});

//afterEach:run after each "it" callback - useful for teardown(let data stay the same before tests)
describe("counting", function(){
  var count = 0;

  beforeEach(function(){
    count++;
  });

  afterEach(function(){
    count == 0;
  });

  it("has a counter that increments", function(){
    expect(count).toBe(1);
  });

  it("gets reset", function(){
    expect(count).toBe(1);
  });
});

// beforeAll/afterAll : run before/after all tests! Does not reset in between
var arr[];
beforeAll(function(){
  arr = [1,3,5];
})
describe("counting", function(){
  it("starts with an array", function() {
    expect(arr.push(7)).toBe(4);
  });
  it("keeps mutating that array", function(){
    console.log(arr); // [1,3,5,7]
    expect(arr.push(9)).toBe(5);
  });
});

describe("Again", function(){
  it("Keeps mutating the array..again", function(){
    console.log(arr); //[1,3,5,7,9]
  });
});

//Spies
//A spy can stub any function and tracks calls to it and all arguments. 
//A spy only exists in the describe or it block in which it is defined, and will be removed after each spec. 
function add(a,b,c){
  return a+b+c;
}
//remenber the variables in the global scope are attached to the 'window' object
//creating a spy
describe("add", function(){
  var addSpy, result;
  beforeEach(function(){
    addSpy = spyOn(window, 'add').and.callThrough();
    result = addSpy(1,2,3);
  })
  it("is can have params tested", function(){
    expect(addSpy).toHaveBeenCalled();
    expect(addSpy).toHaveBeenCalledWith(1,2,3);
  });
  //with .and.callThrough,it will delegate to the actual implementation,then can catch the return value 
  it("can have a return value tested", function(){
    expect(result).toEqual(6);
  });
  it("the number of times of function calls", function(){
    expect(addSpy.calls.any()).toBe(true);
    expect(addSpy.calls.count()).toBe(1);
    expect(result).toEqual(6);
  });
});

//clock
//It makes the timer callbacks synchronous, 
//executing the registered functions only once the clock is ticked forward in time.

//setTimeout
describe("a simple setTimeout", function(){
  var sample;
  beforeEach(function(){
    sample = jasmine.createSpy("sampleFunction");
    jasmine.clock().install();
  });

  afterEach(function(){
    jasmine.clock().uninstall();
  });

  it("is only invoked after 1000 milliseconds", function(){
    setTimeout(function(){
      sample();
    }, 1000);
    jasmine.clock().tick(999);
    expect(sample).not.toHaveBeenCalled();
    jasmine.clock().tick(1);
    expect(sample).toHaveBeenCalled();
  });
});

//setInterval
describe("a simple setInterval", function(){
  var dummyFunction;

  beforeEach(function(){
    dummyFunction = jasmine.createSpy("dummyFunction");
    jasmine.clock().install();
  });
  afterEach(function(){
    jasmine.clock().uninstall();
  });

  it("checks to see the number of times the function is invoked", function(){
    setInterval(function(){
      dummyFunction();
    }, 1000);
    jasmine.clock().tick(999);
    expect(dummyFunction.calls.count()).toBe(0);
    jasmine.clock().tick(1000);
    expect(dummyFunction.calls.count()).toBe(1);
    jasmine.clock().tick(1);
    expect(dummyFunction.calls.count()).toBe(2);
  });
});

//testing async code
//Calls to beforeEach, it, and afterEach can take an optional single argument that should be called when the async work is complete.
//By default jasmine will wait for 5 seconds for an asynchronous spec to finish before causing a timeout failure.
function getUserInfo(username){
  return $.getJSON('https://api.github.com/users/' + username);
}

describe("#getUserInfo", function(){
  if("return the correct name for the user", function(done){
    getUserInfo('Elie').then(function(data){
      expect(data.name).toBe('Elie Schoppik');
    });
  });
});
/*----------------------------------------------------*/

/*Advanced Array*/

/*map*/
// Creats a new array
// Iterates through an array
// Runs a callback function for each value in the array
// Adds the result of that callback function to the new array
// returns the new array

//Examples
function tripleValues(arr){
  return arr.map(function(value){
    return value * 3;
  });
}

tripleValues([1,2,3]); // [3,6,9]

function valTimesIndex(arr){
  return arr.map(function(val,idx){
      return val*idx;
  })
}

/*Filter*/
// Creates a new array
// iterates through an array
// Runs a callback function on each value in the array
// if the callback function return true, that value will be
//     added to the new array
// If the callback function returns false, that value will
//     be ignored from the new array

// examples 
var arr = [1,2,3];
arr.filter(function(value, index, array){
  return value > 2;
});
// [3]

var instructors = [{name: "Elie"},
                   {name: "Tim"},
                   {name: "Matt"},
                   {name: "Colt"}];
instructors.filter(function(val, idx, arr){
  return value.name.length > 3;
});
// [{name: "Elie"},{name: "Matt"},{name: "Colt"}];

/*some*/
// Iterates through an array
// Runs a callback on each value in the array
// if the callback returns true for at least one single vale, return true
// otherwise, return false
// the return value of some is boolean

var arr = [1,2,3];
arr.some(function(value, index, array){
  return value < 2;
});
// true

function hasEvenNumber(arr){
  return arr.some(function(value){
    return value % 2 === 0;
  });
}
hasEvenNumber([1,2,3,4]); //true
hasEvenNumber([1,3,5]); // false

/*every*/
// Iterates through an array
// Runs a callback on each value in the array
// If the callback returns false for any single value, return false

var arr = [-1,-2,-3];
arr.every(function(value, index, array){
  return value < 0;
});
//true

var arr = [1,2,3];
arr.every(function(value, index, array){
  return value > 2;
});
// false

function allArrays(arr){
  return arr.every(Array.isArray);
}

allArrays([[1],[2],[3,4]]); // true
allArrays([[1],[2],{}]); // false

/*reduce*/
// Accepts a callback function and an optional second parameter
// Iterates through an array
// Runs a callback on each value in the array
// The first parameter to the callback is either the first value in 
//     the array or the optional second parameter
// The first parameter to the callback is ofthen called "accumulator"
// The returned value from the callback becomes the new value of accumulator

// anatomy of reduce
[array].reduce(function(accumulator, nextValue, index, array){
  //Whatever is reduced inside here, will be the value of the 
  //accumulator in the next iteration.
}, optional second parameter)

//example
var arr = [1,2,3,4,5];
arr.reduce(function(accumulator, nextValue){
  return accumulator + nextValue;
});
// the value of the accumulator starts as the first value in the array
// return 15 since 1 + 2 + 3 + 4 + 5 = 15

// ex with optional second parameter
// now the value of the accumulator starts as 10
arr.reduce(function(accumulator, nextValue){
  return accumulator + nextValue;
}, 10);
// return 25; since 10 + 1 + 2 + 3 + 4 + 5 = 25

var names = ['Time', 'Matt', 'Colt', 'Elie'];
names.reduce(function(accumulator, nextValue){
  return accumulator += ' ' + nextValue;
}, 'The instructors are');
// 'The instructors are Tim Matt Colt Elie'

var arr = [5,4,1,4,5];
arr.reduce(function(accumulator, nextValue){
  if(nextValue in accumulator){
    accumulator[nextValue]++;
  } else {
    accumulator[nextValue] = 1;
  }
  return accumulator;
},{});
// {5:2, 4:2, 1:1}

/*----------------------------------------------------------------------------*/

/* Closures */
// A closure is a function that makes use of variables 
// defined in outer functions that have previously returned

// By the concept of Closure, we can't externally access the variable in a function
// the inner function could takes (like copying) the variable of outter function, 
// but won't modify the original variable
// example
function counter(){
  var count = 0;
  return function inner(){
    count++;
    return count;
  }
}

// > var counter1 = counter()
// < undefined
// > counter1()
// < 1
// > counter1()
// < 2
// > var counter2 = counter()
// < undefined
// > counter2()
// < 1
// > count
// < Error, Uncaght ReferenceError: count

// see above, we can't access the variable in counter()
// and counter2 won't modify the 'count' of counter1


// another example, shows how to prevent the varible of 
// a instance function can'r be modify
function classRoom(){
  var instructors = ['Elie', "Colt"];
  return {
    getInstructors: function() {
      // .slice() here return the copy of the array, so users can't change the array
      return instructors.slice();
    },
    addInstructor: function(Instructor) {
      instructors.push(Instructor);
      return instructors.slice();
    }
  }
}

// > var course1 = classRoom();
// > course1.getInstructors().pop(); // < "Colt"
// > course1.getInstructors().pop(); // < "Colt"
// > course1.getInstructors(); // ["Colt", "Elie"]

// now the instructors variable is truly private
/*---------------------------------------------------------------*/


/*this*/

// A reserved keyword in JS
// Usually determined by how a function is called ('excution context')
// Can be determined using four rules (global, object/implicit, explicit, new)

// 1 - Global Context； global rule
    console.log(this); // < window

    function whatIsThis() {
      return this;
    }
    whatIsThis(); // < window 
    // the global rule applies, unless the keyword 'this' is\
    // inside of a declared object it's inside of a function right now

    function variablesInThis(){
      this.person = "Elie"
    }
    variablesInThis() // the keyword 'this' inside the function is the window
    console.log(person); // Elie

    // Strict Mode
    "use strict"

    console.log(this); // window

    function whatIsThis() {
      return this;
    }

    whatIsThis(); // undefined
    // since in strict mode, 'this' when inside of a function is undefined.
     function variablesInThis(){
      this.person = "Elie";
     }
     variablesInThis(); // TypeError, can't set person on undefined!

// 2 - Implicit/Object

    // When the keyword 'this' is inside of a declared object
    var person = {
      firstName: "Elie",
      sayHi: function() {
        return "Hi " + this.firstName;
      },
      determineContext: function(){
        return this === person;
      }
    }
    // person.sayHi(); // "Hi Elie"
    // person.determineContext(); // true

    // However, 'this' is defined when a function is run!
    // If there is not a function being run here to create
    // a new value of the keyword 'this' so the value of 'this' is still the window
    var person = {
      firstName: "Elie",
      determineContext: this;
    }
    // person.determineContext; // window

    // Nested Objects
    var person = {
      firstName: "Colt",
      sayHi: function(){
        return "Hi " + this.firstName;
      },
      determineContext: function(){
        return this === person;
      },
      dog: {
        sayHello: function(){
          return "Hello " + this.firstName;
        },
        determineContext: function(){
          return this === person;
        }
      }
    }
    // > person.sayHi(); // < "Hi Colt"
    // > person.determineContext(); // < true
    // > person.dog.sayHello(); // < "Hello undefined"
    // > person.dog.determineContext(); // < false

// 3 - Explicit Binding
// Choose what we want the context of 'this' to be using call, apply or bind

    // Call

        // use the nested object--person above
        // > person.dog.sayHello.call(person); // < "Hello Colt"
        // > person.dog.determineContext.call(person); // < true
        // Using call worked!
        // Notice that we do Not invoke sayHello or determineContext

        function sayHi(){
          return "Hi " + this.firstName;
        }

        var colt = {
          firstName: "Colt"
        }

        var elie = {
          firstName: "Elie"
        }

        sayHi.call(colt); // < Hi Colt
        sayHi.call(elie); // < Hi Elie

        // call method call be sued to turn array-like object into array, Google what is array-like object
        function list() {
          return Array.prototype.slice.call(arguments);
        }

        var list1 = list(1, 2, 3); // [1, 2, 3]
        // get all the divs with text 'Hello'
        var divs = document.getElementsByTagName('div');
        var divsArray = [].slice.call(divs);
        divsArray.filter(function(val){
          return val.innerText === 'Hello';
        });

    // Apply
        function addNumbers(a,b,c,d){
          return this.firstName + " just calculated " + (a+b+c+d);
        }

        var colt = {
          firstName: "Colt"
        }

        var elie = {
          firstName: "Elie"
        }

        addNumbers.call(elie,1,2,3,4) // Elie just calculated 10
        addNumbers.apply(elie, [1,2,3,4]) // Elie just calculated 10

        // when a function does not accept an array, apply will spread out values in an array for us
        var nums = [5,7,1,4,2];
        Math.max(nums); // NaN
        Math.max.apply(this, nums); // 7

    // Bind
    // The parameters work like call, but bind returns a function with the context of 'this' bound already!

        function addNumbers(a,b,c,d){
          return this.firstName + " just calculated " + (a+b+c+d);
        }

        var elie = {
          firstName: "Elie"
        }

        var elieCalc = addNumbers.bind(elie, 1,2,3,4); // function(){} ...
        elieCalc(); // Elie just calculated 10
        //  With bind - we do not need to know all the arguments up front!
        var elieCalc = addNumbers.bind(elie, 1, 2); // function(){} ...
        elieCalc(3,4); // Elie just calculated 10

        // notice setTimeout is a method on the window object
        // Very commonly we lose the context of 'this', but in functions that we do not want to excute right away
        var colt = {
          firstName: "Colt",
          sayHi: function() {
            setTimeout(function(){
              console.log("Hi " + this.firstName);
            }, 1000);
          }
        }
        // > colt.sayHi(); // < Hi undefined

        // use bind to set the correct context of 'this'
        var colt = {
          firstName: "Colt",
          sayHi: function() {
            setTimeout(function(){
              console.log("Hi " + this.firstName);
            }.bind(this), 1000);
          }
        }
        // > colt.sayHi(); // < Hi Colt
/*-----------------------------------------------------*/

/*OOP*/
// Notice JS doesn't has built-in support for classes

/*The 'new' keyword*/
function House(bedrooms, bathrooms, numSqft){
  this.bedrooms = bedrooms;
  this.bathrooms = bathrooms;
  this.numSqft = numSqft;
}

var firstHouse = House(2,2,1000);
// > firstHouse // < undefined
var firstHouse = new House(2,2,1000);
// > firstHouse.bedrooms; // < 2
// > firstHouse.bathrooms; // < 2
// > firstHouse.numSqft; // < 1000

// with the new keyword, the constructor function return a object
// It first create an empty object
// It then sets the keyword 'this' to be that empty object
// It add the line 'return this' to the end of the function, which follows it
// It adds a property onto the empty object called "__proto__", which links the peototype property in the constructor function to the empty object

// example
function Dog(name, age){
  this.name = name;
  this.age = age;
  this.back = function() {
    console.log(this.name + " just barked!")
  }
}
var rusty = new Dog('Rusty', 3);
rusty.bark() // Rusty just barked!


//refactor the code using call/apply
function Car(make, model, year){
  this.make = make;
  this.model = model;
  this.year = year;
  this.numWheels = 4;
}

function Motorcycle(make, model, year){
  //using call
  Car.call(this, make, model, year)
  this.numWheels = 2;
}

function Motorcycle(){ // don't need to even pass in parameters!
  // even better using apply with arguments
  Car.apply(this, arguments);
  this.numWheels = 2;
}
