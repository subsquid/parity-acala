import { Store } from "@subsquid/substrate-processor";
import { upsert } from "./common";
import { Account } from "../../model";
import * as ss58 from "@subsquid/ss58";
import { CHAIN_NAME } from "../../constants";

export const creteOrUpdateAccount = (store: Store, address: Uint8Array): Promise<Account> => {
  const chainAddress = ss58.codec(CHAIN_NAME).encode(address);
  return upsert(store, Account, { id: chainAddress })
}
