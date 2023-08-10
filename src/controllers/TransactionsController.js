//TransactionsController.js
import React, { useState, useEffect } from 'react';
import TransactionsModel from '../models/TransactionsModel';
import {fetchUsers} from '../models/AccountModel';
import TransactionsView from '../views/TransactionsView';
import { formatDateDDMMMYYYY } from '../Constants';

function TransactionsController() {
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);

  useEffect(() => {
    // Initialize the model
    const model = new TransactionsModel();
    // Fetch all transactions from the model
    model.getAllTransactions()
      .then((data) => {
        setTransactions(data);
      });

    // Fetch all users from the model
    fetchUsers() // Replace with your method to fetch users from the model
      .then((data) => {
        setUsers(data);
      });
  }, []);

  useEffect(() => {
    // Fetch transactions for the selected user from the model
    if (selectedUserId) {
      const model = new TransactionsModel();
      model.getTransactionsByUserId(selectedUserId)
        .then((data) => {
          setTransactions(data);
        });
    } else {
      // Fetch all transactions if no user is selected
      const model = new TransactionsModel();
      model.getAllTransactions()
        .then((data) => {
          setTransactions(data);
        });
    }
  }, [selectedUserId]);

  const filteredTransactions = transactions.filter((transaction) => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    return (
      transaction.id.toString().includes(searchTermLowerCase) ||
      transaction.amount.toString().includes(searchTermLowerCase) ||
      transaction.payerName.toLowerCase().includes(searchTermLowerCase) ||
      formatDateDDMMMYYYY(transaction.createdAt).includes(searchTermLowerCase) // Assuming you have the formatDate function
    );
  });

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
    setSearchTerm('');
    setSelectedUserId('');
  };

  return (
    <TransactionsView
      transactions={transactions}
      users={users}
      selectedUserId={selectedUserId}
      setSelectedUserId={setSelectedUserId}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      filteredTransactions={filteredTransactions}
      showSearchBar={showSearchBar}
      toggleSearchBar={toggleSearchBar}
    />
  );
}

export default TransactionsController;
