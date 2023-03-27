import { IStack, Stack } from "./stack";
import { useCallback, useEffect, useRef, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { setChangingState, setDefaultState } from "../../shared/utils";
import { TElement } from "../../types/element";

export type TStackElement = TElement & { isTop: boolean };

export const useStack = () => {
  const stackRef = useRef<IStack<TStackElement>>();

  const [elements, setElements] = useState<TStackElement[]>([]);
  const [isLoader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    stackRef.current = new Stack();
  }, []);

  const push = useCallback((value: string) => {
    setLoader(true);
    const stack = stackRef.current;
    if (stack === undefined) {
      return;
    }
    const top = stack.peak();
    if (top !== undefined) {
      top.isTop = false;
    }
    const newElement: TStackElement = {
      value,
      state: ElementStates.Changing,
      isTop: true
    };
    stack.push(newElement);
    setElements([...(stack.items)]);
    setTimeout(() => {
      setDefaultState(newElement);
      setElements([...(stack.items)]);
      setLoader(false);
    }, SHORT_DELAY_IN_MS);
  }, []);

  const pop = useCallback(() => {
    setLoader(true);
    const stack = stackRef.current;
    if (stack === undefined) {
      return;
    }
    const currentTop = stack?.peak();
    if (currentTop === undefined) {
      return;
    }
    setChangingState(currentTop);
    setElements([...(stack.items)]);
    stack.pop();
    setTimeout(() => {
      const newTop = stack.peak();
      if (newTop !== undefined) {
        newTop.isTop = true;
      }
      setElements([...(stack.items)]);
      setLoader(false);
    }, SHORT_DELAY_IN_MS);
  }, []);

  const reset = useCallback(() => {
    const stack = stackRef.current;
    if (stack !== undefined) {
      stack.reset();
      setElements([...(stack.items)]);
    }
  }, []);

  return {
    elements,
    push,
    pop,
    reset,
    isLoader
  };
};
