'use client'

import WalletContextProvider from './components/WalletContextProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  return <WalletContextProvider>{children}</WalletContextProvider>
}