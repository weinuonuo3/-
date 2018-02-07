<template>
  <div id="FITable">
    <div class="fi_tr">
      <div>类型</div>
      <div>名称</div>
      <div>大小</div>
    </div>
    <div class="fi_tr" v-for='item in filesdata'>
      <div>
        <a v-bind:href='GetUrl(item.id)' target="_blank">
          <div v-if="item.contentType==='image/jpeg'" class="tj_list_icon" style="background: url(../../static/images/home/ico_jpg.png) no-repeat center; width:100%; height:25px;">
          </div>
          <div v-else-if="item.contentType==='application/octet-stream'" class="tj_list_icon" style="background: url(../../static/images/home/ico_dwg.png) no-repeat center; width:100%; height:25px;">
          </div>
          <div v-else-if="item.contentType==='Unknown'" class="tj_list_icon" style="background: url(../../static/images/home/ico_dwg.png) no-repeat center; width:100%; height:25px;">
          </div>
        </a>
      </div>
      <div>
        <a v-bind:href='GetUrl(item.id)' target="_blank">
          <div>{{ item.name }}</div>
        </a>
      </div>
      <div>
        <a v-bind:href='GetUrl(item.id)' target="_blank">
          <div>{{GetSite(item.size) }}</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import devicefun from "../js/index.js";

export default {
  props: ["assetId", "OBJECTID"],
  data() {
    return {
      filesdata: []
    };
  },
  watch: {
    OBJECTID: function(newData) {
      var _self = this;
      var url = devicefun.Get_Img_Url(newData);
      devicefun.GetData(url, function(data) {
        _self.filesdata = data.attachmentInfos;
      });
    }
  },
  methods: {
    GetSite: function(site) {
      return parseInt(site / 1024) + " kb";
    },
    GetUrl: function(id) {
      var _self = this;
      var url =
        devicefun.ArcgisUrl + "7/" + _self.OBJECTID + "/attachments/" + id;
      return url;
    }
  }
};
</script>

<style>

</style>