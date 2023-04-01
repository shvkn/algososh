import { useCallback, useEffect, useRef, useState } from "react";

import { ElementStates, TElement } from "../../types";

import { setChangingState, setDefaultState } from "../../shared/utils";

import { IStack, Stack } from "./stack";

type TStackElement = TElement & { isTop: boolean };

export const useAnimatedStack = (animationDelay: number) => {
  const stackRef = useRef<IStack<TStackElement>>();
  const [elements, setElements] = useState<TStackElement[]>([]);
  const [isLoader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    stackRef.current = new Stack();
  }, []);

  const push = useCallback((value: string) => {
    setLoader(true);
    const stack = stackRef.current;
    if (!stack) {
      return;
    }
    const top = stack.peak();
    if (top) {
      top.isTop = false;
    }
    const newElement: TStackElement = {
      value,
      state: ElementStates.Changing,
      isTop: true
    };
    stack.push(newElement);
    setElements([...stack.toArray()]);
    setTimeout(() => {
      setDefaultState(newElement);
      setElements([...stack.toArray()]);
      setLoader(false);
    }, animationDelay);
  }, [animationDelay]);

  const pop = useCallback(() => {
    setLoader(true);
    const stack = stackRef.current;
    if (!stack) {
      return;
    }
    const currentTop = stack?.peak();
    if (!currentTop) {
      return;
    }
    setChangingState(currentTop);
    setElements([...stack.toArray()]);
    stack.pop();
    setTimeout(() => {
      const newTop = stack.peak();
      if (newTop) {
        newTop.isTop = true;
      }
      setElements([...stack.toArray()]);
      setLoader(false);
    }, animationDelay);
  }, [animationDelay]);

  const reset = useCallback(() => {
    const stack = stackRef.current;
    if (stack) {
      stack.clear();
      setElements([...stack.toArray()]);
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
