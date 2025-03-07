import ReactECharts from 'echarts-for-react';

const LeadCharts = () => {
  const options = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderWidth: 0,
      textStyle: { color: '#1f2937' },
      axisPointer: { type: 'shadow' }
    },
    legend: {
      data: ['Units Sold', 'Sales Target'],
      textStyle: { color: '#6b7280' },
      itemGap: 20
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Nov', 'Dec'],
      axisLine: { lineStyle: { color: '#e5e7eb' } },
      axisLabel: { color: '#4b5563' }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#f3f4f6' } },
      axisLabel: { color: '#4b5563' }
    },
    series: [
      // Area Series (Sales Target)
      {
        name: 'Sales Target',
        type: 'line',
        smooth: true,
        showSymbol: false, // Hides symbols by default
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#B5C0D0' // Starting color
              },
              {
                offset: 1,
                color: '#EEEEEE' // Ending color
              }
            ]
          }
        },
        lineStyle: { width: 0 },
        data: [30, 42, 38, 55, 47, 65, 100, 80, 20, 10, 78, 89]
      },
      // Line Series (Units Sold)
      {
        name: 'Units Sold',
        type: 'line',
        smooth: true,
        showSymbol: false, // Hide symbols until hover
        symbol: 'circle',
        symbolSize: 10,
        emphasis: {
          focus: 'series'
        },
        itemStyle: {
          color: '#10b981', // Green
          borderColor: '#fff',
          borderWidth: 2
        },
        lineStyle: {
          width: 1,
          color: '#0A1629'
        },
        data: [25, 35, 30, 65, 40, 55, 50, 79, 12, 10, 0, 97]
      }
    ],
    grid: {
      containLabel: true,
      left: 20,
      right: 20,
      top: 40,
      bottom: 20
    }
  };

  return (
    <ReactECharts
      option={options}
      style={{ height: '100%', width: '100%' }}
      opts={{ renderer: 'canvas' }}
    />
  );
};

export default LeadCharts;
