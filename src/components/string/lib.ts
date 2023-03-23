import { TElement } from "../../types/element";
import { DELAY_IN_MS } from "../../constants/delays";
import React from "react";
import {
  constructElement,
  delay,
  setChangingState,
  setModifiedState,
  swap
} from "../../shared/utils";

const animatedReverse = async (
  elements: TElement[],
  setElementsAsync: (elements: TElement[]) => Promise<void>,
  leftIndex = 0,
  rightIndex = elements.length - 1
) => {
  if (leftIndex > rightIndex) return;
  if (leftIndex === rightIndex) {
    const element = elements[leftIndex];

    setChangingState(element);
    await setElementsAsync(elements);

    setModifiedState(element);
    await setElementsAsync(elements);
    return;
  }
  const leftElement = elements[leftIndex];
  const rightElement = elements[rightIndex];

  setChangingState(leftElement, rightElement);
  await setElementsAsync(elements);

  swap(elements, leftIndex, rightIndex);
  await setElementsAsync(elements);

  setModifiedState(leftElement, rightElement);
  await setElementsAsync(elements);

  await animatedReverse(elements, setElementsAsync, leftIndex + 1, rightIndex - 1);
};

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

export const reverse = (str: string) => (dispatch: React.Dispatch<ReducerAction>) => {
  const update = async (elements: TElement[]) => {
    await delay(DELAY_IN_MS);
    setElements(elements)(dispatch);
  };
  const onFinally = (): void => toggleLoader()(dispatch);
  const elements = str.split("").map(constructElement);
  toggleLoader()(dispatch);
  setElements(elements)(dispatch);
  animatedReverse(elements, update).finally(onFinally);
};
