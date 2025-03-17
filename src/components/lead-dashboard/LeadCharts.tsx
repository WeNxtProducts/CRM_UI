/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useContext, useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { LeadContext } from './LeadDetails';

const LeadCharts = () => {
  const { graphDetails }: any = useContext(LeadContext);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    if (graphDetails.length > 0) {
      const formattedMonths = graphDetails.map((item: any) => item.month.slice(0, 3));
      const formattedLeads = graphDetails.map((item: any) => item.leads);

      const newOptions: any = {
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(255,255,255,0.95)',
          borderWidth: 0,
          textStyle: { color: '#1f2937' },
          axisPointer: { type: 'shadow' }
        },
        legend: {
          data: ['Leads', 'Lead Target'],
          textStyle: { color: '#6b7280' },
          itemGap: 20
        },
        xAxis: {
          type: 'category' as const,
          data: formattedMonths,
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
          {
            name: 'Lead Target',
            type: 'line',
            smooth: true,
            showSymbol: false,
            areaStyle: {
              color: {
                type: 'linear',
                x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [
                  { offset: 0, color: '#B5C0D0' },
                  { offset: 1, color: '#EEEEEE' }
                ]
              }
            },
            lineStyle: { width: 0 },
            data: [30, 42, 38, 55, 47, 65, 100, 80, 20, 10, 78, 89]
          },
          {
            name: 'Leads',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 10,
            emphasis: { focus: 'series' },
            itemStyle: { color: '#10b981', borderColor: '#fff', borderWidth: 2 },
            lineStyle: { width: 1, color: '#0A1629' },
            data: formattedLeads
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

      setOptions(newOptions);
    }
  }, [graphDetails]);

  return (
    <>
      {options !== null &&
        <ReactECharts
          option={options}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'canvas' }}
        />
      }
    </>
  );
};

export default LeadCharts;
