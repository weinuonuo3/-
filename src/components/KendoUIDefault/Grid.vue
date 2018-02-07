<template>
  <div v-bind:id="gridID">
    <div class="k-loading-mask" style="width: 100%; height: 100%; top: 0px; left: 0px;">
      <span class="k-loading-text">Loading...</span>
      <div class="k-loading-image"></div>
      <div class="k-loading-color"></div>
    </div>
  </div>
</template>

<script>
import bus from "@/assets/js/eventBus.js";

export default {
  props: ["gridSetting", "dataEdit", "styleList", "gridID"],
  data() {
    return {};
  },
  watch: {
    dataEdit: function(newDataList) {
      var _self = this;
      $("#" + _self.gridID)
        .data("kendoGrid")
        .dataSource.data(newDataList);
      $("#" + _self.gridID)
        .find(".k-pager-first")
        .click();
      bus.$on("SearchRefresh", function(obj) {
        if (obj.TabPage == "" || obj.TabPage == _self.gridID) {
          for (var i = 0; i < newDataList.length; i++) {
            var bl = obj.title == newDataList[i]["assetName"];
            if (bl) {
              var pageNum = Math.ceil((i + 1) / 5);
              var selectedIndex = i % 5;
              var currentPage = $("#" + _self.gridID)
                .data("kendoGrid")
                .dataSource.page();
              if (currentPage > pageNum) {
                var gap = currentPage - pageNum;
                for (var j = 0; j < gap; j++) {
                  $("#" + _self.gridID + " .k-i-arrow-w").click();
                }
              } else {
                var gap = pageNum - currentPage;
                for (var j = 0; j < gap; j++) {
                  $("#" + _self.gridID + " .k-i-arrow-e").click();
                }
              }
              var l =
                $("#" + _self.gridID)
                  .parents(".k-content")
                  .index() - 1;
              //$("#bzfjgrid").data("kendoGrid").select("tr:eq("+selectedIndex+")");
              $("#tabstrip .k-tabstrip-items li")
                .eq(l)
                .click();
              $("#" + _self.gridID+" .k-grid-content table tbody tr:eq("+selectedIndex+")").addClass("k-state-selected");
              break;
            }
          }
        }
      });
    }
  },
  methods: {
    createGrid: function(data) {
      var _self = this;
      $("#" + _self.gridID).kendoGrid(data);
    },
    setDefault: function() {
      // 设置图表样式
      if (this.styleList) {
        $("#" + this.gridID).css(this.styleList);
      }
      // 图表配置
      if (this.gridSetting) {
        this.createGrid(this.gridSetting);
      }
    }
  },
  mounted: function() {
    this.setDefault();
  }
};
</script>

<style>

</style>
