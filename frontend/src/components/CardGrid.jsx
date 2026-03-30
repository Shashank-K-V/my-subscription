import React from "react";
import { AnimatePresence } from "framer-motion";
import DataCard from "./DataCard";

export default function CardGrid({ cards, onCardClick, onDelete }) {
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-10">
      <AnimatePresence>
        {cards.map((card) => (
          <DataCard
            key={card.id}
            card={card}
            onClick={() => onCardClick(card)}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </section>
  );
}
