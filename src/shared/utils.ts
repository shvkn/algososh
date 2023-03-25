import { TElement } from "../types/element";
import { ElementStates } from "../types/element-states";

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const constructElement = (letter: string) => ({
  value: letter,
  state: ElementStates.Default
});
const setState = (element: TElement, state: ElementStates): void => {
  element.state = state;
};
export const setDefaultState = (...elements: TElement[]): void => {
  elements.forEach((el) => setState(el, ElementStates.Default));
};
export const setChangingState = (...elements: TElement[]): void => {
  elements.forEach((el) => setState(el, ElementStates.Changing));
};
export const setModifiedState = (...elements: TElement[]): void => {
  elements.forEach((el) => setState(el, ElementStates.Modified));
};
export const swap = (arr: unknown[], firstIndex: number, secondIndex: number) => {
  const tmp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = tmp;
};
