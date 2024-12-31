import React from 'react';
import './Wallet.css';

const Wallet = () => {
  const transactions = [
    { id: 1, doctor: 'Dr. Smith', amount: 100, date: '2024-12-28' },
    { id: 2, doctor: 'Dr. Taylor', amount: 150, date: '2024-12-27' },
  ];

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-5 rounded-lg bg-white">
        <h4 className="text-center font-bold text-2xl mb-4 text-primary">
          Wallet Balance
        </h4>
        <div className="text-center font-bold text-lg mb-4">
          Current Balance: <span className="text-success">$500</span>
        </div>
        <button className="btn btn-danger rounded-lg py-2 px-4 w-50 mx-auto">
          Add Money
        </button>
        <div className="table-container mt-4">
          <h5 className="font-bold text-lg mb-3">Transaction History</h5>
          <table className="table table-bordered">
            <thead className="bg-primary text-white">
              <tr>
                <th>#</th>
                <th>Doctor</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn, index) => (
                <tr key={txn.id}>
                  <td>{index + 1}</td>
                  <td>{txn.doctor}</td>
                  <td>${txn.amount}</td>
                  <td>{txn.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
