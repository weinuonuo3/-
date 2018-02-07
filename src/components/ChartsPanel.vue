<template>
  <div class="chartspanel">
      <component v-bind:is="chart_to_show" v-bind:assets="assets"></component>
  </div>
</template>

<script>
import bus from "@/assets/js/eventBus.js";
import chart from "./BottomTab/Chart.vue";

export default {
  components: { chart },
  data() {
    return {
      chart_to_show: "",
      assets: {}
    };
  },
  mounted: function() {
    var _self = this;
    bus.$on("ChartsPanelShow", function(assets) {
      $(".con_Bottom_one").show();
      _self.chart_to_show = "chart";
      _self.assets = assets;
    });
    bus.$on("ChartsPanelHide", function() {
      $(".con_Bottom_one").hide();
      _self.chart_to_show = "";
      _self.assets = { assetId: 0, S_EXTNO: "", assetName: "" };
    });
  }
};
</script>

<style>

</style>
