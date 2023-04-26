import * as React from "react"
import axios from "axios"
import AddTransaction from "../AddTransaction/AddTransaction"
import BankActivity from "../BankActivity/BankActivity"
import * as constants from "../../constants"
import "./Home.css"

export default function Home({
  transactions = [],
  transfers = [],
  error = null,
  setTransactions = () => console.log("FAKE SET TRANSACTIONS"),
  setTransfers = () => console.log("FAKE SET TRANSFERS"),
  setError = () => console.log("FAKE SET ERROR"),
  isLoading = false,
  isCreating = false,
  setIsLoading = () => console.log("FAKE SET IS LOADING"),
  setIsCreating = () => console.log("FAKE SET IS CREATING"),
  filterInputValue = "",
  newTransactionForm = {},
  setNewTransactionForm = () => console.log("FAKE SET NEW TRANSACTION FORM"),
}) {
  const transactionsToShow = filterInputValue
    ? transactions?.filter((t) => t.description.toLowerCase().indexOf(filterInputValue.toLowerCase()) !== -1)
    : transactions

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      try {
        const transactionsRes = await axios.get(`${constants.API_BASE_URL}/bank/transactions`)
        if (transactionsRes?.data?.transactions) {
          setTransactions(transactionsRes.data.transactions)
        }

        const transfersRes = await axios.get(`${constants.API_BASE_URL}/bank/transfers`)
        if (transfersRes?.data?.transfers) {
          setTransfers(transfersRes.data.transfers)
        }
      } catch (err) {
        console.log({ err })
        setError(err)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [])

  const handleOnSubmitNewTransaction = async () => {
    setIsCreating(true)
    setError(null)

    const newTransaction = { ...newTransactionForm }

    try {
      const res = await axios.post(`${constants.API_BASE_URL}/bank/transactions`, { transaction: newTransaction })
      if (res?.data?.transaction) {
        setTransactions((transactions) => [...transactions, res.data.transaction])
      }

      setNewTransactionForm({
        amount: 0,
        description: "",
        category: "",
      })
    } catch (err) {
      setError(String(err))
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="home">
      {error ? <h2 className="error">{error}</h2> : null}
      <AddTransaction
        form={newTransactionForm}
        setForm={setNewTransactionForm}
        setIsCreating={setIsCreating}
        isCreating={isCreating}
        handleOnSubmit={handleOnSubmitNewTransaction}
      />

      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <BankActivity transfers={transfers} transactions={transactionsToShow} filterInputValue={filterInputValue} />
      )}
    </div>
  )
}