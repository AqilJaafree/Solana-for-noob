use anchor_lang::prelude::*;
use crate::state::*;
use crate::error::*;
use crate::constants::*;
use crate::instructions::shared;

#[derive(Accounts)]
pub struct Unstake<'info> {
    #[account(mut)]
    pub pool: Account<'info, StakePool>,
    #[account(mut)]
    pub user: Signer<'info>,
}

pub fn handler(ctx: Context<Unstake>) -> Result<()> {
    let pool = &mut ctx.accounts.pool;
    let clock = Clock::get()?;
    
    require!(
        clock.unix_timestamp >= pool.last_stake_timestamp + MIN_STAKE_PERIOD,
        StakeError::StakePeriodNotReached
    );

    let _total_amount = pool.total_staked.checked_add(
        shared::calculate_rewards(
            pool.total_staked,
            pool.last_stake_timestamp,
            clock.unix_timestamp
        )
    ).unwrap();

    pool.total_staked = 0;
    
    // Here you would typically transfer tokens back to user
    // transfer_tokens(ctx.accounts.user.key(), total_amount)?;
    Ok(())
}
