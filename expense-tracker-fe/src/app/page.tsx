'use client'

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import ExpenseForm from '../app/components/ExpenseForm'
import ExpenseList from '../app/components/ExpenseList'
import { useWallet } from '@solana/wallet-adapter-react'

export default function Home() {
  const { publicKey } = useWallet();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Expense Tracker</h1>
        <WalletMultiButton />
      </div>
      
      {publicKey ? (
        <>
          <ExpenseForm />
          <ExpenseList />
        </>
      ) : (
        <p className="text-center mt-8">
          Please connect your wallet to use the expense tracker
        </p>
      )}
    </main>
  )
}