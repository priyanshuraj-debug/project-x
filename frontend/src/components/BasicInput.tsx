"use client";

import React from "react";
import { useFormContext } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

function BasicInput() {
  const { register, setValue } = useFormContext();

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

    "Other",
  ];

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Complete Your Profile</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label>Full Name</Label>
          <Input
            placeholder="Enter your full name"
            {...register("fullname")}
          />
        </div>

        <div className="space-y-2">
          <Label>Bio</Label>
          <Textarea
            placeholder="Tell others about yourself..."
            {...register("bio")}
          />
        </div>

        <div className="space-y-2">
          <Label>University</Label>

          <Combobox
            items={universityList}
            onValueChange={(value) =>
              setValue("university", value, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          >
            <ComboboxInput placeholder="Select your university" />

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

        <div className="space-y-2">
          <Label>GitHub Profile</Label>
          <Input
            placeholder="https://github.com/username"
            {...register("githubLink")}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default BasicInput;