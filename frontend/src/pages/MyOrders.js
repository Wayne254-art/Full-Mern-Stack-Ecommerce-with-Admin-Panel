

import React, { useState } from 'react';
import NoOrder from '../assets/no_orders.png';

const OrderPage = () => {
  const [activeTab, setActiveTab] = useState('Unpaid');

  const tabs = ['Unpaid', 'To be Shipped', 'Shipped', 'Completed', 'Cancelled'];

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center mt-20">
      <img
        src={NoOrder}  
        alt="No order"
        className="w-25 h-25 mb-4"
      />
      <p className="text-lg text-gray-500">No order</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto mt-8">
      {/* Tabs */}
      <ul className="flex border-b">
        {tabs.map((tab) => (
          <li
            key={tab}
            className={`flex-1 text-center py-4 cursor-pointer ${
              activeTab === tab
                ? 'border-b-2 border-red-500 text-red-500'
                : 'text-gray-600'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </li>
        ))}
      </ul>

      {/* Table Header */}
      <div className="grid grid-cols-5 text-center font-medium text-gray-600 mt-6">
        <div>Product Info</div>
        <div>Order Amount</div>
        <div>Order Status</div>
        <div>Options</div>
      </div>

      {/* Empty State */}
      {renderEmptyState()}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-10">
        <p className="text-gray-500">Current Page: 1</p>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-red-300 text-white rounded">Previous</button>
          <button className="px-4 py-2 bg-red-300 text-white rounded">Next</button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
