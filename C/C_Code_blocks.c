
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

/* sizeof() */
// return size in bytes of variable or data type name
int x, *y;
sizeof(x); // 4 (32-bit int)
sizeof(int); // 4 (32-bit int)
sizeof(y); // 4 (32-bit addr)
sizeof(char); // 1 (always)

// Acts different with arrays and structs
// -Arrays: returns size of whole array
// -Structs: returns size of one instance of struct(sum of sizes of all struct variables + padding)
typedef struct {
  int lengthInSeconds;
  int yearRecorded;
} Song;
Song song1;
sizeof(song1); // 4 + 4 + 0 = 8, here the padding between memories is 0


/* Operator Precedence */
// Equality test (==) binds more tightly than logic (&,|,&&,||)
//  x&1==0 means x&(1==0) not (x&1)==0

// Prefix (++p) takes effect immediately
// Postfix/Suffix (p++) takes effect last
int main () {
	int x = 1;
	int y = ++x; // y = 2, x = 2
	x--;
	int z = x++; // z = 1, x = 2
	return 0;
}


/* Array */
// use separate variable for array declaration & array bound to be reused
int ARRAY_SIZE = 10
int i, ar[ARRAY_SIZE];
for (i=0; i<ARRAY_SIZE; i++){...}

// Arrays and Pointers
// Key Concept: An array variable looks like a pointer to the first(0th) element
		// ar[0] same as *ar; ar[2] same as *(ar+2)
		// We can use pointer arithmetic to conveniently access arrays
	// An array variable is read-only (no assignment)
		// (i.e. cannnot use "ar = <anything>")
int a[4];
*a = 2; // or a[0]
//here *a = 2, a = &a = <address of a>

// ar[i] is treated as *(ar+i)
// To zero an array, the following three ways are equivalent:
for(i=0; i<SIZE; i++)  ar[i] = 0;

for(i=0; i<SIZE; i++)  *(ar+i) = 0;

for(p=ar; p<ar+SIZE; p++)  *p = 0;


/* C String */
// String in C is just an array of characters
	char string[] = "abc"; 
	// array size here is 4, last char is followed by a 0 byte('\0') (a.k.a. "null terminator")

// to tell how long a string is?
int strlen(char s[]){
	int n = 0;
	while (s[n] != 0) n++;
	return n;
}

// C String Standard Functions
// Accessible with #include <string.h>
int strlen(char *string);
	// Returns the length of string(not including null term)
int strcmp(char *str1, char *str2);
	// return 0 if str1 and str2 are identical, otherwise return the difference between the first pair of chars
char *strcpy(char *dst, char *src);
	// Copy contents of string src to the memory at dst.
	// Caller must ensure that dst has enough memory to hold the data to be copied
	// Note: dst = src only copy the pointer(the address)

/* Pointer Arithmetic */

// pointer + 1 adds 1 something to the address

char *p; char a;
p = &a;
printf("%u %u\n",p,p+1); // 100 101;   adds 1*sizeof(char)

int *p; int a;
p = &a;
printf("%u %u\n",p,p+1); // 100 104;  adds 1*sizeof(int)

// p+1 correctly increments p by sizeof(*p), i.e. moves pointer to the next array element

// Increment and Dreference
*--p // decrements p, returns val at that addr
++*p // increments *p and returns that val
*p++ // returns *p, then increments p

char *p = "hi"; // assume p has value 40
char c = *p++;  // c = 'h', p = 41
c = *p; // c = 'i'

(*p)++ // returns *p, then increments in mem

char *p = "bye"; // assume p has value 40
char c = (*p)++; // c = 'b', p = 40
c = *p;   		 // c = 'c'   because 'b' + 1 = 'c'
/*--------------------------------------------------------------------------------*/

/* Memory Management */

// Where do the Variables go?
#include <stdio.h>

int varGlobal; // Static Data: declared outside a function

int main() {
	int varLocal; // Stack: declared inside a function
	int *varDyn = 

	malloc(sizeof(int)); // Heap: Dynamically allocated
}











