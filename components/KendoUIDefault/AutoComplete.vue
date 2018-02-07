<template>
  <div class="l_h_serach">
    <span><input type="text" id="searchInput" placeholder="请输入泵站名称" /></span>
    <span v-on:click="searchClick"><img src='../../../static/images/home/btn_chax_normal.png' /></span>
  </div>
</template>

<script>
import sitewhere from "@/components/SiteWhere/js/index.js";
import bus from "@/assets/js/eventBus.js";

export default {
  data() {
    return {
      DataList: []
    };
  },
  watch: {
    DataList: function(newDataList) {
      this.EditData(newDataList);
    }
  },
  methods: {
    Init: function() {
      $("#searchInput").kendoAutoComplete({
        filter: "contains",
        placeholder: "请输入泵站名称",
        dataSource: []
      });
    },
    EditData: function(newDataList) {
      $("#searchInput")
        .data("kendoAutoComplete")
        .dataSource.data(newDataList);
    },
    searchClick: function() {
      var name = $("#searchInput").data("kendoAutoComplete")._prev; // 2017-11 -13gjm
      if (name != "") {
        bus.$emit("SearchRefresh", {title:name,TabPage:''});
      }
    }
  },
  mounted: function() {
    var _self = this;
    _self.Init();
    bus.$on("DevicesGroup_OK", function(data) {
      _self.DataList = sitewhere.AssetsNameList;
    });
    $("#searchInput-list").css("width", "165px");
  }
};
</script>

<style>

</style>
