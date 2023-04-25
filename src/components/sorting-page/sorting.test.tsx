import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-test-renderer";

import { SortingAlgorithm, useAnimatedSorting } from "./utils";
import { Direction } from "../../types";

describe("Bubble sort algorithm", () => {
  it("Should works with an empty array", async () => {
    const { result } = renderHook(() => useAnimatedSorting(0));
    const arr: number[] = [];
    let sortedAdd: number[] = [];

    await act(async () => {
      await result.current.setAlgorithm(SortingAlgorithm.BubbleSort);
      sortedAdd = await result.current.sort(arr);
    });

    expect(sortedAdd).toEqual(arr);
  });

  it("Should works with an array of single element", async () => {
    const { result } = renderHook(() => useAnimatedSorting(0));
    const arr: number[] = [1];
    let sortedAdd: number[] = [];

    await act(async () => {
      await result.current.setAlgorithm(SortingAlgorithm.BubbleSort);
      sortedAdd = await result.current.sort(arr);
    });

    expect(sortedAdd).toEqual(arr);
  });

  it("Should sort an array ascending", async () => {
    const { result } = renderHook(() => useAnimatedSorting(0));
    const arr: number[] = [43, 2, 21, 435];
    let sortedAdd: number[] = [];

    await act(async () => {
      await result.current.setAlgorithm(SortingAlgorithm.BubbleSort);
      sortedAdd = await result.current.sort(arr);
    });

    expect(sortedAdd).toEqual(arr.sort());
  });

  it("Should sort an array descending", async () => {
    const { result } = renderHook(() => useAnimatedSorting(0));
    const arr: number[] = [43, 2, 21, 435];
    let sortedAdd: number[] = [];

    await act(async () => {
      await result.current.setAlgorithm(SortingAlgorithm.BubbleSort);
      await result.current.setDirection(Direction.Descending);
      sortedAdd = await result.current.sort(arr);
    });

    expect(sortedAdd).toEqual(arr.sort((a, b) => b - a));
  });
});

describe("Selection sort algorithm", () => {
  it("Should works with an empty array", async () => {
    const { result } = renderHook(() => useAnimatedSorting(0));
    const arr: number[] = [];
    let sortedAdd: number[] = [];

    await act(async () => {
      await result.current.setAlgorithm(SortingAlgorithm.SelectionSort);
      sortedAdd = await result.current.sort(arr);
    });

    expect(sortedAdd).toEqual(arr);
  });

  it("Should works with an array of single element", async () => {
    const { result } = renderHook(() => useAnimatedSorting(0));
    const arr: number[] = [1];
    let sortedAdd: number[] = [];

    await act(async () => {
      result.current.setAlgorithm(SortingAlgorithm.SelectionSort);
      sortedAdd = await result.current.sort(arr);
    });

    expect(sortedAdd).toEqual(arr);
  });

  it("Should sort an array ascending", async () => {
    const { result } = renderHook(() => useAnimatedSorting(0));
    const arr: number[] = [43, 2, 21, 435];
    let sortedAdd: number[] = [];

    await act(async () => {
      await result.current.setAlgorithm(SortingAlgorithm.SelectionSort);
      sortedAdd = await result.current.sort(arr);
    });

    expect(sortedAdd).toEqual(arr.sort());
  });

  it("Should sort an array descending", async () => {
    const { result } = renderHook(() => useAnimatedSorting(0));
    const arr: number[] = [43, 2, 21, 435];
    let sortedAdd: number[] = [];

    await act(async () => {
      await result.current.setAlgorithm(SortingAlgorithm.SelectionSort);
      await result.current.setDirection(Direction.Descending);
      sortedAdd = await result.current.sort(arr);
    });

    expect(sortedAdd).toEqual(arr.sort((a, b) => b - a));
  });
});
