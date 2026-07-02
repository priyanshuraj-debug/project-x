'use client'

import { motion } from "motion/react"
import {
  Users,
  GraduationCap,
  FolderGit2,
  Trophy,
} from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "1000+",
    label: "Student Developers",
  },
  {
    icon: GraduationCap,
    value: "50+",
    label: "Universities",
  },
  {
    icon: FolderGit2,
    value: "500+",
    label: "Projects Built",
  },
  {
    icon: Trophy,
    value: "100+",
    label: "Hackathon Teams",
  },
]

export default function Stats() {
  return (
    <section className="py-28">
      <div className="container mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((item, index) => {
            const Icon = item.icon

            return (
              <motion.div
                key={item.label}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                }}
                className="rounded-3xl border bg-white/5 backdrop-blur-xl p-8 shadow-xl"
              >
                <Icon className="mb-5 h-10 w-10 text-primary" />

                <h2 className="text-5xl font-black">
                  {item.value}
                </h2>

                <p className="mt-3 text-muted-foreground">
                  {item.label}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}