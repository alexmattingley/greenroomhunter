import ChartjsPluginAnnotation from 'chartjs-plugin-annotation';
import { colors } from 'data/styles-data.js';

function generateTideChartData(tideData) {
  const dataForChart = {
    time: [],
    height: [],
    pointBgColor: [],
    borderWidth: [],
    dayDividerVal: '',
  };
  let currentDay = '';
  tideData.forEach((itm) => {
    // No matter what, push every value to the chart
    dataForChart.time.push(itm.t);
    dataForChart.height.push(itm.v);
    // Calculate where the day changes from the first to second day
    const [, day] = itm.t.split(' ');
    if (currentDay !== day) {
      currentDay = day;
      dataForChart.dayDividerVal = itm.t;
    }
    // If its a high or low tide marker change the color and thickness of the dot
    if (itm.point) {
      dataForChart.pointBgColor.push(colors.lightGreen);
      dataForChart.borderWidth.push(4);
    } else {
      dataForChart.pointBgColor.push(colors.lightGreenFill);
      dataForChart.borderWidth.push(2);
    }
  });

  return {
    type: 'line',
    data: {
      datasets: [
        {
          label: 'tide (ft)',
          data: dataForChart.height,
          pointBackgroundColor: dataForChart.pointBgColor,
          pointRadius: dataForChart.borderWidth,
          backgroundColor: colors.almostTransparentGray,
        },
      ],
      labels: dataForChart.time,
    },
    plugins: [ChartjsPluginAnnotation],
    options: {
      annotation: {
        annotations: [
          {
            type: 'line',
            mode: 'vertical',
            scaleID: 'x-axis-0',
            value: dataForChart.dayDividerVal,
            borderColor: colors.wickedPink,
            borderWidth: 2,
            label: {
              fontSize: 16,
              fontColor: colors.almostWhite,
              backgroundColor: colors.almostBlack,
              content: dataForChart.dayDividerVal,
              enabled: true,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
      scales: {
        xAxes: [{
          ticks: {
            callback: () => '',
          },
        }],
        yAxes: [{
          ticks: {
            fontColor: colors.almostWhite,

          },
        }],
      },
    },
  };
}

export default generateTideChartData;
