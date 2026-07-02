'use client'

import { motion } from "motion/react"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Priyanshu Raj",
    role: "Full Stack Developer",
    university: "Chandigarh University",
    review:
      "Project X helped me discover talented developers for hackathons and startup ideas. The platform feels exactly what students needed.",
  },
  {
    name: "Aman Gupta",
    role: "Frontend Developer",
    university: "IIIT Delhi",
    review:
      "Instead of randomly messaging people on LinkedIn, I can directly find developers interested in building products.",
  },
  {
    name: "Riya Sharma",
    role: "AI/ML Engineer",
    university: "NIT Trichy",
    review:
      "The experience is clean, modern and focused on collaboration. Looking forward to AI teammate matching.",
  },
]

export default function Testimonials() {
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
            Loved by Student Developers
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Join the next generation of builders.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">

          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * .15,
              }}
              viewport={{
                once: true,
              }}
              whileHover={{
                y: -10,
              }}
              className="rounded-3xl border bg-white/5 p-8 backdrop-blur-xl shadow-xl"
            >

              <div className="mb-5 flex gap-1">

                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}

              </div>

              <p className="leading-8 text-muted-foreground">

                "{item.review}"

              </p>

              <div className="mt-8">

                <h3 className="font-bold">

                  {item.name}

                </h3>

                <p className="text-sm text-muted-foreground">

                  {item.role}

                </p>

                <p className="text-sm text-primary">

                  {item.university}

                </p>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  )
}