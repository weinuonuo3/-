<template>
	<div id="TPTable" class="fa-div" style="height:436px;">
		<div class="block-div" style="width:330px;">
			<div class="title-td">污水处理工艺</div>
			<table>
				<tr>
					<td class="left-td" style="width:90px;">处理工艺分类</td>
					<td>{{DeviceData.S_WuShuiChuLiGongYiFenLei}}</td>
				</tr>
				<tr>
					<td class="left-td">污水处理方法</td>
					<td>{{DeviceData.S_FACT_METHOD_TREAT}}</td>
				</tr>
				<tr>
					<td class="left-td">工业废水比例</td>
					<td>{{DeviceData.N_WuShuiGongYeFeiShuiBiLi}}%</td>
				</tr>
				<tr>
					<td class="left-td">文字描述</td>
					<td>{{DeviceData.S_WuShuiWenZiMiaoShu}}</td>
				</tr>
			</table>
		</div>
		<div class="block-div">
			<div class="title-td">污泥处理工艺</div>
			<table>
				<tr>
					<td class="left-td">污泥处理工艺</td>
					<td>{{DeviceData.S_FACT_METHOD_MUDTREAT}}</td>
				</tr>
				<tr>
					<td class="left-td">污泥处置方式</td>
					<td>{{DeviceData.S_FACT_TYPE_TREAT}}</td>
				</tr>
				<tr>
					<td class="left-td">污泥含水率</td>
					<td>{{DeviceData.N_FACT_N_FACTOR}}%</td>
				</tr>
				<tr>
					<td class="left-td">污泥脱水能力</td>
					<td>{{DeviceData.N_WuShuiTuoShuiNengLi}}</td>
				</tr>
				<tr>
					<td class="left-td">文字描述</td>
					<td>{{DeviceData.S_WuNiGongYiMiaoShu}}</td>
				</tr>
			</table>
		</div>
		<div class="block-div">
			<div class="title-td">尾水回用处理工艺</div>
			<table>
				<tr>
					<td class="left-td" style="width:90px;">尾水回用工艺</td>
					<td>{{DeviceData.S_WeiShuiHuiYongGongYi}}</td>
				</tr>
				<tr>
					<td class="left-td">尾水回用规模</td>
					<td>{{DeviceData.N_WeiShuiHuiYongGuiMo}}吨/年</td>
				</tr>
				<tr>
					<td class="left-td">文字描述</td>
					<td>{{DeviceData.S_WeiShuiHuiShuiMiaoShu}}</td>
				</tr>
			</table>
		</div>
		<div class="block-div" id="block-div">
			<div class="title-td">设计进水浓度</div>
			<table>
				<tr>
					<td class="left-td">NH3N</td>
					<td>{{DeviceData.N_FACT_NH3N_IN}}</td>
				</tr>
				<tr>
					<td class="left-td">COD</td>
					<td>{{DeviceData.N_FACT_COD_IN}}</td>
				</tr>
				<tr>
					<td class="left-td">BOD</td>
					<td>{{DeviceData.N_FACT_BOD_IN}}</td>
				</tr>
				<tr>
					<td class="left-td">磷</td>
					<td>{{DeviceData.N_FACT_P_IN}}</td>
				</tr>
				<tr>
					<td class="left-td">SS</td>
					<td>{{DeviceData.N_FACT_SS_IN}}</td>
				</tr>
				<tr>
					<td class="left-td">TN</td>
					<td>{{DeviceData.N_FACT_TN_IN}}</td>
				</tr>
			</table>
		</div>
		<div class="block-div" id="block-div">
			<div class="title-td">设计出水浓度</div>
			<table style="width:100%">
				<tr>
					<td class="left-td">NH3N</td>
					<td>{{DeviceData.N_FACT_NH3N_OUT}}</td>
				</tr>
				<tr>
					<td class="left-td">COD</td>
					<td>{{DeviceData.N_FACT_COD_OUT}}</td>
				</tr>
				<tr>
					<td class="left-td">BOD</td>
					<td>{{DeviceData.N_FACT_BOD_OUT}}</td>
				</tr>
				<tr>
					<td class="left-td">磷</td>
					<td>{{DeviceData.N_FACT_P_OUT}}</td>
				</tr>
				<tr>
					<td class="left-td">SS</td>
					<td>{{DeviceData.N_FACT_SS_OUT}}</td>
				</tr>
				<tr>
					<td class="left-td">TN</td>
					<td>{{DeviceData.N_FACT_TN_OUT}}</td>
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
      var url = devicefun.Get_Url(62, "S_XTBM='" + obj.assetId + "'");
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
