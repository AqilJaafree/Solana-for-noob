'use client'

import { FC, useEffect, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Program, AnchorProvider, web3, BN } from '@project-serum/anchor';
import { IDL } from '../idl/expense_tracker';

const PROGRAM_ID = new web3.PublicKey("E2NXyH74LV4ibLRJrm9EBQK2fcoJCXiLY5k16RxtRDop");

interface Expense {
  id: BN;
  merchantName: string;
  amount: BN;
  publicKey: web3.PublicKey;
}

const ExpenseList: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const fetchExpenses = async () => {
    if (!publicKey) return;

    const provider = new AnchorProvider(
      connection,
      window.solana,
      AnchorProvider.defaultOptions()
    );
    const program = new Program(IDL, PROGRAM_ID, provider);

    try {
      const accounts = await connection.getProgramAccounts(PROGRAM_ID, {
        filters: [
          {
            memcmp: {
              offset: 8, // After discriminator
              bytes: publicKey.toBase58(),
            },
          },
        ],
      });

      const expenseAccounts = accounts.map((account) => ({
        ...program.coder.accounts.decode('ExpenseAccount', account.account.data),
        publicKey: account.pubkey,
      }));

      setExpenses(expenseAccounts);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [publicKey, connection]);

  const handleDelete = async (expense: Expense) => {
    if (!publicKey) return;

    const provider = new AnchorProvider(
      connection,
      window.solana,
      AnchorProvider.defaultOptions()
    );
    const program = new Program(IDL, PROGRAM_ID, provider);

    try {
      const tx = await program.methods
        .deleteExpense(expense.id)
        .accounts({
          authority: publicKey,
          expenseAccount: expense.publicKey,
          systemProgram: web3.SystemProgram.programId,
        })
        .instruction();

      const transaction = new web3.Transaction().add(tx);
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature);

      fetchExpenses();
    } catch (error) {
      console.error('Error deleting expense:', error);
      alert('Error deleting expense');
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Your Expenses</h2>
      <div className="space-y-4">
        {expenses.map((expense) => (
          <div
            key={expense.publicKey.toString()}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{expense.merchantName}</p>
              <p className="text-gray-600">
                {(expense.amount.toNumber() / 100).toFixed(2)} SOL
              </p>
            </div>
            <button
              onClick={() => handleDelete(expense)}
              className="text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;