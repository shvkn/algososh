import { useEffect, useRef, useState } from "react";
import { LinkedList } from "./list";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../shared/utils";
import { TElement } from "../../types/element";

type TListElement = Partial<TElement> & {
  head?: TListElement;
  tail?: TListElement;
}

export const useLinkedList = () => {
  const listRef = useRef<LinkedList<TListElement>>();
  const [elements, setElements] = useState<TListElement[]>([]);
  const [isAnimation, setIsAnimation] = useState(false);

  useEffect(() => {
    listRef.current = new LinkedList<TListElement>();
  }, []);
  const size = elements.length;
  const isEmpty = elements.length === 0;

  const insertAtHead = async (value: string) => {
    const list = listRef.current;
    if (list === undefined) {
      return;
    }
    try {
      setIsAnimation(true);
      const newHead: TListElement = {
        value,
        state: ElementStates.Changing
      };
      const currentHead = list.head;
      if (currentHead) {
        currentHead.data.head = newHead;
      }
      setElements(list.toArray());
      list.insertAtHead(newHead);
      await delay(SHORT_DELAY_IN_MS);
      if (currentHead) {
        delete currentHead.data.head;
      }
      newHead.state = ElementStates.Modified;
      setElements(list.toArray());
      await delay(SHORT_DELAY_IN_MS);
      newHead.state = ElementStates.Default;
      setElements(list.toArray());
    } catch (e) {
      console.log(e);
    } finally {
      setIsAnimation(false);
    }
  };

  const insertAtTail = async (value: string) => {
    const list = listRef.current;
    if (list === undefined) {
      return;
    }
    try {
      setIsAnimation(true);
      const element: TListElement = {
        value,
        state: ElementStates.Changing
      };
      const currentTail = list.tail;
      if (currentTail) {
        currentTail.data.head = element;
      }
      setElements(list.toArray());
      list.insertAtTail(element);

      await delay(SHORT_DELAY_IN_MS);
      if (currentTail) {
        delete currentTail.data.head;
        delete currentTail.data.tail;
      }
      element.state = ElementStates.Modified;
      setElements(list.toArray());

      await delay(SHORT_DELAY_IN_MS);
      element.state = ElementStates.Default;
      setElements(list.toArray());
    } catch (e) {
      console.log(e);
    } finally {
      setIsAnimation(false);
    }
  };

  const removeFromHead = async () => {
    try {
      setIsAnimation(true);
      const list = listRef.current;
      if (list === undefined || list.isEmpty()) {
        return;
      }
      const currentHead = list.head;
      if (currentHead) {
        currentHead.data.tail = { ...currentHead.data, state: ElementStates.Changing };
        delete currentHead.data.value;
      }
      setElements(list.toArray());
      await delay(SHORT_DELAY_IN_MS);
      list.removeFromHead();
      setElements(list.toArray());
    } catch (e) {
      console.log(e);
    } finally {
      setIsAnimation(false);
    }
  };

  const removeAt = async (index: number) => {
    const list = listRef.current;
    if (list === undefined || list.isEmpty()) {
      return;
    }
    if (index < 0 || index > list.size - 1) {
      throw new Error("Index out of range");
    }
    try {
      setIsAnimation(true);
      if (index === 0) {
        return removeFromHead();
      } else if (index === list.size - 1) {
        return removeFromTail();
      }
      const passedElements = [];
      let currIndex = 0;
      let curr = list.head;
      while (currIndex < index && curr) {
        passedElements.push(curr);
        curr.data.state = ElementStates.Changing;
        await delay(SHORT_DELAY_IN_MS);
        setElements(list.toArray());
        currIndex += 1;
        curr = curr.next;
      }
      if (curr) {
        await delay(SHORT_DELAY_IN_MS);
        curr.data.state = ElementStates.Changing;
        curr.data.tail = { ...curr.data, state: ElementStates.Changing };
        delete curr.data.value;
      }
      setElements(list.toArray());
      await delay(SHORT_DELAY_IN_MS);
      list.removeAt(index);
      passedElements.forEach((el) => {
        el.data.state = ElementStates.Default;
      });
      setElements(list.toArray());
    } catch (e) {
      console.log(e);
    } finally {
      setIsAnimation(false);
    }
  };

  const insertAt = async (index: number, value: string) => {
    const list = listRef.current;
    if (list === undefined) {
      return;
    }
    if (index < 0 || index > list.size - 1) {
      console.log({ index });
      throw new Error("Index out of range");
    }
    if (index === 0) {
      return insertAtHead(value);
    } else if (index === list.size - 1) {
      return insertAtTail(value);
    }
    try {
      setIsAnimation(true);
      const element: TListElement = {
        value,
        state: ElementStates.Changing
      };
      const modified = [];
      let currIndex = 0;
      let curr = list.head;
      while (currIndex < index && curr) {
        modified.push(curr);
        curr.data.state = ElementStates.Changing;
        curr.data.head = element;
        await delay(SHORT_DELAY_IN_MS);
        setElements(list.toArray());
        delete curr.data.head;
        currIndex += 1;
        curr = curr.next;
      }
      if (curr) {
        curr.data.head = element;
        curr.data.state = ElementStates.Changing;
        await delay(SHORT_DELAY_IN_MS);
        setElements(list.toArray());
        curr.data.state = ElementStates.Default;
      }
      setElements(list.toArray());
      await delay(SHORT_DELAY_IN_MS);
      list.insertAt(element, index);
      if (curr) {
        delete curr.data.head;
        element.state = ElementStates.Modified;
        setElements(list.toArray());
        element.state = ElementStates.Default;
      }
      modified.forEach((el) => {
        el.data.state = ElementStates.Default;
      });
      await delay(SHORT_DELAY_IN_MS);
      setElements(list.toArray());
    } catch (e) {
      console.log(e);
    } finally {
      setIsAnimation(false);
    }
  };

  const removeFromTail = async () => {
    const list = listRef.current;
    if (list === undefined) {
      return;
    }
    try {
      setIsAnimation(true);
      const currentTail = list.tail;
      if (currentTail) {
        currentTail.data.tail = { ...currentTail.data, state: ElementStates.Changing };
        currentTail.data.value = "";
      }
      setElements(list.toArray());
      await delay(SHORT_DELAY_IN_MS);
      list.removeFromTail();
      setElements(list.toArray());
    } catch (e) {
      console.log(e);
    } finally {
      setIsAnimation(false);
    }
  };

  return {
    elements,
    isAnimation: isAnimation,
    size,
    isEmpty,
    insertAtHead,
    insertAtTail,
    removeFromHead,
    removeFromTail,
    removeAt,
    insertAt
  };
};
