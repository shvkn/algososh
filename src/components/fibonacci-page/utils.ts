import { useState } from "react";

import { TElement } from "../../types";

import { constructElement, delay } from "../../shared/utils";

const getFibonacciNumbers = (
  n: number,
  current = 0,
  next = 1,
  numbers: number[] = []
): number[] => {
  return numbers.length === n
    ? numbers
    : getFibonacciNumbers(n, next, current + next, [...numbers, current]);
};

export const useFibonacci = (animationDelay: number) => {
  const [elements, setElements] = useState<TElement[]>([]);
  const [isAnimation, setAnimation] = useState(false);

  const fibonacci = async (n: number) => {
    setAnimation(true);
    const shift = 1;
    const numbers = getFibonacciNumbers(n + shift + 1);
    const arr: TElement[] = [];
    for(let i = shift; i < numbers.length; i += 1) {
      await delay(animationDelay);
      const element = constructElement(numbers[i].toString());
      arr.push(element)
      setElements([...arr]);
    }
    setAnimation(false);
    return elements.map(({ value }) => Number(value)).slice(shift);
  }

  return {
    elements,
    isAnimation,
    fibonacci
  }
};
