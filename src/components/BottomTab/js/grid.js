import sitewhere from "@/components/SiteWhere/js/index.js";

export default {
    BindData: function(data, token, dataEdit, IconList, v_S) {
        var _s = this;
        var grid = dataEdit;
        if (data.groupToken == token) {
            var n = grid.length + 1;
            //一个区县的数据
            var site =
                sitewhere.DevicesGroupData[token].list[data.siteToken];
            //区县
            if (!site.deleted) {
                _s.GetRow(site.list, grid, n, IconList, v_S);
            }
            _s.SetIcon(IconList, null);
        }
    },
    RefreshData: function(data, dataEdit, IconList, v_S, grid_ID) {
        var _s = this;
        var grid = [];
        _s.SetIcon(IconList, 0);
        $.each(data, function(j, site) {
            if (!site.deleted) {
                var n = grid.length + 1;
                _s.GetRow(site.list, grid, n, IconList, v_S, grid_ID);
            }
        });
        dataEdit = grid;
        _s.SetIcon(IconList, null);
        return dataEdit;
    },
    GetRow: function(site, grid, n, IconList, v_S, grid_ID) {
        var _s = this;
        for (var assetId in site) {
            //单个泵站的数据
            var assets = site[assetId];
            if (!assets.deleted) {
                var row = { orderID: n, TabPage: grid_ID };
                //判断
                var del = false;
                //不同数据来源
                for (var k in assets) {
                    if (k == "assignment") {
                        //测量数据
                        var assignment = assets.assignment;
                        //数据来源
                        for (var s in assignment) {
                            if (!assignment[s].deleted) {
                                del = true;
                                for (var t in assignment[s]) {
                                    /* if (t == "L1" || t == "L2" || t == "L3" || t == "L4" || t == "L5") {
                                        if (s == "放江泵站及超越管项目") {

                                        }
                                    } */
                                    if (t == "eventDate") {
                                        if (row[t] == undefined) {
                                            row[t] = assignment[s][t];
                                        } else {
                                            if (getMinute(assignment[s][t], row[t]) > 0) {
                                                row[t] = assignment[s][t];
                                            }
                                        }
                                    } else {
                                        row[t] = assignment[s][t];
                                    }
                                }
                            }
                        }
                    } else {
                        row[k] = assets[k];
                    }
                }
            }

            if (del) {
                var eventDate = formatDate(row["eventDate"], "yyyy/MM/dd hh:mm:ss", 0);
                if (getMinute(new Date(), eventDate) > 60) {
                    row[v_S] = 2;
                }
                if (row[v_S] == undefined || row[v_S].toString() == "") {
                    row[v_S] = 2;
                }
                IconList[parseInt(row[v_S])].N_num++;
                grid.push(_s.GetRowList(row));
            }
            n++;
        }
        return grid;
    },
    GetRowList: function(row) {
        var arr = ['assetId', 'assetName', 'eventDate', 'S_EXTNO', 'orderID', 'BZ_R', 'BZ_S', 'SI_V', 'R_D', 'BZ_PDF', 'F_S', 'F_YF', 'F_M', 'L1', 'L2', 'L3', 'L4', 'L5', 'W_COD', 'W_NH3N', 'W_PH', 'W_TN', 'W_TP'];
        $.each(arr, function(i, s) {
            if (row[s] == undefined) {
                row[s] = "";
            } else {
                if (s == "eventDate") {
                    row[s] = formatDate(row[s], "MM-dd hh:mm", 0);
                }
            }
        })
        return row;
    },
    SetIcon: function(IconList, n) {
        $.each(IconList, function(i, item) {
            if (n != null) {
                item.N_num = n;
            }
            IconList[i].str = item.str.replace(/(\d+)/, item.N_num);
        })
    },
    GetGrid: function(IconList) {
        return {
            columns: [{
                    field: "assetId",
                    headerAttributes: {
                        style: "text-align: center; vertical-align:middle;"
                    },
                    hidden: true
                },
                {
                    field: "orderID",
                    headerAttributes: {
                        style: "text-align: center; vertical-align:middle;"
                    },
                    attributes: { style: "text-align:center;" },
                    width: 35,
                    hidden: false,
                    title: "序号"
                },
                {
                    field: "assetName",
                    headerAttributes: {
                        style: "text-align: center; vertical-align:middle;"
                    },
                    width: 140,
                    hidden: false,
                    title: "监测站名称"
                },
                {
                    field: "eventDate",
                    headerAttributes: {
                        style: "text-align: center; vertical-align:middle;"
                    },
                    attributes: { style: "text-align:center;" },
                    hidden: false,
                    width: 75,
                    title: "时间"
                },
                {
                    field: "BZ_R",
                    headerAttributes: {
                        style: "text-align: center; vertical-align:middle;"
                    },
                    attributes: { style: "text-align:right;" },
                    width: 50,
                    title: "开机台数",
                    hidden: false
                },
                {
                    field: "L1",
                    headerAttributes: {
                        style: "text-align: center; vertical-align:middle;"
                    },
                    attributes: { style: "text-align:right;" },
                    width: 40,
                    hidden: false,
                    title: "水深"
                },
                {
                    field: "F_YF",
                    headerAttributes: {
                        style: "text-align: center; vertical-align:middle;"
                    },
                    attributes: { style: "text-align:right;" },
                    width: 70,
                    hidden: false,
                    title: "累计流量"
                },
                {
                    field: "F_V",
                    headerAttributes: {
                        style: "text-align: center; vertical-align:middle;"
                    },
                    attributes: { style: "text-align:right;" },
                    width: 40,
                    hidden: false,
                    title: "流速"
                },
                {
                    field: "F_DF",
                    headerAttributes: {
                        style: "text-align: center; vertical-align:middle;"
                    },
                    attributes: { style: "text-align:right;" },
                    width: 50,
                    hidden: false,
                    title: "日放江"
                },
                {
                    field: "R_D",
                    headerAttributes: {
                        style: "text-align: center; vertical-align:middle;"
                    },
                    attributes: { style: "text-align:right;" },
                    width: 50,
                    hidden: false,
                    title: "日降雨"
                },
                {
                    field: "SI_V",
                    headerAttributes: {
                        style: "text-align: center; vertical-align:middle;"
                    },
                    attributes: { style: "text-align:right;" },
                    width: 80,
                    hidden: false,
                    title: "剩余瓶数"
                },
                {
                    field: "S_EXTNO",
                    headerAttributes: {
                        style: "text-align: center; vertical-align:middle;"
                    },
                    attributes: { style: "text-align:center;" },
                    width: 40,
                    hidden: false,
                    title: "详细"
                },
                {
                    field: "BZ_S",
                    headerAttributes: {
                        style: "text-align: center; vertical-align:middle;"
                    },
                    attributes: { style: "text-align:center;" },
                    width: 40,
                    hidden: false,
                    title: "状态"
                },
                {
                    field: "S_EXTNO",
                    headerAttributes: {
                        style: "text-align: center; vertical-align:middle;"
                    },
                    hidden: true
                },
                {
                    field: "TabPage",
                    headerAttributes: {
                        style: "text-align: center; vertical-align:middle;"
                    },
                    hidden: true
                }
            ],
            dataSource: {
                pageSize: 5,
                data: []
            },
            dataBound: function() {
                var rows = this.items();
                $(rows).each(function(i, tr) {
                    var TabPage = $(this).find("td:eq(14)").text();
                    //名称
                    var name = $(this).find("td:eq(2)");
                    var s_name = $(name).text();
                    if ($(name).text() != "") {
                        var html = '<a href="javascript:void(0)" onclick="AppBus({show: true,type:\'Search\',name: \'' + s_name + '\',TabPage: \'' + TabPage + '\'})">' + s_name + "</a>";
                        $(name).addClass("bottom_name_img");
                        $(name).html(html);
                    }
                    //水深
                    var L_SW = $(this).find("td:eq(5)");
                    if ($(L_SW).text() != "") {
                        var s = $(L_SW).text();
                        var str = s.substring(0, s.indexOf(".") + 3) + "m";
                        $(L_SW).text(str);
                    }
                    //累计流量
                    var F_YF = $(this).find("td:eq(6)");
                    if ($(F_YF).text() != "") {
                        var s = (parseFloat($(F_YF).text()) / 10000).toString();
                        var str = s.substring(0, s.indexOf(".") + 2) + "万m³";
                        $(F_YF).text(str);
                    }

                    //流速
                    var F_V = $(this).find("td:eq(7)");
                    if ($(F_V).text() != "") {
                        var s = $(F_V).text();
                        var str = s.substring(0, s.indexOf(".") + 3) + "m/s";
                        $(F_V).text(str);
                    }

                    //日放江
                    var BZ_PDF = $(this).find("td:eq(8)");
                    if ($(BZ_PDF).text() != "") {
                        var s = (parseFloat($(BZ_PDF).text()) / 10000).toString();
                        var str = s.substring(0, s.indexOf(".") + 2) + "万m³";
                        $(BZ_PDF).text(str);
                    }

                    //日降雨
                    var R_D = $(this).find("td:eq(9)");
                    if ($(R_D).text() != "") {
                        var s = $(R_D).text();
                        var str = s.substring(0, s.indexOf(".") + 3) + "mm";
                        $(R_D).text(str);
                    }

                    //剩余瓶数
                    var SI_V = $(this).find("td:eq(10)");
                    if ($(SI_V).text() != "") {
                        var _w = parseInt($(SI_V).text()) * 3;
                        var v_class = "si_v_str";
                        if (_w > 30) {
                            v_class = "si_v_str si_v_f";
                        }
                        var html = "<div class='si_v_style'><div style='width:" + (72 - _w) + "px;'></div><div class='" + v_class + "'>" + $(SI_V).text() + "</div></div>";
                        $(SI_V).html(html);
                    }


                    //曲线图 2017-12-14 gjm
                    var chart = $(this).find("td:eq(11)");
                    $(chart).css({ padding: "0px 0px 0px 0px", "line-height": "inherit" });
                    $(chart).html('<img  class="icon-chart" onclick="AppBus({show: true,type:\'ChartsPanel\',assets: {assetId: \'' + $(this).find("td:eq(0)").text() + '\', S_EXTNO: \'' + $(this).find("td:eq(13)").text() + '\', assetName: \'' + s_name + '\'} })" src="../../static/images/home/icon_quxiantu.png" style="height:16px;width:20px;cursor: pointer;"/>');


                    //状态
                    var tr_S = $(this).find("td:eq(12)");
                    if ($(tr_S).text() != "") {
                        var pngstr = IconList[parseInt($(tr_S).text())].icon;
                        $(tr_S).css({ padding: "0px 0px 0px 0px", "line-height": "inherit" });
                        $(tr_S).html("<img src='" + pngstr + "' style='height:26px;'/>");
                    }
                });
            },
            height: 226,
            selectable: "multiple,row",
            allowCopy: true,
            scrollable: true,
            sortable: false,
            pageable: {
                pageSizes: true,
                refresh: false
            }
        }
    },
    GetGrid_WSCJCK: function(IconList) {
        return {
            columns: [{
                    field: "assetId",
                    headerAttributes: {
                        style: "text-align: center; vertical-align:middle;"
                    },
                    hidden: true
                },
                {
                    field: "orderID",
                    headerAttributes: {
                        style: "text-align: center; vertical-align:middle;"
                    },
                    attributes: { style: "text-align:center;" },
                    width: 35,
                    hidden: false,
                    title: "序号"
                },
                {
                    field: "assetName",
                    headerAttributes: {
                        style: "text-align: center; vertical-align:middle;"
                    },
                    width: 140,
                    hidden: false,
                    title: "监测站名称"
                },
                {
                    field: "eventDate",
                    headerAttributes: {
                        style: "text-align: center; vertical-align:middle;"
                    },
                    attributes: { style: "text-align:center;" },
                    hidden: false,
                    width: 75,
                    title: "时间"
                },
                {
                    field: "W_COD",
                    headerAttributes: {
                        style: "text-align: center; vertical-align:middle;"
                    },
                    attributes: { style: "text-align:right;" },
                    width: 50,
                    title: "COD",
                    hidden: false
                },
                {
                    field: "W_NH3N",
                    headerAttributes: {
                        style: "text-align: center; vertical-align:middle;"
                    },
                    attributes: { style: "text-align:right;" },
                    width: 40,
                    hidden: false,
                    title: "NH3-N"
                },
                {
                    field: "W_TP",
                    headerAttributes: {
                        style: "text-align: center; vertical-align:middle;"
                    },
                    attributes: { style: "text-align:right;" },
                    width: 70,
                    hidden: false,
                    title: "TP"
                },
                {
                    field: "W_TN",
                    headerAttributes: {
                        style: "text-align: center; vertical-align:middle;"
                    },
                    attributes: { style: "text-align:right;" },
                    width: 40,
                    hidden: false,
                    title: "TN"
                },
                {
                    field: "W_PH",
                    headerAttributes: {
                        style: "text-align: center; vertical-align:middle;"
                    },
                    attributes: { style: "text-align:right;" },
                    width: 50,
                    hidden: false,
                    title: "PH值"
                },
                {
                    field: "S_EXTNO",
                    headerAttributes: {
                        style: "text-align: center; vertical-align:middle;"
                    },
                    attributes: { style: "text-align:center;" },
                    width: 40,
                    hidden: false,
                    title: "详细"
                },
                {
                    field: "eventDate",
                    headerAttributes: {
                        style: "text-align: center; vertical-align:middle;"
                    },
                    attributes: { style: "text-align:center;" },
                    width: 40,
                    hidden: false,
                    title: "状态"
                },
                {
                    field: "S_EXTNO",
                    headerAttributes: {
                        style: "text-align: center; vertical-align:middle;"
                    },
                    hidden: true
                }
            ],
            dataSource: {
                pageSize: 5,
                data: []
            },
            dataBound: function() {
                var rows = this.items();
                $(rows).each(function(i, tr) {
                    //名称
                    var name = $(this).find("td:eq(2)");
                    var s_name = $(name).text();
                    if ($(name).text() != "") {
                        var html = '<a href="javascript:void(0)" onclick="AppBus({show: true,type:\'Search\',name: \'' + s_name + '\'})">' + s_name + "</a>";
                        $(name).addClass("bottom_name_img");
                        $(name).html(html);
                    }

                    //曲线图 2017-12-14 gjm
                    var chart = $(this).find("td:eq(9)");
                    $(chart).css({ padding: "0px 0px 0px 0px", "line-height": "inherit" });
                    $(chart).html('<img  class="icon-chart" onclick="AppBus({show: true,type:\'ChartsPanel\',assets: {assetId: \'' + $(this).find("td:eq(0)").text() + '\', S_EXTNO: \'' + $(this).find("td:eq(13)").text() + '\', assetName: \'' + s_name + '\'} })" src="../../static/images/home/icon_quxiantu.png" style="height:16px;width:20px;cursor: pointer;"/>');


                    //状态
                    var tr_S = $(this).find("td:eq(10)");
                    if ($(tr_S).text() != "") {
                        var pngstr = IconList[parseInt($(tr_S).text())].icon;
                        $(tr_S).css({ padding: "0px 0px 0px 0px", "line-height": "inherit" });
                        $(tr_S).html("<img src='" + pngstr + "' style='height:26px;'/>");
                    }
                });
            },
            height: 226,
            selectable: "multiple,row",
            allowCopy: true,
            scrollable: true,
            sortable: false,
            pageable: {
                pageSizes: true,
                refresh: false
            }
        }
    }
}