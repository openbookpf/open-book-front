import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as echarts from "echarts";
import { fetchChartData } from "../../redux/actions";
import { format, parse } from "date-fns";

const BarChart = () => {
  const dispatch = useDispatch();
  const [selectedYear, setSelectedYear] = useState("2024");
  const chartData = useSelector((state) => state.chartData);

  useEffect(() => {
    dispatch(fetchChartData());
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(chartData).length !== 0) {
      updateChart();
    }
  }, [chartData, selectedYear]);

  const groupDataByMonth = (data) => {
    const groupedData = {};

    data.forEach((item) => {
      const date = parse(item.date, "MM/dd/yyyy", new Date());
      const monthYear = format(date, "MMM yyyy");
      if (!groupedData[monthYear]) {
        groupedData[monthYear] = {
          number_of_sold_books: item.number_of_sold_books,
          total_amount_sold_books: item.total_amount_sold_books,
        };
      } else {
        groupedData[monthYear].number_of_sold_books +=
          item.number_of_sold_books;
        groupedData[monthYear].total_amount_sold_books +=
          item.total_amount_sold_books;
      }
    });

    return groupedData;
  };

  const updateChart = () => {
    const { months, number_of_sold_books, total_amount_sold_books } =
      chartData[selectedYear];

    const options = {
      title: {
        text: `Sales ${selectedYear}`,
      },
      legend: {
        data: ["Books Sold", "Total Sales Amount"],
      },
      xAxis: {
        type: "category",
        data: months,
      },
      yAxis: [
        {
          type: "value",
          name: "Books Sold",
          axisLabel: {
            formatter: "{value}",
          },
        },
        {
          type: "value",
          name: "Total Sales Amount",
          axisLabel: {
            formatter: "{value} $",
          },
          splitLine: {
            show: false,
          },
        },
      ],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      series: [
        {
          name: "Books Sold",
          data: number_of_sold_books,
          type: "bar",
          label: {
            show: false,
          },
        },
        {
          name: "Total Sales Amount",
          data: total_amount_sold_books,
          type: "bar",
          yAxisIndex: 1,
          itemStyle: {
            color: "#a90000",
          },
          label: {
            show: false,
          },
        },
      ],
    };

    const chart = echarts.init(document.getElementById("bar-chart-container"));
    chart.setOption(options);
  };

  return (
    <div>
      <div className="flex justify-center">
        <button
          className={`mr-4 ${
            selectedYear === "2023" ? "font-bold text-white" : "font-light"
          }`}
          onClick={() => setSelectedYear("2023")}
        >
          2023
        </button>
        <button
          className={`mr-4 ${
            selectedYear === "2024" ? "font-bold text-white" : "font-light"
          }`}
          onClick={() => setSelectedYear("2024")}
        >
          2024
        </button>
      </div>
      <div id="bar-chart-container" className="w-full h-96" />
    </div>
  );
};

export default BarChart;
