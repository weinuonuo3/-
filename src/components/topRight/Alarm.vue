<template>
  <div id="alarm">
    <div v-for="item in alarmList" class="alarm_list">
      <div>泵站名称：<span>{{item.assetName}}</span></div>
      <div>报警时间：<span>{{GetTime(item.eventDate)}}</span></div>
      <div>报警信息：<span>{{item.message}}</span></div>
    </div>
  </div>
</template>

<script>
import sitewhere from "@/components/SiteWhere/js/index.js";
import bus from "@/assets/js/eventBus.js";

export default {
  data() {
    return {
      alarmList: []
    };
  },
  methods: {
    EditData: function(data) {
      var _self = this;
      var list = [];
      for (var k in data) {
        list.push(data[k]);
      }
      _self.alarmList = list;
    },
    GetTime: function(time) {
      var s = formatDate(time, "yyyy-MM-dd hh:mm", 0);
      return s;
    }
  },
  mounted: function() {
    var _self = this;
    _self.EditData(sitewhere.AlarmData);
    bus.$on("AlarmRefresh", function(data) {
      _self.EditData(data);
    });
  }
};
</script>

<style>

</style>
