<template>
  <div class="overall">
    <div id="map">
      <div id="mapTiled"></div>
      <!-- <div id="mapDynamic"></div> -->
    </div>
    <div id="overviewDiv"></div>
    <div id="legend">
      <div id="layerList"></div>
    </div>
    <div v-for="item in JcxItems">
      <component v-bind:is="item.metadata.TabPage" v-bind:token="item.token" v-bind:map='myMap'></component>
    </div>
  </div>
</template>

<script>
import BZYX from "./Layers/BZYXLayer.vue";
import BZFJ from "./Layers/BZFJLayer.vue";
import PFKFJ from "./Layers/PFKFJLayer.vue";
import WSCCYG from "./Layers/WSCCYGLayer.vue";
import WSCJCK from "./Layers/WSCJCKLayer.vue";
import esriLoader from "esri-loader";
import sitewhere from "@/components/SiteWhere/js/index";
import bus from "@/assets/js/eventBus.js";

export default {
  components: { BZYX, BZFJ, PFKFJ, WSCCYG, WSCJCK },
  data() {
    return {
      JcxItems: [{ name: "", metadata: { TabPage: "" }, token: "" }],
      myMap: {}
    };
  },
  methods: {
    Init() {
      var _self = this;
      var map = {};
      var usaLayer = {};
      var layerTreeData = [];
      //获取地图配置文件
      var mapConfig = require("../../../static/ArcgisMap/Config/SJZSSJC/psss.json");
      var viewerSetting = require("../../../static/ArcgisMap/Config/SJZSSJC/Viewer.json");

      //地图范围
      var startExtent = new esri.geometry.Extent(mapConfig.map.initialExtent);
      map = new esri.Map("mapTiled", {
        logo: false,
        //maxZoom: 5,
        extent: startExtent
      });
      _self.myMap = map;

      var mapJson = mapConfig.map.mapServices;
      var overlayers = [];
      var baseLayerData = [];

      $.each(mapJson, function(index, mapServices, array) {
        if (mapServices.includeInLayerList) {
          var mapUrl = mapServices.connectionString.replace("url=", "");
          switch (mapServices.serviceType) {
            case "Dynamic":
              var graphicsLayerOptions = {
                id: mapServices.id,
                opacity: mapServices.opacity,
                showAttribution: false
              };

              usaLayer = new esri.layers.ArcGISDynamicMapServiceLayer(
                mapUrl,
                graphicsLayerOptions
              );

              overlayers.push(usaLayer); //map.addLayer(usaLayer);

              // 2017-12-01 gjm 图层添加数据
              layerTreeData.push({
                id: mapServices.id,
                text: mapServices.displayName,
                expanded: true,
                checked: mapServices.visible ? "checked" : "",
                spriteCssClass: mapServices.id,
                items: [],
                basemap: false,
                mapid: mapServices.id
              });

              var itemarray = [];
              for (var i = 0; i < mapServices.layers.length; i++) {
                var layers = mapServices.layers[i];
                if (layers.includeInLayerList) {
                  if (layers.parentLayerId == null) {
                    itemarray.push({
                      id: layers.id,
                      text: layers.name,
                      expanded: true,
                      checked: layers.visible ? "checked" : "",
                      spriteCssClass: layers.id,
                      items: [],
                      basemap: false,
                      mapid: layerTreeData[layerTreeData.length - 1].mapid
                    });
                  } else {
                    SubLayers(itemarray, layers);
                  }
                }
              }
              layerTreeData[layerTreeData.length - 1].items = itemarray;

              break;
            case "Tiled":
              var tiledMapServiceLayer = new esri.layers
                .ArcGISTiledMapServiceLayer(mapUrl, {
                visible: mapServices.visible,
                id: mapServices.id
              });
              // 添加地图服务地址
              map.addLayer(tiledMapServiceLayer);
              baseLayerData.push({
                id: mapServices.id,
                text: mapServices.displayName,
                expanded: true,
                checked: mapServices.visible ? "checked" : "",
                spriteCssClass: mapServices.id,
                items: [],
                basemap: true,
                mapid: mapServices.id
              });

              //map.addLayer(usaLayer);
              break;
          }
        }
      });
      dojo.connect(map, "onLoad", function(theMap) {
        //添加鹰眼图
        var globals = viewerSetting.Globals;
        if (globals.OverviewMapShow == true) {
          var overviewMapDijit = new esri.dijit.OverviewMap({
            map: map,
            visible: globals.OverviewMapOpenByDefault,
            attachTo: globals.OverviewMapAttachTo
          });
          overviewMapDijit.startup();
        }
        //添加比例尺
        if (globals.ScaleBarShow == true) {
          var scalebar = new esri.dijit.Scalebar({
            map: map,
            attachTo: globals.ScaleBarAttachTo,
            scalebarUnit: "english"
          });
        }
        map.enableRubberBandZoom();
        map.setZoom(2);
        //添加动态图层
        _self.JcxItems = sitewhere.GetJCXList();
        bus.$on("JCXRefresh", function(data) {
          _self.JcxItems = data;
        });

        bus.$on("ChartsPanelHide", function(data) {
          map.infoWindow.hide();
        });
      });
      // 2017-12-01 gjm
      for (var i = 0; i < overlayers.length; i++) {
        map.addLayer(overlayers[i]);
      }

      var basemapindex = layerTreeData.length;
      layerTreeData.push({
        id: -1,
        text: "基础底图",
        expanded: true,
        checked: true,
        spriteCssClass: -1,
        items: baseLayerData,
        basemap: true,
        mapid: "-1"
      });
      sitewhere.LayersItem = layerTreeData;
      bus.$emit("layerRefresh", layerTreeData);

      // 2017-12-01 gjm
      bus.$on("chagenlayervisible", function(data) {
        if (data[0].basemap) {
          for (var i = 0; i < data.length; i++) {
            map.getLayer(data[i].mapid).setVisibility(data[i].visible);
          }
        } else {
          var changeLayer = map.getLayer(data[0].mapid);
          if (data[0].visiblelayer.length == 0) {
            changeLayer.setVisibleLayers([-1]);
          }
          changeLayer.setVisibleLayers(data[0].visiblelayer);
        }
      });

      function SubLayers(list, layers) {
        $.each(list, function(i, item) {
          if (item.id == layers.parentLayerId) {
            var checked = layers.visible == "true" ? true : false;
            list[i].items.push({
              id: layers.id,
              text: layers.name,
              expanded: true,
              checked: layers.defaultVisibility,
              spriteCssClass: layers.id,
              items: []
            });
            return;
          } else {
            if (item.items.length > 0) {
              SubLayers(item.items, layers);
            }
          }
        });
      }
    }
  },
  mounted: function() {
    var _self = this;
    dojo.addOnLoad(function() {
      _self.Init();
    });
  }
};
</script>

<style>

</style>