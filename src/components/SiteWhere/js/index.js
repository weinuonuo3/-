import fun from './fun'
import bus from "@/assets/js/eventBus.js";

export default {
    GetJCXList: function() {
        return fun.JCXList;
    },
    //获取监测项列表
    SetJCXList: function(f) {
        fun.GetJCX(f);
    },
    //获取所属区划列表
    SetQHList: function(f) {
        fun.GetQH(f);
    },
    //获取数据来源列表 
    SetSourceList: function(f) {
        fun.GetSJLY(f);
    },
    //筛选项
    checkJCX: [],
    checkQX: [],
    checkSJLY: [],
    //获取不同监测项设备最新测量数据 
    DevicesGroupData: {},
    GetDevicesGroupSite: function(token, name, qxlist) {
        fun.GetDevicesGroupSite(token, name, qxlist);
    },
    tokenList: [],
    qxList: [],
    DevicesRefresh: function(qxlist) {
        var _self = this;
        var data = _self.DevicesGroupData;

        window.setInterval(function() {
            $("#Loading").show();
            for (var k in data) {
                if (data[k].TabPage == "BZYX") {
                    window.setTimeout(function() {
                        fun.GetDevicesGroupSite(k, data[k].name, qxlist);
                    }, 1000);
                } else {
                    fun.GetDevicesGroup(k, data[k].TabPage);
                }
            }
            bus.$emit("DevicesGroupBind_Refresh", true);
        }, 300000);
    },
    //获取单个资产时间内设备测量数据 
    GetAssetModuleInfo: function(assetsID, f) {
        fun.GetAssetModuleInfo(assetsID, f);
    },
    GetAssetModuleList: function(assetsID, f) {
        fun.GetAssetModuleList(assetsID, f);
    },
    GetAssignmentsData: function(token, startDate, endDate, f) {
        fun.GetAssignmentsData(token, startDate, endDate, f);
    },
    //获取报警数据
    AlarmData: {},
    //图层控制
    LayersItem: [],
    //泵站名称列表
    AssetsNameList: []
}