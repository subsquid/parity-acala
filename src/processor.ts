import {
  EventHandlerContext,
  SubstrateProcessor,
} from "@subsquid/substrate-processor";
import { createTransfer, creteOrUpdateAccount } from "./db/useCases";
import {
  ARCHIVE_ENDPOINT,
  BATCH_SIZE,
  CHAIN_ENDPOINT,
  STATUS_DB_NAME,
} from "./constants";
import { VersionNotSupported } from "./utils/errors";
import { BalancesTransferEvent } from "./types/generated/events";

const processor = new SubstrateProcessor(STATUS_DB_NAME);

processor.setBatchSize(BATCH_SIZE);

processor.setDataSource({
  archive: ARCHIVE_ENDPOINT,
  chain: CHAIN_ENDPOINT,
});

processor.addEventHandler("balances.Transfer", async (ctx) => {
  const transfer = getTransferEvent(ctx);

  const from = await creteOrUpdateAccount(ctx.store, transfer.from);
  const to = await creteOrUpdateAccount(ctx.store, transfer.to);

  await createTransfer(ctx.store, {
    id: `${ctx.block.hash}-${ctx.event.id}`,
    from,
    to,
    amount: transfer.amount,
  });
});

interface TransferEvent {
  from: Uint8Array;
  to: Uint8Array;
  amount: bigint;
}

function getTransferEvent(ctx: EventHandlerContext): TransferEvent {
  const event = new BalancesTransferEvent(ctx);
  if (event.isV2000) {
    const [from, to, amount] = event.asV2000;
    return { from, to, amount };
  }
  if (event.isV2011) {
    return event.asV2011;
  }
  throw new VersionNotSupported("balances.Transfer", {
    blockHeight: ctx.block.height,
  });
}

processor.run();
