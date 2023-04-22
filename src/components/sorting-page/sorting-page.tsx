import React, { FormEvent, useEffect } from "react";

import { Button, Column, RadioInput, SolutionLayout } from "../ui";

import { Direction } from "../../types";

import { SortingAlgorithm, useAnimatedSorting } from "./utils";
import styles from "./styles.module.css";
import { SHORT_DELAY_IN_MS } from "../../constants";

export const SortingPage: React.FC = () => {

  const {
    elements,
    direction,
    algorithm,
    isAnimation,
    setDirection,
    setAlgorithm,
    sort,
    array,
    setArray,
    randomArray
  } = useAnimatedSorting(SHORT_DELAY_IN_MS);

  useEffect(() => {
    randomArray(3, 17);
  }, [randomArray]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    sort(array).then((sortedArray) => setArray(sortedArray));
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.panel} onSubmit={handleSubmit} data-testId={"sorting-page"}>
        <fieldset className={styles.group}>
          <RadioInput label={"Выбор"}
                      checked={algorithm === SortingAlgorithm.SelectionSort}
                      onChange={() => setAlgorithm(SortingAlgorithm.SelectionSort)}
                      disabled={isAnimation} />

          <RadioInput label={"Пузырек"}
                      checked={algorithm === SortingAlgorithm.BubbleSort}
                      onChange={() => setAlgorithm(SortingAlgorithm.BubbleSort)}
                      disabled={isAnimation}
                      extraClass={"ml-20"} />
        </fieldset>
        <div className={styles.buttons}>
          <Button type={"submit"}
                  sorting={Direction.Ascending}
                  text={"По возрастания"}
                  isLoader={isAnimation && direction === Direction.Ascending}
                  disabled={isAnimation}
                  onClick={() => setDirection(Direction.Ascending)}
                  extraClass={`${styles.button}`} />

          <Button type={"submit"}
                  sorting={Direction.Descending}
                  text={"По убыванию"}
                  isLoader={isAnimation && direction === Direction.Descending}
                  disabled={isAnimation}
                  onClick={() => setDirection(Direction.Descending)}
                  extraClass={`ml-6 ${styles.button}`} />

          <Button type={"button"}
                  text={"Новый массив"}
                  disabled={isAnimation}
                  onClick={() => randomArray(3, 17)}
                  extraClass={`ml-40 ${styles.button}`} />
        </div>

      </form>
      <div className={styles.array}>
        {elements.map(({ value, state }, idx) => {
          return <Column key={idx}
                         index={Number(value)}
                         state={state}
                         extraClass={"ml-2 mr-2"} />;
        })}
      </div>
    </SolutionLayout>
  );
};
