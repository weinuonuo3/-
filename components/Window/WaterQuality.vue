<template>
  <div class="waterQuality-div">
    <table>
      <tr>
        <td class='td-left'>采样时间</td>
        <td>{{WaterQualityData.T_TIME}}</td>
      </tr>
      <tr>
        <td class='td-left'>PH值</td>
        <td>{{WaterQualityData.PH}}</td>
      </tr>
      <tr>
        <td class='td-left'>SS(mg/L)</td>
        <td>{{WaterQualityData.SS}}</td>
      </tr>
      <tr>
        <td class='td-left'>TP(mg/L)</td>
        <td>{{WaterQualityData.TP}}</td>
      </tr>
      <tr>
        <td class='td-left'>CODCr(mg/L)</td>
        <td>{{WaterQualityData.COD}}</td>
      </tr>
      <tr>
        <td class='td-left'>NH3-N(mg/L)</td>
        <td>{{WaterQualityData.NH3}}</td>
      </tr>
      <tr>
        <td class='td-left'>LAS(mg/L)</td>
        <td>{{WaterQualityData.LAS}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import bus from "@/assets/js/eventBus.js";

export default {
  props: ["datalist"],
  data() {
    return {
      WaterQualityData: {
        T_TIME: "",
        PH: "",
        SS: "",
        TP: "",
        COD: "",
        NH3: "",
        LAS: ""
      }
    };
  },
  watch: {
    datalist: function(list) {
      var _self = this;
      if (list.data != undefined) {
        var _url =
          "/SZH_CXFX/App_Public/Pages/PumpFunction/SZH_SZYL_Details_Ajax.aspx?flag=SZYL&id=" +
          list.data.assetId;
        $.ajax({
          type: "GET",
          dataType: "json",
          url: _url,
          success: function(data) {
            if (data.length > 0) {
              _self.WaterQualityData.T_TIME = data[0].T_TIME;
              for (var k in _self.WaterQualityData) {
                if (k != "T_TIME" && k != "LAS") {
                  var ph = 0;
                  var ph_N = 0;
                  for (var s in data[0]) {
                    if (s.indexOf(k) > 0) {
                      if (data[0][s] != "") {
                        ph += parseFloat(data[0][s]);
                        ph_N++;
                      }
                    }
                  }
                  ph = ph / ph_N;
                  var ph = ph
                    .toString()
                    .substring(0, ph.toString().indexOf(".") + 3);
                  _self.WaterQualityData[k] = ph;
                }
              }
            }
          },
          error: function(err) {}
        });
      }
    }
  },
  methods: {},
  mounted: function() {}
};
</script>

<style>

</style>