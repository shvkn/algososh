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
  insertAtHead: (value: T) => IListNode<T>;
  insertAtTail: (value: T) => IListNode<T>;
  insertAt: (index: number, value: T) => IListNode<T>;
  removeFromHead: () => IListNode<T> | null;
  removeFromTail: () => IListNode<T> | null;
  removeAt: (index: number) => IListNode<T> | null;
}

export class LinkedList<T> implements ILinkedList<T> {
  head: ListNode<T> | null = null;
  tail: ListNode<T> | null = null;
  size = 0;

  constructor(head?: ListNode<T>) {
    if (head) {
      this.head = head;
      let current: ListNode<T> | null = head;
      let size = 0;
      while (current) {
        current = current.next;
        size += 1;
      }
      this.tail = current;
      this.size = size;
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

  insertAtHead(value: T): ListNode<T> {
    const node = new ListNode(value);
    node.next = this.head;
    this.head = node;
    if (this.tail === null) {
      this.tail = node;
    }
    this.size += 1;
    return node;
  }

  insertAtTail(value: T): ListNode<T> {
    if (this.tail === null || this.head === null || this.size === 0) {
      return this.insertAtHead(value);
    }
    const node = new ListNode(value);
    this.tail.next = node;
    this.tail = node;
    this.size += 1;
    return node;
  }

  insertAt(index: number, value: T) {
    if (index < 0 || index > this.size) {
      throw new Error("Index is out of range");
    }
    const node = new ListNode(value);
    if (index === 0) {
      return this.insertAtHead(value);
    } else if (index === this.size) {
      return this.insertAtTail(value);
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

  removeFromHead() {
    const head = this.head;
    if (this.head === this.tail) {
     this.head = this.tail = null;
    } else if (this.head) {
      this.head = this.head.next;
    }
    this.size -= 1;
    return head;
  }

  removeFromTail() {
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

  removeAt(index: number) {
    if (index < 0 || index > this.size - 1) {
      throw new Error("Index is out of range");
    }
    if (index === 0) {
      return this.removeFromHead();
    } else if (index === this.size - 1) {
      return this.removeFromTail();
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
