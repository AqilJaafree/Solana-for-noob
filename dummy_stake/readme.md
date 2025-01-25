# Token Dummy Staking Program 

A Solana program built with Anchor that allows users to stake tokens and earn rewards.
For learning purpose

## Project Structure
```
dummy_stake/
├── programs/
│   └── dummy_stake/
│       ├── src/
│       │   ├── instructions/
│       │   │   ├── initialize.rs    # Initialize pool instruction
│       │   │   ├── stake.rs         # Stake tokens instruction
│       │   │   ├── unstake.rs       # Unstake tokens instruction
│       │   │   ├── shared.rs        # Shared functions
│       │   │   └── mod.rs          # Module declarations
│       │   ├── state.rs            # Program state definitions
│       │   ├── constants.rs        # Program constants
│       │   ├── error.rs            # Custom error types
│       │   └── lib.rs              # Program entry point
│       └── Cargo.toml
├── tests/                         # Test files
├── Anchor.toml                    # Anchor configuration
├── Cargo.toml
└── package.json
```

## Features
- Initialize staking pool
- Stake tokens
- Unstake tokens with rewards after minimum stake period
- Reward calculation based on stake duration

## Prerequisites
- Rust
- Solana CLI
- Node.js
- Anchor Framework
- pnpm (or yarn/npm)

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd dummy_stake
```

2. Install dependencies
```bash
pnpm install
```

## Build and Deploy

### Local Development (LocalNet)

1. Start local validator
```bash
solana-test-validator
```

2. Build the program
```bash
anchor build
```

3. Deploy to localnet
```bash
anchor deploy
```

4. Update Program ID
- Copy the Program ID from deployment output
- Update in `Anchor.toml`
- Update in `lib.rs` (`declare_id!`)

5. Run tests
```bash
anchor test
```

### Devnet Deployment

1. Configure Solana CLI for devnet
```bash
solana config set --url devnet
```

2. Create/get devnet wallet
```bash
solana-keygen new --outfile ~/devnet-wallet.json
# or use existing wallet
```

3. Get SOL from faucet
```bash
solana airdrop 2 --url devnet
```

4. Build verifiable program
```bash
anchor build --verifiable
```

5. Deploy to devnet
```bash
anchor deploy --provider.cluster devnet
```

6. Run tests on devnet
```bash
ANCHOR_PROVIDER_URL="https://api.devnet.solana.com" ANCHOR_WALLET=~/devnet-wallet.json pnpm test
```

## Program Instructions

### Initialize
Creates a new staking pool.
```rust
pub fn initialize(ctx: Context<Initialize>) -> Result<()>
```

### Stake
Stakes tokens in the pool.
```rust
pub fn stake(ctx: Context<Stake>, amount: u64) -> Result<()>
```

### Unstake
Unstakes tokens with rewards after minimum period.
```rust
pub fn unstake(ctx: Context<Unstake>) -> Result<()>
```

## Testing

Run all tests:
```bash
anchor test
# or for devnet
ANCHOR_PROVIDER_URL="https://api.devnet.solana.com" ANCHOR_WALLET=~/devnet-wallet.json pnpm test
```

## Configuration

### Anchor.toml
```toml
[features]
seeds = false
skip-lint = false

[programs.localnet]
dummy_stake = "your-program-id"

[registry]
url = "https://api.apr.dev"

[provider]
cluster = "devnet"
wallet = "~/devnet-wallet.json"

[scripts]
test = "yarn run ts-mocha -p ./tsconfig.json -t 1000000 tests/**/*.ts"
```

## State Accounts

### StakePool
```rust
#[account]
pub struct StakePool {
    pub authority: Pubkey,
    pub total_staked: u64,
    pub last_stake_timestamp: i64,
}
```

## Constants
```rust
pub const MIN_STAKE_PERIOD: i64 = 7 * 24 * 60 * 60; // 7 days in seconds
pub const REWARD_RATE: u64 = 5; // 5% APY
```

## Error Handling
Custom error types defined in `error.rs`:
```rust
#[error_code]
pub enum StakeError {
    #[msg("Amount must be greater than 0")]
    InvalidAmount,
    #[msg("Stake period not reached")]
    StakePeriodNotReached,
}
```
