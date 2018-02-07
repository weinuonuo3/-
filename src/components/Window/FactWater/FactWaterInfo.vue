<template>
    <div id="factWater">
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
import bitable from "./BITable.vue";
import yearinfo from "./YearInfo.vue";
import alarm from "./Alarm.vue";
import bus from "@/assets/js/eventBus.js";

export default {
  props: ["datalist"],
  components: { bitable, yearinfo, alarm },
  data() {
    return {
      JcxItems: [
        { component: "bitable", title: "基本信息" },
        { component: "yearinfo", title: "年报信息" },
        { component: "alarm", title: "报警标准" }
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
        $("#factWater").kendoTabStrip({
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
    $("#factWater li")
      .first()
      .addClass("k-state-active");
  }
};
</script>

<style>

</style>