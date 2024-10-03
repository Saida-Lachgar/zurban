import React, { createContext, useContext } from 'react'
import { QuickSQLiteConnection } from 'react-native-quick-sqlite'

const DatabaseContext = createContext<QuickSQLiteConnection | null>(null)

export const useDatabase = () => {
  return useContext(DatabaseContext)
}

export const DatabaseProvider = ({
  children,
  db,
}: {
  children: React.ReactNode
  db: QuickSQLiteConnection
}) => {
  return (
    <DatabaseContext.Provider value={db}>{children}</DatabaseContext.Provider>
  )
}
