import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Createcourse = () => {
  const navigate = useNavigate();
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");
  const onSelectedCategory = (value) => {
    setCategory(value);
  };
  const [createCourse, { data, error, isLoading, isSuccess }] =
    useCreateCourseMutation();
  const createCourseHandler = async () => {
    await createCourse({ courseTitle, category });
  };

  useEffect(() => {
    if (isSuccess) {
      setCourseTitle("");
      setCategory("");
      navigate("/admin/course");
      toast.success(data.message || "Course created🥳");
    }
    if (error) {
      toast.success(error.message || "Error in creating course");
    }
  }, [error, isSuccess]);

  return (
    <div className="flex-1 mx-10">
      <div className="space-y-4">
        <h1 className="font-bold txet-4xl">
          Lets add course,and some basic details for your new course
        </h1>
        <div className="mb-4">
          <Label className="mb-2 font-semibold">Title:</Label>
          <Input
            name="courseTitle"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Your Course Name"
          />
        </div>
        <div>
          <Label className="font-semibold mb-2">Category:</Label>
          <Select onValueChange={onSelectedCategory}>
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
                <SelectItem value="cs fundamentals">CS fundamental</SelectItem>
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
        <div className="flex gap-4 my-6">
          <Button
            className={"cursor-pointer"}
            variant={"outline"}
            onClick={() => navigate("/admin/course")}
            disabled={isLoading}
          >
            Back
          </Button>
          <Button className={"cursor-pointer"} onClick={createCourseHandler}>
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" />
                Please wait...
              </>
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Createcourse;
