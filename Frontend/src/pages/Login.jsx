import { AppWindowIcon, CodeIcon, Loader2 } from "lucide-react";

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
import { useEffect, useState } from "react";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../../src/features/api/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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
  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registeredSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginSuccess,
    },
  ] = useLoginUserMutation();
  const inputOnchangeHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignup({ ...signup, [name]: value });
    } else {
      setLogin({ ...login, [name]: value });
    }
  };
  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signup : login;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (registeredSuccess && registerData) {
      setSignup({
        name: "",
        email: "",
        password: "",
      });
      navigate("/");
      toast.success(registerData?.message || "Credentials availed successfully");
    }
    if (registerError) {
      toast.error(registerError?.data?.message || "Signup Failed");
    }
    if (loginError) {
      setLogin({
        email: "",
        password: "",
      });
      toast.error(loginError?.data?.message || "Failed to login");
    }
    if (loginSuccess && loginData) {
      setLogin({
        email: "",
        password: "",
      });
      navigate("/");
      toast.success(loginData?.message || "Login successfull");
    }
  }, [
    registerIsLoading,
    loginIsLoading,
    registerError,
    loginError,
    registerData,
    loginData,
  ]);

  return (
    <div className="w-full flex items-center justify-center mt-30">
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
                  onChange={(e) => inputOnchangeHandler(e, "signup")}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={signup.email}
                  onChange={(e) => inputOnchangeHandler(e, "signup")}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={signup.password}
                  onChange={(e) => inputOnchangeHandler(e, "signup")}
                />
              </div>
            </CardContent>

            <CardFooter>
              <div className="w-full items-center justify-center flex">
                <Button
                  disabled={registerIsLoading}
                  className={"w-[12rem]"}
                  onClick={() => handleRegistration("signup")}
                >
                  {registerIsLoading ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Signup"
                  )}
                </Button>
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
                  onChange={(e) => inputOnchangeHandler(e, "login")}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={login.password}
                  onChange={(e) => inputOnchangeHandler(e, "login")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full items-center justify-center flex">
                <Button
                  disabled={loginIsLoading}
                  className={"w-[12rem]"}
                  onClick={() => handleRegistration("login")}
                >
                  {loginIsLoading ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
