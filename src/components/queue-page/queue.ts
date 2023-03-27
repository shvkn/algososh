export interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | undefined;
}

export class Queue<T> implements IQueue<T> {
  private container: T[] = [];
  private length: number;
  private tail: number;
  private head: number;
  private readonly size: number;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size).fill(null);
    this.tail = -1;
    this.head = 0;
    this.length = 0;
  }

  dequeue(): void {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }
    this.head += 1;
    this.length -= 1;
  }

  enqueue(item: T): void {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.tail += 1;
    this.length += 1;
    this.container[this.tail % this.size] = item;
  }

  peak(): T | undefined {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }
    return this.container[this.head % this.size];
  }

  isEmpty(): boolean {
    return this.length === 0;
  }

  get items(): T[] {
    if (this.length === 0) return [];
    if (this.tailIndex < this.headIndex) {
      return [
        ...this.container.slice(this.headIndex),
        ...this.container.slice(0, this.tailIndex + 1)
      ];
    }
    return this.container.slice(this.headIndex, this.tailIndex + 1);
  }

  get tailIndex() {
    return this.tail % this.size;
  }

  get headIndex() {
    return this.head % this.size;
  }

  reset() {
    this.container = Array(this.size).fill(null);
    this.length = 0;
    this.tail = -1;
    this.head = 0;
  }
}
