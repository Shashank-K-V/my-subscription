import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PopupModal({ card, onSave, onClose }) {
  const [formData, setFormData] = useState({
    service: card.service || "",
    amount: card.amount || "",
    planType: card.planType || "Monthly",
    renewalDate: card.renewalDate || "",
    category: card.category || "",
    notes: card.notes || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(card.id, { ...card, ...formData });
  };

  const isNew = card.isNew;

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
      >
        <motion.div
          key="modal"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3, type: 'spring', stiffness: 120 }}
          className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg w-96 text-gray-800 dark:text-gray-100 transition-colors duration-300"
        >
          <h2 className="text-xl font-semibold mb-4">
            {isNew ? "➕ Add Subscription" : "✏️ Edit Subscription"}
          </h2>

          {/* Service Name */}
          <input
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Service Name (e.g., Netflix)"
          />

          {/* Amount */}
          <input
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            type="number"
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Amount ($)"
          />

          {/* Plan Type */}
          <select
            name="planType"
            value={formData.planType}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>

          {/* Renewal Date */}
          <input
            name="renewalDate"
            value={formData.renewalDate}
            onChange={handleChange}
            type="date"
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Category */}
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Category (e.g., Entertainment)"
          />

          {/* Notes */}
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg p-2 h-20 resize-none mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Additional notes..."
          />

          <div className="flex justify-end mt-4 gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className={`px-4 py-2 rounded-lg text-white ${
                isNew
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isNew ? "Add" : "Save"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
