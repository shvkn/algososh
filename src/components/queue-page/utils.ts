import { useEffect, useRef, useState } from "react";

import { ElementStates, TElement } from "../../types";

import { constructElement, setChangingState, setDefaultState } from "../../shared/utils";

import { Queue } from "./queue";

export const useAnimatedQueue = (size: number, animationDelay: number) => {
  const queueRef = useRef<Queue<TElement>>();
  const [elements, setElements] = useState<TElement[]>([]);
  const [currentAnimation, setAnimation] = useState<
    | "Enqueue"
    | "Dequeue"
    | null>(null);

  useEffect(() => {
    queueRef.current = new Queue<TElement>(size);
  }, [size]);

  const enqueue = (value: string) => {
    try {
      const queue = queueRef.current;
      if (queue === undefined) {
        return;
      }
      const element: TElement = constructElement(value, ElementStates.Changing);
      queue.enqueue(element);
      setElements([...queue.items]);
      setAnimation("Enqueue");
      setTimeout(() => {
        setDefaultState(element);
        setElements([...queue.items]);
        setAnimation(null);
      }, animationDelay);
    } catch (e) {
      console.log(e);
    }
  };

  const dequeue = () => {
    try {
      const queue = queueRef.current;
      if (!queue) {
        return;
      }
      const peak = queue.peak();
      if (!peak) {
        return;
      }
      setChangingState(peak);
      setElements([...queue.items]);
      setAnimation("Dequeue");
      setTimeout(() => {
        queue.dequeue();
        setElements([...queue.items]);
        setAnimation(null);
      }, animationDelay);
    } catch (e) {
      console.log(e);
    }
  };

  const reset = () => {
    try {
      const queue = queueRef.current;
      if (!queue) {
        return;
      }
      queue.reset();
      setElements([...queue.items]);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    enqueue,
    elements,
    currentAnimation,
    dequeue,
    reset
  };
};
