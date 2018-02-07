<template>
  <div id="BZJBTable">
    <div class="title-td">基本信息</div>
    <table>
      <tr>
        <td class="td-left">污水厂名称</td>
        <td>{{DeviceData.S_FACT_NAME}}</td>
        <td class="td-left">法人代表</td>
        <td>{{DeviceData.S_FaRenDaiBiao}}</td>
        <td class="td-left">单位代码</td>
        <td>{{DeviceData.S_XTBM}}</td>
      </tr>
      <tr>
        <td class="td-left">地址</td>
        <td>{{DeviceData.S_FACT_ADD}}</td>
        <td class="td-left">联系电话</td>
        <td>{{DeviceData.S_FACT_PHONE}}</td>
        <td class="td-left">邮政编码</td>
        <td>{{DeviceData.S_FACT_POST_CODE}}</td>
      </tr>
      <tr>
        <td class="td-left">经济性质</td>
        <td>{{GetJJXZ(DeviceData.N_EconomyKind)}}</td>
        <td class="td-left">职工人数</td>
        <td>{{DeviceData.D_EmployeeNum}}</td>
        <td class="td-left">占地面积</td>
        <td>{{DeviceData.N_FACT_AREA_USE}}k㎡</td>
      </tr>
      <tr>
        <td class="td-left">排放标准</td>
        <td>{{GetPFBZ(DeviceData.D_PaiFangBiaoZhun)}}</td>
        <td class="td-left">排入水体</td>
        <td>{{DeviceData.S_FACT_TO_RIV}}</td>
        <td class="td-left">服务面积</td>
        <td>{{DeviceData.N_FACT_AREA_S}}k㎡</td>
      </tr>
      <tr>
        <td class="td-left">管理形式</td>
        <td>{{DeviceData.N_FACT_GRADE}}</td>
        <td class="td-left">收集管网</td>
        <td>{{DeviceData.S_ShouJiGuanWang}}km</td>
        <td class="td-left">设计规模</td>
        <td>{{DeviceData.N_FACT_CAP_DSN}}万m³/天</td>
      </tr>
      <tr>
        <td class="td-left">设施状态</td>
        <td>{{GetSBZT(DeviceData.N_FACT_STATE)}}</td>
        <td class="td-left">服务人口</td>
        <td>{{DeviceData.N_FACT_POPU_S}}万</td>
        <td class="td-left">PH浓度</td>
        <td>{{DeviceData.N_PH}}mg/l</td>
      </tr>
      <tr>
        <td class="td-left">服务范围</td>
        <td colspan="3">{{DeviceData.S_ServiceRange}}</td>
        <td class="td-left">中水用途</td>
        <td>{{GetZSYT(DeviceData.N_ZhongShuiYongTu)}}</td>
      </tr>
    </table>

    <div class="block-div">
      <div class="title-td">建设情况</div>
      <table>
        <tr>
          <td class="td-left">上级主管部门</td>
          <td>{{DeviceData.S_ZhuGuanDanWei}}</td>
        </tr>
        <tr>
          <td class="td-left">运行管理单位</td>
          <td>{{DeviceData.S_FACT_COM_MNG}}</td>
        </tr>
        <tr>
          <td class="td-left">设计单位</td>
          <td>{{DeviceData.S_FACT_COM_DSN}}</td>
        </tr>
        <tr>
          <td class="td-left">建设单位</td>
          <td>{{DeviceData.S_JianSheDanWei}}</td>
        </tr>
        <tr>
          <td class="td-left">施工单位</td>
          <td>{{DeviceData.S_FACT_COM_BUILD}}</td>
        </tr>
        <tr>
          <td class="td-left">上报单位</td>
          <td>{{DeviceData.S_In_Com}}</td>
        </tr>
      </table>
    </div>
    <div id="block-div" class="block-div">
      <div class="title-td">日期</div>
      <table>
        <tr>
          <td class="td-left">改建日期</td>
          <td>{{DeviceData.D_ReBuildDate}}</td>
        </tr>
        <tr>
          <td class="td-left">投产日期</td>
          <td>{{GetTime(DeviceData.D_RunDate,"")}}</td>
        </tr>
        <tr>
          <td class="td-left">环保验收</td>
          <td>{{DeviceData.N_HuanBaoYanShouRiQi}}</td>
        </tr>
        <tr>
          <td class="td-left">竣工日期</td>
          <td>{{DeviceData.D_FinishDate}}</td>
        </tr>
        <tr>
          <td class="td-left">建设年代</td>
          <td>{{GetJSND(DeviceData.D_BUILDYEAR)}}</td>
        </tr>
        <tr>
          <td class="td-left">上报日期</td>
          <td>{{GetTime(DeviceData.D_In_Date,"")}}</td>
        </tr>
      </table>
    </div>
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
