import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Info } from "lucide-react";

export default function Toast({ toasts }) {
  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  const icons = {
    success: <CheckCircle size={18} className="mr-2" />,
    error: <XCircle size={18} className="mr-2" />,
    info: <Info size={18} className="mr-2" />,
  };

  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className={`text-white px-5 py-3 rounded-lg shadow-lg text-sm font-medium flex items-center ${colors[toast.type]}`}
          >
            {icons[toast.type]}
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
