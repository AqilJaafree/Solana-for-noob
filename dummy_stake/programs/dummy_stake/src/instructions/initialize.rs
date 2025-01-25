use anchor_lang::prelude::*;
use crate::state::*;

#[derive(Accounts)]
#[instruction()]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + StakePool::LEN,
        seeds = [b"stake_pool"],
        bump
    )]
    pub pool: Account<'info, StakePool>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<Initialize>) -> Result<()> {
    let pool = &mut ctx.accounts.pool;
    let clock = Clock::get()?;
    
    pool.authority = ctx.accounts.authority.key();
    pool.total_staked = 0;
    pool.last_stake_timestamp = clock.unix_timestamp;
    Ok(())
}