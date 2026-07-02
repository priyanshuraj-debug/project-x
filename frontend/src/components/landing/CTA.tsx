'use client'

import Link from "next/link"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-32">

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
        className="absolute left-1/2 top-1/2 -z-10 h-137.5 w-137.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/20 blur-[150px]"
      />

      <div className="container mx-auto max-w-5xl px-6">

        <motion.div
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
          className="rounded-[40px] border bg-white/5 p-16 text-center backdrop-blur-xl shadow-2xl"
        >

          <h2 className="text-5xl font-black leading-tight">

            Ready to Build
            <br />
            Something Amazing?

          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground">

            Join thousands of student developers,
            find your perfect teammates and build products that matter.

          </p>

          <div className="mt-12 flex justify-center gap-5">

            <Link href="/browse">

              <Button size="lg">

                Browse Developers

                <ArrowRight className="ml-2 h-5 w-5"/>

              </Button>

            </Link>

            <Link href="/sign-up">

              <Button
                variant="outline"
                size="lg"
              >

                Create Profile

              </Button>

            </Link>

          </div>

        </motion.div>

      </div>

    </section>
  )
}