import { Store } from "@subsquid/substrate-processor";
import { insert } from "./common";
import { Transfer } from "../../model";

export const createTransfer = (store: Store, transfer: Transfer): Promise<void> => {
  return insert(store, Transfer, transfer)
}
