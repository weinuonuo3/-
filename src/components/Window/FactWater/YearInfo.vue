<template>
    <div id="WSTPTable">
        <div style="overflow:hidden;">
            <div class="title-td">上海市污水处理设施信息表</div>
            <div class="drop">
                <div class="drop-left">单位名称<input id="dropdownlist1" /></div>
                <div class="drop-right">填表年限<input id="dropdownlist2" /></div>
            </div>
        </div>
        <table>
            <tr>
                <td class="td-left" colspan="2" style="width:136.57px;">法人单位名称</td>
                <td colspan="3" style="width:204.85px;"></td>
                <td class="td-left" colspan="2" style="width:136.57px;">法人单位代码</td>
                <td colspan="3" style="width:204.85px;"></td>
                <td class="td-left" colspan="2" style="width:136.57px;">法人代表姓名</td>
                <td colspan="2" style="width:136.57px;"></td>
            </tr>
            <tr>
                <td class="td-left">厂址</td>
                <td colspan="3"></td>
                <td class="td-left">电话</td>
                <td></td>
                <td class="td-left">邮编</td>
                <td></td>
                <td class="td-left">职工人数</td>
                <td></td>
                <td class="td-left" colspan="2">上级主管部门</td>
                <td colspan="2"></td>
            </tr>
            <tr>
                <td class="td-left" style="width:75px;">总设计规模(万m³/日)</td>
                <td></td>
                <td class="td-left">厂占地面积(公顷)</td>
                <td></td>
                <td class="td-left">服务面积(k㎡)</td>
                <td></td>
                <td class="td-left">服务人口(万人)</td>
                <td></td>
                <td class="td-left">投产日期</td>
                <td></td>
                <td class="td-left" style="85px;">污水厂总投资(万元)</td>
                <td></td>
                <td class="td-left" style="width:75px;">尾水排入河道名称</td>
                <td></td>
            </tr>
            <tr>
                <td class="td-left">污水处理工艺</td>
                <td colspan="2"></td>
                <td class="td-left">污泥处理工艺</td>
                <td colspan="2"></td>
                <td class="td-left">污泥处置方式</td>
                <td></td>
                <td class="td-left">尾水消毒工艺</td>
                <td></td>
                <td class="td-left">尾水回用工艺</td>
                <td></td>
                <td class="td-left">工业废水占处理量(%)</td>
                <td></td>
            </tr>
            <tr>
                <td class="td-left">年处理水量(万m³)</td>
                <td colspan="2"></td>
                <td class="td-left">年运行天数</td>
                <td colspan="2"></td>
                <td class="td-left">污泥处置(吨/年)</td>
                <td colspan="3"></td>
                <td class="td-left">污泥含水率(%)</td>
                <td colspan=""></td>
                <td class="td-left">回用水量(吨/年)</td>
                <td></td>
            </tr>
            <tr>
                <td class="td-left" rowspan="2">年运行简况</td>
                <td class="td-left">进水(mg/L)</td>
                <td class="td-left">BOD
                    <sub>5</sub>
                </td>
                <td></td>
                <td class="td-left">SS</td>
                <td></td>
                <td class="td-left">COD
                    <sub>cr</sub>
                </td>
                <td></td>
                <td class="td-left">NH3-N(氨氮)</td>
                <td></td>
                <td class="td-left">TP(总磷)</td>
                <td></td>
                <td class="td-left">污水厂收集管网(Km)</td>
                <td></td>
            </tr>
            <tr>
                <td class="td-left">出水(mg/L)</td>
                <td class="td-left">BOD
                    <sub>5</sub>
                </td>
                <td></td>
                <td class="td-left">SS</td>
                <td></td>
                <td class="td-left">COD
                    <sub>cr</sub>
                </td>
                <td></td>
                <td class="td-left">NH3-N(氨氮)</td>
                <td></td>
                <td class="td-left">TP(总磷)</td>
                <td></td>
                <td class="td-left">污水厂输送泵站(座)</td>
                <td></td>
            </tr>
            <tr>
                <td class="td-left" rowspan="4">污水厂工艺概况</td>
                <td class="td-left">期数</td>
                <td class="td-left" colspan="2">年月</td>
                <td class="td-left" colspan="2">设计规模(万m³/日)</td>
                <td class="td-left" colspan="2">工艺</td>
                <td class="td-left" colspan="6">主要建筑物名称</td>
            </tr>
            <tr>
                <td class="td-left">一期</td>
                <td colspan="2"> </td>
                <td colspan="2"> </td>
                <td colspan="2"> </td>
                <td colspan="6"> </td>
            </tr>
            <tr>
                <td class="td-left">二期</td>
                <td colspan="2"> </td>
                <td colspan="2"> </td>
                <td colspan="2"> </td>
                <td colspan="6"> </td>
            </tr>
            <tr>
                <td class="td-left">三期</td>
                <td colspan="2"> </td>
                <td colspan="2"> </td>
                <td colspan="2"> </td>
                <td colspan="6"> </td>
            </tr>
            <tr>
                <td class="td-left" rowspan="5">运行费用分析</td>
                <td class="td-left">年耗电量(KWH/年)</td>
                <td></td>
                <td class="td-left" colspan="1">年药剂消耗量(吨/年)</td>
                <td></td>
                <td class="td-left" colspan="1">年设施设备检修维护费(万元/年)</td>
                <td></td>
                <td class="td-left" colspan="1">在册职工总数(人)</td>
                <td></td>
                <td class="td-left" rowspan="6">厂外输送泵站示意图</td>
                <td rowspan="5" colspan="4"></td>
            </tr>
            <tr>
                <td class="td-left">平均电价(KWH/年)</td>
                <td></td>
                <td class="td-left" colspan="1">药剂消单价(元/吨)</td>
                <td></td>
                <td class="td-left" colspan="1">年设施设备大修费(万元/年)</td>
                <td></td>
                <td class="td-left" colspan="1">工资总数(万元)</td>
                <td></td>
            </tr>
            <tr>
                <td class="td-left" rowspan="2">年自来水消耗量</td>
                <td></td>
                <td class="td-left" colspan="1">污泥填埋费(万元/年)</td>
                <td></td>
                <td class="td-left" colspan="1">厂外泵站运行费(万元/年)</td>
                <td></td>
                <td class="td-left" colspan="1">年折旧费(万元)</td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td class="td-left" colspan="1">污泥焚烧费(万元/年)</td>
                <td></td>
                <td class="td-left" colspan="1">厂外管道维护费(万元/年)</td>
                <td></td>
                <td class="td-left" colspan="1">年管理及办公费(万元)</td>
                <td></td>
            </tr>
            <tr>
                <td class="td-left">自来水水价</td>
                <td></td>
                <td class="td-left" colspan="1">污泥运输费(万元/年)</td>
                <td></td>
                <td class="td-left" colspan="1">运行单价(万元/年)</td>
                <td colspan="3"></td>
            </tr>
        </table>
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
    }
  },
  methods: {
    Init: function() {
      $("#dropdownlist1").kendoDropDownList({
        optionLabel: "--选择单位--",
        height: 100,
        dataSource: {
          data: ["上海", "石家庄"]
        }
      });
      $("#dropdownlist2").kendoDropDownList({
        height: 100,
        autoWidth: true,
        dataSource: {
          data: [
            "2000年",
            "2001年",
            "2002年",
            "2003年",
            "2004年",
            "2005年",
            "2006年",
            "2007年",
            "2008年",
            "2009年",
            "2010年",
            "2011年",
            "2012年",
            "2013年",
            "2014年",
            "2015年",
            "2016年",
            "2017年",
            "2018年"
          ]
        }
      });
    }
  },
  mounted: function() {
      this.Init();
  }
};
</script>

<style>

</style>
