import { LogOut, Menu, School2 } from "lucide-react";
import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import DarkMode from "../../src/DarkMode";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { store } from "@/app/store";
import { userLoggedIn } from "@/features/authSlice";
const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, error, isSuccess }] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    await logoutUser();
    dispatch(userLoggedIn());
  };
  useEffect(() => {
    if (isSuccess) {
      navigate("login");
      toast.success(data.message || "Logged out successfully");
    }
  }, [isSuccess]);

  return (
    <div className="fixed left-0 right-0 top-0 duration-300 z-10 bg-white dark:bg-[#0A0A0A] w-full p-3 border-b border-b-gray-950 dark:border-b-gray-800">
      {/* Desktop */}
      <div className="md:flex items-center justify-between max-w-5xl mx-auto hidden ">
        <div className="flex gap-2 items-center font-bold">
          <School2 size={"22"} />
          <h1 className="text-xl hidden md:block">Learnify</h1>
        </div>
        <div className="flex items-center gap-4 ">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={user?.user?.photoUrl} />
                  <AvatarFallback>
                    {user?.user?.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className={"w-48"}>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to={"/learning"}>My Learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to={"profile"}>Edit Profile</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuItem onClick={logoutHandler}>
                  Logout{" "}
                  <DropdownMenuShortcut>
                    <LogOut />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {user?.user?.role === "instructor" && (
                    <Button className={"bg-[#d2b9ff] text-black w-full py-0.5"}>
                      {" "}
                      Dashboard
                    </Button>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex gap-2">
              <Button variant={"outline"}>
                <Link to={"login"}>Login</Link>
              </Button>
              <Button>
                <Link to={"login"}>Signup</Link>
              </Button>
            </div>
          )}

          <DarkMode />
        </div>
      </div>
      {/* Mobile */}
      <div className="md:hidden flex items-center justify-between px-4 h-full">
        <div className="flex gap-2 items-center font-bold">
          <School2 size={"22"} />
          <h1 className="text-xl">Learnify</h1>
        </div>
        <MobileNavrbar />
      </div>
    </div>
  );
};

export default Navbar;
const MobileNavrbar = () => {
  const role = "student";
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className={"rounded-full bg-gray-200 text hover:bg-gray-300"}
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className={"flex flex-col p-5 gap-8"}>
        <div className="flex items-center justify-between mt-6 ">
          <div className="flex gap-2 items-center font-bold">
            <School2 size={"22"} />
            <h1 className="text-xl ">Learnify</h1>
          </div>
          <div>
            <DarkMode />
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <Link to={"/learning"}>
            <h1 className="text-sm font-semibold">My Learning</h1>
          </Link>
          <h1 className="text-sm font-semibold">Edit Profile</h1>
          <h1 className="text-sm font-semibold">Logout</h1>
          {role === "instructor" ? (
            <Button className={"bg-[#d2b9ff] text-black w-full py-0.5"}>
              {" "}
              Dashboard
            </Button>
          ) : (
            ""
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
