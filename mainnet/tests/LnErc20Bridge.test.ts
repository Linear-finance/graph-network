import { newMockEvent } from "matchstick-as";
import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
} from "matchstick-as/assembly/index";
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts";

import { handleTokenDeposited } from "../src/LnErc20Bridge";

import { TokenDeposited } from "../generated/LnErc20Bridge/LnErc20Bridge";

describe("Describe entity assertions", () => {
  beforeAll(() => {
    handleTokenDeposited(
      createTokenDepositedEvent(
        BigInt.fromI32(1),
        BigInt.fromI32(56),
        BigInt.fromI32(100),
        Bytes.fromHexString(
          "0x1111111111111111111111111111111111111111111111111111111111111111"
        ),
        Bytes.fromHexString(
          "0x2222222222222222222222222222222222222222222222222222222222222222"
        ),
        Bytes.fromHexString(
          "0x3333333333333333333333333333333333333333333333333333333333333333"
        ),
        BigInt.fromI32(5555)
      )
    );
  });

  afterAll(() => {
    clearStore();
  });

  test("TokenDeposit entity created and stored", () => {
    assert.entityCount("TokenDeposit", 1);

    assert.fieldEquals(
      "TokenDeposit",
      "1/100",
      "currency",
      "0x3333333333333333333333333333333333333333333333333333333333333333"
    );
  });
});

function createTokenDepositedEvent(
  srcChainId: BigInt,
  destChainId: BigInt,
  depositId: BigInt,
  depositor: Bytes,
  recipient: Bytes,
  currency: Bytes,
  amount: BigInt
): TokenDeposited {
  let tokenDepositedEvent = changetype<TokenDeposited>(newMockEvent());

  tokenDepositedEvent.parameters = new Array();

  tokenDepositedEvent.parameters.push(
    new ethereum.EventParam(
      "srcChainId",
      ethereum.Value.fromUnsignedBigInt(srcChainId)
    )
  );
  tokenDepositedEvent.parameters.push(
    new ethereum.EventParam(
      "destChainId",
      ethereum.Value.fromUnsignedBigInt(destChainId)
    )
  );
  tokenDepositedEvent.parameters.push(
    new ethereum.EventParam(
      "depositId",
      ethereum.Value.fromUnsignedBigInt(depositId)
    )
  );
  tokenDepositedEvent.parameters.push(
    new ethereum.EventParam("depositor", ethereum.Value.fromBytes(depositor))
  );
  tokenDepositedEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromBytes(recipient))
  );
  tokenDepositedEvent.parameters.push(
    new ethereum.EventParam("currency", ethereum.Value.fromBytes(currency))
  );
  tokenDepositedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  );

  return tokenDepositedEvent;
}
