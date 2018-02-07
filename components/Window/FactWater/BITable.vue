<template>
  <div id="FactBITable">
    <table>
      <tr>
        <td class="td-left">单位名称</td>
        <td>{{DeviceData.S_FACT_NAME}}</td>
        <td class="td-left">污水厂全称</td>
        <td colspan="3"></td>
        <td class="td-left">污水厂名称简称</td>
        <td>{{DeviceData.S_FACT_NAME}}</td>
      </tr>
      <tr>
        <td class="td-left">经济性质</td>
        <td class="td-right">{{GetJJXZ(DeviceData.N_EconomyKind)}}</td>
        <td class="td-left">COD进水浓度</td>
        <td class="td-right">{{DeviceData.N_FACT_COD_IN}}(mg/L)</td>
        <td class="td-left">格栅平台X</td>
        <td class="td-right"></td>
        <td class="td-left">养护单位</td>
        <td class="td-right"></td>
      </tr>
      <tr>
        <td class="td-left">地址</td>
        <td>{{DeviceData.S_FACT_ADD}}</td>
        <td class="td-left">COD出水浓度</td>
        <td>{{DeviceData.N_FACT_COD_OUT}}(mg/L)</td>
        <td class="td-left">格栅平台X</td>
        <td></td>
        <td class="td-left">竣工日期</td>
        <td></td>
      </tr>
      <tr>
        <td class="td-left">联系电话</td>
        <td>{{DeviceData.S_FACT_PHONE}}</td>
        <td class="td-left">SS进水浓度</td>
        <td>{{DeviceData.N_FACT_SS_IN}}(mg/L)</td>
        <td class="td-left">格栅平台标高</td>
        <td></td>
        <td class="td-left">投运日期</td>
        <td></td>
      </tr>
      <tr>
        <td class="td-left">邮政编码</td>
        <td>{{DeviceData.S_FACT_POST_CODE}}</td>
        <td class="td-left">SS出水浓度</td>
        <td>{{DeviceData.N_FACT_SS_OUT}}(mg/L)</td>
        <td class="td-left">地坪标高</td>
        <td></td>
        <td class="td-left">改建日期</td>
        <td>{{DeviceData.D_ReBuildDate}}</td>
      </tr>
      <tr>
        <td class="td-left">管理形式</td>
        <td></td>
        <td class="td-left">NH3N进水浓度</td>
        <td>{{DeviceData.N_FACT_NH3N_IN}}(mg/L)</td>
        <td class="td-left">占地面积</td>
        <td>{{DeviceData.N_FACT_AREA_USE}}(k㎡)</td>
        <td class="td-left">填报单位</td>
        <td></td>
      </tr>
      <tr>
        <td class="td-left">资产单位代码</td>
        <td></td>
        <td class="td-left">NH3N出水浓度</td>
        <td>{{DeviceData.N_FACT_NH3N_OUT}}(mg/L)</td>
        <td class="td-left">服务面积</td>
        <td>{{DeviceData.N_FACT_AREA_S}}(k㎡)</td>
        <td class="td-left">填报日期</td>
        <td></td>
      </tr>
      <tr>
        <td class="td-left">设计规模</td>
        <td>{{DeviceData.N_FACT_CAP_DSN}}(万m³/日)</td>
        <td class="td-left">磷进水浓度</td>
        <td>{{DeviceData.N_FACT_P_IN}}(mg/L)</td>
        <td class="td-left">服务人口数</td>
        <td>(万人)</td>
        <td class="td-left">填报用户</td>
        <td></td>
      </tr>
      <tr>
        <td class="td-left">污水处理工艺</td>
        <td>{{DeviceData.S_WuShuiChuLiGongYiFenLei}}</td>
        <td class="td-left">磷出水浓度</td>
        <td>{{DeviceData.N_FACT_P_OUT}}(mg/L)</td>
        <td class="td-left">污水厂平面位置</td>
        <td></td>
        <td class="td-left">运行管理单位</td>
        <td></td>
      </tr>
      <tr>
        <td class="td-left">执行的排放登记</td>
        <td></td>
        <td class="td-left">污泥处理工艺</td>
        <td>{{DeviceData.S_FACT_METHOD_MUDTREAT}}</td>
        <td class="td-left">设施状态</td>
        <td></td>
        <td class="td-left">区域归属</td>
        <td></td>
      </tr>
      <tr>
        <td class="td-left">处理单耗</td>
        <td></td>
        <td class="td-left">污泥处置方式</td>
        <td>{{DeviceData.S_FACT_TYPE_TREAT}}</td>
        <td class="td-left">环线位置描述</td>
        <td></td>
        <td class="td-left">联系人电子邮件</td>
        <td></td>
      </tr>
      <tr>
        <td class="td-left">处理用电量</td>
        <td></td>
        <td class="td-left">污泥量</td>
        <td>(m³/年)</td>
        <td class="td-left">设计单位</td>
        <td></td>
        <td class="td-left" rowspan="3">备注</td>
        <td rowspan="3"></td>
      </tr>
      <tr>
        <td class="td-left">BOD进水浓度</td>
        <td>{{DeviceData.N_FACT_BOD_IN}}(mg/L)</td>
        <td class="td-left">污泥含水率</td>
        <td>{{DeviceData.N_FACT_N_FACTOR}}(%)</td>
        <td class="td-left">施工单位</td>
        <td></td>
      </tr>
      <tr>
        <td class="td-left">BOD出水浓度</td>
        <td>{{DeviceData.N_FACT_BOD_OUT}}(mg/L)</td>
        <td class="td-left">排入水体名称</td>
        <td></td>
        <td class="td-left">图幅编号</td>
        <td></td>
      </tr>
    </table>

   
  </div>
