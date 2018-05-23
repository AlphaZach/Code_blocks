

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
//firstly, rename the InList class to IntNode, make it not public, since only one public class in one java file
class IntNode {
    public int item;
    public IntNode next;

    public IntNode(int i, IntNode n) {
        item = i;
        next = n;
    }
}

//then create a new class called SLList
public class SLList {
    public IntNode first;

    public SLList(int x) {
    first = new IntNode(x, null);
    }
//now if we wanna make a list with one element,
//just L = new SLList(value),
//instead of L = new IntList(value, null), become more friendly

    /*add x to the front of the list.*/
    public void addFirst(int x) {
      first = new IntNode(x, first);
    }

    /*return the first of the list*/
    public int getFirst() {
      return first.item;
    }
}
//Essentially, the SLList class acts as a middleman between the list user and the naked recursive data 





/*---------------------------------------------------------------------------------------------*/

