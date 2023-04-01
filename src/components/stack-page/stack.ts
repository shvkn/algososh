export interface IStack<T> {
  push: (item: T) => T;
  pop: () => T | undefined;
  peak: () => T | undefined;
  reset: () => void;
  toArray: () => T[];
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];
  push = (item: T) => {
    this.container.push(item);
    return item;
  }
  pop = () => this.container.pop()
  peak = () => this.container.at(this.container.length - 1)
  reset = () => this.container = []
  toArray = () => this.container
}
