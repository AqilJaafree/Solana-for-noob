use anchor_lang::prelude::*;

#[account]
pub struct StakePool {
    pub authority: Pubkey,
    pub total_staked: u64,
    pub last_stake_timestamp: i64,
}

impl StakePool {
    pub const LEN: usize = 32 + 8 + 8;
}
