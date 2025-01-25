use anchor_lang::prelude::*;

#[error_code]
pub enum StakeError {
    #[msg("Amount must be greater than 0")]
    InvalidAmount,
    #[msg("Stake period not reached")]
    StakePeriodNotReached,
}