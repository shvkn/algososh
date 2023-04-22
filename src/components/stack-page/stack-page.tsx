import React from "react";
import { Controller, useForm } from "react-hook-form";

import { Button, Circle, Input, SolutionLayout } from "../ui";

import { SHORT_DELAY_IN_MS } from "../../constants";

import { useAnimatedStack } from "./utils";
import styles from "./styles.module.css";

type TForm = { value: string };
const defaultValues: TForm = { value: "" };

export const StackPage: React.FC = () => {
  const { elements, push, pop, reset, currentAnimation } = useAnimatedStack(SHORT_DELAY_IN_MS);
  const {
    control,
    handleSubmit,
    reset: resetForm,
    formState: { isValid, isDirty },
  } = useForm({ defaultValues });

  const onSubmit = (data: TForm) => {
    resetForm(defaultValues);
    const { value } = data;
    push(value);
  };

  const isIdle = currentAnimation === null;

  return (
    <SolutionLayout title="Стек">
      <form onSubmit={handleSubmit(onSubmit)} className={styles.panel} data-testId="stack-page">
        <div className={styles.row}>
          <Controller
            name={"value"}
            control={control}
            rules={{ maxLength: 4, pattern: /^\d+$/ }}
            render={({ field: { onChange, name, value } }) => (
              <Input
                id={name}
                onChange={onChange}
                name={name}
                value={value}
                required={true}
                extraClass={styles.input}
                maxLength={4}
                isLimitText={true}
              />
            )}
          />
          <Button
            type={"submit"}
            text={"Добавить"}
            disabled={!isIdle || !isValid || !isDirty || elements.length >= 20}
            isLoader={currentAnimation === "Push"}
            extraClass={"ml-6"}
          />

          <Button
            type={"button"}
            text={"Удалить"}
            onClick={() => pop()}
            disabled={!isIdle || elements.length === 0}
            isLoader={currentAnimation === "Pop"}
            extraClass={"ml-6"}
          />

          <Button
            type={"button"}
            text={"Очистить"}
            disabled={!isIdle || elements.length === 0}
            onClick={() => reset()}
            extraClass={"ml-40"}
          />
        </div>
      </form>
      <div className={styles.stack}>
        {elements.map(({ value, state, isTop }, idx) => {
          return (
            <Circle
              key={idx}
              letter={value.toString()}
              index={idx}
              head={isTop ? "top" : ""}
              state={state}
              extraClass={"ml-8 mr-8 mb-40"}
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
