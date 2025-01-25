use anchor_lang::prelude::*;
use crate::state::*;
use crate::error::*;

#[derive(Accounts)]
pub struct Stake<'info> {
    #[account(mut)]
    pub pool: Account<'info, StakePool>,
    #[account(mut)]
    pub user: Signer<'info>,
}

pub fn handler(ctx: Context<Stake>, amount: u64) -> Result<()> {
    require!(amount > 0, StakeError::InvalidAmount);
    let pool = &mut ctx.accounts.pool;
    pool.total_staked = pool.total_staked.checked_add(amount).unwrap();
    Ok(())
}