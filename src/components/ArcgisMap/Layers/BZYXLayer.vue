<template>
  <div v-show="false">
    <table class="tab">
      <tr>
        <td class="td-left">泵&emsp;&emsp;机</td>
        <td style="text-align:left;" colspan="3">${BZ_ON}</td>
      </tr>
      <tr>
        <td class="td-left">时&emsp;&emsp;间</td>
        <td style="text-align:center;" colspan="3">${time}</td>
      </tr>
      <tr>
        <td class="td-left">液&emsp;&emsp;位</td>
        <td>${L1}m</td>
        <td class="td-left">开机台数</td>
        <td>${BZ_R}</td>
      </tr>
    </table>
    <div class='butn-div'>
      <div onclick="AppBus(${windowSBXX})" style="background: url(../../static/images/home/btn_chaksb_normal.png) no-repeat center">
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
        "../../static/images/home/btn__bengz_tingbeng.png",
        "../../static/images/home/btn__bengz_kaibeng.png",
        "../../static/images/home/btn__bengz_diaoxian.png",
        "../../static/images/home/btn__bengz_baoj.png"
      ];
      var ImgS = [
        "../../static/images/home/ico_wull.png",
        "../../static/images/home/ico_yunx.png",
        "../../static/images/home/ico_diaox.png",
        "../../static/images/home/ico_diaox.png"
      ];
      var model = layers.GetModel(ImgList, ImgS);
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
        "bzyx_",
        _self.model(),
        _self.AssetsID,
        "BZ_S"
      );
    },
    BindData: function(data) {
      var _self = this;
      layers.BindData(
        data,
        _self.token,
        _self.map,
        "bzyx_",
        _self.model(),
        _self.AssetsID,
        "BZ_S"
      );
    }
  },
  mounted: function() {
    var _self = this;
    _self.EditData(sitewhere.DevicesGroupData[_self.token]);
    bus.$on("BZYX", function(data) {
      //_self.BindData(data);
      _self.EditData(sitewhere.DevicesGroupData[_self.token]);
    });
    bus.$on("BZYX_Refresh", function(data) {
      _self.EditData(data[_self.token]);
    });
    bus.$on("SearchRefresh", function(data) {
      if (data.TabPage == "bzyxgrid" || data.TabPage == "") {
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
