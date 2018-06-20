
/* Typed Variales in C */
int // signed integer
short int (short) // smaller signed integer
long int (long) // larger signed integer
char // single text character or symbol 'a', 'D', '?'
float // floating point non-integer number 0.0, 1.618, -1.4 
double // greater precision FP number


/* Characters */
// Encode characters as numbers, same as everything!
// ASCII standard defines 128 defferent characters and their numeric encodings
	// - char representing the character 'a' contains the value 97
	// - char c = 'a'; or char c = 97; both are valid
// A char takes up 1 byte of space


/*　Typecasting in C */
// Converting an expression of a given type into another type is known as type-casting. 

// Implicit Conversion
// Implicit conversions do not require any operator for converted. They are automatically performed when a value is copied to a compatible type in the program.

// EXPLICIT CONVERSION
// They are not automatically performed when a value is copied to a compatible type in the program.

// example
int i=20;
double p;

p = i; // implicit conversion
p = (short) i; // Explicit conversion

/* Structs in C */
// A structured group of variables, possibly including other structs
typedef struct {
  int lengthInSeconds;
  int yearRecorded;
} Song;

Song song1;

song1.lengthInSeconds =  213;
song1.yearRecorded    = 1994;

Song song2;

song2.lengthInSeconds =  248;
song2.yearRecorded    = 1988;

// Notice that there are no class in C


// Sample C Code
#include <stdio.h>
#define REPEAT 5 // here define REPEAT = 5, and can't be changed

int main(int argc, char *argv[]) { 
	  int i;
	  int n = 5;
	  for (i = 0; i < REPEAT; i = i + 1) {
		 	printf("hello, world\n"); 
	  }
	  return 0; 
} 


/* C Syntax: main */
// To get arguments to the main function, use:
	int main(int argc, char *argc[])
// - argc contains the number of strings on the command line (the executable path counts as one, plus one for each argument)
// - argv is an array containing pointers to the arguments as strings

// Example
$ ./foo hello 87
// here argc = 3
// argv[0] = "./foo"
// argv[1] = "hello"
// argv[2] = "87"


/* Pointer Syntax */
int *x;
// Declare variable x as the address of an int
x = &y;
// Assigns address of y to x
// & called the “address operator” in this context
z = *x;
// Assigns the value at address in x to z
// * called the “dereference operator” in this context

