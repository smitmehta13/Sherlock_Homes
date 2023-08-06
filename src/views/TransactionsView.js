//TransactionsView.js
import React from 'react';
import { formatDateDDMMYYYY } from '../Constants';


function TransactionsView({ transactions, users, selectedUserId, setSelectedUserId,searchTerm, setSearchTerm, filteredTransactions, showSearchBar,toggleSearchBar, handleSearchButtonClick }) {
  return (
    <div className="content-wrapper">
      <section className="content-header">
        <h1>Transactions</h1>
      </section>
      <section className="content">
        <div className="box">
          <div className="box-body">
            <div className="form-group">
              {showSearchBar ? (
                <>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  className="btn btn-secondary mt-2"
                  onClick={toggleSearchBar}
                >
                  Cancel
                </button>
                </>
              ) : (
                <>
                  <label htmlFor="user">Filter by User:</label>
                  <select
                    className="form-control"
                    id="user"
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                  >
                    <option value="">All Users</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.firstName}&nbsp;{user.lastName}
                      </option>
                    ))}
                  </select>
                </>
              )}
              <button
                className="btn btn-primary mt-2"
                onClick={toggleSearchBar}
                disabled={showSearchBar}
              >
                Search
              </button>
            </div>

            {filteredTransactions.length === 0 ? (
              <p>No transactions found.</p>
            ) : (
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>User</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.id}</td>
                      <td>{formatDateDDMMYYYY(transaction.createdAt)}</td>
                      <td>{transaction.description}</td>
                      <td>{transaction.amount}</td>
                      <td>{transaction.payerName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default TransactionsView;
