<template>
  <div id="layercontrol" class="layercontrol-div">

  </div>
</template>

<script>
import sitewhere from "@/components/SiteWhere/js/index.js";
import bus from "@/assets/js/eventBus.js";

export default {
  data() {
    return {
      layerTreeData: []
    };
  },
  methods: {
    onCheck: function(e) {
      var node = e.node;
      var checkbox = $("#" + node.id).find("input");
      var mapid = checkbox.attr("name");
      var basemap = checkbox.attr("basemap");
      var data = $("#layercontrol").data("kendoTreeView").dataSource._data;
      if (basemap == "true") {
        var visible = $("#" + node.id)
          .find("input")
          .is(":checked");
        var dataArray = [];
        if (mapid != -1) {
          dataArray = [{ mapid: mapid, basemap: true, visible: visible }];
        } else {
          var baselayerdata = data[data.length - 1].items;
          for (var j = 0; j < baselayerdata.length; j++) {
            dataArray.push({
              mapid: baselayerdata[j].mapid,
              basemap: true,
              visible: visible
            });
          }
        }
        bus.$emit("chagenlayervisible", dataArray);
      } else {
        for (var i = 0; i < data.length; i++) {
          if (mapid == data[i].id) {
            var visiblelayer = getVisibleLayerID(data[i].items);
            var dataArray = [
              { mapid: mapid, visiblelayer: visiblelayer, basemap: false }
            ];
            console.log(dataArray);
            bus.$emit("chagenlayervisible", dataArray);
          }
        }
      }

      function getVisibleLayerID(data) {
        var visible = [];
        for (var i = 0; i < data.length; i++) {
          var checked = data[i].checked;
          if (checked) {
            visible.push(data[i].id);
          }
          if (data[i].items.length > 0) {
            getVisibleLayerID(data[i].items);
          }
        }
        return visible;
      }
    },
    EditData: function(data) {
      var _self = this;
      _self.layerTreeData = data;
      $("#layercontrol")
        .data("kendoTreeView")
        .dataSource.data(_self.layerTreeData);
    }
  },
  mounted: function() {
    var _self = this;
    $("#layercontrol").kendoTreeView({
      checkboxes: {
        template:
          "<input type='checkbox' name='#= item.mapid #' basemap='#= item.basemap #' #= item.checked #/>",
        checkChildren: true
      },
      check: _self.onCheck,
      dataSource: _self.layerTreeData
    });
    _self.EditData(sitewhere.LayersItem);
    bus.$on("layerRefresh", function(data) {
      _self.EditData(data);
    });
  }
};
</script>

<style>

</style>