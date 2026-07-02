'use client'

import { motion } from "motion/react";
import {
  Code2,
  Database,
  Cpu,
  Globe,
  Sparkles,
  Server,
} from "lucide-react";

const cards = [
  { icon: Code2, title: "React" },
  { icon: Database, title: "MongoDB" },
  { icon: Cpu, title: "AI" },
  { icon: Globe, title: "Next.js" },
  { icon: Sparkles, title: "GenAI" },
  { icon: Server, title: "Node.js" },
];

export default function FloatingCards() {
  return (
    <div className="relative hidden h-137.5 w-full lg:block">

      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            animate={{
              y: [0, -18, 0],
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
            }}
            className="absolute rounded-2xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-xl"
            style={{
              top: `${(index % 3) * 170}px`,
              left: `${(index > 2 ? 220 : 20) + index * 12}px`,
            }}
          >
            <Icon className="mb-3 h-8 w-8 text-primary" />

            <p className="font-semibold">{card.title}</p>

            <p className="text-xs text-muted-foreground">
              Student Developer
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}