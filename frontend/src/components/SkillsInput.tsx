
'use client'
import React from "react";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";

function SkillsInput() {
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
  ];

  const { watch, setValue } = useFormContext();

  const selectedSkills: string[] = watch("skills") || [];

  const handleSkillToggle = (skill: string) => {
    const alreadySelected = selectedSkills.includes(skill);

    if (alreadySelected) {
      const updatedSkills = selectedSkills.filter(
        (item) => item !== skill
      );

      setValue("skills", updatedSkills, {
        shouldValidate: true,
      });
    } else {
      const updatedSkills = [
        ...selectedSkills,
        skill,
      ];

      setValue("skills", updatedSkills, {
        shouldValidate: true,
      });
    }
  };

  return (
  <div className="space-y-4">
    <div>
      <h2 className="text-xl font-semibold">Skills</h2>
      <p className="text-sm text-muted-foreground">
        Select the technologies you are comfortable with.
      </p>
    </div>

    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {SKILLS.map((skill) => (
        <Card
          key={skill}
          className={`cursor-pointer transition-all hover:shadow-md ${
            selectedSkills.includes(skill)
              ? "border-primary bg-primary/5"
              : ""
          }`}
          
        >
          <CardContent className="flex items-center gap-3 p-4">
            <Checkbox
              checked={selectedSkills.includes(skill)}
              onCheckedChange={() =>
                handleSkillToggle(skill)
              }
            />

            <label className="cursor-pointer text-sm font-medium">
              {skill}
            </label>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);
}

export default SkillsInput;