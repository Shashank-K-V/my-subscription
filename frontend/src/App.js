import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import CardGrid from "./components/CardGrid";
import PopupModal from "./components/PopupModal";
import Toast from "./components/Toast";
import {
  getSubscriptions,
  addSubscription,
  updateSubscription,
  deleteSubscription,
} from "./api/subscriptions";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("isDarkMode");
    return saved === "true";
  });

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) html.classList.add("dark");
    else html.classList.remove("dark");
    localStorage.setItem("isDarkMode", isDarkMode);
  }, [isDarkMode]);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [toasts, setToasts] = useState([]);

  // 🔔 Toast handler
  const showToast = (message, type = "success") => {
    const id = Date.now();
    const newToast = { id, message, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2500);
  };

  // 🟢 Load subscriptions from Flask when app loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSubscriptions();
        setCards(data);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
        showToast("⚠️ Failed to load subscriptions.", "error");
      }
    };
    fetchData();
  }, []);

  // 🟢 Add a new subscription
  const handleAddClick = () => {
    const emptyCard = {
      id: Date.now(), // temporary
      service: "",
      amount: "",
      planType: "Monthly",
      renewalDate: "",
      category: "",
      notes: "",
      isNew: true,
    };
    setSelectedCard(emptyCard);
  };

  // 🟢 Save (add or update)
  const handleSave = async (id, updatedCard) => {
    try {
      if (updatedCard.isNew) {
        delete updatedCard.isNew;

        // ✅ POST to backend
        const newSub = await addSubscription(updatedCard);
        

        // ✅ Use the backend's real object (with true ID)
        setCards((prevCards) => [...prevCards, newSub]);
        showToast("✅ Subscription added!", "success");
      } else {
        // ✅ PUT to backend
        const updated = await updateSubscription(id, updatedCard);

        // ✅ Replace old version with updated one
        setCards((prevCards) =>
          prevCards.map((c) => (c.id === id ? updated : c))
        );
        showToast("💾 Subscription updated!", "success");
      }
    } catch (error) {
      console.error("Error saving subscription:", error);
      showToast("⚠️ Failed to save subscription.", "error");
    }
    setSelectedCard(null);
  };

  // 🟢 Delete subscription
  const handleDelete = async (id) => {
    try {
      await deleteSubscription(id);
      setCards((prevCards) => prevCards.filter((c) => c.id !== id));
      showToast("❌ Subscription deleted!", "error");
    } catch (error) {
      console.error("Error deleting subscription:", error);
      showToast("⚠️ Failed to delete subscription.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 relative transition-colors duration-300">
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <main className="flex flex-col items-center p-8">
        <CardGrid
          cards={cards}
          onCardClick={setSelectedCard}
          onDelete={handleDelete}
        />
      </main>

      {/* ➕ Add Button */}
      <div className="fixed bottom-8 left-8">
        <button
          onClick={handleAddClick}
          className="bg-green-500 hover:bg-green-600 text-white text-2xl font-bold rounded-full w-12 h-12 shadow-lg"
        >
          +
        </button>
      </div>

      {/* 🪟 Modal */}
      {selectedCard && (
        <PopupModal
          card={selectedCard}
          onSave={handleSave}
          onClose={() => setSelectedCard(null)}
        />
      )}

      {/* 🔔 Toast Notifications */}
      <Toast toasts={toasts} />
    </div>
  );
}

export default App;
