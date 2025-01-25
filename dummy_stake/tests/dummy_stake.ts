import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { DummyStake } from "../target/types/dummy_stake";
import { PublicKey } from "@solana/web3.js";
import { expect } from "chai";

describe("dummy_stake", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.DummyStake as Program<DummyStake>;
  let poolPda: PublicKey;
  
  before(async () => {
    [poolPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("stake_pool")],
      program.programId
    );
  });

  it("Initialize stake pool", async () => {
    try {
      const tx = program.methods
        .initialize()
        .accounts({
          pool: poolPda,
          authority: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        });

      await tx.rpc();

      const pool = await program.account.stakePool.fetch(poolPda);
      expect(pool.authority.toString()).to.equal(provider.wallet.publicKey.toString());
    } catch (e) {
      console.error("Init error:", e);
      throw e;
    }
  });

  it("Stakes tokens", async () => {
    const stakeAmount = new anchor.BN(100);
    
    await program.methods
      .stake(stakeAmount)
      .accounts({
        pool: poolPda,
        user: provider.wallet.publicKey,
      })
      .rpc();

    const pool = await program.account.stakePool.fetch(poolPda);
    expect(pool.totalStaked.toString()).to.equal(stakeAmount.toString());
  });

  it("Fails to unstake before minimum period", async () => {
    try {
      await program.methods
        .unstake()
        .accounts({
          pool: poolPda,
          user: provider.wallet.publicKey,
        })
        .rpc();
      throw new Error("Should have failed");
    } catch (error: any) {
      expect(error.message).to.include("Stake period not reached");
    }
  });
});