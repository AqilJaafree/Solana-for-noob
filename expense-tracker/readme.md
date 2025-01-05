# Solana Expense Tracker Smart Contract

This is a simple expense tracking smart contract built on Solana using the Anchor framework. It allows users to create, modify, and delete expense records on the blockchain.

## Prerequisites

Before you begin, make sure you have the following installed:

1. Rust Programming Language
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

2. Solana Tool Suite
```bash
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
```

3. Anchor Framework
```bash
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
avm install latest
avm use latest
```

## Setup Steps

1. Configure Solana for devnet:
```bash
solana config set --url devnet
```

2. Create a new keypair (wallet):
```bash
solana-keygen new -o ~/devnet-wallet.json
```
Save the seed phrase shown in a secure place!

3. Airdrop
```bash
solana airdrop 2 --keypair ~/devnet-wallet.json
```

4. Check your balance:
```bash
solana balance --keypair ~/devnet-wallet.json
```

## Project Setup
1. Create a new project:

```bash
anchor init expense-tracker
cd expense-tracker
```

2. Change the program code

3. Update the Anchor.toml
```bash
[toolchain]

[features]
resolution = true
skip-lint = false

[programs.devnet]
expense_tracker = ""

[registry]
url = "https://api.apr.dev"

[provider]
cluster = "devnet"
wallet = "/home/YOUR_USERNAME/devnet-wallet.json"  # Replace YOUR_USERNAME with your actual username

[scripts]
test = "yarn run ts-mocha -p ./tsconfig.json -t 1000000 tests/**/*.ts"
```


