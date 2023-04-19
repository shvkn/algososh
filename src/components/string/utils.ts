import { useState } from "react";

import { ElementStates, TElement } from "../../types";

import { constructElement, delay, swap } from "../../shared/utils";

export const useAnimatedReverse = (animationDelay: number) => {
  const [elements, setElements] = useState<TElement[]>([]);
  const [isAnimation, setAnimation] = useState(false);

  const reverse = async (str: string) => {
    if (str.length === 0) {
      return "";
    }
    setAnimation(true);
    const arr = str.split("").map((value: string) => constructElement(value));
    setElements(arr);
    let left = 0;
    let right = arr.length - 1;
    await delay(animationDelay);

    while (left <= right) {
      const leftEl = arr[left];
      const rightEl = arr[right];

      leftEl.state = ElementStates.Changing;
      rightEl.state = ElementStates.Changing;
      setElements([...arr]);

      await delay(animationDelay);
      if (left !== right) {
        swap(arr, left, right);
      }
      leftEl.state = ElementStates.Modified;
      rightEl.state = ElementStates.Modified;
      setElements([...arr]);

      left += 1;
      right -= 1;
    }
    setAnimation(false);
    return arr.map(({ value }) => value).join("");
  };

  return {
    elements,
    isAnimation,
    reverse
  };
};
