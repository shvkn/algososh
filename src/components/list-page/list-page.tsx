import React, { useMemo, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useLinkedList } from "./lib";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";

import styles from "./styles.module.css";

type TForm = { value: string, index: string };
const defaultValues: TForm = { value: "", index: "" };

enum ListMethods {
  InsertAtHead,
  InsertAtTail,
  RemoveFromHead,
  RemoveFromTail,
  InsertAt,
  RemoveAt
}

export const ListPage: React.FC = () => {
  const list = useLinkedList();
  const [method, setMethod] = useState<ListMethods | null>(null);
  const {
    control,
    reset: resetForm,
    formState: { isValid }
  } = useForm({ defaultValues });

  const index = useWatch({ control, name: "index" });
  const value = useWatch({ control, name: "value" });

  const isIndexInRange = useMemo(() => {
    return index.length > 0 && (Number(index) > -1 && Number(index) < list.size);
  }, [index, list.size]);

  const clearMethod = () => setMethod(null);

  const insertAtHead = () => {
    if (value.length === 0) {
      return;
    }
    setMethod(ListMethods.InsertAtHead);
    resetForm(defaultValues);
    list.insertAtHead(value)
      .then(clearMethod);
  };

  const insertAtTail = () => {
    if (value.length === 0) {
      return;
    }
    setMethod(ListMethods.InsertAtTail);
    resetForm(defaultValues);
    list.insertAtTail(value)
      .then(clearMethod);
  };

  const removeFromHead = () => {
    setMethod(ListMethods.RemoveFromHead);
    resetForm(defaultValues);
    list.removeFromHead()
      .then(clearMethod);
  };

  const removeFromTail = () => {
    setMethod(ListMethods.RemoveFromTail);
    resetForm(defaultValues);
    list.removeFromTail()
      .then(clearMethod);
  };

  const insertAt = () => {
    if (value.length === 0 || index.length === 0 || Number.isNaN(index)) {
      return;
    }
    setMethod(ListMethods.InsertAt);
    resetForm(defaultValues);
    list.insertAt(Number(index), value)
      .then(clearMethod);
  };

  const removeAt = () => {
    if (index.length === 0 || Number.isNaN(index)) {
      return;
    }
    setMethod(ListMethods.RemoveAt);
    resetForm(defaultValues);
    list.removeAt(Number(index))
      .then(clearMethod);
  };
  return (
    <SolutionLayout title="Связный список">
      <form className={styles.panel}>
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
                extraClass={styles.input}
              />
            )}
          />
          <Button type={"button"}
                  text={"Добавить в head"}
                  onClick={insertAtHead}
                  isLoader={method === ListMethods.InsertAtHead}
                  disabled={list.isAnimation || !isValid}
                  extraClass={`ml-6 ${styles.button}`} />

          <Button type={"button"}
                  text={"Добавить в tail"}
                  onClick={insertAtTail}
                  isLoader={method === ListMethods.InsertAtTail}
                  disabled={list.isAnimation || !isValid}
                  extraClass={`ml-6 ${styles.button}`} />

          <Button type={"button"}
                  text={"Удалить из head"}
                  onClick={removeFromHead}
                  isLoader={method === ListMethods.RemoveFromHead}
                  disabled={list.isAnimation || list.isEmpty}
                  extraClass={`ml-6 ${styles.button}`} />

          <Button type={"button"}
                  text={"Удалить из tail"}
                  onClick={removeFromTail}
                  isLoader={method === ListMethods.RemoveFromTail}
                  disabled={list.isAnimation || list.isEmpty}
                  extraClass={`ml-6 ${styles.button}`} />
        </div>
        <div className={styles.row}>
          <p className={"ml-8 mt-2"}>Максимум - 4 символа</p>
        </div>
        <div className={styles.row}>
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
                disabled={list.isAnimation || list.isEmpty}
                placeholder={"Введите индекс"}
                extraClass={styles.input}
              />
            )}
          />
          <Button type={"button"}
                  text={"Добавить по индексу"}
                  onClick={insertAt}
                  isLoader={method === ListMethods.InsertAt}
                  disabled={list.isAnimation || !isValid || !isIndexInRange}
                  extraClass={`ml-6 ${styles.button}`} />

          <Button type={"button"}
                  text={"Удалить по индексу"}
                  onClick={removeAt}
                  isLoader={method === ListMethods.RemoveAt}
                  disabled={list.isAnimation || !isIndexInRange || list.isEmpty}
                  extraClass={`ml-6 ${styles.button}`} />
        </div>
      </form>
      <div className={styles.list}>
        {list.elements.map((i, idx, { length }) => {
          const head = i.head
            ? <Circle isSmall={true} state={i.head?.state} letter={i.head?.value} />
            : idx === 0
              ? "head"
              : null;
          const tail = i.tail
            ? <Circle isSmall={true} state={i.tail?.state} letter={i.tail?.value} />
            : idx === length - 1
              ? "tail"
              : null;

          return (
            <div key={idx} className={styles.node}>
              <Circle letter={i.value?.toString()}
                      state={i.state}
                      head={head}
                      tail={tail}
                      index={idx} />
              {(idx < length - 1) ? (<ArrowIcon />) : null}
            </div>
          );
        })}
      </div>
    </SolutionLayout>
  );
};
