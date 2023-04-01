interface IListNode<T> {
  data: T;
  next: IListNode<T> | null
}

class ListNode<T> implements IListNode<T>{
  public data
  public next;

  constructor(value: T, next: ListNode<T> | null = null) {
    this.data = value;
    this.next = next;
  }
}

interface ILinkedList<T> {
  head: IListNode<T> | null;
  tail: IListNode<T> | null;
  size: number;
  toArray: () => T[];
  prepend: (value: T) => IListNode<T>;
  append: (value: T) => IListNode<T>;
  addByIndex: (index: number, value: T) => IListNode<T>;
  deleteHead: () => IListNode<T> | null;
  deleteTail: () => IListNode<T> | null;
  deleteByIndex: (index: number) => IListNode<T> | null;
}

export class LinkedList<T> implements ILinkedList<T> {
  head: ListNode<T> | null = null;
  tail: ListNode<T> | null = null;
  size = 0;

  constructor(initArray?: T[]) {
    if (initArray) {
      initArray.map((item) => this.append(item));
    }
  }

  toArray() {
    const items = [];
    let current = this.head;
    while (current) {
      items.push(current.data);
      current = current.next;
    }
    return items;
  }

  isEmpty() {
    return this.size === 0;
  }

  prepend(value: T): ListNode<T> {
    const node = new ListNode(value);
    node.next = this.head;
    this.head = node;
    if (this.tail === null) {
      this.tail = node;
    }
    this.size += 1;
    return node;
  }

  append(value: T): ListNode<T> {
    if (this.tail === null || this.head === null || this.size === 0) {
      return this.prepend(value);
    }
    const node = new ListNode(value);
    this.tail.next = node;
    this.tail = node;
    this.size += 1;
    return node;
  }

  addByIndex(index: number, value: T) {
    if (index < 0 || index > this.size) {
      throw new Error("Index is out of range");
    }
    const node = new ListNode(value);
    if (index === 0) {
      return this.prepend(value);
    } else if (index === this.size) {
      return this.append(value);
    }
    let curr = this.head;
    let currIndex = 0;
    while (currIndex < index - 1 && curr) {
      curr = curr.next;
      currIndex += 1;
    }
    if (curr) {
      node.next = curr.next;
      curr.next = node;
      this.size += 1;
    }
    return node;
  }

  deleteHead() {
    const head = this.head;
    if (this.head === this.tail) {
     this.head = this.tail = null;
    } else if (this.head) {
      this.head = this.head.next;
    }
    this.size -= 1;
    return head;
  }

  deleteTail() {
    const tail = this.tail;
    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else if (this.head) {
      let current = this.head;
      let prev = null;
      while (current.next !== null) {
        prev = current;
        current = current.next;
      }
      if (prev) {
        prev.next = null;
        this.tail = prev;
      }
    }
    this.size -= 1;
    return tail;
  }

  deleteByIndex(index: number) {
    if (index < 0 || index > this.size - 1) {
      throw new Error("Index is out of range");
    }
    if (index === 0) {
      return this.deleteHead();
    } else if (index === this.size - 1) {
      return this.deleteTail();
    }
    let curr = this.head;
    let prev = null;
    let currIndex = 0;
    while (currIndex < index && curr) {
      prev = curr;
      curr = curr.next;
      currIndex += 1;
    }
    if (prev && curr) {
      prev.next = curr.next
    }
    this.size -= 1;
    return curr;
  }
}
