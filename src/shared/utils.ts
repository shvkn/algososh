import { TElement } from "../types/element";
import { ElementStates } from "../types/element-states";

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const constructElement = <T>(value: T, state: ElementStates = ElementStates.Default) => ({
  value: value,
  state: state
});
const setState = (element: TElement, state: ElementStates): void => {
  element.state = state;
};
export const setDefaultState = <T extends TElement>(...elements: T[]): void => {
  elements.forEach((el) => setState(el, ElementStates.Default));
};
export const setChangingState = <T extends TElement>(...elements: T[]): void => {
  elements.forEach((el) => setState(el, ElementStates.Changing));
};
export const setModifiedState = <T extends TElement>(...elements: T[]): void => {
  elements.forEach((el) => setState(el, ElementStates.Modified));
};
export const swap = (arr: unknown[], firstIndex: number, secondIndex: number) => {
  const tmp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = tmp;
};
