'use client'

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingCards from "./FloatingCards";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">

      <div className="container mx-auto grid min-h-screen max-w-7xl items-center gap-20 px-6 lg:grid-cols-2">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
        >

          <div className="mb-6 inline-flex rounded-full border bg-white/10 px-4 py-2 backdrop-blur">

            🚀 India's Developer Collaboration Platform

          </div>

          <h1 className="text-5xl font-black leading-tight lg:text-7xl">

            Build the

            <span className="bg-linear-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent">

              {" "}Future{" "}

            </span>

            with the Right Developers.

          </h1>

          <p className="mt-8 max-w-xl text-lg text-muted-foreground">

            Connect with talented student developers from universities
            across India. Find teammates, build startups,
            participate in hackathons and ship products together.

          </p>

          <div className="mt-10 flex gap-4">

            <Link href="/browse">

              <Button size="lg">

                Browse Developers

                <ArrowRight className="ml-2 h-5 w-5" />

              </Button>

            </Link>

            <Link href="/sign-up">

              <Button
                size="lg"
                variant="outline"
              >

                Join Free

              </Button>

            </Link>

          </div>

          <div className="mt-14 flex gap-10">

            <div>

              <h2 className="text-3xl font-bold">

                1000+

              </h2>

              <p className="text-muted-foreground">

                Developers

              </p>

            </div>

            <div>

              <h2 className="text-3xl font-bold">

                50+

              </h2>

              <p className="text-muted-foreground">

                Universities

              </p>

            </div>

            <div>

              <h2 className="text-3xl font-bold">

                ∞

              </h2>

              <p className="text-muted-foreground">

                Opportunities

              </p>

            </div>

          </div>

        </motion.div>

        <FloatingCards />

      </div>

    </section>
  );
}