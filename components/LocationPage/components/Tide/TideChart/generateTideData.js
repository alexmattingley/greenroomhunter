import { colors } from 'data/styles-data.js';

function generateTideChartData(tideData) {
  
  // Check browser width and set maintainAspectRatio accordingly
  const isWideScreen = typeof window !== 'undefined' && window.innerWidth > 2000;
  
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
          label: 'Tide (ft)',
          data: dataForChart.height,
          pointBackgroundColor: dataForChart.pointBgColor,
          pointRadius: dataForChart.borderWidth,
          backgroundColor: colors.almostTransparentGray,
          borderColor: dataForChart.pointBgColor,
          tension: 0.1,
          fill: 'origin',
        },
      ],
      labels: dataForChart.time,
    },
    options: {
      responsive: true,
      maintainAspectRatio: !isWideScreen,
      plugins: {
        annotation: {
          annotations: {
            dayDivider: {
              type: 'line',
              xMin: dataForChart.dayDividerVal,
              xMax: dataForChart.dayDividerVal,
              borderColor: colors.wickedPink,
              borderWidth: 2,
              label: {
                display: true,
                content: dataForChart.dayDividerVal,
                borderColor: colors.almostBlack,
                backgroundColor: colors.almostBlackTransparent,
                borderWidth: 3,
                color: colors.almostWhite,
                font: {
                  size: 16,
                },
              },
            },
          },
        },
        legend: {
          display: true,
          labels: {
            color: colors.almostWhite,
          },
        },
      },
      legend: {
        display: false,
      },
      scales: {
        x: {
          ticks: {
            callback: () => '',
            color: colors.almostWhite,
          },
          grid: {
            color: colors.almostTransparentGray,
          },
        },
        y: {
          ticks: {
            color: colors.almostWhite,
          },
          grid: {
            color: colors.almostTransparentGray,
          },
        },
      },
    },
  };
}

export default generateTideChartData;
