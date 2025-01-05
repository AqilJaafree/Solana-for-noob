# Solana Expense Tracker Workshop 2025

A decentralized expense tracking application built on Solana blockchain. This project consists of a Solana smart contract (built with Anchor) and a Next.js frontend application.

## Project Structure
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

## Smart Contract Features

- Create expense records with merchant name and amount
- Modify existing expenses
- Delete expenses
- PDA-based account management
- Secure ownership validation

## Frontend Features

- Connect multiple Solana wallets (Phantom, Brave)
- Create and track expenses
- View expense history
- Delete existing expenses
- Responsive design with dark mode

## Prerequisites

- Node.js v16+ and npm/yarn
- Rust and Cargo
- Solana Tool Suite
- Anchor Framework

## Front end setup

cd expense-tracker-fe
npm install
# or
yarn install

## .env
```bash
NEXT_PUBLIC_RPC_URL=https://api.devnet.solana.com
```