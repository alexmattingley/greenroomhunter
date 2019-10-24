import ChartjsPluginAnnotation from 'chartjs-plugin-annotation';

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
      dataForChart.pointBgColor.push('rgba(81, 138, 184, 1)');
      dataForChart.borderWidth.push(6);
    } else {
      dataForChart.pointBgColor.push('rgba(109, 157, 194, .5)');
      dataForChart.borderWidth.push(3);
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
          backgroundColor: 'rgba(109, 157, 194, .5)',
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
            borderColor: 'salmon',
            borderWidth: 2,
            label: {
              fontSize: 16,
              fontColor: 'white',
              backgroundColor: 'black',
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
      },
    },
  };
}

export default generateTideChartData;
