import { TElement } from "../../types/element";
import React from "react";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import {
  setChangingState,
  setDefaultState
} from "../../shared/utils";

const SET_STACK = "SET_STACK";
const TOGGLE_LOADER = "TOGGLE_LOADER";
const RESET_STATE_ACTION = "RESET_STATE_ACTION";

type TResetState = {
  type: typeof RESET_STATE_ACTION
};

type TSetStack = {
  type: typeof SET_STACK;
  payload: TStackElement[];
};

type TToggleLoader = {
  type: typeof TOGGLE_LOADER;
}

type TReducerAction =
  | TResetState
  | TSetStack
  | TToggleLoader;

type TStackElement = TElement & { isTop: boolean };

type TState = {
  stack: TStackElement[];
  isLoader: boolean;
  size: number;
};

export const initialState: TState = {
  stack: [],
  isLoader: false,
  size: 0,
};

export const stackReducer = (state: TState, action: TReducerAction) => {
    switch (action.type) {
      case SET_STACK: {
        const stack = action.payload;
        return { ...state, stack, size: stack.length };
      }
      case TOGGLE_LOADER:
        return { ...state, isLoader: !state.isLoader };
      case RESET_STATE_ACTION:
        return initialState;
      default:
        return state;
    }
  }
;
const setStackAction = (stack: TStackElement[]) => (dispatch: React.Dispatch<TReducerAction>) => {
  dispatch({ type: SET_STACK, payload: stack });
};

const toggleLoaderAction = () => (dispatch: React.Dispatch<TReducerAction>) => {
  dispatch({ type: TOGGLE_LOADER });
};

export const reset = () => (dispatch: React.Dispatch<TReducerAction>) => {
  dispatch({ type: RESET_STATE_ACTION });
};

export const push = (stack: TStackElement[], value: string) => {
  return (dispatch: React.Dispatch<TReducerAction>) => {
    const element: TStackElement = { value, state: ElementStates.Changing, isTop: true }
    const newStack = [...stack];

    const currentTop = newStack.pop();
    if (currentTop !== undefined) {
      currentTop.isTop = false;
      newStack.push(currentTop)
    }

    setStackAction([...newStack, element])(dispatch);
    setTimeout(() => {
      setDefaultState(element);
      setStackAction([...newStack, element])(dispatch);
    }, SHORT_DELAY_IN_MS);
  };
};

export const pop = (stack: TStackElement[]) => {
  return (dispatch: React.Dispatch<TReducerAction>) => {
    const newStack = [...stack];
    const top = newStack.pop();
    if (top === undefined) {
      return;
    }
    toggleLoaderAction()(dispatch);
    setChangingState(top);
    setStackAction([...newStack, top])(dispatch);
    setTimeout(() => {
      const currentTop = newStack.pop();
      if (currentTop !== undefined) {
        currentTop.isTop = true;
        newStack.push(currentTop);
      }
      setStackAction(newStack)(dispatch);
      toggleLoaderAction()(dispatch);
    }, SHORT_DELAY_IN_MS);
  };
};
