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
    <div className="w-full flex justify-center items-center fixed top-[119px] z-10 bg-background-secondary">
      <Tabs defaultValue="Insights" className="">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="Insights">Insights</TabsTrigger>
          <TabsTrigger value="Champion">Champion</TabsTrigger>
          <TabsTrigger value="Voters">Voters</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default TabsBar;
