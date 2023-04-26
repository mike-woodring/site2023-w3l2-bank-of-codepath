import * as React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import Home from "../Home/Home"
import TransactionDetail from "../TransactionDetail/TransactionDetail"
import "./App.css"

export default function App() {
  const [error, setError] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isCreating, setIsCreating] = React.useState(false)
  const [transactions, setTransactions] = React.useState([])
  const [transfers, setTransfers] = React.useState([])
  const [filterInputValue, setFilterInputValue] = React.useState("")
  const [newTransactionForm, setNewTransactionForm] = React.useState({
    amount: 0,
    description: "",
    category: "",
  })

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar filterInputValue={filterInputValue} setFilterInputValue={setFilterInputValue} />

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  transfers={transfers}
                  transactions={transactions}
                  isLoading={isLoading}
                  isCreating={isCreating}
                  error={error}
                  filterInputValue={filterInputValue}
                  setTransactions={setTransactions}
                  setIsLoading={setIsLoading}
                  setIsCreating={setIsCreating}
                  setError={setError}
                  setTransfers={setTransfers}
                  newTransactionForm={newTransactionForm}
                  setNewTransactionForm={setNewTransactionForm}
                />
              }
            />
            <Route path="/transactions/:transactionId" element={<TransactionDetail />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}