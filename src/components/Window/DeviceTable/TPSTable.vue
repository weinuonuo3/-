<template>
	<div id="TPTable" class="fa-div">
		<div class="block-div" style="width:330px;">
			<div class="title-td">运行水位标高</div>
			<table>
				<tr>
					<td class="left-td left2-td ">雨水最高开车</td>
					<td>
						{{DeviceData.N_DRAI_PUMP_LEVEL_MAX_Y}}m
					</td>
					<td class="left-td left1-td ">污水最高开车</td>
					<td>{{DeviceData.N_DRAI_PUMP_LEVEL_MAX_W}}m</td>
				</tr>
				<tr>
					<td class="left-td left2-td ">雨水最低停车</td>
					<td>{{DeviceData.N_DRAI_PUMP_LEVEL_MIN_Y}}m</td>
					<td class="left-td left1-td ">污水最低停车</td>
					<td>{{DeviceData.N_DRAI_PUMP_LEVEL_MIN_W}}m</td>
				</tr>
				<tr>
					<td class="left-td left2-td ">雨水技术水位</td>
					<td>{{DeviceData.N_DRAI_PUMP_LEVEL_DSN_Y}}m</td>
					<td class="left-td left1-td ">污水技术水位</td>
					<td>{{DeviceData.N_DRAI_PUMP_LEVEL_DSN_W}}m</td>
				</tr>
			</table>
		</div>
		<div class="block-div">
			<div class="title-td">设计水位标高</div>
			<table>
				<tr>
					<td class="left-td left2-td ">雨水最高开车</td>
					<td>{{DeviceData.N_DRAI_PUMP_LEVEL_MAX_Y_DES}}m</td>
				</tr>
				<tr>
					<td class="left-td left2-td ">雨水最低停车</td>
					<td>{{DeviceData.N_DRAI_PUMP_LEVEL_MIN_Y_DES}}m</td>
				</tr>
				<tr>
					<td class="left-td left2-td ">污水最高开车</td>
					<td>{{DeviceData.N_DRAI_PUMP_LEVEL_MAX_W_DES}}m</td>
				</tr>
				<tr>
					<td class="left-td left2-td ">污水最低停车</td>
					<td>{{DeviceData.N_DRAI_PUMP_LEVEL_MIN_W_DES}}m</td>
				</tr>
			</table>
		</div>
		<div class="block-div">
			<div class="title-td">排水能力</div>
			<table>
				<tr>
					<td class="left-td left3-td ">设计雨水</td>
					<td>{{DeviceData.N_DRAI_PUMP_FLOW_DSN_Y}}m3/s</td>
				</tr>
				<tr>
					<td class="left-td left3-td ">现有雨水</td>
					<td>{{DeviceData.N_DRAI_PUMP_FLOW_FACT_Y}}m3/s</td>
				</tr>
				<tr>
					<td class="left-td left3-td ">设计污水</td>
					<td>{{DeviceData.N_DRAI_PUMP_FLOW_DSN_W}}m3/s</td>
				</tr>
				<tr>
					<td class="left-td left3-td ">现有污水</td>
					<td>{{DeviceData.N_DRAI_PUMP_FLOW_FACT_W}}m3/s</td>
				</tr>
			</table>
		</div>
		<div class="block-div" style="width:330px;">
			<div class="title-td">高级运行水位</div>
			<table>
				<tr>
					<td class="left-td left2-td ">降雨开车水位</td>
					<td>{{DeviceData.N_JiangYuKaiCheShuiWei}}m</td>

					<td class="left-td left1-td ">截流降雨开车水位</td>
					<td>{{DeviceData.N_JieLiuJiangYuKaiCheShuiWei}}m</td>
				</tr>
				<tr>
					<td class="left-td left2-td ">降雨停车水位</td>
					<td>{{DeviceData.N_JiangYuTingCheShuiWei}}m</td>
					<td class="left-td left1-td ">截流降雨停车水位</td>
					<td>{{DeviceData.N_JieLiuJiangYuTingCheShuiWei}}m</td>
				</tr>
				<tr>
					<td class="left-td left2-td ">防汛开车水位</td>
					<td>{{DeviceData.N_FangXunKaiCheShuiWei}}m</td>
					<td class="left-td left1-td ">截流旱流开车水位</td>
					<td>{{DeviceData.N_JieLiuHanLiuKaiCheShuiWei}}m</td>
				</tr>
				<tr>
					<td class="left-td left2-td ">防汛停车水位</td>
					<td>{{DeviceData.N_DRAI_PUMP_LEVEL_MAX_Y}}m</td>
					<td class="left-td left1-td ">截流旱流停车水位</td>
					<td>{{DeviceData.N_DRAI_PUMP_LEVEL_MAX_Y}}m</td>
				</tr>
			</table>
		</div>
		<div class="block-div">
			<div class="title-td">装机容量</div>
			<table>
				<tr>
					<td class="left-td left2-td ">设计雨水</td>
					<td>{{DeviceData.N_DRAI_PUMP_POW_DSN_Y}}kW</td>
				</tr>
				<tr>
					<td class="left-td left2-td ">现有雨水</td>
					<td>{{DeviceData.N_DRAI_PUMP_POW_FACT_Y}}kW</td>
				</tr>
				<tr>
					<td class="left-td left2-td ">设计污水</td>
					<td>{{DeviceData.N_DRAI_PUMP_POW_DSN_W}}kW</td>
				</tr>
				<tr>
					<td class="left-td left2-td ">现有污水</td>
					<td>{{DeviceData.N_DRAI_PUMP_POW_FACT_W}}kW</td>
				</tr>
			</table>
		</div>
		<div class="block-div">
			<div class="title-td">其他技术参数</div>
			<table style="width:100%">
				<tr>
					<td class="left-td left3-td ">设计暴雨重现期</td>
					<td>{{DeviceData.N_DesRainstormReP}}年</td>
				</tr>
				<tr>
					<td class="left-td left3-td ">设计径流综合系数</td>
					<td>{{DeviceData.N_DesCoefficient}}</td>
				</tr>
				<tr>
					<td class="left-td left3-td ">雨水泵站总功率</td>
					<td>{{DeviceData.N_DRAI_PUMP_POW_SUM_Y}}kW</td>
				</tr>
				<tr>
					<td class="left-td left3-td ">污水泵站总功率</td>
					<td>{{DeviceData.N_DRAI_PUMP_POW_SUM_W}}kW</td>
				</tr>
			</table>
		</div>

	</div>
</template>

<script>
import devicefun from "../js/index.js";
export default {
  props: ["assets"],
  data() {
    return {
      DeviceData: {}
    };
  },
  watch: {
    assets: function(obj) {
      var _self = this;
      //获取设备信息
      var n = 62;
      if (obj.TabPage == "BZYX") {
        n = 7;
      }
      var url = devicefun.Get_Url(n, "S_XTBM='" + obj.assetId + "'");
      devicefun.GetData(url, function(data) {
        if (data.features.length > 0) {
          _self.DeviceData = data.features[0].attributes;
        }
      });
    }
  },
  methods: {},
  mounted: function() {}
};
</script>

<style>

</style>
