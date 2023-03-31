import { ElementStates, TElement } from "../types";

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const constructElement = (
  value: string,
  state: ElementStates = ElementStates.Default
): TElement => ({
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
export const getRandomInRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
export const randomArr = (minLength: number, maxLength: number, minVal = 0, maxVal = 100) => {
  return Array.from(
    { length: getRandomInRange(minLength, maxLength) },
    () => getRandomInRange(minVal, maxVal)
  );
};
export const constructElements = (arr: string[] | number[]) => {
  return arr.map((item) => constructElement(item.toString()));
};
