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
    // It add the lne 'return this' to the end of the function, which follows it
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


  /*Prototypes*/
    // Every constructor function has a property on it called "prototype", which is an object
    // The prototype object has a property on it called "constructor", which points back to the constructor function
    // Anytime an object is created using the 'new' keyword, aproperty called "__proto__" gets created, linking the object and the prototype property of the constructor function

    // this is the constructor function
    function Person(name){
      this.name = name;
    }
    // there are objects created from the Person constructor
    var elie = new Person("Elie");
    var colt = new Person("Colt");
    // since we used the new keyword, we have established
    // a link between the object and the prototype property
    // We can access that using __proto__
    elie.__proto__ === Person.prototype; // true
    colt.__proto__ === Person.prototype; // true
    // the Person.prototype object also has a property
    // called constructor which points back to the function
    Person.prototype.constructor === Person; // true

    // By the Prototype chain, we can add method to object
    function Vehicle(make, model, year){
      this.make = make;
      this.model = model;
      this.year = year;
      this.isRunning = false;
    }

    Vehicle.prototype.turnOn = function(){
      this.isRunning = true;
    }

    Vehicle.prototype.turnOff = function(){
      this.isRunning = false;
    }

    Vehicle.prototype.honk = function(){
      if(this.isRunning){
        return "beep!";
      }
    }

  /*Inheritance*/
    function Person(firstName, lastName){
      this.firstName = firstName;
      this.lastName = lastName;
    }

    Person.prototype.sayHi = function(){
      return "Hello " + this.firstName + " " + this.lastName;
    }

    // create student that inherites Person's property
    function Student(firstName, lastName){
      return Person.apply(this, arguments);
    }
    // to inherite prototype, we can't use Student.prototype = Person.prototype;
    // Since it will just create a reference, if we change the Student.prototype, it will affect the Parent.prototype

    // we should use Object.create
    // The Object.create() method creates a new object, using an existing object to provide the newly created object's __proto__ .
    Student.prototype = Object.create(Person.prototype);
    // Why don't use 'new'? 
    // Student.prototype = new Person; does almost the same thing, but add additional unnecessary properties on the prototype object(since it is creating an object with undefined proerties just for the prototype).

    // Last, we need to redefined the constructor property
    Student.prototype.constructor = Student;
/*-----------------------------------------------------------------------------------------------------*/

/************************************************************************************/
/*ES2015*/

/* keyword 'const' */
//with const, will not able to change the value of primitives
const instructor = "Tim";
// > instructor = "Elie"; // < TypeError
// > const instructor = "Elie"; // < SyntaxError

// however, we still able to change the value of an array
const numbers = [1,2,3,4];
numbers.push(10); // < 5
/*---------------------------------*/


/* keyword 'let' */
//let allows you to declare variables that are limited in scope to the block, statement, or expression on which it is used. This is unlike the var keyword, which defines a variable globally, or locally to an entire function regardless of block scope.

function letTest() {
  let x = 1;
  if (true) {
    let x = 2;  // different variable
    console.log(x);  // 2
  }
  console.log(x);  // 1
}

// let, unlike var, does not create a property on the global object. For example:
var x = 'global';
let y = 'global';
console.log(this.x); // "global"
console.log(this.y); // undefined

// A case that using let
for(var i = 0; i < 5; i++ ){
  setTimeout(function(){
    console.log(i);
  }, 1000)
}

// 5 (five times)
// since the for loop finished before the setTimeout run
// one solution to fix that is running another function inside of the loop, and invoke it immediatelly
for(var i = 0; i < 5; i++){
  (function(j){
    setTimeout(function(){
      console.log(j)
    },1000);
  })(i)
}
// 0
// 1
// 2
// 3
// 4

// We can use 'let' make thing much easier
// it will create new variable i for each iteration in the loop
for(let i = 0; i < 5; i++){
  setTimeout(function(){
    console.log(i);
  },1000);
}
// 0
// 1
// 2
// 3
// 4
/*-------------------------------------------------------------*/

