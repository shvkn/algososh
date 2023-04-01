export interface IStack<T> {
  push: (item: T) => T;
  pop: () => T | undefined;
  peak: () => T | undefined;
  clear: () => void;
  toArray: () => T[];
  size: () => number;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];
  push = (item: T) => {
    this.container.push(item);
    return item;
  }
  size = () => this.container.length;
  pop = () => this.container.pop()
  peak = () => this.container.at(this.container.length - 1)
  clear = () => this.container = []
  toArray = () => this.container
}
