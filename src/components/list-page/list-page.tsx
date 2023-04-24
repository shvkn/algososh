import React, { useMemo } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

import { ArrowIcon, Button, Circle, Input, SolutionLayout } from "../ui";

import { HEAD, SHORT_DELAY_IN_MS, TAIL } from "../../constants";
import { ElementStates } from "../../types";

import { useAnimatedLinkedList } from "./utils";
import styles from "./styles.module.css";
import { randomArr } from "../../shared/utils";

type TForm = { value: string, index: string };
const defaultValues: TForm = { value: "", index: "" };
const initialArray = randomArr(3, 6);

export const ListPage: React.FC = () => {
  const list = useAnimatedLinkedList(initialArray, SHORT_DELAY_IN_MS);
  const {
    control,
    reset: resetForm,
    formState: { isValid }
  } = useForm({ defaultValues });

  const index = useWatch({ control, name: "index" });
  const value = useWatch({ control, name: "value" });

  const isIndexInRange = useMemo(() => {
    return index.length > 0 && Number(index) >= 0 && Number(index) < list.size;
  }, [index, list.size]);

  const insertAtHead = () => {
    if (value.length === 0) {
      return;
    }
    resetForm(defaultValues);
    void list.insertAtHead(value);
  };

  const insertAtTail = () => {
    if (value.length === 0) {
      return;
    }
    resetForm(defaultValues);
    void list.insertAtTail(value);
  };

  const removeFromHead = () => {
    resetForm(defaultValues);
    void list.removeFromHead();
  };

  const removeFromTail = () => {
    resetForm(defaultValues);
    void list.removeFromTail();
  };

  const insertAt = () => {
    if (value.length === 0 || index.length === 0 || Number.isNaN(index)) {
      return;
    }
    resetForm(defaultValues);
    void list.insertAt(Number(index), value);
  };

  const removeAt = () => {
    if (index.length === 0 || Number.isNaN(index)) {
      return;
    }
    resetForm(defaultValues);
    void list.removeAt(Number(index));
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container} data-test-id="list-page">
        <form>
          <div className={styles.row}>
            <Controller
              name={"value"}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, name, value } }) => (
                <Input
                  id={name}
                  onChange={onChange}
                  name={name}
                  maxLength={4}
                  value={value}
                  placeholder={"Введите значение"}
                  disabled={list.currentAnimation !== null}
                  extraClass={`${styles.input} cyInputValue`}
                  isLimitText={true}
                />
              )}
            />
            <Button
              type={"button"}
              text={"Добавить в head"}
              onClick={insertAtHead}
              isLoader={list.currentAnimation === "InsertAtHead"}
              disabled={!isValid}
              linkedList={"small"}
              extraClass={"ml-6 cyPrependButton"}
            />

            <Button
              type={"button"}
              text={"Добавить в tail"}
              onClick={insertAtTail}
              isLoader={list.currentAnimation === "InsertAtTail"}
              disabled={!isValid}
              linkedList={"small"}
              extraClass={"ml-6 cyAppendButton"}
            />

            <Button
              type={"button"}
              text={"Удалить из head"}
              onClick={removeFromHead}
              isLoader={list.currentAnimation === "RemoveFromHead"}
              disabled={list.isEmpty}
              linkedList={"small"}
              extraClass={"ml-6 cyShiftButton"}
            />

            <Button
              type={"button"}
              text={"Удалить из tail"}
              onClick={removeFromTail}
              isLoader={list.currentAnimation === "RemoveFromTail"}
              disabled={list.isEmpty}
              linkedList={"small"}
              extraClass={"ml-6 cyPopButton"}
            />
          </div>
          <div className={`mt-6 ${styles.row}`}>
            <Controller
              name={"index"}
              control={control}
              render={({ field: { onChange, name, value } }) => (
                <Input
                  type={"number"}
                  min={0}
                  max={list.size - 1}
                  id={name}
                  onChange={onChange}
                  name={name}
                  value={value}
                  disabled={list.currentAnimation !== null || list.isEmpty}
                  placeholder={"Введите индекс"}
                  extraClass={`${styles.input} cyInputIndex`}
                />
              )}
            />
            <Button
              type={"button"}
              text={"Добавить по индексу"}
              onClick={insertAt}
              isLoader={list.currentAnimation === "InsertAt"}
              disabled={!isValid || !isIndexInRange}
              linkedList={"big"}
              extraClass={"ml-6 cyAddByIndexButton"}
            />

            <Button
              type={"button"}
              text={"Удалить по индексу"}
              onClick={removeAt}
              isLoader={list.currentAnimation === "RemoveAt"}
              disabled={!isIndexInRange || list.isEmpty}
              linkedList={"big"}
              extraClass={"ml-6 cyDropByIndexButton"}
            />
          </div>
        </form>
        <div className={`${styles.list} cyElements`}>
          {list.elements.map((element, idx, { length }) => {
            const head = element.head ? (
              <Circle isSmall={true} state={element.head?.state} letter={element.head?.value} />
            ) : idx === 0 ? (
              HEAD
            ) : null;
            const tail = element.tail ? (
              <Circle isSmall={true} state={element.tail?.state} letter={element.tail?.value} />
            ) : idx === length - 1 ? (
              TAIL
            ) : null;

            return (
              <div key={idx} className={styles.node}>
                <Circle
                  letter={element.value?.toString()}
                  state={element.state}
                  head={head}
                  tail={tail}
                  index={idx}
                  extraClass={"cyCircle"}
                />
                {idx < list.size - 1 && (
                  <div className={styles.arrow}>
                    <ArrowIcon
                      fill={element.state === ElementStates.Changing ? "#d252e1" : "#0032ff"}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
