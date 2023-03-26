import { TElement } from "../../types/element";
import { DELAY_IN_MS } from "../../constants/delays";
import React from "react";
import { constructElement, setChangingState, setModifiedState, swap } from "../../shared/utils";

const TOGGLE_LOADER = "TOGGLE_LOADER";
const SET_ELEMENTS = "SET_ELEMENTS";

type TToggleLoaderAction = { type: typeof TOGGLE_LOADER }
type TSetElementsAction = { type: typeof SET_ELEMENTS; payload: TElement[] }

type ReducerAction =
  | TToggleLoaderAction
  | TSetElementsAction;

const toggleLoader = () => (dispatch: React.Dispatch<ReducerAction>) => {
  dispatch({ type: TOGGLE_LOADER });
};

const setElements = (elements: TElement[]) => (dispatch: React.Dispatch<ReducerAction>) => {
  dispatch({ type: SET_ELEMENTS, payload: elements });
};

type TState = {
  elements: TElement[];
  isLoader: boolean;
};

export const reducer = ((state: TState, action: ReducerAction) => {
  switch (action.type) {
    case TOGGLE_LOADER:
      return { ...state, isLoader: !state.isLoader };
    case SET_ELEMENTS:
      return { ...state, elements: action.payload };
    default:
      return state;
  }
});

export const initialState: TState = { elements: [], isLoader: false };

export const reversingGenerator = function* (elements: TElement[]) {
  let leftIndex = 0;
  let rightIndex = elements.length - 1;
  while (leftIndex <= rightIndex) {
    const leftElement = elements[leftIndex];
    const rightElement = elements[rightIndex];
    setChangingState(leftElement, rightElement);
    yield elements;
    if (leftIndex !== rightIndex) {
      swap(elements, leftIndex, rightIndex);
      yield elements;
    }
    setModifiedState(leftElement, rightElement);
    yield elements;
    leftIndex++;
    rightIndex--;
  }
  return elements;
};

export const reverse = (str: string) => (dispatch: React.Dispatch<ReducerAction>) => {
  const elements = str.split("").map((value: string) => constructElement(value));
  const generator = reversingGenerator(elements);
  toggleLoader()(dispatch);
  setElements(elements)(dispatch);
  const ticker = setInterval(() => {
    const { value: elements, done } = generator.next();
    setElements(elements)(dispatch);
    if (done) {
      toggleLoader()(dispatch);
      clearInterval(ticker);
    }
  }, DELAY_IN_MS);
};
