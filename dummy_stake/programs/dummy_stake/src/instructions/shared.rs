use crate::constants::*;

pub fn calculate_rewards(amount: u64, start_time: i64, end_time: i64) -> u64 {
    let duration = (end_time - start_time) as u64;
    let reward = amount
        .checked_mul(REWARD_RATE)
        .unwrap()
        .checked_mul(duration)
        .unwrap()
        .checked_div(365 * 24 * 60 * 60 * 100)
        .unwrap();
    reward
}