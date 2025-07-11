import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RichTextEditor from "./RichTextEditor";

const EditCourse = () => {
  const navigate = useNavigate();
  const isPublished = true;
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    price: "",
    coureThumbnail: "",
  });
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-lg font-bold">
          Add a detail information regarding course
        </h1>
        <Button
          onClick={() => navigate("/admin/course")}
          className="font-semibold text-blue-500"
          variant={"link"}
        >
          Go to lecture page
        </Button>
      </div>
      <div className="border border-gray-400 my-4 p-4 rounded-lg ">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-semibold">Basic information</h1>
            <p className="text-gray-500 text-sm">
              Make changes to your coureses here,Click save when you'vs done
            </p>
          </div>
          <div className="space-x-2">
            {isPublished ? (
              <Button variant={"outline"}> Unpublish</Button>
            ) : (
              <Button>Publish</Button>
            )}
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-4 ">
          <Label>Title:</Label>
          <Input type={"text"} />
          <Label>Subtitle:</Label>
          <Input type={"text"} />
        </div>
        <div className="my-6">
          <Label className={"mb-2"}>Description</Label>
          <RichTextEditor input={input} setInput={setInput} />
        </div>
        <div className="mt-6 flex items-center gap-4">
          <div>
            <Label className="font-semibold mb-2">Category:</Label>
            <Select onValueChange={() => console.log(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className={"font-bold text-black"}>
                    Categories
                  </SelectLabel>

                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="dsa">DSA</SelectItem>
                  <SelectItem value="cs fundamentals">
                    CS fundamental
                  </SelectItem>
                  <SelectItem value="data science">Data Science</SelectItem>
                  <SelectItem value="fullstack">Fullstack</SelectItem>
                  <SelectItem value="algorithm">Alorithms</SelectItem>
                  <SelectItem value="roadmaps">roadmaps</SelectItem>
                  <SelectItem value="dbms">DBMS</SelectItem>
                  <SelectItem value="javScript">javScript</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="css">CSS</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="font-semibold mb-2">Course Level:</Label>
            <Select onValueChange={() => console.log(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className={"font-bold text-black"}>
                    Levels
                  </SelectLabel>
                  <SelectItem value="beginner">beginner</SelectItem>
                  <SelectItem value="medium">medium</SelectItem>
                  <SelectItem value="advance">advance</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className={"mb-2"}>Price in (INR)</Label>
            <Input type={"text"} />
          </div>
        </div>
        <div className="mt-4 w-fit">
          <Label className={"mb-2"}>Course Thumbnail</Label>
          <Input type={"file"} />
          <div>
            <h1>Image comes here</h1>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <Button variant={"outline"}>Cancel</Button>
          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
