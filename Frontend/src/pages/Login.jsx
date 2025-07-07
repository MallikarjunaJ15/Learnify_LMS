import { AppWindowIcon, CodeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const Login = () => {
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const inputOnchangeHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignup({ ...signup, [name]: value });
    } else {
      setLogin({ ...login, [name]: value });
    }
  };
  return (
    <div className="w-full flex items-center justify-center">
      <Tabs defaultValue="login" className={"w-sm"}>
        <TabsList>
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Create a new Account and avail a Login Credentails
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <Label>Name</Label>
                <Input
                  placeholder="Learnify"
                  name="name"
                  value={signup.name}
                  onChange={inputOnchangeHandler}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={signup.email}
                  onChange={inputOnchangeHandler}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={signup.password}
                  onChange={inputOnchangeHandler}
                />
              </div>
            </CardContent>

            <CardFooter>
              <div className="w-full items-center justify-center flex">
                <Button className={"w-[12rem]"}>Signup</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login to enter the course paradise📓🖥️
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="flex flex-col gap-4">
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={login.email}
                  onChange={inputOnchangeHandler}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={login.password}
                  onChange={inputOnchangeHandler}
                />
              </div>
            </CardContent>
            <CardFooter>
               <div className="w-full items-center justify-center flex">
                <Button className={"w-[12rem]"}>Login</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
