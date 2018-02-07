<template>
  <div>
    <div class="tab_wsccyg">
      <component v-bind:is="which_to_show" v-bind:gridSetting='gridSetting' v-bind:dataEdit="dataEdit" v-bind:gridID="grid_ID"></component>
    </div>
    <div class="tab_icon">
      <div v-for="item in IconList">
        <div v-if="item.show==true">
          <div><img v-bind:src="item.icon" />&nbsp;</div>
          <div>{{item.str}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sitewhere from "@/components/SiteWhere/js/index.js";
import grid from "@/components/kendoUIDefault/Grid.vue";
import bus from "@/assets/js/eventBus.js";
import gridJs from "./js/grid.js";

export default {
  props: ["token"],
  components: { gridShow: grid },
  data() {
    return {
      grid_ID: "wsccyggrid",
      which_to_show: "",
      DataList: {},
      gridSetting: [],
      dataEdit: [],
      IconList: [
        {
          N_num: 0,
          show: true,
          icon: "../../static/images/home/btn_liul_wull.png",
          str: "无流量[0]"
        },
        {
          N_num: 0,
          show: true,
          icon: "../../static/images/home/btn_liul_youll.png",
          str: "有流量[0]"
        },
        {
          N_num: 0,
          show: true,
          icon: "../../static/images/home/btn_liul_diaoxian.png",
          str: "掉线[0]"
        },
        {
          N_num: 0,
          show: true,
          icon: "../../static/images/home/btn_liul_baoj.png",
          str: "异常[0]"
        }
      ]
    };
  },
  methods: {
    Init: function(newDataList) {
      var _self = this;
      var grid = gridJs.GetGrid(_self.IconList);
      grid.columns[4].hidden = true;
      grid.columns[5].field = "L4";
      grid.columns[9].hidden = true;
      grid.columns[12].field = "F_S";
      _self.gridSetting = grid;
      _self.which_to_show = "gridShow";
    },
    BindData: function(data) {
      var _self = this;
      gridJs.BindData(data, _self.token, _self.dataEdit, _self.IconList, "F_S");
    },
    RefreshData: function(data) {
      var _self = this;
      _self.dataEdit = gridJs.RefreshData(
        data,
        _self.dataEdit,
        _self.IconList,
        "F_S",
        _self.grid_ID
      );
    }
  },
  mounted: function() {
    var _self = this;
    _self.Init();
    _self.RefreshData(sitewhere.DevicesGroupData[_self.token].list);
    bus.$on("WSCCYG", function(data) {
      //_self.BindData(data);
      _self.RefreshData(sitewhere.DevicesGroupData[_self.token].list);
    });
    bus.$on("WSCCYG_Refresh", function(data) {
      _self.RefreshData(data[_self.token].list);
    });
    bus.$on("DevicesGroupBind_Refresh", function(data) {
      _self.dataEdit = [];
      $.each(_self.IconList, function(i, item) {
        _self.IconList[i].N_num = 0;
        _self.IconList[i].str = item.str.replace(/(\d+)/, 0);
      });
    });
  }
};
</script>

<style>

</style>
