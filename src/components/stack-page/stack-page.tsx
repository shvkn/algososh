import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./styles.module.css";
import { Circle } from "../ui/circle/circle";
import { useStack } from "./lib";

type TForm = { value: string };

const defaultValues: TForm = { value: "" };

export const StackPage: React.FC = () => {
  const {
    control,
    handleSubmit,
    reset: resetForm,
    formState: { isValid, isDirty }
  } = useForm({ defaultValues });

  const { elements, push, pop, reset, isLoader } = useStack();

  const onSubmit = (data: TForm) => {
    resetForm(defaultValues);
    const { value } = data;
    push(value);
  };

  return (
    <SolutionLayout title="Стек">
      <form onSubmit={handleSubmit(onSubmit)} className={styles.panel}>
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
              />
            )}
          />
          <Button type={"submit"}
                  text={"Добавить"}
                  disabled={isLoader || !isValid || !isDirty || elements.length >= 20}
                  extraClass={"ml-6"} />
          <Button type={"button"}
                  text={"Удалить"}
                  onClick={() => pop()}
                  disabled={isLoader || elements.length === 0}
                  extraClass={"ml-6"} />
          <Button type={"button"}
                  text={"Очистить"}
                  disabled={isLoader || elements.length === 0}
                  onClick={() => reset()}
                  extraClass={"ml-40"} />
        </div>
        <div className={styles.row}>
          <p className={"ml-8 mt-2"}>Максимум - 4 символа</p>
        </div>
      </form>
      <div className={styles.stack}>
        {elements.map(({ value, state, isTop }, idx) => {
          return <Circle key={idx}
                         letter={value.toString()}
                         index={idx}
                         head={isTop ? "top" : ""}
                         state={state}
                         extraClass={"ml-8 mr-8 mb-40"} />;
        })}
      </div>
    </SolutionLayout>
  );
};
