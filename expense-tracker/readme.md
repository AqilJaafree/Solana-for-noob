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
## Building and Deploying

1. Build the program:

```bash
anchor build
```

2. If your machine got a problem when building use this alternative instead:

Notes. Building programs with the Solana CLI may embed machine specific code into the resulting binary. As a result, building the same program on different machines may produce different executables. To get around this problem, one can build inside a docker image with pinned dependencies to produce a verifiable build.

Reference:
```bash
https://www.anchor-lang.com/docs/verifiable-builds
```

Install docker on your windows/linux/mac
```bash
https://docs.docker.com/get-started/get-docker/
```

Then you can run this build
```bash
Anchor build --verifiable
```

3. Get the program ID:
```bash
solana address -k target/deploy/expense_tracker-keypair.json
```

4. Deploy to devnet:
```bash
anchor deploy
```
## Common Issues and Solutions

1. Insufficient funds error
- Request more airdrops: solana airdrop 2
- Wait 15 seconds between airdrops
- Maximum 2 SOL per airdrop on devnet
- You can request faucet here alternatively: https://faucet.solana.com/

2. Keypair not found error
- Make sure the wallet path in Anchor.toml is correct
- Verify the keypair file exists: ls ~/devnet-wallet.json


3. Program ID mismatch
- Ensure the program ID is the same in both
- declare_id!() in your program code
- Anchor.toml under [programs.devnet]

4. Build fails
- Run anchor clean
- Then try anchor build again

## Program Structure
The contract has three main functions:

- initialize_expense: Create a new expense record
- modify_expense: Update an existing expense
- delete_expense: Remove an expense record

## Next Steps
After successful deployment, you can:

- Create a frontend application to interact with your contract
- Add more features to the contract
