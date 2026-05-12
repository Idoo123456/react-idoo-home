import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle, FaEllipsisV } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';

const Customers = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [customersData, setCustomersData] = useState([
    {
      id: 1,
      name: 'Fikri Muhaffizh',
      email: 'fikri.muhaffizh@email.com',
      phone: '+62 812-3456-7890',
      address: 'Jakarta, Indonesia',
      avatar: 'https://i.pinimg.com/736x/01/d7/0a/01d70a3d3df8d3499febf3d5b24cd288.jpg',
      status: 'active',
      lastMessage: 'Thanks for the order!',
      lastMessageTime: '5 min ago',
      unread: 0,
    },
    {
      id: 2,
      name: 'Ahmad Hidayat',
      email: 'ahmad.hidayat@email.com',
      phone: '+62 821-9876-5432',
      address: 'Bandung, Indonesia',
      avatar: 'https://i.pinimg.com/736x/61/72/f2/6172f27d00d56c1003389d4a5582c99e.jpg',
      status: 'active',
      lastMessage: 'When will my order arrive?',
      lastMessageTime: '15 min ago',
      unread: 2,
    },
    {
      id: 3,
      name: 'Siti Nurhaliza',
      email: 'siti.nurhaliza@email.com',
      phone: '+62 831-2345-6789',
      address: 'Surabaya, Indonesia',
      avatar: 'https://i.pinimg.com/736x/a3/e2/a2/a3e2a2bc7c31b834dae0198d7aecd228.jpg',
      status: 'inactive',
      lastMessage: 'Great food, will order again',
      lastMessageTime: '1 hour ago',
      unread: 0,
    },
    {
      id: 4,
      name: 'Budi Santoso',
      email: 'budi.santoso@email.com',
      phone: '+62 845-6789-0123',
      address: 'Medan, Indonesia',
      avatar: 'https://i.pinimg.com/736x/44/0a/b7/440ab7c57587cbda3d290e97958eac62.jpg',
      status: 'active',
      lastMessage: 'Can I get a discount?',
      lastMessageTime: '2 hours ago',
      unread: 1,
    },
    {
      id: 5,
      name: 'Dewi Lestari',
      email: 'dewi.lestari@email.com',
      phone: '+62 856-7890-1234',
      address: 'Yogyakarta, Indonesia',
      avatar: 'https://i.pinimg.com/736x/3f/ce/d8/3fced80466bf3ef6997f2375afefc350.jpg',
      status: 'active',
      lastMessage: 'I have a complaint',
      lastMessageTime: '3 hours ago',
      unread: 3,
    },
    {
      id: 6,
      name: 'Rudi Hermawan',
      email: 'rudi.hermawan@email.com',
      phone: '+62 867-8901-2345',
      address: 'Semarang, Indonesia',
      avatar: 'https://i.pinimg.com/736x/48/f8/03/48f803988b301ac356402a215df9a26b.jpg',
      status: 'inactive',
      lastMessage: 'Thank you for the service',
      lastMessageTime: '5 hours ago',
      unread: 0,
    },
  ]);

  const chatMessages = {
    1: [
      { id: 1, sender: 'customer', text: 'Hi, I want to order some food', time: '10:30' },
      { id: 2, sender: 'admin', text: 'Hello! What would you like to order?', time: '10:31' },
      { id: 3, sender: 'customer', text: 'I want Nasi Goreng Spesial and Soto Ayam', time: '10:32' },
      { id: 4, sender: 'admin', text: 'Great choice! That will be Rp. 75.000. When can you pick it up?', time: '10:33' },
      { id: 5, sender: 'customer', text: 'Thanks for the order!', time: '10:35' },
    ],
  };

  const handleSelectChat = (customer) => {
    setSelectedChat(customer);
    setMessages(chatMessages[customer.id] || []);
    setNewMessage('');
    // Mark as read - clear unread count
    setCustomersData(customersData.map(c =>
      c.id === customer.id ? { ...c, unread: 0 } : c
    ));
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        sender: 'admin',
        text: newMessage,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  return (
    <div>
      <PageHeader title="Customers & Chat" subtitle="Home / Customers / Chat Admin" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[600px]">
        {/* Customer List */}
        <div className="lg:col-span-1 rounded-[28px] border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">Customers ({customersData.length})</h3>
          </div>

          <div className="overflow-y-auto flex-1">
            {customersData.map((customer) => (
              <div
                key={customer.id}
                onClick={() => handleSelectChat(customer)}
                className={`p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition ${
                  selectedChat?.id === customer.id ? 'bg-slate-100' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <img
                      src={customer.avatar}
                      alt={customer.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                        customer.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-slate-900">{customer.name}</p>
                      {customer.unread > 0 && (
                        <span className="bg-emerald-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                          {customer.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{customer.lastMessage}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{customer.lastMessageTime}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2 rounded-[28px] border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={selectedChat.avatar}
                      alt={selectedChat.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                        selectedChat.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'
                      }`}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{selectedChat.name}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {selectedChat.status === 'active' ? 'Active now' : 'Offline'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="p-2 hover:bg-slate-200 rounded-full transition"
                  title="More options"
                >
                  <FaEllipsisV className="text-slate-600" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-3 rounded-3xl ${
                        msg.sender === 'admin'
                          ? 'bg-emerald-500 text-white rounded-br-none'
                          : 'bg-slate-200 text-slate-900 rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sender === 'admin' ? 'text-emerald-100' : 'text-slate-600'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-slate-200 bg-white">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleSendMessage}
                    className="px-6 py-3 rounded-3xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold transition hover:shadow-lg hover:scale-105"
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center flex-col gap-4 text-slate-400">
              <div className="text-5xl">💬</div>
              <p className="text-lg font-semibold">Select a customer to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Customers;
