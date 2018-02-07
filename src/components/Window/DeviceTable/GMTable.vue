<template>
  <div id="GMTable">
    <div id="grille_grid">
    </div>
    <div id="gatemachine_grid" style="width:934px;">
    </div>
  </div>
</template>

<script>
import devicefun from "../js/index.js";

export default {
  props: ["assets"],
  data() {
    return {
      grilledataList: [],
      grilledata: {
        dataSource: { data: this.grilledataList },
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
            field: "S_Grid_Type",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 80,
            title: "格栅型号"
          },
          {
            field: "S_Grid_Kind",
            headerAttributes: {
              style: "text-align: center;"
            },
            title: "格栅形式"
          },
          {
            field: "N_Grid_Len",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 70,
            title: "栅距(m)"
          },
          {
            field: "N_Grid_Width",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 70,
            title: "栅宽(m)"
          },
          {
            field: "N_Grid_PTBG",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 90,
            title: "平台标高(m)"
          },
          {
            field: "N_Grid_Power",
            headerAttributes: {
              style: "text-align: center;"
            },
            title: "配机功率"
          },
          {
            field: "N_Grid_Num",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 60,
            title: "台数"
          },
          {
            field: "S_Grid_Comp",
            headerAttributes: {
              style: "text-align: center;"
            },
            title: "生产厂家"
          },
          {
            field: "D_Grid_Date",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 150,
            title: "出厂日期"
          },
          {
            field: "N_Grid_Price",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 70,
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
        height: 175,
        selectable: "multiple,row",
        allowCopy: true,
        sortable: true
      },
      gatemachinedataList: [],
      gatemachinedata: {
        dataSource: { data: this.gatemachinedataList },
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
            field: "S_TideGate_Name",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 80,
            title: "闸门名称"
          },
          {
            field: "S_TideGate_Type",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 120,
            title: "闸门型号"
          },
          {
            field: "S_TideGate_Kind",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 80,
            title: "规格"
          },
          {
            field: "S_TideGate_Material",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 60,
            title: "材质"
          },
          {
            field: "S_TideGate_Loc",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 300,
            title: "安装位置"
          },
          {
            field: "N_TideGate_Num",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 50,
            title: "台数"
          },
          {
            field: "S_TideGate_OpState",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 70,
            title: "开闭方式"
          },
          {
            field: "N_TideGate_Categ",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 60,
            title: "类别"
          }
        ],
        height: 180,
        change: function() {},
        allowCopy: true,
        scrollable: true,
        sortable: true
      }
    };
  },
  watch: {
    grilledataList: function(newData) {
      $("#grille_grid")
        .data("kendoGrid")
        .dataSource.data(newData);
    },
    gatemachinedataList: function(newData) {
      $("#gatemachine_grid")
        .data("kendoGrid")
        .dataSource.data(newData);
    },
    assets: function(obj) {
      var _self = this;
      $("#grille_grid").kendoGrid(_self.grilledata);
      $("#gatemachine_grid").kendoGrid(_self.gatemachinedata);
      //$("#GMTable .k-grid-header").css("padding-right", "0px");

      var url = devicefun.Get_Url(79, "S_Pump_ID='" + obj.assetId + "'");
      devicefun.GetData(url, function(data) {
        var list = [];
        $.each(data.features, function(i, v) {
          list.push(v.attributes);
        });
        _self.grilledataList = list;
      });

      var url = devicefun.Get_Url(85, "S_Pump_ID='" + obj.assetId + "'");
      devicefun.GetData(url, function(data) {
        var list = [];
        $.each(data.features, function(i, v) {
          list.push(v.attributes);
        });
        _self.gatemachinedataList = list;
      });
    }
  },
  mounted: function() {}
};
</script>

<style>

</style>
