'use client'
import React from 'react'
import ProjectInput from './ProjectInput'
import { Button } from '../ui/button'
import { useFieldArray,useFormContext } from 'react-hook-form'
function ProjectSection() {
  const { control } = useFormContext()

const {
  fields,
  append,
  remove
} = useFieldArray({
  control,
  name: "projects"
})
  return (
  <div className="space-y-6">
    
    <div>
      <h2 className="text-xl font-semibold">
        Projects
      </h2>

      <p className="text-sm text-muted-foreground">
        Showcase your best work and projects.
      </p>
    </div>

    <div className="space-y-6">
      {fields.map((field, index) => (
        <ProjectInput
          key={field.id}
          index={index}
          remove={() => remove(index)}
        />
      ))}
    </div>

    <Button
      type="button"
      className="w-full"
      onClick={() =>
        append({
          title: "",
          description: "",
          githubLink: "",
          liveLink: "",
        })
      }
    >
      Add Project
    </Button>
  </div>
)
}

export default ProjectSection