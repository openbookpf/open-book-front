import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as echarts from "echarts";
import { fetchChartData } from "../../redux/actions";

const PieChart = () => {
  const dispatch = useDispatch();
  const chartData = useSelector((state) => state.chartData);

  useEffect(() => {
    dispatch(fetchChartData());
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(chartData).length !== 0) {
      updateChart();
    }
  }, [chartData]);

  const updateChart = () => {
    const { topSoldGenres } = chartData;

    const data = topSoldGenres.map((genreData) => ({
      value: genreData.value,
      name: genreData.genre,
    }));

    const options = {
      title: {
        text: `Top Sold Genres`,
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        left: "left",
        top: "10%",
      },
      series: [
        {
          name: "Top Sold Genres",
          type: "pie",
          radius: ["40%", "70%"],
          center: ["60%", "50%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 12,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: data,
        },
      ],
    };

    const chart = echarts.init(document.getElementById("pie-chart-container"));
    chart.setOption(options);
  };

  return <div id="pie-chart-container" className="w-full h-96" />;
};

export default PieChart;
