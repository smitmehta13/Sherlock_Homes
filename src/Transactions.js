import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TransactionPage() {
    const [userId, setUserId] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [newTransaction, setNewTransaction] = useState({
        amount: '',
        description: '',
    });
    const [editingTransaction, setEditingTransaction] = useState(null);

    useEffect(() => {
        // Fetch transactions for the user when the userId changes
        if (userId) {
            fetchTransactions();
        }
    }, [userId]);

    const fetchTransactions = async () => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?id=${userId}`);
            setTransactions(response.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const handleUserIdChange = (event) => {
        setUserId(event.target.value);
    };

    const handleNewTransactionChange = (event) => {
        setNewTransaction({
            ...newTransaction,
            [event.target.name]: event.target.value,
        });
    };

    const handleCreateTransaction = async () => {
        try {
            if (editingTransaction) {
                // Perform update
                await handleUpdateTransaction(editingTransaction);
                await handleCancelEdit(editingTransaction);
            } else {
                // Perform create
                await axios.post(`/api/users/${userId}/transactions`, newTransaction);
                setNewTransaction({ amount: '', description: '' });
                fetchTransactions();
            }
        } catch (error) {
            console.error('Error creating/updating transaction:', error);
        }
    };


    const handleEditTransaction = (transaction) => {
        setEditingTransaction(transaction);
        setNewTransaction({
          amount: transaction.id,
          description: transaction.description,
        });
      };
      

    const handleUpdateTransaction = async (updatedTransaction) => {
        try {
            await axios.put(`/api/users/${userId}/transactions/${updatedTransaction.id}`, updatedTransaction);
            fetchTransactions();
            setEditingTransaction(null);
        } catch (error) {
            console.error('Error updating transaction:', error);
        }
    };

    const handleDeleteTransaction = async (transactionId) => {
        try {
            await axios.delete(`/api/users/${userId}/transactions/${transactionId}`);
            fetchTransactions();
        } catch (error) {
            console.error('Error deleting transaction:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditingTransaction(null);
    };


    return (
        <div className="content-wrapper">
            <section className="content-header">
                <h1>Transaction Page</h1>
            </section>

            <section className="content">
                <div className="box">
                    <div className="box-header with-border">
                        <h3 className="box-title">Search Transactions</h3>
                    </div>
                    <div className="box-body">
                        <div className="form-group">
                            <label>User ID:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={userId}
                                onChange={handleUserIdChange}
                            />
                        </div>

                        {userId && (
                            <div>
                                <div className="box">
                                    <div className="box-header with-border">
                                        <h3 className="box-title">Transactions for User ID: {userId}</h3>
                                    </div>
                                    <div className="box-body">
                                        <ul className="list-group">
                                            {transactions.map((transaction) => (
                                                <li className="list-group-item" key={transaction.id}>
                                                    Amount: {transaction.id}, Description: {transaction.description}
                                                    <button
                                                        className="btn btn-danger btn-xs pull-right"
                                                        onClick={() => handleDeleteTransaction(transaction.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        className="btn btn-primary btn-xs pull-right"
                                                        onClick={() => handleEditTransaction(transaction)}
                                                    >
                                                        Edit
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="box">
                                    <div className="box-header with-border">
                                        <h3 className="box-title">
                                            {editingTransaction ? 'Update Transaction' : 'Create New Transaction'}
                                        </h3>
                                    </div>
                                    <div className="box-body">
                                        <div className="form-group">
                                            <label>Amount:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="amount"
                                                value={newTransaction.amount}
                                                onChange={handleNewTransactionChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Description:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="description"
                                                value={newTransaction.description}
                                                onChange={handleNewTransactionChange}
                                            />
                                        </div>
                                        <button className="btn btn-primary" onClick={handleCreateTransaction}>
                                            {editingTransaction ? 'Update' : 'Create'}
                                        </button>
                                        {editingTransaction && (
            <button
              className="btn btn-secondary"
              onClick={() => {
                setNewTransaction({ amount: '', description: '' });
                setEditingTransaction(null);
              }}
            >
              Cancel
            </button>
          )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default TransactionPage;
