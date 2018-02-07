<template>
    <div id="factDevices">

    </div>
</template>

<script>
import devicefun from "../js/index.js";

export default {
  props: ["datalist"],
  data() {
    return {
      devicedata: {
        dataSource: {
          data: this.list
        },
        columns: [
          {
            field: "OBJECTID",
            headerAttributes: {
              style: "text-align: center;"
            },
            hidden: true
          },
          {
            field: "S_Pump_ID",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 40,
            title: "序号"
          },
          {
            field: "S_Pumps_Model",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 90,
            title: "数据采集日期"
          },
          {
            field: "S_Pumps_Type",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 70,
            title: "站点名称"
          },
          {
            field: "N_Pumps_Flow",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 40,
            title: "综合<br/>状态"
          },
          {
            field: "N_Pumps_Lift",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 90,
            title: "最后通讯时间"
          },
          {
            field: "N_Pumps_Rev",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 40,
            title: "通讯<br/>状态"
          },
          {
            field: "N_Pumps_Power",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 60,
            title: "COD<br/>(mg/l)"
          },
          {
            field: "N_Pumps_Num",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 90,
            title: "COD/TOC<br/>最后测量时间"
          },
          {
            field: "S_Pumps_Fact",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 40,
            title: "pH"
          },
          {
            field: "N_Pumps_Date",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 40,
            title: "液位<br/>(cm)"
          },
          {
            field: "N_Pumps_Price",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 70,
            title: "瞬时流量<br/>(m³/h)"
          },
          {
            field: "N_Pumps_Price",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 70,
            title: "COD/TOC<br/>仪器状态"
          },
          {
            field: "N_Pumps_Price",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 60,
            title: "氨氮<br/>(mg/l)"
          },
          {
            field: "N_Pumps_Price",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 60,
            title: "总磷<br/>(mg/l)"
          },
          {
            field: "N_Pumps_Price",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 60,
            title: "总氮<br/>(mg/l)"
          }
        ],
        change: function() {},
        dataBound: function() {
          var rows = this.items();
          $(rows).each(function() {
            var s = $(this).find("td:eq(10)");
            var time = $(s).text();
            if (time != undefined && time != "") {
              time = new Date(parseInt(time));
              $(s).text(formatDate(time, "yyyy-MM-dd hh:mm:ss", 0));
            }
          });
        },
        height: 180,
        selectable: "multiple,row",
        allowCopy: true,
        scrollable: true
      },
      list: []
    };
  },
  watch: {
    list: function(newData) {
      $("#factDevices")
        .data("kendoGrid")
        .dataSource.data(newData);
    },
    datalist: function(obj) {
      var _self = this;
      $("#factDevices").kendoGrid(_self.devicedata);
    }
  },
  mounted: function() {}
};
</script>

<style>

</style>
