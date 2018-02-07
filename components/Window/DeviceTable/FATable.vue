<template>
  <div id="FATable" class="fa-div">
    <div class="block-div" style="width:190px;">
      <span class="title-td">进水管</span>
      <table>
        <tr>
          <td class="left-td left2-td">管径</td>
          <td>{{InOutData.N_Pumps_In_Len}}mm</td>
        </tr>
        <tr>
          <td class="left-td left2-td">长度</td>
          <td>{{InOutData.N_Pumps_In_Len}}m</td>
        </tr>
        <tr>
          <td class="left-td left2-td">管底标高</td>
          <td>{{InOutData.N_Pumps_In_High}}m</td>
        </tr>
      </table>
    </div>
    <div class="block-div" style="width:190px;">
      <span class="title-td">出水管</span>
      <table>
        <tr>
          <td class="left-td left2-td">管径</td>
          <td>{{InOutData.N_Pumps_Out_Size}}mm</td>
        </tr>
        <tr>
          <td class="left-td left2-td">长度</td>
          <td>{{InOutData.N_Pumps_Out_Len}}m</td>
        </tr>
        <tr>
          <td class="left-td left2-td">管底标高</td>
          <td>{{InOutData.N_Pumps_Out_High}}m</td>
        </tr>
      </table>
    </div>
    <div class="block-div" style="width:190px;">
      <span class="title-td">供配电</span>
      <table>
        <tr>
          <td class="left-td left2-td">供电状况</td>
          <td>{{GPdData.S_Power_State }}</td>
        </tr>
        <tr>
          <td class="left-td left2-td">供电电压</td>
          <td>{{GPdData.N_Power_Volt}}</td>
        </tr>
        <tr>
          <td class="left-td left2-td">电压形式</td>
          <td>{{GPdData.S_Power_Form}}</td>
        </tr>
      </table>
    </div>
    <div class="block-div" style="width:310px;">
      <span class="title-td">设施尺寸</span>
      <table>
        <tr>
          <td class="left-td left2-td">泵房(地面上)</td>
          <td>{{SizeData.N_Overground }}</td>
          <td class="left-td left2-td">变配电间</td>
          <td>{{SizeData.N_SwitchRoom }}</td>
        </tr>
        <tr>
          <td class="left-td left2-td">吸水井</td>
          <td>{{SizeData.N_WellIN }}</td>
          <td class="left-td left2-td">生活设施</td>
          <td>{{SizeData.N_LiveRoom }}</td>
        </tr>
        <tr>
          <td class="left-td left2-td">进水闸门井</td>
          <td>{{SizeData.N_GateIn }}</td>
          <td class="left-td left2-td">地面下</td>
          <td>{{SizeData.N_Underground}}</td>
        </tr>
        <tr>
          <td class="left-td left2-td">出水闸门井</td>
          <td>{{SizeData.N_GateOut}}</td>
          <td class="left-td left2-td">出水井</td>
          <td>{{SizeData.N_WellOut }}</td>
        </tr>
      </table>
    </div>
    <div style="clear:both;"></div>
    <div style="width:100%;">
      <div class="block-div" style="width:460px;height:220px;margin-top:0px;">
        <div class="title-td">关联设施</div>
        <div id="associated_grid" style="width:450px;border: 1px solid #bfbfbf;">
        </div>
      </div>
      <div class="block-div" style="margin-top:0px;width:460px;height:220px;">
        <div class="title-td">变压器|开关柜</div>
        <div id="transformswitch_grid" style="width:450px;border: 1px solid #bfbfbf;">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import devicefun from "../js/index.js";

export default {
  props: ["assets"],
  data() {
    return {
      associated_griddata: {
        dataSource: {
          data: []
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
            field: "S_pump_Style",
            headerAttributes: {
              style: "text-align: center;"
            },
            title: "设施类型"
          },
          {
            field: "S_pump_In_Out",
            headerAttributes: {
              style: "text-align: center;"
            },
            title: "进出水"
          },
          {
            field: "S_pump_IndexId",
            headerAttributes: {
              style: "text-align: center;"
            },
            title: "设施编码"
          },
          {
            field: "S_pump_Exe",
            headerAttributes: {
              style: "text-align: center;"
            },
            title: "编码"
          }
        ],
        height: 185,
        allowCopy: true,
        scrollable: true
      },
      transformswitch_griddata: {
        dataSource: {
          data: []
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
            field: "N_Motor_Type ",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 100,
            title: "类型"
          },
          {
            field: "S_Motor_Model",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 150,
            title: "型号"
          },
          {
            field: "S_Motor_Norm  ",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 70,
            title: "规格"
          },
          {
            field: "N_Motor_Count",
            headerAttributes: {
              style: "text-align: center;"
            },
            width: 50,
            title: "台数"
          }
        ],
        height: 185,
        allowCopy: true,
        scrollable: true,
        sortable: true
      },
      InOutData: {},
      GPdData: {},
      SizeData: {},
      gpdinfodataList: [],
      relationdataList: []
    };
  },
  methods: {},
  watch: {
    gpdinfodataList: function(newData) {
      $("#transformswitch_grid")
        .data("kendoGrid")
        .dataSource.data(newData);
    },
    relationdataList: function(newData) {
      $("#associated_grid")
        .data("kendoGrid")
        .dataSource.data(newData);
    },
    assets: function(obj) {
      var _self = this;
      $("#associated_grid").kendoGrid(_self.associated_griddata);
      $("#transformswitch_grid").kendoGrid(_self.transformswitch_griddata);
      //$("#FATable .k-grid-header").css("padding-right", "0px");
      //获取设备信息
      var url = devicefun.Get_Url(82, "S_Pump_ID='" + obj.assetId + "'");
      devicefun.GetData(url, function(data) {
        if (data.features.length > 0) {
          _self.InOutData = data.features[0].attributes;
        }
      });
      var url = devicefun.Get_Url(77, "S_Pump_ID='" + obj.assetId + "'");
      devicefun.GetData(url, function(data) {
        if (data.features.length > 0) {
          _self.GPdData = data.features[0].attributes;
        }
      });
      var url = devicefun.Get_Url(84, "S_Pump_ID='" + obj.assetId + "'");
      devicefun.GetData(url, function(data) {
        if (data.features.length > 0) {
          _self.SizeData = data.features[0].attributes;
        }
      });
      var url = devicefun.Get_Url(78, "S_Pump_ID='" + obj.assetId + "'");
      devicefun.GetData(url, function(data) {
        var list = [];
        $.each(data.features, function(i, v) {
          list.push(v.attributes);
        });
        _self.gpdinfodataList = list;
      });

      var url = devicefun.Get_Url(83, "S_Pump_ID='" + obj.assetId + "'");
      devicefun.GetData(url, function(data) {
        var list = [];
        $.each(data.features, function(i, v) {
          list.push(v.attributes);
        });
        _self.relationdataList = list;
      });
    }
  },
  mounted: function() {}
};
</script>

<style>

</style>