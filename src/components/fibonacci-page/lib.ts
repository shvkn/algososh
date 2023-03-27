import { TElement } from "../../types/element";
import React from "react";
import { constructElement } from "../../shared/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

const TOGGLE_LOADER = "TOGGLE_LOADER";
const SET_ELEMENTS = "SET_ELEMENTS";
const ADD_ELEMENT = "ADD_ELEMENT";
const RESET_STATE = "RESET_STATE";

type TToggleLoaderAction = { type: typeof TOGGLE_LOADER }
type TSetElementsAction = { type: typeof SET_ELEMENTS; payload: TElement[] }
type TAddElementAction = { type: typeof ADD_ELEMENT; payload: TElement };
type TResetStateAction = { type: typeof RESET_STATE };

type ReducerAction =
  | TToggleLoaderAction
  | TSetElementsAction
  | TAddElementAction
  | TResetStateAction;

const toggleLoader = () => (dispatch: React.Dispatch<ReducerAction>) => {
  dispatch({ type: TOGGLE_LOADER });
};

const setElements = (elements: TElement[]) => (dispatch: React.Dispatch<ReducerAction>) => {
  dispatch({ type: SET_ELEMENTS, payload: elements });
};

const addElement = (element: TElement) => (dispatch: React.Dispatch<ReducerAction>) => {
  dispatch({ type: ADD_ELEMENT, payload: element });
};

const resetState = () => (dispatch: React.Dispatch<ReducerAction>) => {
  dispatch({ type: RESET_STATE });
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
    case ADD_ELEMENT:
      return { ...state, elements: [...state.elements, action.payload] };
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
});

export const initialState: TState = { elements: [], isLoader: false };

const getFibonacciList = (n: number, current = 0, next = 1, numbers: number[] = []): number[] => {
  return numbers.length === n
    ? numbers
    : getFibonacciList(n, next, current + next, [...numbers, current]);
};

export const fibonacci = (n: number) => (dispatch: React.Dispatch<ReducerAction>) => {
  resetState()(dispatch);
  toggleLoader()(dispatch);
  const numbers = getFibonacciList(n + 2);
  let index = 1;
  const ticker = setInterval(() => {
    if (index >= numbers.length) {
      toggleLoader()(dispatch);
      clearInterval(ticker);
    } else {
      const element = constructElement(String(numbers[index]));
      addElement(element)(dispatch);
      index++;
    }
  }, SHORT_DELAY_IN_MS);
};