/* Arrow Function */
// ES5
var add = function(a,b){
  return a + b;
}
// replace the keyword 'function' with=>
// ES2015
var add = (a,b) => {
  return a+b;
}
// One-line Arrow Functions
// You can put arrow functions on one line.
// But you must omit the return keyword as well as curly braces
var add = (a,b) => a+b;

// Refactoring with arrow functions
// ES5
[1,2,3].map(function(value){
  return value * 2;
}); // [2,4,6]

// ES2015
[1,2,3].map(value => value * 2); // [2,4,6];

// another example
function doubleAndFilter(arr){
  return arr.map(function(value){
    return value*2;
  }).filter(function(value){
    return value % 3 === 0;
  })
};
doubleAndFilter([5,10,15,20]); // [30]
// can be refactoried to
var doubleAndFilter = arr => arr.map(val => val * 2).filter(num => num % 3 === 0);
doubleAndFilter([5,10,15,20]); // [30]

// Warning! 
// ! Arrow function are not exactly the same as regular functions!
// Arrow function do not get their own 'this' keyword
// inside of an arrow function, the keyword this has its original meaning from the enclosing context.

var instructor = {
  firstName: "Elie",
  sayHi: function() {
    setTimeout(() => {
      console.log("Hello " + this.firstName); // the this here refer to instructor object scope
    }, 1000);
  }
}

instructor.sayHi(); // "Hello Elie"
// however, we can't sue arrow function for sayHi function, because by do so, the keyword this will refer to global object

// ! Arrow function do not get their own keyword arguments
var add = (a,b) => {
  return arguments;
}

add(2,4); // ReferenceError: arguments is not defined

function outer(){
  return innerFunction = () => {
    return arguments;
  }
}
outer(1)(2); // only prints out [1]
/*----------------------------------------------------------*/


/* Default Parameters */
function add(a=10, b=20){
  return a+b;
}

add(); // 30
add(20); // 40
/*------------------------------------------------*/

/* For...of */
var arr = [1,2,3,4,5];
for (let val of arr){
  console.log(val);
}

// 1
// 2
// 3
// 4
// 5

// remenber it can't access an index
// can only be used on data structures with a Symbol.iterator method implemented (no object)
/* --------------------------------------------------------------*/

/* Rest */

function printRest(a,b,...c){
  console.log(a);
  console.log(b);
  console.log(c);
}

printRest(1,2,3,4,5);
// 1
// 2
// [3,4,5]

// we can use the rest operator to convert the arguments into array
// ES5 :
function sumArguments(){
  var argumentsArray = [].slice.call(arguments);
  return argumentsArray.reduce(function(accumulator,nextValue){
    return accumulator + nextValue;
  });
}

// ES2015
var sumArguments = (...args) => args.reduce((acc, next) => acc + next);
/*--------------------------------------------------------------------*/

/* Spread */
// Used on arrays to spread each value out (as a comma separated value)
// Useful when you have an array, but what you are working with expects comma separated values

var arr1 = [1,2,3];
var arr2 = [4,5,6];
var arr3 = [7,8,9];
// ES5
var combined = arr1.concat(arr2).concat(arr3);
// ES2015
var combined = [...arr1, ...arr2, arr3];


// Spread instead of apply
var arr = [3,2,4,1,5];
Math.max(arr); // NaN
// ES5
Math.max.apply(this, arr); // 5
// ES2015
Math.max(...arr); // 5
/*---------------------------------------------------------------------------*/

/* Object Shorthand Notation */
var firstName = "Elie";
var lastName = "Schoppik";
// ES5
var instructor = {
  firstName: firstName;
  lastName: lastName;
}
// in ES2015 if the key and value hve the same name we don't have to repeat the declaration
// ES2015
var instructor = {
  firstName,
  lastName
}

// succinct object method
// ES5
var instructor = {
  sayHello: function(){
    return "Hello!";
  }
}
// ES2015 - Do not use arrow functions here!
var Instructor = {
  sayHello(){
    return "Hello!";
  }
}

// Computed Property Names
// ES5
var firstName = "Elie";
var instructor = {};
instructor[firstName] = "That's me!";

instructor.Elie; // "That's me!"
// ES2015, we can assign a value using bracket notation while defining our object
var firstName = "Elie";
var instructor = {
  [firstName]: "That's me!"
}

