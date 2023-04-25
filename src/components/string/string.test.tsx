import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-test-renderer";

import { useAnimatedReverse } from "./utils";

describe("String reversing", () => {
  it("Should reverse `ABCD` to `DCBA`", async () => {
    const { result } = renderHook(() => useAnimatedReverse(0));
    const str = "ABCD";
    let reversed = "";

    await act(async () => {
      reversed = await result.current.reverse(str);
    });

    expect(reversed).toEqual(str.split("").reverse().join(""));
  });

  it("Should reverse `ABCDE` to `EDCBA`", async () => {
    const { result } = renderHook(() => useAnimatedReverse(0));
    const str = "ABCDE";
    let reversed = "";

    await act(async () => {
      reversed = await result.current.reverse(str);
    });

    expect(reversed).toEqual(str.split("").reverse().join(""));
  });

  it("Should reverse one symbol string", async () => {
    const { result } = renderHook(() => useAnimatedReverse(0));
    const str = "";
    let reversed = "";

    await act(async () => {
      reversed = await result.current.reverse(str);
    });

    expect(reversed.length).toBe(0);
  });

  it("Should reverse empty string", async () => {
    const { result } = renderHook(() => useAnimatedReverse(0));
    const str = "A";
    let reversed = "";

    await act(async () => {
      reversed = await result.current.reverse(str);
    });

    expect(reversed).toBe(str);
  });
});
