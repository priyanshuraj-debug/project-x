'use client'

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import userService from "@/helpers/userSevice"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import UserCard from "@/components/UserCard"

export default function Home() {
  const [university, setUniversity] = useState("")
  const [skill, setSkill] = useState("")
  const [page, setPage] = useState(1)

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

  const hasFilters = !!(skill || university)
 console.log(page);
 
  return (
    <>
    <div className="min-h-screen bg-[#f7f9fb]">

      <section className="px-4 pt-14 pb-10 sm:px-8 lg:px-16 max-w-7xl mx-auto">

       
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900">
            Discover Developers
          </h1>
          <p className="mt-3 text-lg text-gray-500 max-w-xl mx-auto">
            Connect with students, founders and builders from universities across India.
          </p>
        </div>

       
        <div
          className="
            max-w-4xl mx-auto rounded-3xl p-6 sm:p-8
            bg-white/70 backdrop-blur-md
            border border-slate-200/80
            shadow-[0_4px_20px_-2px_rgba(0,74,198,0.07),0_2px_10px_-2px_rgba(0,74,198,0.05)]
          "
        >
          <div className="grid gap-5 sm:grid-cols-2">
           
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                University
              </label>
              <Combobox
                items={universityList}
                onValueChange={(value) => {
                  setUniversity(value as string)
                  setPage(1)
                }}
              >
                <ComboboxInput
                  placeholder="Search university..."
                  className="
                    w-full rounded-xl border border-slate-200 bg-white
                    px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400
                    focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                    transition-all
                  "
                  showClear
                />
                <ComboboxContent>
                  <ComboboxEmpty>No university found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </div>

           
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                Skill
              </label>
              <Combobox
                items={SKILLS}
                onValueChange={(value) => {
                  setSkill(value as string)
                  setPage(1)
                }}
              >
                <ComboboxInput
                  placeholder="Search skill..."
                  className="
                    w-full rounded-xl border border-slate-200 bg-white
                    px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400
                    focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                    transition-all
                  "
                  showClear
                />
                <ComboboxContent>
                  <ComboboxEmpty>No skill found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </div>
          </div>

         
          {hasFilters && (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {skill && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-3.5 py-1.5 text-xs font-semibold text-blue-700">
                  
                  <svg className="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  {skill}
                </span>
              )}
              {university && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-3.5 py-1.5 text-xs font-semibold text-blue-700">
              
                  <svg className="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422A12.083 12.083 0 0121 18.5H3a12.083 12.083 0 012.84-7.922L12 14z" />
                  </svg>
                  {university}
                </span>
              )}
              <button
                onClick={() => {
                  setSkill("")
                  setUniversity("")
                  setPage(1)
                }}
                className="ml-auto text-xs font-medium text-gray-400 hover:text-gray-700 transition-colors underline underline-offset-4"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </section>

     
      <section className="px-4 pb-16 sm:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Browse Profiles</h2>
          <p className="text-sm text-gray-500 mt-1">
      Showing {userProfile?.totalUsers || 0} developers
    </p>
        </div>

        <UserCard userProfile={userProfile?.users} />
      </section>
    </div>
    <div>
      <Pagination>
  <PaginationContent>

    <PaginationItem>
      <PaginationPrevious
        onClick={() =>
          setPage((prev) => Math.max(1, prev - 1))
        }
      />
    </PaginationItem>

    {Array.from(
      { length: userProfile?.totalPages || 0 },
      (_, index) => (
        <PaginationItem key={index}>
          <PaginationLink
            isActive={page === index + 1}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </PaginationLink>
        </PaginationItem>
      )
    )}

    <PaginationItem>
      <PaginationNext
        onClick={() =>
          setPage((prev) =>
            Math.min(
              userProfile?.totalPages || 1,
              prev + 1
            )
          )
        }
      />
    </PaginationItem>

  </PaginationContent>
</Pagination>
    </div>
    </>
  )
}