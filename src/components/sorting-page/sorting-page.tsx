import React, { FormEvent, useEffect, useReducer } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import styles from "./styles.module.css";
import {
  generateRandomArray,
  setDirection,
  setSortingAlgorithm,
  sort,
  SortingAlgorithm,
  sortingReducer
} from "./lib";

export const SortingPage: React.FC = () => {
  const [{
    elements,
    isLoader,
    isDone: shouldResetElementsStates,
    algorithm,
    direction
  }, dispatch] = useReducer(sortingReducer, {
    elements: [],
    isLoader: false,
    isDone: false,
    algorithm: SortingAlgorithm.SelectionSort,
    direction: Direction.Ascending
  });

  useEffect(() => {
    generateRandomArray()(dispatch);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    sort(elements, algorithm, direction, shouldResetElementsStates)(dispatch);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.panel} onSubmit={handleSubmit}>
        <fieldset className={styles.group}>
          <RadioInput label={"Выбор"}
                      checked={algorithm === SortingAlgorithm.SelectionSort}
                      onChange={() => setSortingAlgorithm(SortingAlgorithm.SelectionSort)(dispatch)}
                      disabled={isLoader} />
          <RadioInput label={"Пузырек"}
                      checked={algorithm === SortingAlgorithm.BubbleSort}
                      onChange={() => setSortingAlgorithm(SortingAlgorithm.BubbleSort)(dispatch)}
                      disabled={isLoader}
                      extraClass={"ml-20"} />
        </fieldset>
        <div className={styles.group}>
          <Button type={"submit"}
                  sorting={Direction.Ascending}
                  text={"По возрастания"}
                  isLoader={isLoader && direction === Direction.Ascending}
                  disabled={isLoader}
                  onClick={() => setDirection(Direction.Ascending)(dispatch)} />
          <Button type={"submit"}
                  sorting={Direction.Descending}
                  text={"По убыванию"}
                  isLoader={isLoader && direction === Direction.Descending}
                  disabled={isLoader}
                  onClick={() => setDirection(Direction.Descending)(dispatch)}
                  extraClass={"ml-6"} />
        </div>
        <Button type={"button"}
                text={"Новый массив"}
                disabled={isLoader}
                onClick={() => generateRandomArray()(dispatch)} />
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
