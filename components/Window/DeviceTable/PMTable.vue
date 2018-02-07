<template>
  <div id="PMTable" class="components-div">
    <div id="pump_grid">
    </div>
    <div id="motor_grid">
    </div>
  </div>
</template>

<script>
import devicefun from "../js/index.js";

export default {
  props: ["assets"],
  data() {
    return {
      pumpdata: {
        dataSource: {
          data: this.pumpdataList
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
            hidden: true,
            title: "泵站编码"
          },
          {
            field: "S_Pumps_Model",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 130,
            title: "水泵型号"
          },
          {
            field: "S_Pumps_Type",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 70,
            title: "水泵类型"
          },
          {
            field: "N_Pumps_Flow",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 40,
            title: "铭牌<br/>流量"
          },
          {
            field: "N_Pumps_Lift",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 40,
            title: "铭牌<br/>扬程"
          },
          {
            field: "N_Pumps_Rev",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 40,
            title: "转速"
          },
          {
            field: "N_Pumps_Power",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 40,
            title: "轴功率"
          },
          {
            field: "N_Pumps_Num",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 30,
            title: "台数"
          },
          {
            field: "S_Pumps_Fact",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 120,
            title: "生产厂家"
          },
          {
            field: "N_Pumps_Date",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 100,
            title: "出厂日期"
          },
          {
            field: "N_Pumps_Price",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 40,
            title: "单价"
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
      motordata: {
        dataSource: { data: this.motordataList },
        columns: [
          {
            field: "OBJECTID",
            headerAttributes: {
              style: "text-align: center;"
            },
            hidden: true
          },
          {
            field: "S_Elec_Model",
            headerAttributes: {
              style: "text-align: center;"
            },
            title: "电机型号"
          },
          {
            field: "N_Elec_Flow ",
            headerAttributes: {
              style: "text-align: center;"
            },
            title: "额定电流(A)"
          },
          {
            field: "N_Elec_Volt",
            headerAttributes: {
              style: "text-align: center;"
            },
            title: "额定电压(V)"
          },
          {
            field: "S_Elec_Fact",
            headerAttributes: {
              style: "text-align: center;"
            },
            title: "生产厂家"
          },
          {
            field: "N_Elec_Num",
            headerAttributes: {
              style: "text-align: center;"
            },
            title: "台数"
          },
          {
            field: "N_Elec_Power",
            headerAttributes: {
              style: "text-align: center;"
            },
            title: "功率"
          },
          {
            field: "S_Elec_Type",
            headerAttributes: {
              style: "text-align: center;"
            },
            title: "类别"
          }
        ],
        height: 175,
        change: function() {},
        selectable: "multiple,row",
        allowCopy: true,
        sortable: true
      },
      pumpdataList: [],
      motordataList: []
    };
  },
  watch: {
    pumpdataList: function(newData) {
      $("#pump_grid")
        .data("kendoGrid")
        .dataSource.data(newData);
    },
    motordataList: function(newData) {
      $("#motor_grid")
        .data("kendoGrid")
        .dataSource.data(newData);
    },
    assets: function(obj) {
      var _self = this;
      $("#pump_grid").kendoGrid(_self.pumpdata);
      $("#motor_grid").kendoGrid(_self.motordata);
      //$("#PMTable .k-grid-header").css("padding-right", "0px");

      var url = devicefun.Get_Url(81, "S_Pump_ID='" + obj.assetId + "'");
      devicefun.GetData(url, function(data) {
        var list = [];
        $.each(data.features, function(i, v) {
          list.push(v.attributes);
        });
        _self.pumpdataList = list;
      });

      var url = devicefun.Get_Url(80, "S_Pump_ID='" + obj.assetId + "'");
      devicefun.GetData(url, function(data) {
        var list = [];
        $.each(data.features, function(i, v) {
          list.push(v.attributes);
        });
        _self.motordataList = list;
      });
    }
  },
  mounted: function() {}
};
</script>

<style>

</style>
