<template>
  <div id="JBTable">
    <table>
      <tr>
        <td class="td-left" style="width:75px;">泵站代码</td>
        <td style="width:120px;">{{DeviceData.S_DRAI_PUMP_ID}}</td>
        <td class="td-left" style="width:50px;">泵站名称</td>
        <td style="width:100px;">{{DeviceData.S_DRAI_PUMP_NAME}}</td>
        <td class="td-left" style="width:115px;">泵站大类</td>
        <td>{{GetBZtype(DeviceData.N_DRAI_PUMP_TYPE)}}</td>
        <td class="td-left" style="width:75px;">泵站小类</td>
        <td>{{GetBZtype_x(DeviceData.N_DRAI_PUMP_TYPE_FEAT)}}</td>
      </tr>
      <tr>
        <td class="td-left">泵站地址</td>
        <td colspan="3">{{DeviceData.S_DRAI_PUMP_ADD}}</td>
        <td class="td-left">联系电话</td>
        <td>{{DeviceData.S_DRAI_PUMP_PHONE}}</td>
        <td class="td-left">所属排水系统</td>
        <td>{{DeviceData.S_SYS_ID}}</td>
      </tr>
      <tr>
        <td class="td-left">国有土地变化</td>
        <td colspan="3"></td>
        <td class="td-left">邮政编码</td>
        <td>{{DeviceData.S_DRAI_PUMP_POST_CODE}}</td>
        <td class="td-left">建设年代</td>
        <td>{{GetJSND(DeviceData.N_BUILDYEAR)}}</td>
      </tr>
      <tr>
        <td class="td-left">易积水地点</td>
        <td>{{DeviceData.S_YiJiShuiDian}}</td>
        <td class="td-left">标高</td>
        <td>{{DeviceData.N_YiJiShuiDianBiaoGao}}
          <span>m</span>
        </td>
        <td class="td-left">排入水体</td>
        <td>{{DeviceData.S_DRAI_PUMP_TO_RIV}}</td>
        <td class="td-left">设施状态</td>
        <td>{{GetSSZT(DeviceData.N_DRAI_PUMP_STATE)}}</td>
      </tr>
      <tr>
        <td class="td-left">占地面积</td>
        <td>{{DeviceData.N_ZhanDiMianJi}}
          <span>m²</span>
        </td>
        <td class="td-left">服务面积</td>
        <td>{{DeviceData.N_ServiceArea}}
          <span>ha</span>
        </td>
        <td class="td-left">泵站室外标高</td>
        <td>{{DeviceData.N_BengZhanShiWaiDiPingBiaoGao}}
          <span>m</span>
        </td>
        <td class="td-left">环线位置描述</td>
        <td>{{GetHXWZMS(DeviceData.N_RingRoad)}}</td>
      </tr>
      <tr>
        <td class="td-left">建筑面积</td>
        <td>{{DeviceData.S_JianZhuMianJi}}
          <span>m²</span>
        </td>
        <td class="td-left">竣工决算</td>
        <td>{{DeviceData.S_JunGongJueSuanJia}}
          <span>万</span>
        </td>
        <td class="td-left">主管单位</td>
        <td>{{DeviceData.S_ZhuGuanDanWei}}</td>
        <td class="td-left">设计单位</td>
        <td>{{DeviceData.S_DRAI_PUMP_COM_DSN}}</td>
      </tr>
      <tr>
        <td class="td-left">服务范围</td>
        <td class="td-left" colspan="3"></td>
        <td class="td-left">施工单位</td>
        <td>{{DeviceData.S_DRAI_PUMP_COM_BUILD}}</td>
        <td class="td-left">运行单位</td>
        <td>{{DeviceData.S_DRAI_PUMP_COM_MNG}}</td>
      </tr>
      <tr>
        <td class="td-left">东面</td>
        <td>{{DeviceData.S_ServiceRange_E}}</td>
        <td class="td-left">南面</td>
        <td>{{DeviceData.S_ServiceRange_S}}</td>
        <td class="td-left">养护单位</td>
        <td>{{DeviceData.S_MaintainsUnit}}</td>
        <td class="td-left">建设单位</td>
        <td>{{DeviceData.S_JianSheDanWei}}</td>
      </tr>
      <tr>
        <td class="td-left">西面</td>
        <td>{{DeviceData.S_ServiceRange_W}}</td>
        <td class="td-left">北面</td>
        <td>{{DeviceData.S_ServiceRange_N}}</td>
        <td class="td-left">投运日期</td>
        <td>{{GetTime(DeviceData.D_RunDate,'yyyy年MM月dd日')}}</td>
        <td class="td-left">城建X</td>
        <td>{{DeviceData.S_X}}</td>
      </tr>
      <tr>
        <td class="td-left">抗震等级</td>
        <td colspan="3">{{DeviceData.S_KangZhenDengJi}}</td>
        <td class="td-left">改建日期</td>
        <td>{{DeviceData.D_ReBuildDate}}</td>
        <td class="td-left">城建Y</td>
        <td>{{DeviceData.S_Y}}</td>
      </tr>
      <tr>
        <td class="td-left">备注</td>
        <td colspan="7">{{DeviceData.B_Remark}}</td>
      </tr>
      <tr>
        <td class="td-left">上报人员</td>
        <td colspan="2">{{DeviceData.S_In_Use}}</td>
        <td class="td-left">上报日期</td>
        <td>{{GetTime(DeviceData.D_In_Date,'')}}</td>
        <td class="td-left">上报单位</td>
        <td colspan="2">{{DeviceData.S_In_Com}}</td>
      </tr>
      <tr>
        <td class="td-left">竣工日期</td>
        <td colspan="2">{{GetTime(DeviceData.D_FinishDate,'')}}</td>
        <td class="td-left">排放口名称</td>
        <td>{{DeviceData.S_PAIFANGKOUMC}}</td>
        <td class="td-left">排放口城建坐标</td>
        <td colspan="2">{{DeviceData.S_PAIFANGKOUXY}}</td>
      </tr>
      <tr>
        <td class="td-left">格栅平台标高</td>
        <td colspan="2">{{DeviceData.N_GrillPlatElev}}</td>
        <td class="td-left">行政等级</td>
        <td>{{GetXZDJ(DeviceData.N_GRADE)}}</td>
        <td class="td-left"></td>
        <td colspan="2"></td>
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
    GetBZtype: function(t) {
      var type = "";
      switch (t) {
        case 1:
          type = "雨水";
          break;
        case 2:
          type = "污水";
          break;
        case 3:
          type = "合建";
          break;
        case 9:
          type = "其它";
          break;
      }
      return type;
    },
    GetBZtype_x: function(t) {
      var type = "";
      switch (t) {
        case 1:
          type = "分流雨水";
          break;
        case 2:
          type = "合流防汛";
          break;
        case 3:
          type = "立交";
          break;
        case 4:
          type = "闸泵";
          break;
        case 5:
          type = "分流污水";
          break;
        case 6:
          type = "合流截流";
          break;
        case 7:
          type = "干线输送";
          break;
        case 8:
          type = "分流";
          break;
        case 9:
          type = "合流";
          break;
        case 10:
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
    GetSSZT: function(t) {
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
    },
    GetHXWZMS: function(t) {
      var type = "";
      switch (t) {
        case 1:
          type = "环线内";
          break;
        case 2:
          type = "跨内环线";
          break;
        case 3:
          type = "内外环间";
          break;
        case 4:
          type = "跨外环线";
          break;
        case 5:
          type = "外环以外";
          break;
      }
      return type;
    },
    GetXZDJ: function(t) {
      var type = "";
      switch (t) {
        case 1:
          type = "市管";
          break;
        case 2:
          type = "区管";
          break;
        case 3:
          type = "镇村管";
          break;
      }
      return type;
    }
  },
  watch: {
    assets: function(obj) {
      var _self = this;
      //获取设备信息
      var url = devicefun.Get_Url(7, "S_XTBM='" + obj.assetId + "'");
      devicefun.GetData(url, function(data) {
        if (data.features.length > 0) {
          _self.DeviceData = data.features[0].attributes;
          bus.$emit("OBJECTID", data.features[0].attributes.OBJECTID);
        }
      });
    }
  },
  mounted: function() {}
};
</script>

<style>

</style>
