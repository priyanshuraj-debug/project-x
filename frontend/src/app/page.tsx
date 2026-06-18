'use client'

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import userService from "@/helpers/userSevice"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import UserCard from "@/components/UserCard"

export default function Home() {
  const [university, setUniversity] = useState("")
  const [skill, setSkill] = useState("")
  const [page, setPage] = useState("1")

  const SKILLS = [
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C++",
    "Docker",
    "DevOps",
    "Flutter",
    "GenAI",
    "Machine Learning",
    "LangChain",
    "DSA",
    "Competitive Programming",
  ]

  const universityList = [
    "Indian Institute of Technology Bombay (IIT Bombay)",
    "Indian Institute of Technology Delhi (IIT Delhi)",
    "Indian Institute of Technology Madras (IIT Madras)",
    "Indian Institute of Technology Kanpur (IIT Kanpur)",
    "Indian Institute of Technology Kharagpur (IIT Kharagpur)",
    "Indian Institute of Technology Roorkee (IIT Roorkee)",
    "Indian Institute of Technology Guwahati (IIT Guwahati)",
    "Indian Institute of Technology Hyderabad (IIT Hyderabad)",
    "National Institute of Technology Trichy (NIT Trichy)",
    "National Institute of Technology Warangal (NIT Warangal)",
    "National Institute of Technology Surathkal (NITK Surathkal)",
    "National Institute of Technology Rourkela (NIT Rourkela)",
    "National Institute of Technology Calicut (NIT Calicut)",
    "National Institute of Technology Patna (NIT Patna)",
    "Delhi Technological University (DTU)",
    "Netaji Subhas University of Technology (NSUT)",
    "Indraprastha Institute of Information Technology Delhi (IIIT Delhi)",
    "International Institute of Information Technology Hyderabad (IIIT Hyderabad)",
    "Indian Institute of Information Technology Allahabad (IIIT Allahabad)",
    "Birla Institute of Technology and Science Pilani (BITS Pilani)",
    "Vellore Institute of Technology (VIT)",
    "SRM Institute of Science and Technology (SRMIST)",
    "Manipal Institute of Technology (MIT Manipal)",
    "Thapar Institute of Engineering and Technology",
    "Chandigarh University",
    "Lovely Professional University (LPU)",
    "KIIT University",
    "Amity University",
    "UPES Dehradun",
    "ABES Engineering College",
    "GL Bajaj Institute of Technology and Management",
  ]

  const { data: userProfile } = useQuery({
    queryKey: ["developer", university, skill, page],
    queryFn: () =>
      userService.getAllUserProfile({
        university,
        skill,
        page,
      }),
  })

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      <div className="mb-12">
        <h1 className="text-5xl font-bold tracking-tight">
          Discover Developers
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Connect with students, developers, founders and builders from
          universities across India.
        </p>
      </div>

      <div className="mb-10 rounded-3xl border bg-linear-to-br from-background to-muted/30 p-8 shadow-lg">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">
            🔍 Find Your Next Teammate
          </h2>

          <p className="mt-2 text-muted-foreground">
            Discover developers based on skills and universities.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              University
            </p>

            <Combobox
              items={universityList}
              onValueChange={(value) => {
                setUniversity(value as string)
                setPage("1")
              }}
            >
              <ComboboxInput placeholder="Search university..." />

              <ComboboxContent>
                <ComboboxEmpty>
                  No university found.
                </ComboboxEmpty>

                <ComboboxList>
                  {(item) => (
                    <ComboboxItem
                      key={item}
                      value={item}
                    >
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Skill
            </p>

            <Combobox
              items={SKILLS}
              onValueChange={(value) => {
                setSkill(value as string)
                setPage("1")
              }}
            >
              <ComboboxInput placeholder="Search skill..." />

              <ComboboxContent>
                <ComboboxEmpty>
                  No skill found.
                </ComboboxEmpty>

                <ComboboxList>
                  {(item) => (
                    <ComboboxItem
                      key={item}
                      value={item}
                    >
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
        </div>

        {(skill || university) && (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {skill && (
              <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                {skill}
              </span>
            )}

            {university && (
              <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                {university}
              </span>
            )}

            <button
              onClick={() => {
                setSkill("")
                setUniversity("")
                setPage("1")
              }}
              className="ml-auto text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      <UserCard userProfile={userProfile} />
    </div>
  )
}