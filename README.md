# Solana for noob

Compilation for solana projects.

## Project Structure

Expense tracker contract and front end
```bash
expense-tracker/
├── expense-tracker/        # Anchor/Solana smart contract
│   ├── programs/
│   │   └── expense_tracker/
│   │       └── src/
│   │           └── lib.rs  # Smart contract code
│   ├── tests/             # Contract tests
│   ├── Anchor.toml        # Anchor configuration
│   └── package.json
│
└── expense-tracker-fe/    # Next.js frontend
├── src/
│   ├── app/
│   ├── components/
│   └── idl/
├── public/
└── package.json
```

Dummy staking 
```bash
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






