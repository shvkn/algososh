import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-test-renderer";

import { SortingAlgorithm, useAnimatedSorting } from "./utils";

describe("Sorting bubble", () => {
  it("Sorting []", async () => {
    const { result } = renderHook(() => useAnimatedSorting(0));
    const arr: number[] = [];
    let sortedAdd: number[] = [];

    await act(async () => {
      result.current.setAlgorithm(SortingAlgorithm.BubbleSort);
      sortedAdd = await result.current.sort(arr);
    });

    expect(sortedAdd).toEqual(arr);
  });

  it("Sorting [1]", async () => {
    const { result } = renderHook(() => useAnimatedSorting(0));
    const arr: number[] = [1];
    let sortedAdd: number[] = [];

    await act(async () => {
      result.current.setAlgorithm(SortingAlgorithm.BubbleSort);
      sortedAdd = await result.current.sort(arr);
    });

    expect(sortedAdd).toEqual(arr);
  });

  it("Sorting [43, 2, 21, 435]", async () => {
    const { result } = renderHook(() => useAnimatedSorting(0));
    const arr: number[] = [43, 2, 21, 435];
    let sortedAdd: number[] = [];

    await act(async () => {
      result.current.setAlgorithm(SortingAlgorithm.BubbleSort);
      sortedAdd = await result.current.sort(arr);
    });

    expect(sortedAdd).toEqual(arr.sort());
  });
});

describe("Sorting selection", () => {
  it("Sorting []", async () => {
    const { result } = renderHook(() => useAnimatedSorting(0));
    const arr: number[] = [];
    let sortedAdd: number[] = [];

    await act(async () => {
      result.current.setAlgorithm(SortingAlgorithm.SelectionSort);
      sortedAdd = await result.current.sort(arr);
    });

    expect(sortedAdd).toEqual(arr);
  });

  it("Sorting [1]", async () => {
    const { result } = renderHook(() => useAnimatedSorting(0));
    const arr: number[] = [1];
    let sortedAdd: number[] = [];

    await act(async () => {
      result.current.setAlgorithm(SortingAlgorithm.SelectionSort);
      sortedAdd = await result.current.sort(arr);
    });

    expect(sortedAdd).toEqual(arr);
  });

  it("Sorting [43, 2, 21, 435]", async () => {
    const { result } = renderHook(() => useAnimatedSorting(0));
    const arr: number[] = [43, 2, 21, 435];
    let sortedAdd: number[] = [];

    await act(async () => {
      result.current.setAlgorithm(SortingAlgorithm.SelectionSort);
      sortedAdd = await result.current.sort(arr);
    });

    expect(sortedAdd).toEqual(arr.sort());
  });
});
