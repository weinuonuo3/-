<template>
	<div class="Samper-div">
		<table>
			<tr>
				<td class='td-left'>采样器剩余瓶数</td>
				<td>{{SamperData.SI_V}}</td>
				<td class='td-left'>采样运行阶段</td>
				<td>{{GetStrTwo(SamperData.SI_SR)}}</td>
			</tr>
			<tr>
				<td class='td-left'>采水泵1运行状态</td>
				<td>{{GetStrTwo(SamperData.SI_1PR)}}</td>
				<td class='td-left'>采水泵2运行状态</td>
				<td>{{GetStrTwo(SamperData.SI_2PR)}}</td>
			</tr>
			<tr>
				<td class='td-left'>采水泵1采水故障</td>
				<td>{{GetStrOne(SamperData.SI_1PE)}}</td>
				<td class='td-left'>采水泵2采水故障</td>
				<td>{{GetStrOne(SamperData.SI_2PE)}}</td>
			</tr>
			<tr>
				<td class='td-left'>采水报警</td>
				<td>{{GetStrThree(SamperData.SI_E)}}</td>
				<td class='td-left'>自动采样器运行状态</td>
				<td>{{GetStrTwo(SamperData.SI_AR)}}</td>
			</tr>
			<tr>
				<td class='td-left'>采样器瓶数满报警</td>
				<td>{{GetStrThree(SamperData.SI_VE)}}</td>
				<td class='td-left'>空气冲洗泵运行状态</td>
				<td>{{GetStrTwo(SamperData.SI_3PR)}}</td>
			</tr>
			<tr>
				<td class='td-left'>空气冲洗阀运行状态</td>
				<td>{{GetStrTwo(SamperData.SI_GR)}}</td>
				<td class='td-left'>采水复位</td>
				<td>{{GetStrFour(SamperData.SI_SET)}}</td>
			</tr>
			<tr>
				<td class='td-left'>流量开关</td>
				<td>{{GetStrTwo(SamperData.SI_A)}}</td>
				<td class='td-left'>电源指示</td>
				<td>{{GetStrTwo(SamperData.SI_P)}}</td>
			</tr>
			<tr>
				<td class='td-left'>系统运行</td>
				<td>{{GetStrTwo(SamperData.SI_R)}}</td>
				<td class='td-left'></td>
				<td></td>
			</tr>
		</table>
	</div>
</template>

<script>
export default {
  props: ["datalist"],
  data() {
    return {
      SamperData: {
        SI_V: "",
        title: "",
        SI_SR: "",
        SI_1PR: "",
        SI_2PR: "",
        SI_1PE: "",
        SI_2PE: "",
        SI_E: "",
        SI_AR: "",
        SI_VE: "",
        SI_3PR: "",
        SI_GR: "",
        SI_SET: "",
        SI_A: "",
        SI_P: "",
        SI_R: ""
      }
    };
  },
  watch: {
    datalist: function(list) {
      if (list.data != undefined) {
        this.SamperData = list.data;
      }
    }
  },
  methods: {
    GetStrOne: function(n) {
      switch (n) {
        case "1":
          return "正常";
          break;
        case "2":
          return "掉线";
          break;
        case "3":
          return "异常";
          break;
      }
    },
    GetStrTwo: function(n) {
      switch (n) {
        case "0":
          return "停止";
          break;
        case "1":
          return "开启";
          break;
      }
    },
    GetStrThree: function(n) {
      switch (n) {
        case "0":
          return "未报警";
          break;
        case "1":
          return "报警";
          break;
      }
		},
		GetStrFour: function(n) {
      switch (n) {
        case "0":
          return "否";
          break;
        case "1":
          return "是";
          break;
      }
    }
  }
};
</script>

<style>

</style>