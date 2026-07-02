'use client'

import { motion } from "motion/react";
import {
  UserPlus,
  Search,
  Users,
  Rocket,
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Profile",
    description:
      "Showcase your skills, projects, tech stack and interests so other developers can discover you.",
  },
  {
    icon: Search,
    title: "Browse Developers",
    description:
      "Search developers by university, skills and interests to find the perfect teammate.",
  },
  {
    icon: Users,
    title: "Connect & Collaborate",
    description:
      "Send connection requests and build your own trusted developer network.",
  },
  {
    icon: Rocket,
    title: "Build Amazing Products",
    description:
      "Work together on hackathons, startups, open-source and real-world projects.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-28">

      <div className="container mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >

          <h2 className="text-5xl font-black">
            How It Works
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Getting started only takes a few minutes.
          </p>

        </motion.div>

        <div className="relative">

          {/* Timeline */}

          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-border lg:block" />

          <div className="space-y-20">

            {steps.map((step, index) => {

              const Icon = step.icon;

              return (

                <motion.div
                  key={step.title}
                  initial={{
                    opacity: 0,
                    x: index % 2 === 0 ? -60 : 60,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: .6,
                  }}
                  className={`flex items-center ${
                    index % 2 === 0
                      ? "lg:flex-row"
                      : "lg:flex-row-reverse"
                  }`}
                >

                  <div className="flex-1">

                    <div className="rounded-3xl border bg-white/5 p-8 backdrop-blur-xl shadow-xl">

                      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">

                        <Icon className="h-7 w-7 text-primary" />

                      </div>

                      <h3 className="text-2xl font-bold">

                        {step.title}

                      </h3>

                      <p className="mt-4 leading-7 text-muted-foreground">

                        {step.description}

                      </p>

                    </div>

                  </div>

                  <div className="hidden w-28 justify-center lg:flex">

                    <div className="flex h-14 w-14 items-center justify-center rounded-full border bg-background shadow-xl">

                      <span className="text-xl font-bold">

                        {index + 1}

                      </span>

                    </div>

                  </div>

                  <div className="hidden flex-1 lg:block" />

                </motion.div>

              );

            })}

          </div>

        </div>

      </div>

    </section>
  );
}