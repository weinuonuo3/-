import sitewhere from './index'
import Url from './url'
import bus from "@/assets/js/eventBus.js";

export default {
    //监测项URL
    JCXList: {},
    GetJCX: function(f) {
        var _self = this;
        Url.SiteWhereGet(Url.JCX_Url, function(data) {
            var arr = [];
            $.each(data.results, function(i, item) {
                arr.push({
                    name: item.name,
                    metadata: item.metadata,
                    token: item.token
                });
                sitewhere.DevicesGroupData[item.token] = {
                    name: item.name,
                    TabPage: item.metadata.TabPage,
                    list: {},
                    sum: 0,
                    deleted: false
                };
                if (item.metadata.TabPage == "BZYX") {
                    //_self.GetDevicesGroupSite(item.token, item.name,item.metadata.TabPage);
                } else {
                    _self.GetDevicesGroup(item.token, item.metadata.TabPage);
                }
            });
            _self.JCXList = arr;
            bus.$emit("JCXRefresh", arr);
            f(arr);
        });
    },
    //区划URL
    GetQH: function(f) {
        var _self = this;
        Url.SiteWhereGet(Url.QX_Url, function(data) {
            f(data.results);
            $.each(data.results, function(i, v) {
                _self.GetAlarmData(v.token);
            });
            window.setInterval(function() {
                $.each(data.results, function(i, v) {
                    _self.GetAlarmData(v.token);
                });
            }, 300000);
        });
    },
    //数据来源URL
    GetSJLY: function(f) {
        Url.SiteWhereGet(Url.SJLY_Url, function(data) {
            f(data.results);
        });
    },
    //报警数据
    GetAlarmData: function(sitetoken) {
        var _self = this;
        var date = new Date();
        var s = formatDate(date, "yyyy-MM-dd", -1);
        var startDate = s + "T08:00:00.00+0800";
        var url = Url.Alarm_Url(sitetoken, startDate);
        Url.SiteWhereGet(url, function(data) {
            var list = sitewhere.AlarmData;
            $.each(data.results, function(i, v) {
                if (list[v.deviceAssignmentToken] != undefined) {
                    if (getMinute(v.eventDate, list[v.deviceAssignmentToken].eventDate) > 50) {
                        list[v.deviceAssignmentToken] = v;
                    }
                } else {
                    list[v.deviceAssignmentToken] = v;
                }
                _self.SetAssetAlarm(v);
            });
            sitewhere.AlarmData = list;
            bus.$emit("AlarmRefresh", sitewhere.AlarmData);
        });
    },
    //设置站点告警
    SetAssetAlarm: function(alarm) {
        $.each(sitewhere.DevicesGroupData, function(i, group) {
            var b = false;
            $.each(group.list, function(i, site) {
                $.each(site.list, function(i, row) {
                    if (row.assetId == alarm.assetId) {
                        row.BZ_S = 3;
                        b = true;
                        return false;
                    }
                });
                if (b) {
                    return false;
                }
            });
        });
    },
    //根据设备组token获取设备最新数据
    GetDevicesGroup: function(groupToken, TabPage) {
        sitewhere.DevicesGroupData[groupToken].list = {};
        //显示加载
        $(".k-loading-mask").show();
        var _self = this;
        var _url = Url.Devices_NewData_Url(groupToken);
        Url.SiteWhereGet(_url, function(data) {
            $("#Loading").hide();
            //筛选后的数据
            var dataList = _self.DevicesGroupGrid(data.results, groupToken);
            //判断监测项
            var groupDel = false;
            sitewhere.DevicesGroupData[groupToken].deleted = groupDel;
            sitewhere.DevicesGroupData[groupToken]["list"] = dataList;
            //隐藏加载
            $(".k-loading-mask").hide();
            bus.$emit("DevicesGroup_OK", groupToken);
            bus.$emit(TabPage, true);
        })
    },
    GetDevicesGroupSite: function(groupToken, groupName, qxlist) {
        sitewhere.DevicesGroupData[groupToken].list = {};
        //显示加载
        $(".k-loading-mask").show();
        var _self = this;
        var n = qxlist.length;
        $.each(qxlist, function(i, v) {
            var _url = Url.Devices_NewData_Site_Url(groupToken, v.token);
            Url.SiteWhereGet(_url, function(data) {
                $("#Loading").hide();
                //筛选后的数据
                var dataList = _self.DevicesGroupGrid_Site(data.results, groupToken);
                //区数据对象
                var siteDel = false;
                //判断区县
                if ($.inArray(v.token, sitewhere.checkQX) < 0) {
                    siteDel = true;
                }
                var site = {
                        groupToken: groupToken,
                        siteToken: v.token,
                        list: dataList,
                        deleted: siteDel
                    }
                    //判断监测项
                var groupDel = false;
                if ($.inArray(groupName, sitewhere.checkJCX) < 0) {
                    groupDel = true;
                }
                sitewhere.DevicesGroupData[groupToken].deleted = groupDel;
                sitewhere.DevicesGroupData[groupToken]["list"][v.token] = site;
                //初始化绑定监测项下区数据
                bus.$emit("DevicesGroupBind", {
                    groupToken: groupToken,
                    siteToken: v.token
                });
                //隐藏加载
                $(".k-loading-mask").hide();
                n--;
                if (n == 0) {
                    //bus.$emit("DevicesGroupBind_OK", true);
                    //bus.$emit("BZYX", true);
                    bus.$emit("DevicesGroup_OK", groupToken);
                }
                bus.$emit("BZYX", true);
            });
        });
    },
    DevicesGroupGrid: function(results, groupToken) {
        var _self = this;
        var _data = sitewhere.DevicesGroupData[groupToken].list;
        $.each(results, function(i, v) {
            if (!v.deleted) {
                //泵站编号
                var k = v.assignment.assetId;
                //添加泵站名称、时间
                var obj = {};
                if (_data[v.siteToken] != undefined) {
                    if (_data[v.siteToken]["list"][k] != undefined) {
                        obj = _data[v.siteToken]["list"][k];
                        //单个监测项下资产总数
                        sitewhere.DevicesGroupData[groupToken].sum -= 1;
                    }
                } else {
                    //区数据对象
                    var siteDel = false;
                    if ($.inArray(v.siteToken, sitewhere.checkQX) < 0) {
                        siteDel = true;
                    }
                    _data[v.siteToken] = {
                        groupToken: groupToken,
                        siteToken: v.siteToken,
                        list: {},
                        deleted: siteDel
                    };
                }
                obj = _self.GetRowData(obj, v);
                _data[v.siteToken]["list"][k] = obj;
            }
        });
        return _data;
    },
    DevicesGroupGrid_Site: function(results, groupToken) {
        var _self = this;
        var _data = {};
        //循环设备信息
        $.each(results, function(i, v) {
            if (!v.deleted) {
                //泵站编号
                var k = v.assignment.assetId;
                //添加泵站名称、时间
                var obj = {};
                if (_data[k] != undefined) {
                    obj = _data[k];
                } else {
                    //单个监测项下资产总数
                    sitewhere.DevicesGroupData[groupToken].sum += 1;
                }
                obj = _self.GetRowData(obj, v);
                _data[k] = obj;
            }
        });
        return _data;
    },

    GetRowData(obj, v) {
        var _self = this;
        //设置搜索数据数组
        if ($.inArray(v.assignment.assetName, sitewhere.AssetsNameList) < 0) {
            sitewhere.AssetsNameList.push(v.assignment.assetName);
        }
        if (obj["assetType"] == undefined) {
            obj["assetType"] = v.assetId;
        } else {
            obj["assetType"] += "," + v.assetId;
        }
        obj["assetId"] = v.assignment.assetId;
        obj["assetName"] = v.assignment.assetName;
        obj["siteToken"] = v.siteToken;
        //外部编码
        obj["S_EXTNO"] = "";
        if (v.metadata.S_EXTNO != undefined && v.metadata.S_EXTNO != "") {
            obj["S_EXTNO"] = v.metadata.S_EXTNO;
        }
        //经纬度
        obj["latitude"] = "";
        if (v.metadata.N_LTTD != undefined && v.metadata.N_LTTD != "") {
            obj["latitude"] = v.metadata.N_LTTD;
        }
        obj["longitude"] = "";
        if (v.metadata.N_LGTD != undefined && v.metadata.N_LGTD != "") {
            obj["longitude"] = v.metadata.N_LGTD;
        }
        obj["deleted"] = v.deleted;
        //不同数据来源测量数据
        var N_Sources_ID = "null";
        if (v.metadata.N_Sources_ID != undefined && v.metadata.N_Sources_ID != "") {
            N_Sources_ID = v.metadata.N_Sources_ID;
        }
        var assignmentObj = {};
        //判断数据来源
        var del = false;
        if ($.inArray(N_Sources_ID, sitewhere.checkSJLY) < 0) {
            del = true;
        }
        //创建数据来源数据对象
        if (obj.assignment != undefined) {
            if (obj.assignment[N_Sources_ID] != undefined) {
                assignmentObj = obj.assignment[N_Sources_ID];
            } else {
                assignmentObj["deleted"] = del;
            }
        } else {
            obj["assignment"] = {};
            assignmentObj["deleted"] = del;
        }
        //设置其他属性值
        _self.GetLatestListData(assignmentObj, v);
        obj.assignment[N_Sources_ID] = assignmentObj;

        return obj;
    },
    GetLatestListData(obj, v) {
        var _self = this;
        //获取监测数据
        if (v.assignment.state != undefined) {
            var latestData = v.assignment.state.latestMeasurements;
            $.each(latestData, function(latest_i, latest_v) {
                var time = _self.SiteWhereTime(latest_v.eventDate);
                if (obj["eventDate"] == undefined) {
                    obj["eventDate"] = time;
                } else {
                    if (getMinute(time, obj.eventDate) > 0) {
                        obj.eventDate = time;
                    }
                }
                var k = latest_v.name.replace(/\./g, "_");
                k = k.replace(/\-/g, "");
                //设置进出口
                if (v.assetId == 'W') {
                    var hardwareId = v.hardwareId.replace(new RegExp(v.assignment.assetId + '_W', 'g'), "");
                    obj = createObj(obj, ['W', hardwareId, k], latest_v.value);
                    obj = createObj(obj, ['W', hardwareId, "eventDate"], time);
                } else {
                    //泵机计算
                    if (k == "P_ON") {
                        //泵机状态
                        var BZ_ON = 2;
                        if (getMinute(new Date(), time) > 60) {
                            BZ_ON = 2;
                        } else {
                            BZ_ON = latest_v.value;
                        }
                        for (var t in sitewhere.AlarmData) {
                            if (sitewhere.AlarmData[t].deviceAssignmentToken == v.assignment.token) {
                                BZ_ON = 3;
                                break;
                            }
                        }
                        //泵机状态集合
                        if (obj["BZ_ON"] != undefined) {
                            obj["BZ_ON"] += ',' + BZ_ON;
                        } else {
                            obj["BZ_ON"] = BZ_ON;
                        }
                        //泵站开机台数
                        if (BZ_ON == 1) {
                            if (obj["BZ_R"] != undefined) {
                                obj["BZ_R"] += 1;
                            } else {
                                obj["BZ_R"] = 1;
                            }
                        } else {
                            if (obj["BZ_R"] == undefined) {
                                obj["BZ_R"] = 0;
                            }
                        }
                        //泵站状态
                        if (BZ_ON == 3) {
                            obj["BZ_S"] = 3;
                        } else {
                            if (BZ_ON == 1) {
                                obj["BZ_S"] = 1;
                            } else if (BZ_ON == 0) {
                                if (obj["BZ_S"] != undefined) {
                                    if (obj["BZ_S"] != 1) {
                                        obj["BZ_S"] = 0;
                                    }
                                } else {
                                    obj["BZ_S"] = 0;
                                }
                            } else {
                                if (obj["BZ_S"] == undefined) {
                                    obj["BZ_S"] = 2;
                                }
                            }
                        }
                    } else if (k == "F_M") {
                        var F_S = 2;
                        if (parseFloat(latest_v.value) > 0) {
                            F_S = 1;
                        } else {
                            F_S = 0;
                        }
                        for (var t in sitewhere.AlarmData) {
                            if (sitewhere.AlarmData[t].deviceAssignmentToken == v.assignment.token) {
                                F_S = 3;
                                break;
                            }
                        }
                        obj["F_S"] = F_S;
                        obj[k] = latest_v.value;
                    } else if (k == "F_DF") {
                        //流量
                        if (obj[k] != undefined) {
                            obj[k] += parseInt(latest_v.value);
                        } else {
                            obj[k] = parseInt(latest_v.value);
                        }
                    } else if (k == "F_S") {

                    } else if (k == "L_SW") {
                        //5中液位
                        var idArr = v.hardwareId.split("_");
                        if (idArr.length == 2) {
                            obj[idArr[1]] = latest_v.value;
                        }
                    } else {
                        obj[k] = latest_v.value;
                    }
                }
            });
        }
        return obj;
    },
    //获取单个资产时间内设备测量数据 
    GetAssetModuleInfo: function(assetsID, f) {
        Url.SiteWhereGet(Url.AssetModuleInfo(assetsID), function(data) {
            f(data);
        });
    },
    GetAssetModuleList: function(assetsID, f) {
        Url.SiteWhereGet(Url.AssetModuleList(assetsID), function(data) {
            f(data.results);
        });
    },
    GetAssignmentsData: function(token, startDate, endDate, f) {
        var item_url = Url.AssetModuleSeries(token, startDate, endDate);
        Url.SiteWhereGet(item_url, function(data) {
            f(data);
        });
    },
    SiteWhereTime: function(time) {
        var str = "";
        if (time != undefined && time != "") {
            if (time.indexOf('.') > -1) {
                var strs = new Array(); //定义一数组 
                strs = time.split("."); //字符分割 
                str = strs[0].replace(/T/g, " ").replace(/-/g, "/");
            }
        }
        return str;
    }
}