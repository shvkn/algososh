import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./styles.module.css";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useQueue } from "./lib";
import { Circle } from "../ui/circle/circle";

type TForm = { value: string };

const defaultValues: TForm = { value: "" };

export const QueuePage: React.FC = () => {
  const {
    control,
    handleSubmit,
    reset: resetForm,
    formState: { isValid, isDirty }
  } = useForm({ defaultValues });

  const { elements, isLoader, enqueue, dequeue, reset } = useQueue(7);

  const onSubmit = (data: TForm) => {
    resetForm(defaultValues);
    const { value } = data;
    enqueue(value);
  };
  return (
    <SolutionLayout title="Очередь">
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
                  disabled={isLoader || !isValid || !isDirty || elements?.length >= 20}
                  extraClass={"ml-6"} />
          <Button type={"button"}
                  text={"Удалить"}
                  onClick={() => dequeue()}
                  disabled={isLoader || elements?.length === 0}
                  extraClass={"ml-6"} />
          <Button type={"button"}
                  text={"Очистить"}
                  disabled={isLoader || elements?.length === 0}
                  onClick={() => reset()}
                  extraClass={"ml-40"} />
        </div>
        <div className={styles.row}>
          <p className={"ml-8 mt-2"}>Максимум - 4 символа</p>
        </div>
      </form>
      <div className={styles.queue}>
        {elements.map(({ value, state }, idx) => {
          return <Circle key={idx}
                         letter={value.toString()}
                         index={idx}
                         head={idx === 0 ? "head" : ""}
                         tail={idx === elements.length - 1 ? "tail" : ""}
                         state={state}
                         extraClass={"ml-8 mr-8 mb-40"} />;
        })}
      </div>
    </SolutionLayout>
  );
};
