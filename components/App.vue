<template>
  <div id="app">
    <div id="app_con">
      <div id="con_Left">
        <deviceGroups></deviceGroups>
      </div>
      <div id="con_Right">
        <div id="arcgisMapTop">
          <div class="map_bottom">
            <arcgisMap></arcgisMap>
          </div>
          <div class="map_top">
            <suspend></suspend>
          </div>
          <div class="left-btn-div">
            <img id="left_control_btn" src="../../static/images/home/btn_shous_left_normal.png" state="1"></img>
          </div>
          <div class="bottom-btn-div">
            <img id="bottom_control_btn" src="../../static/images/home/btn_shous_down.png" state="1"></img>
          </div>
        </div>
        <div id="con_Bottom">
          <div class="con_Bottom_div">
            <div class="con_Bottom_one">
              <chartspanel></chartspanel>
            </div>
            <div class="con_Bottom_two">
              <tabStrip></tabStrip>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="window">
      <div id="windowSBXX">
        <SBXXwindow v-bind:datalist="windowSBXX"></SBXXwindow>
      </div>
      <div id="windowSBXX_WSC">
        <SBXXwindowWSC v-bind:datalist="windowSBXX_WSC"></SBXXwindowWSC>
      </div>
      <div id="windowSZXX">
        <SZXXwindow v-bind:datalist="windowSZXX"></SZXXwindow>
      </div>
      <div id="windowCYQ">
        <CYQwindow v-bind:datalist="windowCYQ"></CYQwindow>
      </div>
      <div id="windowFactInfo">
        <Factwindow v-bind:datalist="windowFactInfo"></Factwindow>
      </div>
      <div id="windowFactDevices">
        <FactDeviceswindow v-bind:datalist="windowFactDevices"></FactDeviceswindow>
      </div>
    </div>
    <div id="window_bg"></div>
    <div id="img_click_div">
      <img class="img_src"></img>
      <div class="img_close"></div>
    </div>
  </div>
</template>

<script>
import deviceGroups from "./SiteWhere/DeviceGroups.vue";
import arcgisMap from "./ArcgisMap/Map.vue";
import tabStrip from "./TabStrip.vue";
import suspend from "./Suspend.vue";
import chartspanel from "./ChartsPanel.vue";
import SBXXwindow from "./Window/DeviceInfo.vue";
import SBXXwindowWSC from "./Window/FactInfo.vue";
import SZXXwindow from "./Window/WaterQuality.vue";
import CYQwindow from "./Window/Sampler.vue";
import Factwindow from "./Window/FactWater/FactWaterInfo.vue";
import FactDeviceswindow from "./Window/FactWater/Devices.vue";
import bus from "@/assets/js/eventBus.js";

