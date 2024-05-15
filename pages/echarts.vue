<template>
  <div style="display: flex;flex-wrap: wrap;">

    <div style="display: flex;flex-direction: column;align-items: center;">
      <h2>圓餅圖</h2>
      <v-chart class="chart" :option="pie" autoresize />
    </div>

    <div style="display: flex;flex-direction: column;align-items: center;">
      <h2>長條圖</h2>
      <v-chart class="chart" :option="bar" autoresize />
    </div>

    <div style="display: flex;flex-direction: column;align-items: center;">
      <h2>折線圖</h2>
      <v-chart class="chart" :option="line" autoresize />
    </div>
    <div style="display: flex;flex-direction: column;align-items: center;">
      <h2>雷達圖</h2>
      <v-chart class="chart" :option="radar" autoresize />
    </div>
    
    <div style="display: flex;flex-direction: column;align-items: center;">
      <h2>樹狀圖</h2>
      <v-chart class="chart" :option="tree" autoresize />
    </div>

    <div style="display: flex;flex-direction: column;align-items: center;">
      <h2>動態排序圖</h2>
      <v-chart class="chart" :option="lodingbar" autoresize />
    </div>
    <div style="display: flex;flex-direction: column;align-items: center;">
      <h2>文字雲</h2>
      <v-chart class="chart" :option="wordCloud" autoresize />
    </div>
  </div>

  </template>
  
  <script setup>
  import { use } from 'echarts/core';
  import { PieChart, BarChart, LineChart,RadarChart,TreemapChart } from "echarts/charts";
  import VChart, { THEME_KEY } from 'vue-echarts';
  import { ref, provide, onMounted } from 'vue';
  import { useMainStore } from "@/store/currentStore";
  await import('echarts-wordcloud'); // 确保这个导入没有问题
  const mainStore = useMainStore();
  mainStore.routeName="echarts模組"
  use([
    PieChart,
    BarChart, 
    LineChart,
    RadarChart,
    TreemapChart
  ]);
  provide(THEME_KEY);//主題

  const pie = ref({
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines'],
    },
    series: [
      {
        name: 'Traffic Sources',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          { value: 335, name: 'Direct' },
          { value: 310, name: 'Email' },
          { value: 234, name: 'Ad Networks' },
          { value: 135, name: 'Video Ads' },
          { value: 1548, name: 'Search Engines' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  });

  const bar = ref({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  });

  const line = ref({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Email',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Union Ads',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: 'Video Ads',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: 'Direct',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: 'Search Engine',
        type: 'line',
        stack: 'Total',
        label: {
          show: true,
          position: 'top'
        },
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
    ]
  });

  const radar = ref({
    legend: {
      data: ['Allocated Budget', 'Actual Spending']
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: 'Sales', max: 6500 },
        { name: 'Administration', max: 16000 },
        { name: 'Information Technology', max: 30000 },
        { name: 'Customer Support', max: 38000 },
        { name: 'Development', max: 52000 },
        { name: 'Marketing', max: 25000 }
      ]
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: 'Allocated Budget'
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: 'Actual Spending'
          }
        ]
      }
    ]
  })

  let treeData=[
          {
              "value": 40,
              "name": "Accessibility",
              "path": "Accessibility"
          },
          {
              "value": 180,
              "name": "Accounts",
              "path": "Accounts",
              "children": [
                  {
                      "value": 76,
                      "name": "Access",
                      "path": "Accounts/Access",
                      "children": [
                          {
                              "value": 12,
                              "name": "DefaultAccessPlugin.bundle",
                              "path": "Accounts/Access/DefaultAccessPlugin.bundle"
                          },
                          {
                              "value": 28,
                              "name": "FacebookAccessPlugin.bundle",
                              "path": "Accounts/Access/FacebookAccessPlugin.bundle"
                          },
                          {
                              "value": 20,
                              "name": "LinkedInAccessPlugin.bundle",
                              "path": "Accounts/Access/LinkedInAccessPlugin.bundle"
                          },
                          {
                              "value": 16,
                              "name": "TencentWeiboAccessPlugin.bundle",
                              "path": "Accounts/Access/TencentWeiboAccessPlugin.bundle"
                          }
                      ]
                  },
                  {
                      "value": 92,
                      "name": "Authentication",
                      "path": "Accounts/Authentication",
                      "children": [
                          {
                              "value": 24,
                              "name": "FacebookAuthenticationPlugin.bundle",
                              "path": "Accounts/Authentication/FacebookAuthenticationPlugin.bundle"
                          },
                          {
                              "value": 16,
                              "name": "LinkedInAuthenticationPlugin.bundle",
                              "path": "Accounts/Authentication/LinkedInAuthenticationPlugin.bundle"
                          },
                          {
                              "value": 20,
                              "name": "TencentWeiboAuthenticationPlugin.bundle",
                              "path": "Accounts/Authentication/TencentWeiboAuthenticationPlugin.bundle"
                          },
                          {
                              "value": 16,
                              "name": "TwitterAuthenticationPlugin.bundle",
                              "path": "Accounts/Authentication/TwitterAuthenticationPlugin.bundle"
                          },
                          {
                              "value": 16,
                              "name": "WeiboAuthenticationPlugin.bundle",
                              "path": "Accounts/Authentication/WeiboAuthenticationPlugin.bundle"
                          }
                      ]
                  },
                  {
                      "value": 12,
                      "name": "Notification",
                      "path": "Accounts/Notification",
                      "children": [
                          {
                              "value": 12,
                              "name": "SPAAccountsNotificationPlugin.bundle",
                              "path": "Accounts/Notification/SPAAccountsNotificationPlugin.bundle"
                          }
                      ]
                  }
              ]
          },
          {
              "value": 1904,
              "name": "AddressBook Plug-Ins",
              "path": "AddressBook Plug-Ins",
              "children": [
                  {
                      "value": 744,
                      "name": "CardDAVPlugin.sourcebundle",
                      "path": "AddressBook Plug-Ins/CardDAVPlugin.sourcebundle",
                      "children": [
                          {
                              "value": 744,
                              "name": "Contents",
                              "path": "AddressBook Plug-Ins/CardDAVPlugin.sourcebundle/Contents"
                          }
                      ]
                  },
                  {
                      "value": 28,
                      "name": "DirectoryServices.sourcebundle",
                      "path": "AddressBook Plug-Ins/DirectoryServices.sourcebundle",
                      "children": [
                          {
                              "value": 28,
                              "name": "Contents",
                              "path": "AddressBook Plug-Ins/DirectoryServices.sourcebundle/Contents"
                          }
                      ]
                  },
                  {
                      "value": 680,
                      "name": "Exchange.sourcebundle",
                      "path": "AddressBook Plug-Ins/Exchange.sourcebundle",
                      "children": [
                          {
                              "value": 680,
                              "name": "Contents",
                              "path": "AddressBook Plug-Ins/Exchange.sourcebundle/Contents"
                          }
                      ]
                  },
                  {
                      "value": 432,
                      "name": "LDAP.sourcebundle",
                      "path": "AddressBook Plug-Ins/LDAP.sourcebundle",
                      "children": [
                          {
                              "value": 432,
                              "name": "Contents",
                              "path": "AddressBook Plug-Ins/LDAP.sourcebundle/Contents"
                          }
                      ]
                  },
                  {
                      "value": 20,
                      "name": "LocalSource.sourcebundle",
                      "path": "AddressBook Plug-Ins/LocalSource.sourcebundle",
                      "children": [
                          {
                              "value": 20,
                              "name": "Contents",
                              "path": "AddressBook Plug-Ins/LocalSource.sourcebundle/Contents"
                          }
                      ]
                  }
              ]
          },
          {
              "value": 272,
              "name": "WidgetResources",
              "path": "WidgetResources",
              "children": [
                  {
                      "value": 16,
                      "name": ".parsers",
                      "path": "WidgetResources/.parsers"
                  },
                  {
                      "value": 172,
                      "name": "AppleClasses",
                      "path": "WidgetResources/AppleClasses",
                      "children": [
                          {
                              "value": 156,
                              "name": "Images",
                              "path": "WidgetResources/AppleClasses/Images"
                          }
                      ]
                  },
                  {
                      "value": 0,
                      "name": "AppleParser",
                      "path": "WidgetResources/AppleParser"
                  },
                  {
                      "value": 48,
                      "name": "button",
                      "path": "WidgetResources/button"
                  },
                  {
                      "value": 32,
                      "name": "ibutton",
                      "path": "WidgetResources/ibutton"
                  }
              ]
          }
      ]
  const tree = ref({
        tooltip: {
          formatter: function (info) {
            var value = info.value;
            var treePathInfo = info.treePathInfo;
            var treePath = [];
            for (var i = 1; i < treePathInfo.length; i++) {
              treePath.push(treePathInfo[i].name);
            }
            return [
              '<div class="tooltip-title">' +
                echarts.format.encodeHTML(treePath.join('/')) +
                '</div>',
              'Disk Usage: ' + echarts.format.addCommas(value) + ' KB'
            ].join('');
          }
        },
        series: [
              {
                name: 'Disk Usage',
                type: 'treemap',
                visibleMin: 300,
                label: {
                  show: true,
                  formatter: '{b}'
                },
                upperLabel: {
                  show: true,
                  height: 30
                },
                itemStyle: {
                  borderColor: '#fff'
                },
                levels: [
            {
              itemStyle: {
                borderColor: '#777',
                borderWidth: 0,
                gapWidth: 1
              },
              upperLabel: {
                show: false
              }
            },
            {
              itemStyle: {
                borderColor: '#555',
                borderWidth: 5,
                gapWidth: 1
              },
              emphasis: {
                itemStyle: {
                  borderColor: '#ddd'
                }
              }
            },
            {
              colorSaturation: [0.35, 0.5],
              itemStyle: {
                borderWidth: 5,
                gapWidth: 1,
                borderColorSaturation: 0.6
              }
            }
          ],
            data: treeData
          }
        ]
  })

  const lodingbar = ref({});
  function updateChart() {
    // 模拟更新数据
    const newData = [];
    for (let i = 0; i < 5; ++i) {
      newData.push(Math.round(Math.random() * 200));
    }
    // 更新图表配置
    lodingbar.value = {
      xAxis: {
        max: 'dataMax'
      },
      yAxis: {
        type: 'category',
        data: ['A', 'B', 'C', 'D', 'E'],
        inverse: true,
        animationDuration: 300,
        animationDurationUpdate: 300,
        max: 2 // only the largest 3 bars will be displayed
      },
      series: [
        {
          realtimeSort: true,
          name: 'X',
          type: 'bar',
          data: newData,
          label: {
            show: true,
            position: 'right',
            valueAnimation: true
          }
        }
      ],
      legend: {
        show: true
      },
      animationDuration: 3000,
      animationDurationUpdate: 3000,
      animationEasing: 'linear',
      animationEasingUpdate: 'linear'
    };
  }
  onMounted(() => {// 在组件挂载后更新图表数据
    // 模拟定时更新数据
    setInterval(updateChart, 3000);
  });

  const wordCloud=ref({
      series: [{
          type: 'wordCloud',
          gridSize: 0,
          sizeRange: [1,18],
          rotationRange: [-90, 90],
          shape: 'star',//circle,cardioid,diamond,triangle-forward,triang,pentagon,star,ellipse
          width: '80%',
          height: '100%',
          drawOutOfBound: true,
          textStyle: {
            normal:{
              color: function () {
                      // Random color
                      return 'rgb(' + [
                          Math.round(Math.random() * 160),
                          Math.round(Math.random() * 160),
                          Math.round(Math.random() * 160)
                      ].join(',') + ')';
                    }
            }
          },
          data:[
            { name: 'Alice', value: 1000 },
            { name: 'Bob', value: 800 },
            { name: 'Charlie', value: 600 },
            { name: 'David', value: 400 },
            { name: 'Eve', value: 1200 },
            { name: 'Frank', value: 900 },
            { name: 'Grace', value: 700 },
            { name: 'Heidi', value: 500 },
            { name: 'Ivan', value: 1100 },
            { name: 'Judy', value: 1000 },
            { name: 'Mallory', value: 950 },
            { name: 'Niaj', value: 850 },
            { name: 'Olivia', value: 600 },
            { name: 'Peggy', value: 550 },
            { name: 'Sybil', value: 1200 },
            { name: 'Trent', value: 800 },
            { name: 'Victor', value: 1000 },
            { name: 'Wendy', value: 750 },
            { name: 'Xander', value: 700 },
            { name: 'Yolanda', value: 650 },
            { name: 'Zach', value: 1000 },
            { name: 'Quinn', value: 500 },
            { name: 'Ruby', value: 450 },
            { name: 'Sara', value: 1000 },
            { name: 'Tom', value: 900 },
            { name: 'Uma', value: 800 },
            { name: 'Vera', value: 1100 },
            { name: 'Will', value: 1000 },
            { name: 'Xenia', value: 700 },
            { name: 'Yara', value: 650 },
            { name: 'Zane', value: 600 },
            { name: 'Aidan', value: 1000 },
            { name: 'Bella', value: 850 },
            { name: 'Carl', value: 600 },
            { name: 'Dana', value: 500 },
          ]
      }]
  })

  </script>
  
  <style scoped>
  .chart {
    height: 300px;
    width: 400px;
  }
  </style>
  