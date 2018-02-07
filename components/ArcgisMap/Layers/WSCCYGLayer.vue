<template>
  <div v-show="false">
    <table class="tab">
      <tr>
        <td class="td-left">时&emsp;&emsp;间</td>
        <td style="text-align:center;" colspan="3">${time}</td>
      </tr>
      <tr>
        <td class="td-left">机柜温度</td>
        <td>${SI_T}℃</td>
        <td class="td-left">累计流量</td>
        <td>${F_YF}m³</td>
      </tr>
      <tr>
        <td class="td-left">机柜湿度</td>
        <td>${SI_H}%</td>
        <td class="td-left">瞬时流量</td>
        <td>${F_M}m³</td>
      </tr>
      <tr>
        <td class="td-left">剩余瓶数</td>
        <td>${SI_V}</td>
        <td class="td-left">水&emsp;&emsp;深</td>
        <td>${L4}m</td>
      </tr>
    </table>
    <div class='butn-div'>
      <div onclick="AppBus(${windowSBXX_WSC})" style="background: url(../../static/images/home/btn_chaksb_normal.png) no-repeat center">
      </div>
      <div onclick="AppBus(${windowSZXX})" style="background: url(../../static/images/home/btn_shuizxx_normal.png) no-repeat center">
      </div>
    </div>
  </div>
</template>

<script>
import sitewhere from "@/components/SiteWhere/js/index.js";
import bus from "@/assets/js/eventBus.js";
import layers from "./js/layer.js";

export default {
  props: ["token", "map"],
  data() {
    return {
      AssetsID: []
    };
  },
  methods: {
    model() {
      var _self = this;
      var ImgList = [
        "../../static/images/home/btn_liul_wull.png",
        "../../static/images/home/btn_liul_youll.png",
        "../../static/images/home/btn_liul_diaoxian.png",
        "../../static/images/home/btn_liul_baoj.png"
      ];
      var ImgS = [
        "../../static/images/home/ico_wull.png",
        "../../static/images/home/ico_yunx.png",
        "../../static/images/home/ico_diaox.png",
        "../../static/images/home/ico_diaox.png"
      ];
      var model = layers.GetModel(ImgList, ImgS);
      model.icon_ON = "F_S";
      model.icon_size = [22, 26];
      model.infoTemplate_content = function() {
        return _self.$el.innerHTML;
      };
      return model;
    },
    EditData: function(data) {
      var _self = this;
      _self.AssetsID = layers.EditData(
        data,
        _self.map,
        "wsc_",
        _self.model(),
        _self.AssetsID,
        "F_S"
      );
    },
    BindData: function(data) {
      var _self = this;
      layers.BindData(
        data,
        _self.token,
        _self.map,
        "wsc_",
        _self.model(),
        _self.AssetsID,
        "F_S"
      );
    }
  },
  mounted: function() {
    var _self = this;
    _self.EditData(sitewhere.DevicesGroupData[_self.token]);
    bus.$on("WSCCYG", function(data) {
      //_self.BindData(data);
      _self.EditData(sitewhere.DevicesGroupData[_self.token]);
    });
    bus.$on("WSCCYG_Refresh", function(data) {
      _self.EditData(data[_self.token]);
    });
    bus.$on("SearchRefresh", function(data) {
      if (data.TabPage == "wsccyggrid" || data.TabPage == "") {
        $.each(_self.AssetsID, function(i, layerID) {
          layers.locationMarkerOnMap(_self.map, data.title, layerID);
        });
      }
    });
  }
};
</script>
<style>

</style>
