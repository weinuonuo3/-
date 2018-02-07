//var _host = 'http://192.168.180.215:8080/sitewhere/api';
//var _host = 'http://101.200.182.154:8080/sitewhere/api';
export default {
    //监测项
    JCX_Url: sitewhere_host + '/devicegroups?includeDeleted=false&page=1&pageSize=100',
    //区县
    QX_Url: sitewhere_host + '/sites?includeAssignments=false&includeZones=false&page=1&pageSize=100',
    //数据来源 
    SJLY_Url: sitewhere_host + '/assets/categories/DataSource/assets?page=1&pageSize=100',
    //报警数据
    Alarm_Url(sitetoken, startDate) {
        return sitewhere_host + '/sites/' + sitetoken + '/alerts?page=1&pageSize=10000&startDate=' + encodeURIComponent(startDate);
    },
    //获取设备最新数据
    Devices_NewData_Url(groupToken) {
        return sitewhere_host + '/devices/group/' + groupToken + '?includeDeleted=false&excludeAssigned=false&includeSpecification=false&includeAssignment=true&page=1&pageSize=10';
    },
    Devices_NewData_Site_Url(groupToken, site) {
        return sitewhere_host + '/devices/group/' + groupToken + '?site=' + site + '&includeDeleted=false&excludeAssigned=false&includeSpecification=false&includeAssignment=true&page=1&pageSize=10';
    },
    //获取站点信息
    AssetModuleInfo(assetId) {
        return sitewhere_host + '/assets/modules/DrainPump/assets/' + assetId + '?page=1&pageSize=100';
    },
    //获取站点所有关联的设备信息
    AssetModuleList(assetId) {
        return sitewhere_host + '/assets/modules/DrainPump/assets/' + assetId + '/assignments?page=1&pageSize=100';
    },
    //获取关联数据
    AssetModuleSeries(token, startDate, endDate) {
        var url = sitewhere_host + '/assignments/' + token + '/measurements/series/?page=1&pageSize=10000&startDate=' + encodeURIComponent(startDate) + '&endDate=' + encodeURIComponent(endDate) + '&measurementIds=' + encodeURIComponent('P.ON,L.SW,R.M,F.YF');
        return url;
    },
    SiteWhereGet(_url, fun) {
        //异步获取sitewhere数据  sitewhere1234567890  suzhouhecs   zxjc
        $.ajax({
            'type': 'GET',
            'url': _url,
            'headers': {
                //"Authorization": "Basic " + window.btoa("admin:password"),
                "Authorization": "Basic YWRtaW46cGFzc3dvcmQ=",
                "X-SiteWhere-Tenant": "zxjc"
            },
            'contentType': 'application/json',
            'success': function(data) {
                fun(data);
            },
            'error': function(err) {
                fun({
                    "numResults": 0,
                    "results": []
                });
            }
        })
    }
}