instructor.Elie; // "That's me!"
/*------------------------------------------------------------------*/

/* Destructuring */
// Extracting values from data stored in objects and arrays
var instructor = {
  firstName: "Elie",
  lastName: "Schoppik"
}

var {firstName, lastName} = instructor;

firstName; // "Elie"
lastName; // "Schoppik"
// or make different variable name
var {firstName:first, lastName:last} = instructor;

first; // "Elie"
last; // "Schoppik"

// Default Values with an object
// ES5
function createInstructor(options){
  var options = options || {};
  var name = options.name || {first: "Matt", last:"Lane"};
  var inHilarious = options.isHilarious || false;
  return [name.first, name.last, isHilarious];
}

createInstructor(); // ["Matt", "Lane", false]
createInstructor({isHilarious:true}); // ["Matt", "Lane", true]
createInstructor({name: {first: "Tim", last: "Garcia"}}); // ["Tim", "Carcua", false]

// ES2015 Destructuring
function createInstructor({name = {first:"Matt", last:"Lane"}, isHilarious=false} = {}){
  return [name.first, name.last, isHilarious];
}
// WE're passing in a destructured object as a default parameter!
// We assign as a default value an empty object so ES2015 knows we are destructuring
// if nothing is passed in, we default to the destructured object as the parameter.


var instructor = {
  name: "Elie",
  favColor: "Purple"
};

// Object field as parameters ES5
function displayInfo(obj){
  return [obj.name, obj.favColor];
}

// ES2015
function displayInfo({name, favColor}){
  return [name, favColor];
}

displayInfo(instructor); // ["Elie", "Purple"]
/*-------------------------------------------------------------*/

/*Array Destructuring*/
var arr = [1,2,3];
// ES5
var a = arr[0]
var b = arr[1]
var c = arr[2]
// ES2015
var [a,b,c] = arr;

a; // 1
b; // 2
c; // 3

// Swapping values
// ES5
function swap(a,b){
  var temp = a;
  a = b;
  b = temp;
  return [a,b];
}

swap(10, 5); // [5,10]
// ES2015
function swap(a,b){
  return [a,b] = [b,a];
}

swap(10,5); // [5,10]
/*-------------------------------------------------*/

/* ES2015 Object Oriented */
/* Class */

// A new reserved keyword provided by ES2015
// The class keyword creates a constant - can not be redeclared
// The class keyword is an abstraction of constructor functions and prototypes. JavaScript does not have built in support for object oriented programming
// The class keyword does not hoist
// Still use `new` keyword to create objects

class Student {
  constructor(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
  }
  // in ES2015 we place our prototype methods inside of the class
  sayHello(){
    return `Hello ${this.firstName} ${this.lastName}`;
  }
  // we can directly add Class methods and properties, they are static 
  static isStudent(obj){
    return obj.constructor === Student;
  }
}

var elie = new Student('Elie', 'Schoppik'); // same as ES5
elie.sayHello(); // "Hello Elie Schoppik"
Student.isStudent(elie); // true
Student.isStudent([]); // false

/* Inheritance */
class Person {
  constructor(firstName,lastName){
    this.firstName = firstName;
    this.lastName = lastName;
  }
  sayHello(){
    return `Hello ${this.firstName} ${this.lastName}`;
  }
}

// The super keyword is used to access and call functions on an object's parent.
// When used in a constructor, the super keyword appears alone and must be used before the this keyword is used. 
class Student extends Person {
  constructor(firstName, lastName){
    // you must use super here
    super(firstName, lastName); 
  }
}
/*-----------------------------------------------------*/

/* Maps */
// Similar to objects, except the keys can be ANY data type

var firstMap = new Map;

firstMap.set(1, 'Elie');
firstMap.set(false, 'a boolean');
firstMap.set('nice', 'a string');
firstMap.delete('nice'); // true
firstMap.size // 2

var arrayKey = [];
firstMap.set(arrayKey, [1,2,3,4,5]);
var objectKey = {};
firstMap.set(objectKey, {a:1});

// Extracting Values
firstMap.get(1); // 'Elie'
firstMap.get(false); // 'a boolean'
firstMap.get(arrayKey); // [1,2,3,4,5]
firstMap.get(objectKey); // {a:1}

