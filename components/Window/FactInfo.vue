<template>
  <div id="factInfo">
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
import bitable from "./FactTable/BITable.vue";
import tpstable from "./FactTable/TPSTable.vue";
import bus from "@/assets/js/eventBus.js";

export default {
  props: ["datalist"],
  components: { bitable, tpstable },
  data() {
    return {
      JcxItems: [
        { component: "bitable", title: "基本信息" },
        { component: "tpstable", title: "技术参数" }
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
        $("#factInfo").kendoTabStrip({
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
    $("#factInfo li")
      .first()
      .addClass("k-state-active");
  }
};
</script>

<style>

</style>