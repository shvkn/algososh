import React from "react";
import { Controller, useForm } from "react-hook-form";

import { Button, Circle, Input, SolutionLayout } from "../ui";

import { HEAD, SHORT_DELAY_IN_MS, TAIL } from "../../constants";

import { useAnimatedQueue } from "./lib";
import styles from "./styles.module.css";

type TForm = { value: string };
const defaultValues: TForm = { value: "" };

export const QueuePage: React.FC = () => {
  const {
    control,
    handleSubmit,
    reset: resetForm,
    formState: { isValid, isDirty }
  } = useForm({ defaultValues });

  const {
    elements,
    currentAnimation,
    enqueue,
    dequeue,
    reset
  } = useAnimatedQueue(7, SHORT_DELAY_IN_MS);

  const onSubmit = (data: TForm) => {
    resetForm(defaultValues);
    const { value } = data;
    enqueue(value);
  };

  const isIdle = currentAnimation === null;

  return (
    <SolutionLayout title="Очередь">
      <form onSubmit={handleSubmit(onSubmit)} className={styles.panel}>
        <div className={styles.row}>
          <Controller
            name={"value"}
            control={control}
            rules={{ pattern: /^\d{1,4}$/ }}
            render={({ field: { onChange, name, value } }) => (
              <Input
                id={name}
                onChange={onChange}
                name={name}
                minLength={1}
                maxLength={4}
                isLimitText={true}
                value={value}
                required={true}
                extraClass={styles.input}
                disabled={!isIdle}
              />
            )}
          />
          <Button type={"submit"}
                  text={"Добавить"}
                  disabled={!isIdle || !isValid || !isDirty || elements?.length >= 20}
                  isLoader={currentAnimation === "Enqueue"}
                  extraClass={"ml-6"} />

          <Button type={"button"}
                  text={"Удалить"}
                  onClick={() => dequeue()}
                  disabled={!isIdle || elements?.length === 0}
                  isLoader={currentAnimation === "Dequeue"}
                  extraClass={"ml-6"} />

          <Button type={"button"}
                  text={"Очистить"}
                  disabled={!isIdle || elements?.length === 0}
                  onClick={() => reset()}
                  extraClass={"ml-40"} />
        </div>
      </form>
      <div className={styles.queue}>
        {elements.map(({ value, state }, idx, { length }) => {
          return <Circle key={idx}
                         letter={value.toString()}
                         index={idx}
                         head={idx === 0 ? HEAD : ""}
                         tail={idx === length - 1 ? TAIL : ""}
                         state={state}
                         extraClass={"ml-8 mr-8 mb-40"} />;
        })}
      </div>
    </SolutionLayout>
  );
};
