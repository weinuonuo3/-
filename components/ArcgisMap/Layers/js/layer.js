import sitewhere from "@/components/SiteWhere/js/index.js";

export default {
    /**
     * 使用坐标点添加图层
     * @param {Map} myMap 地图对象
     * @param {Array} list 坐标点数据集合
     * @param {*} model 数据模型
     * @param {string} LayerID 添加图层ID
     */
    SetLayer(myMap, list, model, LayerID) {
        var _s = this;
        list = _s.GetRowList(list);
        var graphicLayer = myMap.getLayer(LayerID);
        if (graphicLayer == 'undefined' || graphicLayer == null) {
            graphicLayer = new esri.layers.GraphicsLayer({ id: LayerID });
            myMap.addLayer(graphicLayer);
        } else {
            graphicLayer.clear();
        }
        if (myMap.infoWindow.isShowing) {
            //myMap.infoWindow.hide();
        }
        for (var i = 0; i < list.length; i++) {
            this.addMarkerOnMap(myMap, list[i], model, graphicLayer);
        }
    },
    /**
     * 在地图上添加点
     * @param {Map} myMap 地图对象
     * @param {Array} data 坐标点数据
     * @param {*} model 数据模型
     * @param {esri.layers.GraphicsLayer} graphicLayer 地图图层
     */
    addMarkerOnMap(myMap, data, model, graphicLayer) {
        var x = Number(data[model.x]);
        var y = Number(data[model.y]);
        var point = new esri.geometry.Point(x, y, myMap.spatialReference);
        var symbol = model.getMarkerImage(data);

        symbol.setColor(new esri.Color([204, 204, 53, 0]));
        var attr = model.getAttr(data);

        var infoTemplate = new esri.InfoTemplate(
            model.infoTemplate_title(),
            model.infoTemplate_content()
        );
        //创建图像
        var graphic = new esri.Graphic(point, symbol, attr, infoTemplate);
        //把图像添加到刚才创建的图层上
        graphicLayer.add(graphic);
    },
    /**
     * 在地图上定位点  2017-11-13 gjm
     * @param {Map} myMap 地图对象
     * @param {staionID} model 数据模型
     * @param {esri.layers.GraphicsLayer} graphicLayer 地图图层
     */
    locationMarkerOnMap(myMap, stationName, layerID) {
        var graphicLayer = myMap.getLayer(layerID);
        var graphics = graphicLayer.graphics;
        var params = {};
        var b = false;
        for (var i = 0; i < graphics.length; i++) {
            if (stationName == graphics[i].attributes.name) {
                params.attributes = graphics[i].attributes;
                params.title = graphics[i].attributes.name;
                params.X = graphics[i].geometry.x;
                params.Y = graphics[i].geometry.y;
                params.extent = graphics[i]._extent;
                params.infoTemplate = graphics[i].infoTemplate;
                b = true;
                break;
            }
        }
        if (b) {
            var html = params.infoTemplate.content;
            var title = params.infoTemplate.title;
            title = title.replace("\$\{name\}", params.attributes["name"]);
            for (var k in params.attributes) {
                var key = "\\$\\{" + k + "\\}";
                html = html.replace(new RegExp(key, 'g'), params.attributes[k]);
            }
            myMap.infoWindow.setContent(html);
            myMap.infoWindow.setTitle(title);

            var maxzoom = myMap.getMaxZoom();
            var point = new esri.geometry.Point(params.X, params.Y, new esri.SpatialReference(myMap.spatialReference));
            var screenpoint = myMap.toScreen(point);

            myMap.centerAndZoom(point, maxzoom);
            myMap.infoWindow.show(point, myMap.getInfoWindowAnchor(screenpoint));
        }
    },
    BindData: function(data, token, myMap, LayerName, model, AssetsID, v_S) {
        var _s = this;
        var list = [];
        var LayerID = "";
        if (data.groupToken == token) {
            var site =
                sitewhere.DevicesGroupData[data.groupToken].list[data.siteToken];
            var TabPage = sitewhere.DevicesGroupData[data.groupToken].TabPage;
            LayerID = LayerName + data.siteToken;
            //区县
            if (!site.deleted) {
                LayerID = LayerName + data.siteToken;
                _s.GetRow(TabPage, site.list, list, v_S);
            }
        }
        if (list.length > 0) {
            _s.SetLayer(myMap, list, model, LayerID);
            if ($.inArray(LayerID, AssetsID) < 0) {
                AssetsID.push(LayerID);
            }
        }
    },
    EditData: function(data, myMap, LayerName, model, AssetsID, v_S) {
        var _s = this;
        var list = [];
        var LayerID = "";
        $.each(AssetsID, function(i, id) {
            _s.ClearLayers(myMap, id);
        });
        AssetsID = [];
        if (!data.deleted) {
            //监测项
            $.each(data.list, function(i, site) {
                //区县
                if (!site.deleted) {
                    LayerID = LayerName + site.siteToken;
                    _s.GetRow(data.TabPage, site.list, list, v_S);
                }
            });
        }
        if (list.length > 0) {
            _s.SetLayer(myMap, list, model, LayerID);
            if ($.inArray(LayerID, AssetsID) < 0) {
                AssetsID.push(LayerID);
            }
        }
        return AssetsID;
    },
    GetRow: function(TabPage, site, list, v_S) {
        for (var assetId in site) {
            var row = {};
            //判断
            var del = false;
            //单个泵站的数据
            var assets = site[assetId];
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
                                row[t] = assignment[s][t];
                            }
                        }
                    }
                } else if (k == "eventDate") {
                    if (row[k] == "") {
                        row[k] = assets[k];
                    } else {
                        if (getMinute(assets[k], row[k]) > 0) {
                            row[k] = assets[k];
                        }
                    }
                } else {
                    row[k] = assets[k];
                }
            }
            if (del) {
                var eventDate = formatDate(row["eventDate"], "yyyy/MM/dd hh:mm:ss", 0);
                if (getMinute(new Date(), eventDate) > 60) {
                    row[v_S] = 2;
                }
                row["TabPage"] = TabPage;
                list.push(row);
            }
        }
    },
    GetRowList: function(list) {
        var arr = ['assetId', 'assetName', 'eventDate', 'longitude', 'latitude', 'S_EXTNO', 'BZ_ON', 'BZ_S', 'G_ON', 'F_YF', 'F_M', 'L1', 'L2', 'L3', 'L4', 'L5', 'SI_T', 'SI_H', 'SI_V', 'SI_SR', 'SI_1PR', 'SI_2PR', 'SI_AR', 'SI_VE', 'SI_3PR', 'SI_E', 'SI_GR', 'SI_SET', 'SI_A', 'SI_P', 'SI_R'];
        $.each(arr, function(i, k) {
            $.each(list, function(j, row) {
                if (row[k] == undefined) {
                    row[k] = "";
                } else {
                    if (row[k].toString() != "") {
                        if (k == "eventDate") {
                            row[k] = formatDate(row[k], "yyyy-MM-dd hh:mm", 0);
                        } else if (k == "F_YF") {
                            var s = (parseFloat(row[k]) / 10000).toString();
                            var str = s.substring(0, s.indexOf(".") + 2) + "万";
                            row[k] = str;
                        } else if (k == "L1" || k == "L2" || k == "L3" || k == "L4" || k == "L5") {
                            var s = row[k].toString();
                            var str = s.substring(0, s.indexOf(".") + 3);
                            row[k] = str;
                        }
                    }
                }
            })
        })
        return list;
    },
    ClearLayers: function(myMap, LayerID) {
        var graphicLayer = myMap.getLayer(LayerID);
        if (graphicLayer != "undefined" && graphicLayer != null) {
            graphicLayer.clear();
        }
    },
    GetModel: function(ImgList, ImgS) {
        var model = {
            x: "longitude",
            y: "latitude",
            name: "assetName",
            icon_ON: "BZ_S",
            icon_size: [14, 16],
            infoTemplate_title: function() {
                return "<div></div>${name}";
            },
            infoTemplate_content: function() {
                return "";
            },
            getMarkerImage(data) {
                var pngstr = ImgList[2];
                switch (data[this.icon_ON]) {
                    case 0:
                        pngstr = ImgList[0];
                        break;
                    case 1:
                        pngstr = ImgList[1];
                        break;
                    case 2:
                        pngstr = ImgList[2];
                        break;
                    case 3:
                        pngstr = ImgList[3];
                        break;
                }
                var symbol = new esri.symbol.PictureMarkerSymbol(pngstr, this.icon_size[0], this.icon_size[1]);
                return symbol;
            },
            getAttr(data) {
                var p_on = "";
                if (data["BZ_ON"] != undefined && data["BZ_ON"] != "") {
                    var list = data["BZ_ON"].toString().split(",");
                    $.each(list, function(i, v) {
                        p_on += "<img src='" + ImgS[v] + "'/>";
                    });
                }
                var attr = {
                    name: data[this.name],
                    x: data[this.x],
                    y: data[this.y],
                    time: data["eventDate"],
                    BZ_ON: p_on,
                    BZ_R: data["BZ_R"],
                    G_ON: data["G_ON"],
                    F_YF: data["F_YF"],
                    F_M: data["F_M"],
                    L1: data["L1"],
                    L2: data["L2"],
                    L3: data["L3"],
                    L4: data["L4"],
                    L5: data["L5"],
                    L_SW: data["L_4"],
                    SI_T: data["SI_T"],
                    SI_H: data["SI_H"],
                    SI_V: data["SI_V"],
                    windowSBXX: "{show: true,type:'window',component: 'SBXXwindow', data: { assetId: '" + data["S_EXTNO"] + "', title: '" + data[this.name] + "', TabPage: '" + data["TabPage"] + "'}}",
                    windowSBXX_WSC: "{show: true,type:'window',component: 'SBXXwindow_WSC', data: { assetId: '" + data["S_EXTNO"] + "', title: '" + data[this.name] + "', TabPage: '" + data["TabPage"] + "'}}",
                    windowSZXX: "{show: true,type:'window',component: 'SZXXwindow', data: { assetId: '" + data["S_EXTNO"] + "', title: '" + data[this.name] + "', TabPage: '" + data["TabPage"] + "'}}",
                    windowCYQ: "{show: true,type:'window',component: 'CYQwindow', data: { SI_V: '" + data["SI_V"] + "', title: '" + data[this.name] + "', SI_SR: '" + data["SI_SR"] + "', SI_1PR: '" + data["SI_1PR"] + "', SI_2PR: '" + data["SI_2PR"] + "', SI_1PE: '" + data["SI_1PE"] + "', SI_2PE: '" + data["SI_2PE"] + "', SI_E: '" + data["SI_E"] + "', SI_AR: '" + data["SI_AR"] + "', SI_VE: '" + data["SI_VE"] + "', SI_3PR: '" + data["SI_3PR"] + "', SI_GR: '" + data["SI_GR"] + "', SI_SET: '" + data["SI_SET"] + "', SI_A: '" + data["SI_A"] + "', SI_P: '" + data["SI_P"] + "', SI_R: '" + data["SI_R"] + "'}}",
                    windowFactI: "{show: true,type:'window',component: 'FactInfowindow', data: { assetId: '" + data["S_EXTNO"] + "', title: '" + data[this.name] + "', TabPage: '" + data["TabPage"] + "'}}",
                    windowFactD: "{show: true,type:'window',component: 'FactDeviceswindow', data: { assetId: '" + data["S_EXTNO"] + "', title: '" + data[this.name] + "', TabPage: '" + data["TabPage"] + "'}}"
                };
                return attr;
            }
        };
        return model;
    }
}