import { useCallback, useState } from "react";

import {
  constructElement,
  constructElements,
  delay,
  randomArr,
  setChangingState,
  setDefaultState,
  setModifiedState,
  swap
} from "../../shared/utils";

import { Direction, TElement } from "../../types";

export enum SortingAlgorithm {
  BubbleSort,
  SelectionSort
}

export const useAnimatedSorting = (animationDelay: number) => {
  const [elements, setElements] = useState<TElement[]>([]);
  const [direction, setDirection] = useState<Direction>(Direction.Ascending);
  const [algorithm, setAlgorithm] = useState<SortingAlgorithm>(SortingAlgorithm.SelectionSort);
  const [isAnimation, setAnimation] = useState(false);
  const [array, setArray] = useState<number[]>([]);

  const randomArray = useCallback((min: number, max: number): void => {
    const arr = randomArr(min, max);
    setArray(arr);
    setElements(constructElements(arr));
  }, []);

  const selectionSort = async (
    elementsArr: TElement[],
    direction: Direction = Direction.Ascending
  ): Promise<number[]> => {
    if (elementsArr.length === 0) {
      return [];
    }
    const arr = [...elementsArr];
    const lastIndex = arr.length - 1;
    for (let i = 0; i <= lastIndex - 1; i++) {
      let min = i;
      setChangingState(arr[i]);
      for (let j = i + 1; j <= lastIndex; j++) {
        const right = arr[j];
        setChangingState(right);
        await delay(animationDelay);
        setElements([...arr]);
        const currentVal = Number(right.value);
        const minVal = Number(arr[min].value);
        const shouldSort = direction === Direction.Ascending
          ? minVal > currentVal
          : minVal < currentVal;
        if (shouldSort) {
          min = j;
        }
        setDefaultState(right);
      }
      setChangingState(arr[min]);
      swap(arr, i, min);
      setDefaultState(arr[min]);
      setModifiedState(arr[i]);
    }
    setModifiedState(arr[lastIndex]);
    setElements([...arr]);
    return arr.map(({ value }) => Number(value));
  };

  const bubbleSort = async (
    elementsArr: TElement[],
    direction: Direction = Direction.Ascending
  ): Promise<number[]> => {
    if (elementsArr.length === 0) {
      return [];
    }
    const arr = [...elementsArr];
    let i = 0;
    let keepSorting = true;
    while (keepSorting) {
      keepSorting = false;
      for (let j = 0; j <= arr.length - i - 2; j++) {
        const left = arr[j];
        const right = arr[j + 1];
        setChangingState(left, right);
        const leftVal = Number(left.value);
        const rightVal = Number(right.value);

        const shouldSort = direction === Direction.Ascending
          ? leftVal > rightVal
          : leftVal < rightVal;

        if (shouldSort) {
          swap(arr, j + 1, j);
          await delay(animationDelay);
          setElements([...arr]);
          keepSorting = true;
        }
        setDefaultState(left, right);
      }
      i++;
    }
    setModifiedState(...arr);
    return arr.map(({ value }) => Number(value));
  };

  const sort = async (arr: number[]): Promise<number[]> => {
    const elementsArr = arr.map((item) => constructElement(item.toString()));
    setElements(elementsArr);
    setAnimation(true);
    switch (algorithm) {
      case SortingAlgorithm.BubbleSort:
        return bubbleSort(elementsArr, direction).finally(() => setAnimation(false));
      case SortingAlgorithm.SelectionSort:
        return selectionSort(elementsArr, direction).finally(() => setAnimation(false));
    }
  };

  return {
    elements,
    direction,
    algorithm,
    isAnimation,
    array,
    setArray,
    setDirection,
    setAlgorithm,
    sort,
    randomArray,
  };
};
