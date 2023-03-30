import { TElement } from "./element";

export type TListElement = Partial<TElement> & {
  head?: TListElement;
  tail?: TListElement;
}
