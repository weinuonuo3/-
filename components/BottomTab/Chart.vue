<template>
  <div class="bzyxchart">
    <div class="bzyxchart_head">
      <div class="head_title">{{assets.assetName}}</div>
      <div class="head_center">
        <div class="head_time">
          <div class="time_next" v-on:click="TimeNext"></div>
          <div class="time_input_div">
            <span class="time_input"><input id="datepicker" value="" title="datepicker" /></span>
          </div>
          <div class="time_back" v-on:click="TimeBack"></div>
        </div>
        <div class="head_radio">
          <span class="radiobutton-span">
            <label><input type="radio" name="bzyxradiogroup" id="radio1" value="0" v-model="picked">
              <i>
                <i class="second"></i>
              </i>
            </label>
            <label>图</label>
          </span>
          <span class="radiobutton-span">
            <label><input type="radio" name="bzyxradiogroup" id="radio2" value="1" v-model="picked">
              <i>
                <i class="second"></i>
              </i>
            </label>
            <label>表
            </label>
          </span>
        </div>
      </div>
      <div v-on:click="chartHide" class="head_back" style="background: url(../../static/images/home/btn_back_normal.png) no-repeat center;">
      </div>
    </div>
    <div class="bzyxchart_con">
      <div class="con_chart">
        <div class="con_chart_left">
          <component v-bind:is="chart_to_show" v-bind:chartDefault="chartDefault" v-bind:styleList="styleList"></component>
        </div>
        <div class="con_img_right" v-if="ImgUrl!=''">
          <img id="assetImg_click" src='../../../static/images/home/img_gyt_big.png' />
          <img id="assetImg" v-bind:src='ImgUrl' width="95%" />
        </div>
      </div>
      <div class="con_grid">
        <grid v-bind:gridSetting='gridSetting' v-bind:dataEdit="dataEdit" gridID="chartgrid"></grid>
      </div>
    </div>
    <div class="bottom_load">
      <span class="k-loading-text">Loading...</span>
      <div class="k-loading-image"></div>
      <div class="k-loading-color"></div>
    </div>
  </div>
  </div>
</template>

<script>
import linechart from "@/components/KendoUIDefault/LineChart.vue";
import grid from "@/components/kendoUIDefault/Grid.vue";
import sitewhere from "@/components/SiteWhere/js/index.js";
import bus from "@/assets/js/eventBus.js";
import devicefun from "@/components/Window/js/index.js";

