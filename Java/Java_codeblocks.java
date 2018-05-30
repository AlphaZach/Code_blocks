

/*Intlist(linked list)*/
public class IntList {
  public int first;
  public IntList rest;

  public IntList(int f, IntList r) {
    first = f;
    rest = r;
  }

  //Return the size of a list, using recursion
  public int size() {
    if (rest == null) {
      return 1;
    }
    return 1 + this.rest.size();
  }

  //Return the size of list using iteration
  public int iterativesize() {
    IntList p = this;
    int totalSize = 0;
    while (p != null) {
      totalSize += 1;
      p = p.rest;
    }
    return totalSize;
  }

  //Return the ith item of the list
  public int get (int i) {
    if (i == 0) {
      return this.first;
    }
    return this.rest.get(i - 1);
  }

  public static void main(String[] args) {
    IntList L = new IntList(15, null);
    L = new IntList(10, L);
    L = new IntList(5, L);
  }
}
// (5,-)->(10,-)->(15, null)

//However, the IntList suffers from the fact that it is fairly awkward to use, 
//resulting in code that is hard to read and maintain.
//In order to use an IntList correctly, the programmer must understand 
//and utilize recursion even for simple list related tasks.
/*----------------------------------------------------------------------------*/


/*SLList*/

//then create a new class called SLList
public class SLList {
    //firstly, rename the InList class to IntNode, make it inside SLList, since only one public class in one java file
    // use static since it doesn't use anything out of the IntNode class, that can save a little bit of memory
    public static class IntNode {
    public int item;
    public IntNode next;

    public IntNode(int i, IntNode n) {
        item = i;
        next = n;
      }
    }

    // Private variables and methods can only be accessed by code inside the same .java file
    // The first item (if it exists) is at sentinel.next
    // private IntNode first; (without sentinel)
    private IntNode sentinel;
    private int size; //track current size

    /*empty list*/
    public SLList() {
      // using sentinel node to represent a empty list
      sentinel = new IntNode(1, null); //the number doesn't matter, it's a sentinel node
      size = 0;
    }

    public SLList(int x) {
    sentinel = new IntNode(1, null); 
    sentinel.next = new IntNode(x, null);
    size = 1;
    }
//now if we wanna make a list with one element,
//just L = new SLList(value),
//instead of L = new IntList(value, null), become more friendly

    /*add x to the front of the list.*/
    public void addFirst(int x) {
      sentinel.next = new IntNode(x, sentinel.next);
      size += 1;
    }

    /*return the first of the list*/
    public int getFirst() {
      return sentinel.next.item;
    }

    /*add an item to the end of the list*/
    public void addLast(int x) {
      size += 1;
      //a way to avoid null pointer exception for empty list, 
      //not a good way, prefer using Sentinel Node
      /*if (first == null) {
        first = new IntNode(x, null);
        return;
      }*/

      IntNode p = sentinel;
      while (p.next != null) {
        p = p.next;
      }
      p.next = new IntNode(x, null);
      
    }

    /*SIZE*/
    /*private static int size(IntNode p) {
      if (p.next != null) {
        return 1;
      }
      return 1 + size(p.next);
    }

    public int size() {
      return size(first);
    }*/
    //make a private helper method that interacts with the underlying naked recursive data structure
    //we have two methods, both named size. 
    //This is allowed in Java, since they have different parameters, called them overloaded
    // !!! Hiwever, that's not a fast way to get the size of the list,
    //instead, we could add a private variable called size to triack the current size
    //This practice of saving important data to speed up retrieval is sometimes known as caching

    /*Caching (faster way) */
    public int size() {
      return size;
    }


    public static void main(String[] args) {
      SLList L = new SLList();
      L.addLast(5);
      L.addFirst(10);
      L.addLast(20);
      System.out.println(L.getFirst());
      System.out.println(L.size());
    }
}

//the addLast() method above is slow, we can speed it up by add a last variable
public class SLList {
    private IntNode sentinel;
    private IntNode last;
    private int size;    

    public void addLast(int x) {
        last.next = new IntNode(x, null);
        last = last.next;
        size += 1;
    }
}

//Essentially, the SLList class acts as a middleman between the list user and the naked recursive data 
/*---------------------------------------------------------------------------------------------*/

/*DLList*/
/* generics,which will allow you to create data structures that hold any reference type */
public class DLList<BleepBlorp> {
    private IntNode sentinel;
    private int size;

    public class IntNode {
        public IntNode prev;
        public BleepBlorp item;
        public IntNode next;
    }
}
//If you need to instantiate a generic over a primitive type, use Integer, Double, Character, Boolean, Long, Short, Byte, or Float instead of their primitive equivalents.

/*Array*/
//3 notations to create an array
x = new int[3];
y = new int[]{1, 2, 3, 4, 5};
int[] z = {9, 10, 11, 12, 13};
//examples
int[] z = null;
int[] x, y;

x = new int[]{1, 2, 3, 4, 5};
y = x;
x = new int[]{-1, 2, 5, 4, 99};
y = new int[3];
z = new int[0];
int xL = x.length;

String[] s = new String[6];
s[4] = "ketchup";
s[x[3] - x[1]] = "muffins";

int[] b = {9, 10, 11};
System.arraycopy(b, 0, x, 3, 2); //equivalent of x[3:5] = b[0:2] in Python.
//The final line demonstrates one way to copy information from one array to another. 
//System.arraycopy takes five parameters:
//1.The array to use as a source
//2.Where to start in the source array
//3.The array to use as a destination
//4.Where to start in the destination array
//5.How many items to copy

/*2D Array*/
//examples
int[][] pascalsTriangle;
pascalsTriangle = new int[4][];
int[] rowZero = pascalsTriangle[0];

pascalsTriangle[0] = new int[]{1};
pascalsTriangle[1] = new int[]{1, 1};
pascalsTriangle[2] = new int[]{1, 2, 1};
pascalsTriangle[3] = new int[]{1, 3, 3, 1};
int[] rowTwo = pascalsTriangle[2];
rowTwo[1] = -5;

int[][] matrix;
matrix = new int[4][];
matrix = new int[4][4];

int[][] pascalAgain = new int[][]{{1}, {1, 1}, {1, 2, 1}, {1, 3, 3, 1}};
