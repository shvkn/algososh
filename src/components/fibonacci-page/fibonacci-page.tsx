import React from "react";
import { Controller, useForm } from "react-hook-form";

import { Button, Circle, Input, SolutionLayout } from "../ui";

import { SHORT_DELAY_IN_MS } from "../../constants";

import { useFibonacci } from "./utils";
import styles from "./styles.module.css";

type TStringForm = { num: string };
const defaultValues: TStringForm = { num: "" };

export const FibonacciPage: React.FC = () => {

  const {
    control,
    handleSubmit,
    reset: resetForm,
    formState: { isValid, isDirty }
  } = useForm({ defaultValues });

  const { elements, isAnimation, fibonacci } = useFibonacci(SHORT_DELAY_IN_MS);

  const onSubmit = (data: TStringForm) => {
    resetForm();
    void fibonacci(Number(data.num));
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.row}>
            <Controller
              name={"num"}
              control={control}
              rules={{ min: 1, max: 19 }}
              render={({ field: { onChange, name, value } }) => (
                <Input
                  id={name}
                  type={"number"}
                  min={1}
                  max={19}
                  onChange={onChange}
                  name={name}
                  value={value}
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
      </div>
      <div className={`${styles.elements}`}>
        {elements.map((el, idx) => (
          <Circle key={idx}
                  letter={el.value}
                  index={idx}
                  state={el.state}
                  extraClass={"ml-4 mr-4 mb-20"} />
        ))}
      </div>
    </SolutionLayout>
  );
};
