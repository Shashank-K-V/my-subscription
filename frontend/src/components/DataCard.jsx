import React from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

export default function DataCard({ card, onClick, onDelete }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="relative bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-md hover:shadow-lg transition rounded-2xl p-4 w-64 h-52 flex flex-col justify-between border border-gray-200 dark:border-gray-700 hover:border-blue-400 cursor-pointer"
    >
      {/* Delete Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(card.id);
        }}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition"
        title="Delete this subscription"
      >
        <Trash2 size={20} />
      </button>

      {/* Subscription Info */}
      <div>
        <h2 className="text-lg font-semibold">{card.service}</h2>
        <p className="text-sm">${card.amount} / {card.planType}</p>
        <p className="text-sm mt-1">Renewal: {card.renewalDate || "N/A"}</p>
        <p className="text-sm">Category: {card.category || "General"}</p>
      </div>

      {/* Notes */}
      {card.notes && (
        <p className="text-xs italic text-gray-500 dark:text-gray-400 mt-2">
          {card.notes}
        </p>
      )}
    </motion.div>
  );
}
