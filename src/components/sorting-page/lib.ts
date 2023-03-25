import React from "react";
import {
  constructElement,
  setChangingState,
  setDefaultState,
  setModifiedState,
  swap
} from "../../shared/utils";
import { TElement } from "../../types/element";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";


export enum SortingAlgorithm {
  BubbleSort,
  SelectionSort
}

const TOGGLE_LOADER = "TOGGLE_LOADER";
const SET_ELEMENTS = "SET_ELEMENTS";
const SELECT_SORTING_ALGORITHM = "SELECT_SORTING_ALGORITHM";
const SET_DIRECTION = "SET_DIRECTION";
const SET_DONE = "SET_DONE";

type TToggleLoaderAction = {
  type: typeof TOGGLE_LOADER
};

type TSetElementsAction = {
  type: typeof SET_ELEMENTS;
  payload: TElement[]
};

type TSetSortingAlgorithmAction = {
  type: typeof SELECT_SORTING_ALGORITHM;
  payload: SortingAlgorithm
};

type TSetDirectionAlgorithmAction = {
  type: typeof SET_DIRECTION;
  payload: Direction
};

type TSetDoneAction = {
  type: typeof SET_DONE;
  payload: boolean
};

export type TReducerAction =
  | TToggleLoaderAction
  | TSetElementsAction
  | TSetSortingAlgorithmAction
  | TSetDirectionAlgorithmAction
  | TSetDoneAction;

export const toggleLoader = () => {
  return (dispatch: React.Dispatch<TReducerAction>) => {
    dispatch({ type: TOGGLE_LOADER });
  };
};

export const setElements = (elements: TElement[]) => {
  return (dispatch: React.Dispatch<TReducerAction>) => {
    dispatch({ type: SET_ELEMENTS, payload: elements });
  };
};

export const setSortingAlgorithm = (algorithm: SortingAlgorithm) => {
  return (dispatch: React.Dispatch<TReducerAction>) => {
    dispatch({ type: SELECT_SORTING_ALGORITHM, payload: algorithm });
  };
};

export const setDirection = (direction: Direction) => {
  return (dispatch: React.Dispatch<TReducerAction>) => {
    dispatch({ type: SET_DIRECTION, payload: direction });
  };
};

export const setDone = (isSorted: boolean) => (dispatch: React.Dispatch<TReducerAction>) => {
  dispatch({ type: SET_DONE, payload: isSorted });
};

type TState = {
  elements: TElement[];
  isLoader: boolean;
  isDone: boolean;
  algorithm: SortingAlgorithm;
  direction: Direction;
};

export const sortingReducer = ((state: TState, action: TReducerAction) => {
  switch (action.type) {
    case TOGGLE_LOADER:
      return { ...state, isLoader: !state.isLoader };
    case SET_ELEMENTS:
      return { ...state, elements: action.payload };
    case SET_DONE:
      return { ...state, isDone: action.payload };
    case SELECT_SORTING_ALGORITHM:
      return { ...state, algorithm: action.payload };
    case SET_DIRECTION:
      return { ...state, direction: action.payload };
    default:
      return state;
  }
});

const getRandomInRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomArr = (minLength: number, maxLength: number, minVal = 0, maxVal = 100) => {
  return Array.from(
    { length: getRandomInRange(minLength, maxLength) },
    () => getRandomInRange(minVal, maxVal)
  );
};

export const generateRandomArray = () => (dispatch: React.Dispatch<TReducerAction>) => {
  const elements = randomArr(3, 17).map((i) => constructElement(String(i)));
  setElements(elements)(dispatch);
};

export const bubbleSort = function* (elements: TElement[], direction: Direction) {
  let i = 0;
  let keepSorting = true;
  while (keepSorting) {
    keepSorting = false;
    for (let j = 0; j <= elements.length - i - 2; j++) {
      const left = elements[j];
      const right = elements[j + 1];
      setChangingState(left, right);
      const leftVal = Number(left.value);
      const rightVal = Number(right.value);

      const shouldSort = direction === Direction.Ascending
        ? leftVal > rightVal
        : leftVal < rightVal;

      if (shouldSort) {
        swap(elements, j + 1, j);
        yield elements;
        keepSorting = true;
      }
      setDefaultState(left, right);
    }
    i++;
  }
  setModifiedState(...elements);
  return elements;
};

export const selectionSort = function* (elements: TElement[], direction: Direction) {
  const lastIndex = elements.length - 1;
  for (let i = 0; i <= lastIndex - 1; i++) {
    let min = i;
    setChangingState(elements[i]);
    for (let j = i + 1; j <= lastIndex; j++) {
      setChangingState(elements[j]);
      yield elements;
      const currentVal = Number(elements[j].value);
      const minVal = Number(elements[min].value);
      const shouldSort = direction === Direction.Ascending
        ? minVal > currentVal
        : minVal < currentVal;
      if (shouldSort) {
        min = j;
      }
      setDefaultState(elements[j]);
    }
    setChangingState(elements[min]);
    swap(elements, i, min);
    setDefaultState(elements[min]);
    setModifiedState(elements[i]);
  }
  setModifiedState(elements[lastIndex]);
  return elements;
};

export const sort = (
  elements: TElement[],
  algorithm: SortingAlgorithm,
  direction: Direction,
  resetStates = false
) => (dispatch: React.Dispatch<TReducerAction>) => {
  if (resetStates) {
    setDefaultState(...elements);
  }
  setDone(false)(dispatch);
  toggleLoader()(dispatch);
  setDirection(direction)(dispatch);
  const bubble = () => bubbleSort(elements, direction);
  const selection = () => selectionSort(elements, direction);

  const generator =
    algorithm === SortingAlgorithm.BubbleSort
      ? bubble()
      : algorithm === SortingAlgorithm.SelectionSort
        ? selection()
        : bubble();

  const ticker = setInterval(() => {
    const { value, done } = generator.next();
    setElements(value)(dispatch);
    if (done) {
      toggleLoader()(dispatch);
      setDone(true)(dispatch);
      clearInterval(ticker);
    }
  }, SHORT_DELAY_IN_MS);
};
