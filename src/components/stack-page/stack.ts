export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | undefined;
  reset: () => void;
  items: T[];
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];
  push = (item: T) => {
    this.container.push(item);
  }
  pop = () => {
    this.container.pop();
  }
  peak = () => {
    return this.container.at(this.container.length - 1);
  }
  reset = () => {
    this.container = [];
  }
  get items() {
    return this.container;
  }

}
