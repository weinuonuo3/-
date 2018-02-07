<template>
  <div>
    <div id="chart">
    </div>
  </div>
</template>

<script>
import bus from "@/assets/js/eventBus";
export default {
  data() {
    return {
      chartData: {
        series: []
      },
      chart: {}
    };
  },
  props: ["chartDefault", "styleList"],
  methods: {
    setDefault: function() {
      // 设置图表样式
      if (this.styleList) {
        $("#chart").css(this.styleList);
      }
      // 图表配置
      if (this.chartDefault) {
        this.createChart(this.chartDefault);
      }
    },
    setData: function() {
      // 设置图表样式
      if (this.styleList) {
        $("#chart").css(this.styleList);
      }
      // 图表配置
      if (this.chart) {
        var chartData = this.chartData;
        var chart = this.chart;
        chartData = this.allPrpos(chartData, chart);
        this.createChart(chartData);
      }
    },
    allPrpos: function(obj, objData) {
      // 开始遍历
      for (var k in objData) {
        // 判断是否是对象
        if (typeof objData[k] == "object" && !Array.isArray(objData[k])) {
          // 继续下一级
          if (k in obj) {
            obj[k] = this.allPrpos(obj[k], objData[k]);
          } else {
            obj[k] = {};
            obj[k] = this.allPrpos(obj[k], objData[k]);
          }
        } else {
          // 替换或添加属性
          if (k in obj) {
            obj[k] = objData[k];
          } else {
            obj[k] = objData[k];
          }
        }
      }
      return obj;
    },
    createChart: function(chart) {
      var ID = document.getElementById("chart");
      var myChart = echarts.init(ID);
      myChart.setOption(chart);
    }
  },
  mounted: function() {
    this.setDefault();
    var _self = this;
    bus.$on("LineChartsRefresh", function(chart) {
      _self.chart = chart;
      _self.setData();
    });
  }
};
</script>

<style>

</style>
