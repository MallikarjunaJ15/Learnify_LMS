import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllCreatorCoursesQuery } from "@/features/api/courseApi";
import { Edit, Edit2 } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const CourseTable = () => {
  const { data, error, isLoading } = useGetAllCreatorCoursesQuery();
  const navigate = useNavigate();
  return (
    <div>
      <Button>
        <Link to={"createCourse"}>Create course</Link>
      </Button>
      <Table className={"my-4 w-full"}>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className={"text-riht"}>Action</TableHead>
          </TableRow>
        </TableHeader>
        {data?.courses.map((course) => (
          <TableBody className={"border-b border-gray-300"} key={course._id}>
            <TableRow>
              <TableCell className={"font-bold"}>
                {course?.courseTitle}
              </TableCell>
              <TableCell className={"font-bold"}>
                {course?.price || "NA"}
              </TableCell>
              <TableCell>
                <Badge
                  className={`${
                    course?.isPublished
                      ? "bg-green-300 text-green-500"
                      : "bg-zinc-300 text-black"
                  }`}
                >
                  {course?.isPublished ? "Published" : "Draft"}
                </Badge>
              </TableCell>
              <TableCell>
                <Button
                  variant={"ghost"}
                  className={"text-right"}
                  onClick={() => {
                    navigate(`${course._id}`);
                  }}
                >
                  <Edit />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </div>
  );
};

export default CourseTable;
