"use client";

import { Area, AreaChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", rating: 0 },
  { month: "February", rating: 5 },
  { month: "March", rating: 1 },
  { month: "April", rating: 2 },
  { month: "May", rating: 3 },
  { month: "June", rating: 4.8 },
  { month: "July", rating: 5 },
  { month: "August", rating: 3 },
  { month: "September", rating: 4 },
  { month: "October", rating: 0 },
  { month: "November", rating: 0 },
  { month: "December", rating: 0 },
];
const chartConfig = {
  rating: {
    label: "Rating",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export default function RatingStatistics() {
  return (
    <Card className="lg:col-span-2 lg:order-3 order-3">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Rating Chart</CardTitle>
          <CardDescription>Showing the rating changes for the this year (2024).</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[230px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Area
              dataKey="rating"
              type="linear"
              fill="var(--color-rating)"
              fillOpacity={0.4}
              stroke="var(--color-rating)"
              dot={{
                fill: "var(--color-rating)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
            </Area>
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
