import { VictoryChart, VictoryLine, VictoryAxis, VictoryLabel } from "victory";
import React, { useState, useEffect } from "react";
import { addDays, subDays, format, startOfMonth } from "date-fns";

const LineGraph = ({ entries }) => {
  const [graphData, setGraphData] = useState({
    data: [],
    styles: { xTickValues: [] },
  });

  useEffect(() => {
    if (entries) {
      let data = [];
      // const firstDate = startOfMonth(
      //   subDays(new Date(entries[0].entryDate), 30)
      // );
      // const lastDate = startOfMonth(
      //   addDays(new Date(entries[entries.length - 1].entryDate), 30)
      // );
      let xTickValues = [];

      //TODO: from db only send last year of data
      entries.map((e) => {
        const entryDate = new Date(e.entryDate);
        console.log(entryDate.Day);
        data.push({ x: entryDate, y: e.kmPerHundred });
        xTickValues.push(startOfMonth(entryDate));
      });
      // xTickValues.unshift(firstDate);
      // xTickValues.push(lastDate);
      //Remove duplicates ()
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
          tickValues={graphData.data.map((e) => new Date(e.x))}
          tickFormat={(e) => format(new Date(e), "MMM d")}
          //tickValues={graphData.styles.xTickValues.map((e) => new Date(e))}
          // tickFormat={(tick) => format(new Date(tick), "MMM yy")}
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
