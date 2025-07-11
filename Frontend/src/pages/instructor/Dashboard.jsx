import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";

const Dashboard = () => {
  return (
    <div className="flex gap-4 flex-col">
      <div className="flex gap-8 ">
        <Card className={"w-1/4 shadow-xl"}>
          <CardHeader>Total Sales</CardHeader>
          <CardContent>
            <h1 className="font-bold text-lg">3</h1>
          </CardContent>
        </Card>
        <Card className={"w-1/4 shadow-xl"}>
          <CardHeader>Total Revenue</CardHeader>
          <CardContent>
            <h1 className="font-bold text-lg">1237</h1>
          </CardContent>
        </Card>
      </div>
      <div className="bg-red-400 w-full shadow-xl">f</div>
    </div>
  );
};

export default Dashboard;
