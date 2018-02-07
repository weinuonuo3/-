<template>
	<div>
		<div id="top_content">
			<ul class="item-header-ul">
				<li v-for="item in Items" style="width:65px;">
					{{ item.title }}
				</li>
				<li style="width:30px;"><img id="right-control-btn" title="隐藏面板" src="../../static/images/home/btn_shous_right_normal.png"></img></li>
			</ul>
			<div v-for="item in Items">
				<component v-bind:is="item.component"></component>
			</div> 
		</div>
		<img id="right-control-btn1" title="显示面板" style="height:28px;position: absolute;z-index:2;top:0px;right:0px;display:none;cursor:pointer;" src="../../static/images/home/btn_shous_left_normal.png" state="1"></img>
	</div>
	
</template>

<script>
import statistics from "@/components/topRight/Statistics.vue";
import alarm from "@/components/topRight/Alarm.vue";
import layercontrol from "@/components/topRight/Layer.vue";

export default {
  components: { statistics, alarm ,layercontrol},
  data() {
    return {
      Items: [
        { component: "statistics", title: "概览" },
        { component: "alarm", title: "报警" },
        { component: "layercontrol", title: "图层" }
      ]
    };
  },
  methods: {
    Init: function() {
      var _self = this;
      _self.$nextTick(function() {
        $("#top_content")
          .kendoTabStrip({
            animation: false,
            scrollable: false
          })
          .data("kendoTabStrip")
          .select(0);
      });
    }
  },
  mounted: function() {
    var _self = this;
    _self.Init();
    $("#right-control-btn").on("click", function() {
      $("#top_content").hide();
      $("#right-control-btn1").show();
    });
    $("#right-control-btn1").on("click", function() {
      $("#top_content").show();
      $("#right-control-btn1").hide();
      $("#top_content")
        .data("kendoTabStrip")
        .select(0);
    });
  }
};
</script>

<style>

</style>
