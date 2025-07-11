import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Course from "./Course";
import { Loader2 } from "lucide-react";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";
const Profile = () => {
  const myCourse = [1, 2];
  const { data, isLoading, refetch } = useLoadUserQuery();
  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserIsLoading,
      error: updateUserIsError,
      isSuccess,
    },
  ] = useUpdateUserMutation();
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setProfilePhoto(file);
  };
  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);
    try {
      const res = await updateUser(formData);
      console.log(res);
    } catch (error) {
      console.log("Error while updating", error.message);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message || "Profile updated Successfully");
      setName("");
      setProfilePhoto("");
    }
    if (updateUserIsError) {
      toast.error(
        updateUserIsError.data.message || "Profile updated Successfully"
      );
    }
  }, [updateUserData, updateUserIsError, updateUserIsLoading, isSuccess]);
  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 my-24 md:px-0">
      <h1 className="font-bold text-2xl text-center md:text-left">Profile</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start my-6 gap-8">
        <div>
          <Avatar className="h-24 w-24 md:h-32 md:w-32 rounded-full">
            <AvatarImage
              src={data?.user?.photoUrl}
              alt="@shadcn"
              className={"rounded-full object-cover h-full w-full"}
            />
            <AvatarFallback>
              {data?.user?.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="mb-2">
            <h1 className="text-base font-semibold flex items-center gap-1  ">
              Name:
              <span className="text-sm text-gray-500 dark:text-gray-300">
                {data?.user?.name}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="text-base font-semibold flex items-center gap-1  ">
              Email:
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {data?.user?.email}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="text-base font-semibold flex items-center gap-1  ">
              Role:
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {data?.user?.role}
              </span>
            </h1>
          </div>
          <div>
            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <Button className={"text-xs  px-1"}>Edit profile</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when
                      you&apos;re done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col max-w-sm:flex-row gap-4">
                    <div className="flex gap-4">
                      <Label htmlFor="name-1">Name:</Label>
                      <Input
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="flex gap-4">
                      <Label htmlFor="username-1">Photo</Label>
                      <Input type={"file"} onChange={onChangeHandler} />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                      type="submit"
                      disabled={updateUserIsLoading}
                      onClick={updateUserHandler}
                    >
                      {updateUserIsLoading ? (
                        <>
                          <Loader2 className="animate-spin" /> Please wait....
                        </>
                      ) : (
                        "Save changes"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
          </div>
        </div>
      </div>
      <div>
        <h1 className="font-bold mb-4">Courses your're enrolled in</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <SkeletonCard />
          ) : myCourse.length === 0 ? (
            <p className="text-sm text-gray-500 truncate">
              You have no active enrolled courses
            </p>
          ) : (
            myCourse.map((_, index) => <Course key={index} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

const SkeletonCard = () => {
  return (
    <div className="flex flex-col space-y-3 bg-white shadow-lg">
      <div className="h-[125px] w-full bg-gray-200 rounded-xl animate-pulse"></div>
      <div className="space-y-2 bg-white p-3">
        <div className="h-4 w-[50%] bg-gray-200 animate-pulse"></div>
        <div className="h-4 w-[40%] bg-gray-200 animate-pulse"></div>
      </div>
    </div>
  );
};
