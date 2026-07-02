'use client'

import { motion } from "motion/react"

import {
  Users,
  Rocket,
  Brain,
  Search,
  Network,
  Sparkles,
} from "lucide-react"

const features = [
  {
    icon: Search,
    title: "Discover Developers",
    description:
      "Browse talented student developers based on skills, university and interests.",
  },
  {
    icon: Users,
    title: "Find Teammates",
    description:
      "Connect with students looking for hackathon teammates and startup collaborators.",
  },
  {
    icon: Rocket,
    title: "Build Projects",
    description:
      "Collaborate on real-world products and gain practical experience.",
  },
  {
    icon: Brain,
    title: "AI Matching",
    description:
      "Future AI-powered recommendations for teammates based on your profile.",
  },
  {
    icon: Network,
    title: "University Network",
    description:
      "Connect beyond your campus and discover developers from top universities.",
  },
  {
    icon: Sparkles,
    title: "Developer Portfolio",
    description:
      "Showcase skills, tech stack, GitHub projects and achievements.",
  },
]

export default function Features() {
  return (
    <section className="py-28">

      <div className="container mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h2 className="text-5xl font-black">

            Why TeamForge?

          </h2>

          <p className="mt-6 text-lg text-muted-foreground">

            Everything a student developer needs
            to find teammates and build amazing products.

          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <motion.div
                key={feature.title}
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * .1,
                  duration: .5,
                }}
                whileHover={{
                  y: -8,
                }}
                className="group rounded-3xl border bg-white/5 p-8 backdrop-blur-xl transition-all"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-all group-hover:bg-primary group-hover:text-white">

                  <Icon className="h-7 w-7" />

                </div>

                <h3 className="text-2xl font-bold">

                  {feature.title}

                </h3>

                <p className="mt-4 leading-7 text-muted-foreground">

                  {feature.description}

                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}