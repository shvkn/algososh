import React, { useReducer } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "../string/style.module.css";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { fibonacci, initialState, reducer } from "./lib";

type TStringForm = { num: string };
const defaultValues: TStringForm = { num: "" };

export const FibonacciPage: React.FC = () => {

  const {
    control,
    handleSubmit,
    reset: resetForm,
    formState: { isValid, isDirty }
  } = useForm({ defaultValues });

  const [{
    elements,
    isLoader
  }, dispatch] = useReducer(reducer, initialState);

  const onSubmit = (data: TStringForm) => {
    resetForm();
    fibonacci(Number(data.num))(dispatch);
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
                  onChange={onChange}
                  name={name}
                  value={value}
                  required={true}
                  disabled={isLoader}
                />
              )}
            />
            <Button
              type={"submit"}
              text={"Развернуть"}
              isLoader={isLoader}
              extraClass={"ml-6"}
              disabled={!isValid || !isDirty}
            />
          </div>
          <div className={styles.row}>
            <p className={"ml-8 mt-2"}>Максимальное число — 19</p>
          </div>
        </form>
      </div>
      <div className={`${styles.elements}`}>
        <div className={styles.elementsRow}>
          {elements.slice(0, 10).map((el, idx) => (
            <div key={idx} className={styles.elementWrapper}>
              <Circle letter={el.value} index={idx} state={el.state}
                      extraClass={"ml-4 mr-4"} />
            </div>
          ))}
        </div>
        <div className={styles.elementsRow}>
          {elements.slice(10, 20).map((el, idx) => (
            <Circle key={idx} letter={el.value} index={10 + idx} state={el.state}
                    extraClass={"ml-4 mr-4"} />
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
