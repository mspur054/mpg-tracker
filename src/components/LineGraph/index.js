import { VictoryChart, VictoryLine, VictoryAxis, VictoryLabel } from "victory";
import React, { useState, useEffect } from "react";
import {
  isSameDay,
  format,
  startOfMonth,
  max,
  eachMonthOfInterval,
} from "date-fns";

const LineGraph = ({ entries }) => {
  const [graphData, setGraphData] = useState({
    data: [],
    styles: { xTickValues: [] },
  });

  useEffect(() => {
    if (entries) {
      let data = [];

      let xTickValues = [];
      const firstDate = new Date(entries[0].entryDate);
      const maxDate = max(entries.map((e) => new Date(e.entryDate)));
      xTickValues = eachMonthOfInterval({ start: firstDate, end: maxDate });

      //TODO: from db only send last year of data
      entries.map((e) => {
        const entryDate = new Date(e.entryDate);

        data.push({ x: entryDate, y: e.kmPerHundred });
      });
      xTickValues.shift();
      xTickValues.unshift(firstDate);

      //Remove duplicates
      xTickValues = [...new Set(xTickValues.map((dt) => dt.toString()))];
      setGraphData({ data: data, styles: { xTickValues: xTickValues } });
    }
  }, [entries]);

  return (
    <div>
      <VictoryChart scale={{ x: "time" }} domainPadding={30} width={400}>
        <VictoryLabel text="MPG" x={200} y={30} textAnchor="middle" />
        <VictoryAxis
          dependentAxis={true}
          style={{
            grid: { stroke: "grey" },
          }}
        />
        <VictoryAxis
          label="Fuel up date"
          tickValues={graphData.styles.xTickValues.map((e) => new Date(e))}
          //only show first's of months
          tickFormat={(tick) =>
            isSameDay(new Date(tick), startOfMonth(new Date(tick)))
              ? format(new Date(tick), "MMM d")
              : ""
          }
        />
        <VictoryLine
          padding={{ left: 60, right: 60 }}
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc" },
          }}
          data={graphData.data}
        />
      </VictoryChart>
    </div>
  );
};

export default LineGraph;
