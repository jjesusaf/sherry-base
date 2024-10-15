"use client";
import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "src/components/ui/tabs";

const TabsBar: React.FC = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <Tabs defaultValue="Insights" className="">
        <TabsList className="grid w-full grid-cols-1 items-center justify-center">
          <TabsTrigger value="Insights">Insights</TabsTrigger>
          {/**  <TabsTrigger value="Champion">Champion</TabsTrigger>
          <TabsTrigger value="Voters">Voters</TabsTrigger>*/}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default TabsBar;
