<template>
  <div id="deviceInfo">
    <ul>
      <li v-for="item in JcxItems">
        {{ item.title }}
      </li>
    </ul>
    <div class="component-div" v-for="item in JcxItems">
        <component v-bind:is="item.component" v-bind:assets="assets" v-bind:OBJECTID="OBJECTID"></component>
    </div>
  </div>
</template>

<script>
import bitable from "./DeviceTable/BITable.vue";
import tpstable from "./DeviceTable/TPSTable.vue";
import fatable from "./DeviceTable/FATable.vue";
import pmtable from "./DeviceTable/PMTable.vue";
import gmtable from "./DeviceTable/GMTable.vue";
import fitable from "./DeviceTable/FITable.vue";
import bus from "@/assets/js/eventBus.js";

export default {
  props: ["datalist"],
  components: { bitable, tpstable, fatable, pmtable, gmtable, fitable },
  data() {
    return {
      JcxItems: [
        { component: "bitable", title: "基本信息" },
        { component: "tpstable", title: "技术参数" },
        { component: "fatable", title: "设施" },
        { component: "pmtable", title: "水泵|电机" },
        { component: "gmtable", title: "格栅|闸机" },
        { component: "fitable", title: "档案资料" }
      ],
      assets: "",
      OBJECTID: ""
    };
  },
  watch: {
    datalist: function(data) {
      this.assets = data;
    }
  },
  methods: {
    Init: function() {
      var _self = this;
      _self.$nextTick(function() {
        $("#deviceInfo").kendoTabStrip({
          animation: {
            open: {
              effects: "fadeIn"
            }
          }
        });
      });
    }
  },
  mounted: function() {
    var _self = this;
    bus.$on("OBJECTID", function(v) {
      _self.OBJECTID = v;
    });

    _self.Init();
    $("#deviceInfo li")
      .first()
      .addClass("k-state-active");
  }
};
</script>

<style>

</style>