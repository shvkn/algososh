import { useEffect, useRef, useState } from "react";

import { LinkedList } from "./list";

import { ElementStates, TListElement } from "../../types";

import { delay, setChangingState, setDefaultState, setModifiedState } from "../../shared/utils";

const setElementHead = (element: TListElement | undefined, head: TListElement) => {
  if (element) {
    element.head = head;
  }
};
const setElementTail = (element: TListElement | undefined, tail: TListElement) => {
  if (element) {
    element.tail = tail;
  }
};
const dropElementHead = (element: TListElement | undefined) => {
  if (element) {
    delete element.head;
  }
};

const dropElementValue = (element: TListElement | undefined) => {
  if (element) {
    element.value = "";
  }
};

export const useAnimatedLinkedList = (animationDelay: number) => {
  const listRef = useRef<LinkedList<TListElement>>();
  const [elements, setElements] = useState<TListElement[]>([]);
  const [currentAnimation, setAnimation] = useState<
    | "InsertAtHead"
    | "InsertAtTail"
    | "RemoveFromHead"
    | "RemoveFromTail"
    | "InsertAt"
    | "RemoveAt"
    | null>(null);

  useEffect(() => {
    listRef.current = new LinkedList<TListElement>();
  }, []);

  const size = elements.length;
  const isEmpty = elements.length === 0;

  const updateElements = async () => {
    const list = listRef.current;
    if (list === undefined) {
      return;
    }
    await delay(animationDelay);
    setElements(list.toArray());
  };

  const insertAtHead = async (value: string) => {
    const list = listRef.current;
    if (list === undefined) {
      return;
    }
    try {
      setAnimation("InsertAtHead");
      const newElement: TListElement = {
        value,
        state: ElementStates.Changing
      };
      const elementAtHead = list.head?.data;
      setElementHead(elementAtHead, newElement);
      await updateElements();
      list.insertAtHead(newElement);
      dropElementHead(elementAtHead);
      setModifiedState(newElement);
      await updateElements();
      setDefaultState(newElement);
      await updateElements();
    } catch (e) {
      console.log(e);
    } finally {
      setAnimation(null);
    }
  };

  const insertAtTail = async (value: string) => {
    const list = listRef.current;
    if (list === undefined) {
      return;
    }
    try {
      setAnimation("InsertAtTail");
      const newElement: TListElement = {
        value,
        state: ElementStates.Changing
      };
      const elementAtTail = list.tail?.data;
      setElementHead(elementAtTail, newElement);
      await updateElements();
      list.insertAtTail(newElement);
      dropElementHead(elementAtTail);
      setModifiedState(newElement);
      await updateElements();
      setDefaultState(newElement);
      await updateElements();
    } catch (e) {
      console.log(e);
    } finally {
      setAnimation(null);
    }
  };

  const removeFromHead = async () => {
    setAnimation("RemoveFromHead");
    const list = listRef.current;
    if (list === undefined || list.isEmpty()) {
      return;
    }
    const elementAtHead = list.head?.data;
    if (!elementAtHead) {
      return;
    }
    try {
      const removingElement = { ...elementAtHead, state: ElementStates.Changing };
      dropElementValue(elementAtHead);
      setElementTail(elementAtHead, removingElement);
      setElements(list.toArray());
      list.removeFromHead();
      await updateElements();
    } catch (e) {
      console.log(e);
    } finally {
      setAnimation(null);
    }
  };

  const removeAt = async (index: number) => {
    const list = listRef.current;
    if (list === undefined || list.isEmpty()) {
      return;
    }
    if (index < 0 || index > list.size - 1) {
      throw new Error("Index is out of range");
    }
    try {
      setAnimation("RemoveAt");
      const passedElements = [];
      let currIndex = 0;
      let curr = list.head;
      while (currIndex < index && curr) {
        passedElements.push(curr);
        setChangingState(curr.data);
        await updateElements();
        currIndex += 1;
        curr = curr.next;
      }
      const elementAtIndex = curr?.data;
      if (elementAtIndex) {
        const removingElement = { ...elementAtIndex, state: ElementStates.Changing };
        dropElementValue(elementAtIndex);
        setElementTail(elementAtIndex, removingElement);
      }
      await updateElements();
      list.removeAt(index);
      passedElements.forEach((el) => setDefaultState(el.data));
      await updateElements();
    } catch (e) {
      console.log(e);
    } finally {
      setAnimation(null);
    }
  };

  const insertAt = async (index: number, value: string) => {
    const list = listRef.current;
    if (list === undefined) {
      return;
    }
    if (index < 0 || index > list.size - 1) {
      throw new Error("Index is out of range");
    }
    try {
      setAnimation("InsertAt");
      const newElement: TListElement = {
        value,
        state: ElementStates.Changing
      };
      const modified = [];
      let i = 0;
      let currNode = list.head;
      let elementAtIndex;

      while (i <= index && currNode) {
        elementAtIndex = currNode.data;
        if (i < index) {
          modified.push(elementAtIndex);
          setChangingState(elementAtIndex);
        }
        setElementHead(elementAtIndex, newElement);
        await updateElements();
        dropElementHead(elementAtIndex);
        currNode = currNode.next;
        i += 1;
      }

      list.insertAt(index, newElement);
      dropElementHead(elementAtIndex);
      setModifiedState(newElement);
      await updateElements();
      setDefaultState(newElement);
      modified.forEach((elem) => setDefaultState(elem));
      await updateElements();
    } catch (e) {
      console.log(e);
    } finally {
      setAnimation(null);
    }
  };

  const removeFromTail = async () => {
    const list = listRef.current;
    if (list === undefined) {
      return;
    }
    try {
      setAnimation("RemoveFromTail");
      const elementAtTail = list.tail?.data;
      if (!elementAtTail) {
        return;
      }
      const removingElement = { ...elementAtTail, state: ElementStates.Changing };
      dropElementValue(elementAtTail);
      setElementTail(elementAtTail, removingElement);
      setElements(list.toArray());
      list.removeFromTail();
      await updateElements();
    } catch (e) {
      console.log(e);
    } finally {
      setAnimation(null);
    }
  };

  return {
    elements,
    size,
    isEmpty,
    insertAtHead,
    insertAtTail,
    removeFromHead,
    removeFromTail,
    removeAt,
    insertAt,
    currentAnimation
  };
};
