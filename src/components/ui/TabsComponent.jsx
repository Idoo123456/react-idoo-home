import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TabsComponent = ({ tabs, defaultTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className="w-full">
      {/* Tab Buttons */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`relative px-5 py-3 font-semibold text-sm transition-colors ${
              activeTab === index
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            {tab.icon && <tab.icon className="inline mr-2 text-lg" />}
            {tab.label}

            {activeTab === index && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-full"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {tabs[activeTab].content}
        </motion.div>
      </div>
    </div>
  );
};

export default TabsComponent;
