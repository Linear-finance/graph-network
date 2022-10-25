import { TokenDeposit, TokenWithdrawal } from "../generated/schema";

import {
  TokenDeposited,
  TokenWithdrawn,
} from "../generated/LnErc20Bridge/LnErc20Bridge";

export function handleTokenDeposited(event: TokenDeposited): void {
  let newDeposit = new TokenDeposit(
    event.params.srcChainId.toString() + "/" + event.params.depositId.toString()
  );

  newDeposit.srcChainId = event.params.srcChainId;
  newDeposit.destChainId = event.params.destChainId;
  newDeposit.depositId = event.params.depositId;
  newDeposit.depositor = event.params.depositor;
  newDeposit.recipient = event.params.recipient;
  newDeposit.currency = event.params.currency;
  newDeposit.amount = event.params.amount;
  newDeposit.blockHeight = event.block.number;
  newDeposit.txHash = event.transaction.hash;
  newDeposit.timestamp = event.block.timestamp;

  newDeposit.save();
}

export function handleTokenWithdrawn(event: TokenWithdrawn): void {
  let newWithdrawal = new TokenWithdrawal(
    event.params.srcChainId.toString() + "/" + event.params.depositId.toString()
  );

  newWithdrawal.srcChainId = event.params.srcChainId;
  newWithdrawal.destChainId = event.params.destChainId;
  newWithdrawal.depositId = event.params.depositId;
  newWithdrawal.depositor = event.params.depositor;
  newWithdrawal.recipient = event.params.recipient;
  newWithdrawal.currency = event.params.currency;
  newWithdrawal.amount = event.params.amount;
  newWithdrawal.txHash = event.transaction.hash;
  newWithdrawal.timestamp = event.block.timestamp;

  newWithdrawal.save();
}
