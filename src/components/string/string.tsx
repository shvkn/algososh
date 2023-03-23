import React, { useReducer } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./style.module.css";
import { reducer, initialState, reverse } from "./lib";

type TStringForm = { str: string };
const defaultValues: TStringForm = { str: "" };

export const StringComponent: React.FC = () => {
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
    reverse(data.str)(dispatch);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={"pb-30"}>
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
            <p className={"ml-8 mt-2"}>Максимум — 11 символов</p>
          </div>
        </form>
        <div className={`mt-30 ${styles.elements}`}>
          {elements.map((el, idx) => (
            <Circle key={idx} letter={el.value} state={el.state} extraClass={"ml-4 mr-4"} />
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
