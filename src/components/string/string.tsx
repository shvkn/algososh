import React from "react";
import { Controller, useForm } from "react-hook-form";

import { Button, Circle, Input, SolutionLayout } from "../ui";

import { useReverse } from "./lib";
import styles from "./style.module.css";

type TStringForm = { str: string };
const defaultValues: TStringForm = { str: "" };

export const StringComponent: React.FC = () => {
  const {
    control,
    handleSubmit,
    reset: resetForm,
    formState: { isValid, isDirty }
  } = useForm({ defaultValues });

  const { elements, reverse, isAnimation } = useReverse();

  const onSubmit = (data: TStringForm) => {
    resetForm();
    void reverse(data.str);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.row}>
            <Controller
              name={"str"}
              control={control}
              render={({ field: { onChange, name, value } }) => (
                <Input
                  id={name}
                  onChange={onChange}
                  name={name}
                  value={value}
                  maxLength={11}
                  required={true}
                  disabled={isAnimation}
                  isLimitText={true}
                />
              )}
            />
            <Button
              type={"submit"}
              text={"Развернуть"}
              isLoader={isAnimation}
              extraClass={"ml-6"}
              disabled={!isValid || !isDirty}
            />
          </div>
        </form>
        <div className={`${styles.elements}`}>
          {elements.map((el, idx) => (
            <Circle key={idx} letter={el.value} state={el.state} extraClass={"ml-4 mr-4"} />
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
