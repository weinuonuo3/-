<template>
  <div class="tab_con">
    <div id="tabstrip">
      <ul>
        <li v-for="item in JcxItems">
          {{ item.name }}
        </li>
      </ul>
      <div v-for="item in JcxItems">
        <component v-bind:is="item.metadata.TabPage" v-bind:token="item.token"></component>
      </div>
    </div>
  </div>
</template>

<script>
import BZYX from "./BottomTab/BZYXGrid.vue";
import BZFJ from "./BottomTab/BZFJGrid.vue";
import PFKFJ from "./BottomTab/PFKFJGrid.vue";
import WSCCYG from "./BottomTab/WSCCYGGrid.vue";
import WSCJCK from "./BottomTab/WSCJCKGrid.vue";
import bus from "@/assets/js/eventBus.js";
import sitewhereFun from "@/components/SiteWhere/js/index.js";

export default {
  components: { BZYX, BZFJ, PFKFJ, WSCCYG, WSCJCK },
  data() {
    return {
      JcxItems: [{ name: "", metadata: { TabPage: "" } }],
      JcxOK: false,
      JcxNum: 0,
      tabStrip: {}
    };
  },
  methods: {
    Init: function(data) {
      var _self = this;
      _self.JcxItems = data;

      _self.$nextTick(function() {
        var w = $("#tabstrip").width();
        $("#tabstrip>ul").width(w - 360);

        _self.tabStrip = $("#tabstrip")
          .kendoTabStrip()
          .data("kendoTabStrip");
        _self.tabStrip.animation = false;
        _self.tabStrip.select(0);
        _self.JcxOK = true;

        $(".k-tabstrip-next").css({ right: "300px" });
      });
    },
    getItem: function(itemIndex) {
      return this.tabStrip.tabGroup.children("li").eq(itemIndex);
    },
    RefreshTab: function(data) {
      var _self = this;
      if (_self.JcxOK) {
        if (data.length == 0) {
          $("#tabstrip").hide();
        } else {
          $("#tabstrip").show();
          $.each(_self.JcxItems, function(i, v) {
            if ($.inArray(v.name, data) < 0) {
              _self.tabStrip.tabGroup
                .children("li")
                .eq(i)
                .hide();
            } else {
              _self.tabStrip.tabGroup
                .children("li")
                .eq(i)
                .show();
              if (v.name == data[data.length - 1]) {
                _self.tabStrip.select(i);
              }
            }
          });
        }
      } else {
        setTimeout(function() {
          _self.RefreshTab(data);
        }, 100);
      }
    }
  },
  mounted: function() {
    var _self = this;
    bus.$on("TabListBind", function(data) {
      _self.Init(data);
    });
    bus.$on("JCXListRefresh", function(data) {
      _self.RefreshTab(data);
    });
  }
};
</script>

<style>

</style>