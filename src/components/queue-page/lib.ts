import { useEffect, useRef, useState } from "react";
import { Queue } from "./queue";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { TElement } from "../../types/element";
import { constructElement, setDefaultState } from "../../shared/utils";

export const useQueue = (size: number) => {
  const queueRef = useRef<Queue<TElement>>();
  const [elements, setElements] = useState<TElement[]>([]);
  const [isLoader, setLoader] = useState<boolean>(false);

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
      setLoader(true);
      setTimeout(() => {
        setDefaultState(element);
        setElements([...queue.items]);
        setLoader(false);
      }, SHORT_DELAY_IN_MS);
    } catch (e) {
      console.log(e);
    }
  };

  const dequeue = () => {
    try {
      const queue = queueRef.current;
      if (queue === undefined) {
        return;
      }
      const peak = queue.peak();
      if (peak === undefined) {
        return;
      }
      peak.state = ElementStates.Changing;
      setElements([...queue.items]);
      setLoader(true);
      setTimeout(() => {
        queue.dequeue();
        setElements([...queue.items]);
        setLoader(false);
      }, SHORT_DELAY_IN_MS);
    } catch (e) {
      console.log(e);
    }
  };

  const reset = () => {
    try {
      const queue = queueRef.current;
      if (queue === undefined) {
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
    isLoader,
    dequeue,
    reset
  };
};
