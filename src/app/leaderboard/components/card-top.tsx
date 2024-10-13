import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/src/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { Share } from "lucide-react";
import { Metrics } from "@/src/interface/Metrics";
import { formatAddress } from "@/src/utils/address";
import { SpinnerLeader } from "./spinner";
import { Avatar, Name } from "@coinbase/onchainkit/identity";
import { base } from "viem/chains";
import { Avatar as AvatarSherry, AvatarImage, AvatarFallback } from "@/src/components/ui/avatar";

interface CardTopProps {
  metrics: Metrics[];
  address: string;
  isLoading: boolean;
}

const CardTop: React.FC<CardTopProps> = ({ metrics, address, isLoading }) => {
  return (
    <Tabs className="w-full items-center flex flex-col" defaultValue="7 Days">
      <Card className="p-[24px] max-w-[352px] w-full gap-3 flex flex-col">
        <CardHeader className="flex flex-col gap-2">
          <CardTitle className="text-[24px]">Top voted</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <div className="flex justify-between items-center gap-[34px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="7 Days">7 Days</TabsTrigger>
              <TabsTrigger value="30 Days">30 Days</TabsTrigger>
              <TabsTrigger value="All time">All time</TabsTrigger>
            </TabsList>
            <Share className="w-[28px] h-[28px]" />
          </div>
        </CardHeader>

        <TabsContent value="7 Days">
          <Table>
            <TableCaption>
              Showing 1-10 of {metrics.length} challengers
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[70px]"></TableHead>
                <TableHead>Challenger</TableHead>
                <TableHead>Votes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {metrics.length > 0 ? (
                metrics.map((metric, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium p-[16px]">
                      {index + 1}
                    </TableCell>

                    <TableCell className="flex flex-row gap-1 items-center">
                      <Avatar
                        address={`0x${metric.kol.trim().slice(2)}`}
                        chain={base}
                        className="size-6"
                        defaultComponent={
                          <AvatarSherry className="size-6 border">
                            <AvatarImage src="/icons/icon-192x192.png" alt="@sherry" />
                            <AvatarFallback>SC</AvatarFallback>
                          </AvatarSherry>
                        }
                      />
                      <Name
                        address={`0x${metric.kol.trim().slice(2)}`}
                        chain={base}
                        className="font-light text-sm"
                      />
                    </TableCell>
                    <TableCell>{metric.votes}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    No data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="30 Days">
          <h1>30 Days</h1>
        </TabsContent>
        <TabsContent value="All time">
          <h1>All time</h1>
        </TabsContent>
      </Card>
    </Tabs>
  );
};

export default CardTop;
