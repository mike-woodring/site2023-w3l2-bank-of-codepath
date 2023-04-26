import * as React from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { formatAmount, formatDate } from "../../utils/format"
import * as constants from "../../constants"
import "./TransactionDetail.css"

export default function TransactionDetail() {
  const { transactionId } = useParams()
  const [transaction, setTransaction] = React.useState({})
  const [isLoading, setIsLoading] = React.useState(false)
  const [hasFetched, setHasFetched] = React.useState(false)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    const fetchTransaction = async () => {
      setIsLoading(true)
      setHasFetched(false)

      try {
        if (transactionId) {
          const res = await axios.get(`${constants.API_BASE_URL}/bank/transactions/${transactionId}`)
          if (res?.data?.transaction) {
            setTransaction(res.data.transaction)
          }
        }
      } catch (err) {
        setError(err)
      } finally {
        setIsLoading(false)
        setHasFetched(true)
      }
    }

    fetchTransaction()
  }, [transactionId])

  return (
    <div className="transaction-detail">
      <TransactionCard
        key={transactionId}
        hasFetched={hasFetched}
        transaction={transaction}
        transactionId={transactionId}
        isLoading={isLoading}
        error={error}
      />
    </div>
  )
}

export function TransactionCard({
  transaction = {},
  transactionId = null,
  hasFetched = false,
  isLoading = false,
  error = null,
}) {
  return (
    <div className="transaction-card card">
      <div className="card-header">
        <h3>Transaction #{transactionId}</h3>
        <p className="category">{transaction?.category}</p>
      </div>

      <div className="card-content">
        {hasFetched && !isLoading && !transaction?.id ? (
          <h1>Not Found</h1>
        ) : (
          <p className="description">{transaction?.description}</p>
        )}
      </div>

      <div className="card-footer">
        {hasFetched && !isLoading && !transaction?.id ? null : (
          <p className={`amount ${transaction?.amount < 0 ? "minus" : ""}`}>{formatAmount(transaction?.amount)}</p>
        )}
        <p className="date">{formatDate(transaction?.postedAt)}</p>
      </div>
    </div>
  )
}
