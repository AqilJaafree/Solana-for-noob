use anchor_lang::prelude::*;

mod instructions;
mod state;
mod constants;
mod error;

use instructions::*;

declare_id!("HbxgLaoyRvYhzQoMgf9xKG9A2pdBcr6bkmyP7DBUFQE");

#[program]
pub mod dummy_stake {
    use super::*;
    
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
            instructions::initialize::handler(ctx)
    }
    
    pub fn stake(ctx: Context<Stake>, amount: u64) -> Result<()> {
            instructions::stake::handler(ctx, amount)
    }
    
    pub fn unstake(ctx: Context<Unstake>) -> Result<()> {
            instructions::unstake::handler(ctx)
    }
}
    

