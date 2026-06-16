'use client'
import React from 'react'
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

function ProjectInput({ index, remove }: { index: number; remove: () => void }) {
  const {register}=useFormContext()
  return (
    <div className="space-y-4">
  <Card className="border shadow-sm">
    
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle>
        Project {index + 1}
      </CardTitle>

      <Button
        variant="destructive"
        type="button"
        onClick={remove}
      >
        Delete
      </Button>
    </CardHeader>

    <CardContent className="space-y-4">
      
      <div className="space-y-2">
        <Label>Title</Label>
        <Input
          {...register(`projects.${index}.title`)}
          placeholder="Enter Project Title"
        />
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          className="min-h-28"
          {...register(`projects.${index}.description`)}
          placeholder="Describe your project..."
        />
      </div>

      <div className="space-y-2">
        <Label>Github URL</Label>
        <Input
          {...register(`projects.${index}.githubLink`)}
          placeholder="https://github.com/username/project"
        />
      </div>

      <div className="space-y-2">
        <Label>Live URL</Label>
        <Input
          {...register(`projects.${index}.liveLink`)}
          placeholder="https://your-project.vercel.app"
        />
      </div>

    </CardContent>
  </Card>
</div>
  )
}

export default ProjectInput