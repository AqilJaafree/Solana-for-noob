'use client'

import { FC, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Program, AnchorProvider, web3, BN } from '@project-serum/anchor';
import { IDL } from '../idl/expense_tracker';

const PROGRAM_ID = new web3.PublicKey("E2NXyH74LV4ibLRJrm9EBQK2fcoJCXiLY5k16RxtRDop");

const ExpenseForm: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [merchantName, setMerchantName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!publicKey) return;

    const provider = new AnchorProvider(
      connection,
      window.solana,
      AnchorProvider.defaultOptions()
    );
    const program = new Program(IDL, PROGRAM_ID, provider);

    try {
      const id = new BN(Date.now());
      
      const [expenseAccount] = web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from("expense"),
          publicKey.toBuffer(),
          id.toArrayLike(Buffer, 'le', 8)
        ],
        program.programId
      );

      const tx = await program.methods
        .initializeExpense(
          id,
          merchantName,
          new BN(parseFloat(amount) * 100)
        )
        .accounts({
          authority: publicKey,
          expenseAccount: expenseAccount,
          systemProgram: web3.SystemProgram.programId,
        })
        .instruction();

      const transaction = new web3.Transaction().add(tx);
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature);

      setMerchantName('');
      setAmount('');
      
      alert('Expense added successfully!');
    } catch (error) {
      console.error(error);
      alert('Error adding expense');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto mt-8">
      <div className="space-y-2">
        <label className="block text-sm text-gray-400">
          Merchant Name
        </label>
        <input
          type="text"
          value={merchantName}
          onChange={(e) => setMerchantName(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
          placeholder="Enter merchant name"
          required
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm text-gray-400">
          Amount (SOL)
        </label>
        <input
          type="number"
          step="0.000000001"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
          placeholder="0.00"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
      >
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;