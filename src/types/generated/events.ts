import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'
import * as v2000 from './v2000'
import * as v2011 from './v2011'

export class BalancesTransferEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.Transfer')
  }

  /**
   * Transfer succeeded. \[from, to, value\]
   */
  get isV2000(): boolean {
    return this.ctx._chain.getEventHash('balances.Transfer') === 'dad2bcdca357505fa3c7832085d0db53ce6f902bd9f5b52823ee8791d351872c'
  }

  /**
   * Transfer succeeded. \[from, to, value\]
   */
  get asV2000(): [v2000.AccountId32, v2000.AccountId32, bigint] {
    assert(this.isV2000)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Transfer succeeded.
   */
  get isV2011(): boolean {
    return this.ctx._chain.getEventHash('balances.Transfer') === '0ffdf35c495114c2d42a8bf6c241483fd5334ca0198662e14480ad040f1e3a66'
  }

  /**
   * Transfer succeeded.
   */
  get asV2011(): {from: v2011.AccountId32, to: v2011.AccountId32, amount: bigint} {
    assert(this.isV2011)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV2011
  }

  get asLatest(): {from: v2011.AccountId32, to: v2011.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV2011
  }
}