export default {
  components: {
    deviceGroups,
    arcgisMap,
    tabStrip,
    suspend,
    chartspanel,
    SBXXwindow,
    SBXXwindowWSC,
    SZXXwindow,
    CYQwindow,
    Factwindow,
    FactDeviceswindow
  },
  data() {
    return {
      windowSBXX: {},
      windowSBXX_WSC: {},
      windowSZXX: {},
      windowCYQ: {},
      windowFactInfo: {},
      windowFactDevices: {}
    };
  },
  methods: {
    createSplitter: function() {
      $("#app_con").kendoSplitter({
        panes: [
          { collapsible: true, size: "227px", resizable: false },
          { collapsible: false }
        ]
      });
      $("#con_Right").kendoSplitter({
        orientation: "vertical",
        panes: [
          { collapsible: false },
          { collapsible: true, size: "263px", resizable: false }
        ]
      });
      //缩进打开箭头事件
      $("#left_control_btn").on("click", function() {
        var state = $(this).attr("state");
        if (state == "1") {
          $(".k-collapse-prev").click();
          $(this).attr("state", "0");
          $(this).attr(
            "src",
            "../../static/images/home/btn_shous_right_normal.png"
          );
        } else {
          $(".k-expand-prev").click();
          $(this).attr("state", "1");
          $(this).attr(
            "src",
            "../../static/images/home/btn_shous_left_normal.png"
          );
        }
      });
      $("#bottom_control_btn").on("click", function() {
        var state = $(this).attr("state");
        if (state == "1") {
          $(".k-collapse-next").click();
          $(this).attr("state", "0");
          $(this).attr("src", "../../static/images/home/btn_shous_up.png");
        } else {
          $(".k-expand-next").click();
          $(this).attr("state", "1");
          $(this).attr("src", "../../static/images/home/btn_shous_down.png");
        }
      });
    },
    Init: function() {
      var _self = this;
      var _h = $(window).height();
      if (_h > 525) {
        _h = (_h - 525) / 2 - 30;
      }
      _self.SetWindowSBXX();
      _self.SetWindowSBXX_WSC();
      _self.SetWindowSZXX();
      _self.SetWindowCYQ();
      _self.SetWindowFactInfo();
      _self.SetWindowFactDevices();

      bus.$on("AssetsListRefresh", function(d) {
        $("#windowSBXX")
          .data("kendoWindow")
          .close();
        $("#windowSBXX_WSC")
          .data("kendoWindow")
          .close();
        $("#windowSZXX")
          .data("kendoWindow")
          .close();
        $("#windowCYQ")
          .data("kendoWindow")
          .close();
        $("#windowFactInfo")
          .data("kendoWindow")
          .close();
        $("#windowFactDevices")
          .data("kendoWindow")
          .close();
      });

      bus.$on("WindowShow", function(obj) {
        $("#window_bg").show();
        $("#windowSBXX")
          .data("kendoWindow")
          .close();
        $("#windowSBXX_WSC")
          .data("kendoWindow")
          .close();
        $("#windowSZXX")
          .data("kendoWindow")
          .close();
        $("#windowCYQ")
          .data("kendoWindow")
          .close();
        $("#windowFactInfo")
          .data("kendoWindow")
          .close();
        $("#windowFactDevices")
          .data("kendoWindow")
          .close();

        switch (obj.component) {
          case "SBXXwindow":
            _self.windowSBXX = obj.data;
            _self.$nextTick(function() {
              $("#windowSBXX")
                .data("kendoWindow")
                .title("<div></div>" + obj.data.title + "&nbsp;—&nbsp;设备信息");
              $("#windowSBXX")
                .data("kendoWindow")
                .open();
            });
            break;
          case "SBXXwindow_WSC":
            _self.windowSBXX_WSC = obj.data;
            _self.$nextTick(function() {
              $("#windowSBXX_WSC")
                .data("kendoWindow")
                .title("<div></div>" + obj.data.title + "&nbsp;—&nbsp;设备信息");
              $("#windowSBXX_WSC")
                .data("kendoWindow")
                .open();
            });
            break;
          case "SZXXwindow":
            _self.windowSZXX = obj;
            $("#windowSZXX")
              .data("kendoWindow")
              .title("<div></div>" + obj.data.title + "&nbsp;—&nbsp;水质信息");
            $("#windowSZXX")
              .data("kendoWindow")
              .open();
            break;
          case "CYQwindow":
            _self.windowCYQ = obj;
            $("#windowCYQ")
              .data("kendoWindow")
              .title("<div></div>" + obj.data.title + "&nbsp;—&nbsp;采样器");
            $("#windowCYQ")
              .data("kendoWindow")
              .open();
            break;
          case "FactInfowindow":
            _self.windowFactInfo = obj;
            $("#windowFactInfo")
              .data("kendoWindow")
              .title("<div></div>" + obj.data.title);
            $("#windowFactInfo")
              .data("kendoWindow")
              .open();
            break;
          case "FactDeviceswindow":
            _self.windowFactDevices = obj;
            $("#windowFactDevices")
              .data("kendoWindow")
              .title("<div></div>" + obj.data.title);
            $("#windowFactDevices")
              .data("kendoWindow")
              .open();
            break;
        }
        $(".k-window").css({ top: _h + "px" });
      });
      $("#img_click_div .img_close").click(function() {
        $("#img_click_div").hide();
      });
    },
    SetWindowSBXX: function() {
      $("#windowSBXX")
        .kendoWindow({
          title: "",
          visible: false,
          actions: ["Close"],
          close: function() {
            $("#window_bg").hide();
          }
        })
        .data("kendoWindow")
        .center();
      $("#windowSBXX .k-widget").css("width", "auto");
      $("#windowSBXX .k-tabstrip-wrapper").css("padding", "0");
    },
    SetWindowSBXX_WSC: function() {
      $("#windowSBXX_WSC")
        .kendoWindow({
          title: "",
          visible: false,
          actions: ["Close"],
          close: function() {
            $("#window_bg").hide();
          }
        })
        .data("kendoWindow")
        .center();
      $("#windowSBXX_WSC .k-widget").css("width", "auto");
      $("#windowSBXX_WSC .k-tabstrip-wrapper").css("padding", "0");
    },
    SetWindowSZXX: function() {
      $("#windowSZXX")
        .kendoWindow({
          title: "",
          visible: false,
          actions: ["Close"],
          close: function() {
            $("#window_bg").hide();
          }
        })
        .data("kendoWindow")
        .center();
      $("#windowSZXX .k-widget").css("width", "auto");
      $("#windowSZXX .k-tabstrip-wrapper").css("padding", "0");
    },
    SetWindowCYQ: function() {
      $("#windowCYQ")
        .kendoWindow({
          title: "",
          visible: false,
          actions: ["Close"],
          close: function() {
            $("#window_bg").hide();
          }
        })
        .data("kendoWindow")
        .center();
      $("#windowCYQ .k-widget").css("width", "auto");
      $("#windowCYQ .k-tabstrip-wrapper").css("padding", "0");
    },
    SetWindowFactInfo: function() {
      $("#windowFactInfo")
        .kendoWindow({
          title: "",
          visible: false,
          actions: ["Close"],
          close: function() {
            $("#window_bg").hide();
          }
        })
        .data("kendoWindow")
        .center();
      $("#windowFactInfo .k-widget").css("width", "auto");
      $("#windowFactInfo .k-tabstrip-wrapper").css("padding", "0");
    },
    SetWindowFactDevices: function() {
      $("#windowFactDevices")
        .kendoWindow({
          title: "",
          visible: false,
          actions: ["Close"],
          close: function() {
            $("#window_bg").hide();
          }
        })
        .data("kendoWindow")
        .center();
      $("#windowFactDevices .k-widget").css("width", "auto");
      $("#windowFactDevices .k-tabstrip-wrapper").css("padding", "0");
    }
  },
  mounted: function() {
    this.Init();
    this.createSplitter();
  }
};
</script>

<style>

</style>