</template>

<script>
import devicefun from "../js/index.js";
import bus from "@/assets/js/eventBus.js";

export default {
  props: ["assets"],
  data() {
    return {
      DeviceData: {}
    };
  },
  methods: {
    GetTime: function(time, t) {
      if (time != undefined && time != "") {
        time = new Date(time);
        if (t != "") {
          return formatDate(time, t, 0);
        }
        return formatDate(time, "yyyy-MM-dd hh:mm:ss", 0);
      }
    },
    GetJJXZ: function(t) {
      var type = "";
      switch (t) {
        case 1:
          type = "全民所有制企业";
          break;
        case 2:
          type = "集体所有制企业";
          break;
        case 3:
          type = "私营企业";
          break;
        case 4:
          type = "联营企业";
          break;
        case 5:
          type = "股份合作企业";
          break;
      }
      return type;
    },
    GetPFBZ: function(t) {
      var type = "";
      switch (t) {
        case 1:
          type = "一级加强";
          break;
        case 2:
          type = "一级标准（A 标准)";
          break;
        case 3:
          type = "一级标准(B 标准）";
          break;
        case 4:
          type = "二级标准";
          break;
        case 5:
          type = "三级标准";
          break;
      }
      return type;
    },
    GetZSYT: function(t) {
      var type = "";
      switch (t) {
        case 1:
          type = "农田灌溉";
          break;
        case 2:
          type = "河湖补水";
          break;
        case 3:
          type = "工业循环用水";
          break;
        case 4:
          type = "绿化用水";
          break;
        case 5:
          type = "地面冲洗";
          break;
        case 6:
          type = "生活杂用";
          break;
        case 9:
          type = "其它";
          break;
      }
      return type;
    },
    GetJSND: function(t) {
      var type = "";
      switch (t) {
        case -1:
          type = "暂缺";
          break;
        case 1:
          type = "1949年前";
          break;
        case 2:
          type = "1949-1978";
          break;
        case 3:
          type = "1978-2000";
          break;
        case 4:
          type = "2000年后";
          break;
      }
      return type;
    },
    GetSBZT: function(t) {
      var type = "";
      switch (t) {
        case 1:
          type = "拟建";
          break;
        case 2:
          type = "已建";
          break;
        case 3:
          type = "已废";
          break;
      }
      return type;
    }
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
  mounted: function() {}
};
</script>

<style>

</style>