// can iterate over the map
firstMap.forEach(v => console.log(v));
// ELie
// a boolean
// [1,2,3,4,5]
// {a:1}

/* WeakMap */
// Similar to a map, but all keys MUST be objects
/*------------------------------------------------------*/

/* Set */
// All values in a set are unique
// any type of value can exist in a set

// use, when you wanna avoid adding duplicated value
var s = new Set;
// can also be created from an array
var s2 = new Set([3,1,4,1,2,1,5]); // {3,1,4,2,5}
s.add(10); // {10}
s.add(20); // {20, 10}
s.add(10); // {20, 10}

s.size; // 2

s.has(10); // true
s.delete(20); // true
s.size; // 1
/*-------------------------------------------------------*/

/* Promises.all */
// Accepts an array of promises and resolves all of them or
// rejects once a single one of the promises has been first rejected(fail fast)

// If all of the passed-in promises fulfill, Promise.all is fulfilled with an array
// of the values from the passed-in promises, in the same order as the promise passed in.

// the promises don't resolve sequentially, but Promise.all waits for them

function getMovie(title){
  return $.getJSON(`https://omdbapi.com?=${title}&apikey=thewdb`);
}

var titanicPromise = getMovie('titanic');
var shrekPromise = getMovie('shrek');
var braveheartPromise = getMovie('braveheart');
// We can recolve all of the promise using Promise.all
Promise.all([titanicPromise, shrekPromise, braveheartPromise]).then(function(movies){
  return movies.forEach(function(value){
    console.log(value.year);
  });
});

// 1997
// 2001
// 1995

// example, a function accepts some usernames and return the one with most followers on Github
function getMostFollowers(...usernames){
  let baseUrl = "https://api.github.com/users/"
  let urls = usernames.map(username => $.getJSON(baseUrl + username));
  return Promise.all(urls).then(function(data){
    // use sort() to sort the data
    let max = data.sort((a,b) => a.followers < b.followers)[0];
    return `${max.name} has the most followers with ${max.followers}`
  })
}
/*---------------------------------------------------------------------------*/

/* Generator */

// A special kind of function which can pause execution and resume at any time
// Created using *
// When invoked, a generator object is returned to us with the keys of value and done
// Value is what is returned from the paused function using the yield keyword
// Done is a boolean which returns true when the function has completed

function* pauseAndReturnValues(num){
  for(let i = 0; i < num; i++){
    yield i;
  }
}

var gen = pauseAndReturnValues(3);
gen.next(); // {value: 0, done: false}
gen.next(); // {value: 1, done: false}
gen.next(); // {value: 2, done: false}
gen.next(); // {value: undefined, done: ture}

// Can place multiple yield keywords
function* printValue(){
  yield "First";
  yield "Second";
  yield "Third";
}

var g = printValue()；
g.next().value; // "First"
g.next().value; // "Second"
g.next().value; // "Third"

// Iterating; since generators implement a Symbol.iterator property we can use a for..of loop!
for (val of pauseAndReturnValues(3)){
  console.log(val);
}

// 0
// 1
// 2
/*--------------------------------------------------------------*/

/* Object.assign */
// can make a copy of an object without reference
var o = {name: "Elie"};
var o2 = Object.assign({},o);

o2.name = "Tim";
o.name; // "Elie"

// !! Not a deep clone
// If we have objects inside of the object we are copying - those still have a reference!
var o = {instructors: ["Elie", "Tim"]};
var o2 = Object.assign({},o);

o2.instructors.push("Colt");
o.instructors; // ["Elie", "Tim", "Colt"];
/*---------------------------------------------------*/

/* Array.from */
// Convert other data types into arrays

var divs = document.getElementsByTagName("div"); // returns an array-like-object
// ES5
var converted = [].slice.call(divs) // convert it into an array
// ES2015
var converted = Array.from(divs);

// COnvert different types of Objects into arrays
var firstSet = new Set([1,2,3,4,3,2,1]); // {1,2,3,4}
var arrayFromSet = Array.from(firstSet); // [1,2,3,4]
/*----------------------------------------------------------*/

/* find */

