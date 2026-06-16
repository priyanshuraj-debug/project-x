import { z } from "zod";

const projectSchema = z.object({
  title: z
    .string()
    .min(5, "Project title is too short"),

  description: z
    .string()
    .min(5, "Project description is too short"),

  githubLink: z
    .string()
    .url("Please enter a valid GitHub URL")
    .optional(),

  liveLink: z
    .string()
    .url("Please enter a valid Live URL")
    .optional(),
});

export const userSchema = z.object({
  fullname: z
    .string()
    .min(3, "Full name should be at least 3 characters")
    .max(50, "Full name should be less than 50 characters"),

  skills: z
    .array(z.string())
    .min(1, "Select at least one skill"),

  university: z
    .string()
    .min(3, "University name is too short"),

  bio: z
    .string()
    .min(10, "Bio should be at least 10 characters")
    .optional(),

  githubLink: z
    .string()
    .url("Enter a valid GitHub URL"),

  projects: z
    .array(projectSchema)
    .optional(),
});
// title:string,
//    description:string,
//    githubLink?:string,
//    liveLink?:string