<template>
  <div>
    <div class="tab_wscjck">
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
      grid_ID: "wscjckgrid",
      which_to_show: "",
      DataList: {},
      gridSetting: [],
      dataEdit: [],
      IconList: [
        {
          N_num: 0,
          show: true,
          icon: "../../static/images/home/btn_liul_wull.png",
          str: "正常[0]"
        },
        {
          N_num: 0,
          show: true,
          icon: "../../static/images/home/btn_liul_youll.png",
          str: "掉线[0]"
        },
        {
          N_num: 0,
          show: true,
          icon: "../../static/images/home/btn_liul_diaoxian.png",
          str: "一般超标[0]"
        },
        {
          N_num: 0,
          show: true,
          icon: "../../static/images/home/btn_liul_baoj.png",
          str: "严重超标[0]"
        }
      ]
    };
  },
  methods: {
    Init: function(newDataList) {
      var _self = this;
      var grid = gridJs.GetGrid_WSCJCK(_self.IconList);
      _self.gridSetting = grid;
      _self.which_to_show = "gridShow";
    },
    BindData: function(data) {
      var _self = this;
      gridJs.BindData(data, _self.token, _self.dataEdit, _self.IconList, "W_S");
    },
    RefreshData: function(data) {
      var _self = this;
      _self.dataEdit = gridJs.RefreshData(
        data,
        _self.dataEdit,
        _self.IconList,
        "W_S",
        _self.grid_ID
      );
    }
  },
  mounted: function() {
    var _self = this;
    _self.Init();
    _self.RefreshData(sitewhere.DevicesGroupData[_self.token].list);
    bus.$on("WSCJCK", function(data) {
      //_self.BindData(data);
      _self.RefreshData(sitewhere.DevicesGroupData[_self.token].list);
    });
    bus.$on("WSCJCK_Refresh", function(data) {
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