export default {
  components: {
    linechart,
    grid
  },
  props: ["assets"],
  data() {
    var categoriesDate = [];
    for (var i = 0; i < 1441; i++) {
      var h = (i - i % 60) / 60 + 8;
      if (h > 23) {
        h = h - 24;
      }
      if (h < 10) {
        h = "0" + h;
      }
      var m = i % 60;
      if (m < 10) {
        m = "0" + m;
      }
      categoriesDate.push(h + ":" + m);
    }
    var colors = [
      "#ff0000",
      "#0070c0",
      "#0bb34a",
      "#f38503",
      "#c96bb8",
      "#56b2ca",
      "#7d64a2"
    ];
    return {
      ImgUrl: "",
      picked: 0,
      chart_to_show: "",
      fxtcsw: -10,
      fxkcsw: -10,
      jytcsw: -10,
      jykcsw: -10,
      chartDefault: {
        color: colors,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        grid: {
          top: "30px",
          right: "100px",
          bottom: "40px",
          left: "50px"
        },
        legend: {
          type: "plain",
          position: "center",
          itemWidth: 7,
          itemHeight: 4,
          textStyle: { fontSize: 11 },
          data: [
            {
              name: "开机台数",
              icon: "roundRect",
              textStyle: {
                color: colors[0]
              }
            },
            {
              name: "水位",
              icon: "roundRect",
              textStyle: {
                color: colors[1]
              }
            },
            {
              name: "雨量",
              icon: "roundRect",
              textStyle: {
                color: colors[2]
              }
            },
            {
              name: "防汛停车",
              icon: "roundRect",
              textStyle: {
                color: colors[3]
              }
            },
            {
              name: "防汛开车",
              icon: "roundRect",
              textStyle: {
                color: colors[4]
              }
            },
            {
              name: "降雨停车",
              icon: "roundRect",
              textStyle: {
                color: colors[5]
              }
            },
            {
              name: "降雨开车",
              icon: "roundRect",
              textStyle: {
                color: colors[6]
              }
            }
          ]
        },
        dataZoom: [
          {
            show: false,
            realtime: true,
            start: 0,
            end: 100,
            bottom: "0%"
          },
          {
            type: "inside",
            realtime: true,
            start: 0,
            end: 100
          }
        ],
        xAxis: [
          {
            type: "category",
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              interval: 59,
              rotate: -90
            },
            data: categoriesDate
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "开\n机\n台\n数\n(台)",
            min: 0,
            max: 16,
            position: "left",
            //offset: 80,
            nameGap: -85,
            nameTextStyle: {
              padding: [0, 70, 0, 0]
            },
            axisLine: {
              lineStyle: {
                color: colors[0]
              }
            },
            axisLabel: {
              formatter: "{value}"
            },
            minInterval: 4
          },
          {
            type: "value",
            name: "水\n位\n(m)",
            min: -8,
            max: 8,
            position: "right",
            nameGap: -65,
            nameTextStyle: {
              padding: [0, 0, 0, 55]
            },
            axisLine: {
              lineStyle: {
                color: colors[1]
              }
            },
            axisLabel: {
              formatter: "{value}"
            },
            minInterval: 4
          },
          {
            type: "value",
            name: "雨\n量\n(mm)",
            min: 0,
            max: 60,
            position: "right",
            nameGap: -65,
            nameTextStyle: {
              padding: [0, 0, 0, 80]
            },
            axisLine: {
              lineStyle: {
                color: colors[2]
              }
            },
            offset: 40,
            axisLabel: {
              formatter: "{value}"
            },
            splitLine: {
              show: false
            },
            minInterval: 15
          }
        ],
        series: [
          {
            name: "开机台数",
            type: "line",
            step: "end",
            yAxisIndex: 0,
            data: [],
            connectNulls: true
          },
          {
            name: "水位",
            type: "line",
            yAxisIndex: 1,
            data: [],
            connectNulls: true
          },
          {
            name: "雨量",
            type: "line",
            yAxisIndex: 2,
            data: [],
            connectNulls: true
          },
          {
            name: "防汛停车",
            type: "line",
            yAxisIndex: 1,
            markLine: {
              silent: false,
              data: [
                {
                  label: { normal: { show: false } },
                  yAxis: -10,
                  lineStyle: {
                    normal: {
                      color: "#f38503"
                    }
                  }
                }
              ],
              symbol: "none"
            },
            data: [],
            connectNulls: true
          },
          {
            name: "防汛开车",
            type: "line",
            yAxisIndex: 1,
            markLine: {
              silent: false,
              data: [
                {
                  label: { normal: { show: false } },
                  yAxis: -10,
                  lineStyle: {
                    normal: {
                      color: "#c96b68"
                    }
                  }
                }
              ],
              symbol: "none"
            },
            data: [],
            connectNulls: true
          },
          {
            name: "降雨停车",
            type: "line",
            yAxisIndex: 1,
            markLine: {
              silent: false,
              data: [
                {
                  label: { normal: { show: false } },
                  yAxis: -10,
                  lineStyle: {
                    normal: {
                      color: "#56b2ca"
                    }
                  }
                }
              ],
              symbol: "none"
            },
            data: [],
            connectNulls: true
          },
          {
            name: "降雨开车",
            type: "line",
            yAxisIndex: 1,
            markLine: {
              silent: false,
              data: [
                {
                  label: { normal: { show: false } },
                  yAxis: -10,
                  lineStyle: {
                    normal: {
                      color: "#7d64a2"
                    }
                  }
                }
              ],
              symbol: "none"
            },
            data: [],
            connectNulls: true
          }
        ]
      },
      styleList: {
        height: "220px",
        width: "100%"
      },
      dataOK: 0,
      bjArr: [],
      bjIDArr: [],
      swArr: [],
      ylArr: [],
      which_to_show: "",
      DataList: {},
      gridSetting: {
        columns: [
          {
            field: "orderID",
            headerAttributes: {
              style: "text-align: center;"
            },
            attributes: {
              style: "text-align:center;"
            },
            width: 40,
            title: "序号"
          },
          {
            field: "time",
            headerAttributes: {
              style: "text-align: center;"
            },
            attributes: {
              style: "text-align:center;"
            },
            title: "时间"
          },
          {
            field: "BZ_R",
            headerAttributes: {
              style: "text-align: center;"
            },
            attributes: {
              style: "text-align:right;"
            },
            title: "开泵数量"
          },
          {
            field: "L_SW",
            headerAttributes: {
              style: "text-align: center;"
            },
            attributes: {
              style: "text-align:right;"
            },
            title: "水深（m）"
          },
          {
            field: "R_M",
            headerAttributes: {
              style: "text-align: center;"
            },
            attributes: {
              style: "text-align:right;"
            },
            title: "降雨量（mm）"
          }
        ],
        height: 225,
        dataSource: {
          pageSize: 5,
          data: []
        },
        selectable: "multiple,row",
        allowCopy: true,
        scrollable: true,
        sortable: false,
        pageable: {
          pageSizes: true,
          refresh: false
        }
      },
      dataEdit: []
    };
  },
  watch: {
    dataOK: function(v) {
      var _self = this;
      if (v == 0) {
        $(".bottom_load").hide();
        _self.SetGrid();
        var startN = -1;
        for (var i = 0; i < 1441; i++) {
          if (_self.bjArr[i] != null) {
            if (startN == -1) {
              startN = i;
            } else {
              if (i - startN <= 10000) {
                for (var j = startN; j < i; j++) {
                  if (_self.bjArr[j] == null) {
                    _self.bjArr[j] = _self.bjArr[startN];
                  }
                }
              }
              startN = i;
            }
          }
        }
        _self.chartDefault.series[0].data = _self.bjArr;
        _self.chartDefault.series[1].data = _self.swArr;
        _self.chartDefault.series[2].data = _self.ylArr;
        _self.chartDefault.series[3].markLine.data[0].yAxis = _self.fxtcsw;
        _self.chartDefault.series[4].markLine.data[0].yAxis = _self.fxkcsw;
        _self.chartDefault.series[5].markLine.data[0].yAxis = _self.jytcsw;
        _self.chartDefault.series[6].markLine.data[0].yAxis = _self.jykcsw;

        bus.$emit("LineChartsRefresh", _self.chartDefault);
      } else {
        $(".bottom_load").show();
      }
    },
    picked: function(v) {
      if (v == 0) {
        $(".con_grid").hide();
      } else {
        $(".con_grid").show();
      }
    }
  },
  methods: {
    Init: function(date) {
      var _self = this;
      _self.EditData(date);
      _self.chart_to_show = "linechart";
      //获取工艺图
      _self.SetUrl();
    },
    SetUrl: function() {
      var _self = this;
      var url = devicefun.Get_Url(7, "S_XTBM='" + _self.assets.S_EXTNO + "'");
      devicefun.GetData(url, function(data) {
        if (data.features.length > 0) {
          var objectID = data.features[0].attributes.OBJECTID;
          var url = devicefun.Get_Img_Url(objectID);
          devicefun.GetData(url, function(data) {
            var attachment = data.attachmentInfos;
            for (var i = 0; i < attachment.length; i++) {
              if (attachment[i].contentType == "image/jpeg") {
                if (attachment[i].name.indexOf("工艺图") > -1) {
                  _self.SetImg(attachment[i].id, objectID);
                  break;
                }
              }
            }
          });
        }
      });
    },
    SetImg: function(id, objectID) {
      this.ImgUrl =
        devicefun.ArcgisUrl + "7/" + objectID + "/attachments/" + id;

      $("#img_click_div .img_src").attr("src", this.ImgUrl);

      this.$nextTick(function() {
        $("#assetImg").load(function() {
          if ($(this).height() > 250) {
            $(this).css({
              width: "auto",
              height: "250px"
            });
          }
          $(this).click(function() {
            $("#img_click_div").show();
          });
        });
      });
    },
    EditData: function(date) {
      date = date.toString().replace(/-/g, "/");
      date = new Date(date);
      var _self = this;
      _self.bjArr = [];
      _self.swArr = [];
      _self.ylArr = [];
      for (var i = 0; i < 1441; i++) {
        _self.bjArr.push(null);
        _self.swArr.push(null);
        _self.ylArr.push(null);
      }
      var s = formatDate(date, "yyyy-MM-dd", 0);
      var e = formatDate(date, "yyyy-MM-dd", 1);

      var startDate = s + "T08:00:00.00+0800";
      var endDate = e + "T08:00:00.00+0800";
      if (_self.assets.assetId != 0) {
        sitewhere.GetAssetModuleInfo(_self.assets.assetId, function(data) {
          _self.fxtcsw = data.properties.N_FangXunTingCheShuiWei;
          _self.fxkcsw = data.properties.N_FangXunKaiCheShuiWei;
          _self.jytcsw = data.properties.N_JiangYuTingCheShuiWei;
          _self.jykcsw = data.properties.N_JiangYuKaiCheShuiWei;
        });
        sitewhere.GetAssetModuleList(_self.assets.assetId, function(data) {
          _self.dataOK += data.length;
          $.each(data, function(i, item) {
            var deviceId = item.deviceHardwareId;
            if (
              deviceId.indexOf(_self.assets.assetId + "_P") > -1 ||
              deviceId.indexOf(_self.assets.assetId + "_L") > -1 ||
              deviceId.indexOf(_self.assets.assetId + "_R") > -1
            ) {
              //单条关联数据
              _self.dataOK += 1;
              sitewhere.GetAssignmentsData(
                item.token,
                startDate,
                endDate,
                function(itemdata) {
                  var bjList = [];
                  $.each(itemdata, function(i, series) {
                    switch (series.measurementId) {
                      case "L.SW":
                        $.each(series.entries, function(j, entries) {
                          var m = GetM(entries.measurementDate);
                          _self.swArr[m] = entries.value;
                        });
                        break;
                      case "P.ON":
                        $.each(series.entries, function(j, entries) {
                          var m = GetM(entries.measurementDate);
                          bjList[m] = parseInt(entries.value);
                        });
                        break;
                      case "R.M":
                        $.each(series.entries, function(j, entries) {
                          var m = GetM(entries.measurementDate);
                          _self.ylArr[m] = entries.value;
                        });
                        break;
                    }
                  });
                  $.each(bjList, function(m, v) {
                    if (v != null) {
                      if (_self.bjArr[m] != null) {
                        _self.bjArr[m] += v;
                      } else {
                        _self.bjArr[m] = v;
                      }
                    }
                  });
                  _self.dataOK -= 1;
                }
              );
            }
            _self.dataOK -= 1;
          });
        });
      }

      function GetM(stime) {
        var stime = formatDate(stime, "yyyy/MM/dd hh:mm:00", 0);
        var sDate = formatDate(date, "yyyy/MM/dd 08:00:00", 0);
        var m = new Date(stime).getTime() - new Date(sDate).getTime();
        m = parseInt(m / 1000 / 60);
        return m;
      }
    },
    chartHide: function() {
      bus.$emit("ChartsPanelHide", {});
    },
    SetTime: function() {
      var _self = this;
      $("#datepicker").kendoDatePicker({
        value: new Date(),
        format: "yyyy-MM-dd",
        culture: "zh-Hans", //中文
        change: function() {
          var time = this.value();
          _self.Init(time);
        },
        dateInput: true
      });
      $("#datepicker").attr("disabled", "disabled");
      $("#datepicker").css("width", "110px");
      $(".time_input .k-header").css("width", "auto");
      $(".time_input .k-header").css("height", "30px");
    },
    TimeBack: function() {
      var time = $("#datepicker")
        .data("kendoDatePicker")
        .value();
      time = formatDate(time, "yyyy-MM-dd 00:00:00", -1);
      $("#datepicker")
        .data("kendoDatePicker")
        .value(time);
      this.Init(time);
    },
    TimeNext: function() {
      var time = $("#datepicker")
        .data("kendoDatePicker")
        .value();
      time = formatDate(time, "yyyy-MM-dd 00:00:00", 1);
      $("#datepicker")
        .data("kendoDatePicker")
        .value(time);
      this.Init(time);
    },
    SetGrid: function() {
      var _self = this;
      var list = {};
      for (var k in _self.bjArr) {
        if (_self.bjArr[k] != null) {
          if (list[k] != undefined) {
            list[k].BZ_R = _self.bjArr[k];
          } else {
            list[k] = {
              orderID: 0,
              time: "",
              L_SW: "",
              BZ_R: _self.bjArr[k],
              R_M: ""
            };
          }
        }
      }
      for (var k in _self.swArr) {
        if (_self.swArr[k] != null) {
          if (list[k] != undefined) {
            list[k].L_SW = _self.swArr[k];
          } else {
            list[k] = {
              orderID: 0,
              time: "",
              BZ_R: "",
              L_SW: _self.swArr[k],
              R_M: ""
            };
          }
        }
      }
      for (var k in _self.ylArr) {
        if (_self.ylArr[k] != null) {
          if (list[k] != undefined) {
            list[k].R_M = _self.ylArr[k];
          } else {
            list[k] = {
              orderID: 0,
              time: "",
              BZ_R: "",
              L_SW: "",
              R_M: _self.ylArr[k]
            };
          }
        }
      }
      var data = [];
      var i = 1;
      var time = $("#datepicker")
        .data("kendoDatePicker")
        .value();
      for (var k in list) {
        list[k].orderID = i;
        list[k].time = MinuteConvertTime(time, parseInt(k) + 480);
        data.push(list[k]);
        i++;
      }
      _self.dataEdit = data;
    }
  },
  mounted: function() {
    this.SetTime();
    var time = formatDate(new Date(), "yyyy-MM-dd", 0);
    this.Init(time);
  }
};
</script>

<style>

</style>