import { TElement } from "./element";

export type TListElement = TElement & {
  head?: TListElement;
  tail?: TListElement;
}
