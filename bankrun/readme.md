# Solana Bankrun Test Setup Guide

This repository demonstrates how to set up and run tests using solana-bankrun, a testing framework for Solana programs.

## Setup Steps

1. Initialize project and install solana-bankrun:

create package.json
```bash
npm init -y
```

Install package from backrun
```bash
pnpm add solana-bankrun
```

Note: This will automatically add a packageManager field to your package.json using Corepack.

2. Install testing dependencies:
```bash
pnpm add -D jest ts-jest @types/jest typescript
```

3. Create Jest configuration (`jest.config.js`):
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
```

4. Configure TypeScript (`tsconfig.json`):
```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "outDir": "./dist",
    "baseUrl": "."
  },
  "include": ["src/**/*", "test/**/*"],
  "exclude": ["node_modules"]
}
```

## Version Management

Important: Make sure you're using the correct version of @solana/web3.js that matches solana-bankrun's requirements. You can check this using:
```bash
pnpm why @solana/web3.js
```

Current working versions:
- solana-bankrun: 0.4.0
- @solana/web3.js: 1.98.0

Add solana web3js ver 1.98
```bash
pnpm add @solana/web3.js@1.98.0
```

## Package json file
Make sure add this to your package.json file to test it
```json
 "scripts": {
    "test": "jest --runInBand"
  }
```

## Example Test

Here's a basic test demonstrating a SOL transfer:

```typescript
import { start } from "solana-bankrun";
import { PublicKey, Transaction, SystemProgram } from "@solana/web3.js";

test("one transfer", async () => {
    const context = await start([], []);
    const client = context.banksClient;
    const payer = context.payer;
    const receiver = PublicKey.unique();
    const blockhash = context.lastBlockhash;
    const transferLamports = 1_000_000n;
    const ixs = [
        SystemProgram.transfer({
            fromPubkey: payer.publicKey,
            toPubkey: receiver,
            lamports: transferLamports,
        }),
    ];
    const tx = new Transaction();
    tx.recentBlockhash = blockhash;
    tx.add(...ixs);
    tx.sign(payer);
    await client.processTransaction(tx);
    const balanceAfter = await client.getBalance(receiver);
    expect(balanceAfter).toEqual(transferLamports);
});
```

## Running Tests

Run tests using:
```bash
pnpm test
```

Add the `--runInBand` flag if you need tests to run sequentially:
```bash
pnpm test --runInBand
```

## Troubleshooting

1. If you encounter TypeScript errors related to @solana/web3.js, ensure you're using the correct version:
- To  find the correct solana/web3js version
```bash
pnpm why @solana/web3.js
```

- the current version
```bash
pnpm add @solana/web3.js@1.98.0
```

2. If you see Jest configuration errors, make sure all necessary dependencies are installed and configuration files are properly set up.

3. For package manager conflicts, stick with pnpm as configured in package.json's packageManager field.
