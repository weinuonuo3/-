<template>
  <div>
    <div class="tab_bzyx">
      <component v-bind:is="which_to_show" v-bind:gridSetting='gridSetting' v-bind:dataEdit="dataEdit" v-bind:gridID="grid_ID"></component>
    </div>
    <div class="tab_icon">
      <div v-for="item in IconList">
        <div><img v-bind:src="item.icon" />&nbsp;</div>
        <div>{{item.str}}</div>
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
      grid_ID: "bzyxgrid",
      which_to_show: "",
      DataList: {},
      gridSetting: [],
      dataEdit: [],
      IconList: [
        {
          N_num: 0,
          icon: "../../static/images/home/btn__bengz_tingbeng.png",
          str: "停泵[0]"
        },
        {
          N_num: 0,
          icon: "../../static/images/home/btn__bengz_kaibeng.png",
          str: "开泵[0]"
        },
        {
          N_num: 0,
          icon: "../../static/images/home/btn__bengz_diaoxian.png",
          str: "掉线[0]"
        },
        {
          N_num: 0,
          icon: "../../static/images/home/btn__bengz_baoj.png",
          str: "异常[0]"
        }
      ]
    };
  },
  methods: {
    Init: function(newDataList) {
      var _self = this;
      var grid = gridJs.GetGrid(_self.IconList);
      grid.columns[5].title = "液位";
      grid.columns[5].field = "L1";
      grid.columns[6].hidden = true;
      grid.columns[7].hidden = true;
      grid.columns[8].field = "BZ_PDF";
      grid.columns[10].hidden = true;
      grid.columns[12].field = "BZ_S";
      _self.gridSetting = grid;
      _self.which_to_show = "gridShow";
    },
    BindData: function(data) {
      var _self = this;
      gridJs.BindData(
        data,
        _self.token,
        _self.dataEdit,
        _self.IconList,
        "BZ_S"
      );
    },
    RefreshData: function(data) {
      var _self = this;
      _self.dataEdit = gridJs.RefreshData(
        data,
        _self.dataEdit,
        _self.IconList,
        "BZ_S",
        _self.grid_ID
      );
    }
  },
  mounted: function() {
    var _self = this;
    _self.Init();
    _self.RefreshData(sitewhere.DevicesGroupData[_self.token].list);
    bus.$on("BZYX", function(data) {
      //_self.BindData(data);
      _self.RefreshData(sitewhere.DevicesGroupData[_self.token].list);
    });
    bus.$on("BZYX_Refresh", function(data) {
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