// invoked on arrays
// Accepts a callback with value, index and array(just like forEach, map, filter, etc.)
// Returns the value found or undefined if not found

var instructors = [{name: "Elie"}, {name: "Matt"}, {name: "Tim"}, {name: "Colt"}];

instructors.find(function(val){
  return val.name === "Tim";
}); // {name: "Time"}

/*findIndex*/
// return an index or -1 if the value is not found
instructors.findIndex(function(val){
  return val.name === "Tim";
}); // 2

/*includes*/
// returns a boolean if a value is in a string
// easier than using indexOf

// ES5
"awesome".indexOf("some") > -1 // true
// ES2015
"awesome".includes("some"); // true

/*Number.isFinite*/
// A handy way for handling NaN being a typeof number

// ES5
function seeIfNumber(val){
  if (typeof val === "number" && !isNaN(val)){
    return "It is a number";
  }
}

// ES2015
function seeIfNumber(val){
  if(Number.isFinite(val)){
    return "It is a number";
  }
}
/*-------------------------------------------------------------------*/

/* ES2016 + ES2017 */

// Exponential operator
2**2 = 4

// padStart
// The first parameter is the total length of the new string
// the second parameter is what to pad with from the start
"awesome".padStart(10); // "   awesome"
"awesome".padStart(10, '!'); // "!!!awesome"

// padEnd
"awesome".padEnd(10,'!'); // "awesome!!!"

/* ES2017 Async Function */
// A special kind of function is created using the word async
// The purpose of async function is to simplify writing asynchronous code, specially Promise
async function first(){
  return "We did it!";
}

first(); // return a Promise
first().then(val => console.log(val)); // "We did it!"

/* Await */
// A reserved keyword that can only be using inside async functions
// await pauses the execution of the async function and is followed by a Promise.
// The await keyword waits for the promise to resolve, and then resumes the async function's execution and returns the resolved value.
// Think of the await keyword like a pause button (similar to yield with generators
async function getMovieData(){
    console.log("starting!");
    var movieData = await $.getJSON('https://omdbapi.com?t=titanic&apikey=thewdb');
    // this line does NOT run until the promise is resolved!
    console.log(movieData);
    console.log("all done!");
}

getMovieData() 
// starting
// {Data}
// all done!

// Handling errors
// If a promise is rejected using await, an error will be thrown
// so we can easily use a try/catch statement to handle errors!
async function getUser(user){
  try {
    var response = await $.getJSON(`https://api.github.com/users/${user}`);
    console.log(response.name);
  } catch(e){
    console.log("User does not exist!");
  }
}

// With Http request
// Start the HTTP requests in parallel and then await their resolved promise
// Much faster than await the HTTP request one by one
async function getMovieData(){
    var titanicPromise = $.getJSON(`https://omdbapi.com?t=titanic&apikey=thewdb`);
    var shrekPromise = $.getJSON(`https://omdbapi.com?t=shrek&apikey=thewdb`);

    var titanicData = await titanicPromise;
    var shrekData = await shrekPromise;

    console.log(titanicData);
    console.log(shrekData);
}

getMovieData();

// Await with Promise.all
// Here we are simply waiting for an array of promises to resolve!
async function getMovieData(first, second){
    var moviesList = await Promise.all([
        $.getJSON(`https://omdbapi.com?t=${first}&apikey=thewdb`),
        $.getJSON(`https://omdbapi.com?t=${second}&apikey=thewdb`) 
    ]);
    console.log(moviesList[0].Year);
    console.log(moviesList[1].Year);
}

getMovieData('shrek', 'blade'); 
// 2001
// 1998

/* Object Rest */
var instructor = {first:"Elie", last:"Schoppik", job:"Instructor", numSiblings:3};
var { first, last, ...data } = instructor
first; // "Elie"
last; // "Schoppik"
data; // { job: "Instructor", numSiblings: 3 }

/* Object Spread */
//Great for creating objects starting with default values and is a more concise alternative to Object.assign
var defaults = {job: "Instructor", ownsCat:true, ownsDog: true};

var matt = {...defaults, ownsCat: false};
var colt = {...defaults, ownsDog: false};
/*-----------------------------------------------------------------*/


