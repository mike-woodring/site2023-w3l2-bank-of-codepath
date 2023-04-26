import * as React from "react"
import "./AddTransaction.css"

export default function AddTransaction({
  form = {},
  setForm = () => console.log("FAKE SET FORM"),
  isCreating = false,
  handleOnSubmit = () => "FAKE HANDLE ON SUBMIT",
}) {
  const handleOnFormFieldChange = (event) => {
    const { name, value } = event.target
    setForm((formState) => ({ ...formState, [name]: value }))
  }

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>

      {isCreating ? <div className="loader">Loading</div> : null}

      <AddTransactionForm
        form={form}
        isCreating={isCreating}
        handleOnSubmit={handleOnSubmit}
        handleOnFormFieldChange={handleOnFormFieldChange}
      />
    </div>
  )
}

export function AddTransactionForm({ form, handleOnFormFieldChange, handleOnSubmit, isCreating }) {
  return (
    <div className="form">
      <div className="fields">
        <div className="field">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            placeholder="Enter a description..."
            value={form.description}
            onChange={handleOnFormFieldChange}
          />
        </div>
        <div className="field">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            placeholder="Enter a category..."
            value={form.category}
            onChange={handleOnFormFieldChange}
          />
        </div>
        <div className="field half-flex">
          <label htmlFor="amount">Amount (cents)</label>
          <input type="number" name="amount" value={form.amount} onChange={handleOnFormFieldChange} />
        </div>

        <button className="btn add-transaction" type="submit" onClick={handleOnSubmit} disabled={isCreating}>
          Add
        </button>
      </div>
    </div>
  )
}