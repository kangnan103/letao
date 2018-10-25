$(function(){
    var chartLeft = echarts.init(document.querySelector('.chart_left'))

    var chartRight = echarts.init(document.querySelector('.chart_right'))
    var optionLeft = {
        title: {
          text: '2018年注册人数'
        },
        tooltip: {},
        legend: {
          // 图例
          data: ['人数']
        },
        xAxis: {
          data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: {},
        series: [
          {
            name: '人数',
            type: 'bar',
            data: [1000, 1200, 2000, 1800, 500, 2200]
          }
        ]
      }
      chartLeft.setOption(optionLeft)


      var optionRight = {
        title: {
          text: '热门品牌销售',
          subtext: '2018年6月',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['耐克', '阿迪', '阿迪王', '新百伦', '优衣库', '李宁']
        },
        series: [
          {
            name: '销售情况',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '耐克' },
              { value: 310, name: '阿迪' },
              { value: 234, name: '阿迪王' },
              { value: 135, name: '新百伦' },
              { value: 1548, name: '优衣库' },
              { value: 2000, name: '李宁' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }

      chartRight.setOption(optionRight)
})