<template>
  <div id="statistics">
    <div class="left_bzjc">
      <div class="bzjc_title">泵站监测（个）：
        <span>{{BzData.sum}}</span>
      </div>
      <div class="left_tj">
        <div class="tj_list">
          <div class="tj_list_icon" style="background: url(../../static/images/home/img_kaib.png) no-repeat center;">
          </div>
          <div class="tj_list_val">
            开泵：{{BzData.open}}
          </div>
        </div>
        <div class="tj_list">
          <div class="tj_list_icon" style="background: url(../../static/images/home/img_tingb.png) no-repeat center;">
          </div>
          <div class="tj_list_val">
            停泵：{{BzData.close}}
          </div>
        </div>
        <div class="tj_list">
          <div class="tj_list_icon" style="background: url(../../static/images/home/img_diaox.png) no-repeat center;">
          </div>
          <div class="tj_list_val">
            掉线：{{BzData.dropped}}
          </div>
        </div>
      </div>
    </div>
    <div class="left_bzjc left_lljc">
      <div class="bzjc_title">放江监测（个）：
        <span>{{FjData.sum}}</span>
      </div>
      <div class="left_tj">
        <div class="tj_list">
          <div class="tj_list_icon" style="background: url(../../static/images/home/img_youll.png) no-repeat center;">
          </div>
          <div class="tj_list_val">
            有流量：{{FjData.open}}
          </div>
        </div>
        <div class="tj_list">
          <div class="tj_list_icon" style="background: url(../../static/images/home/img_wull.png) no-repeat center;">
          </div>
          <div class="tj_list_val">
            无流量：{{FjData.close}}
          </div>
        </div>
        <div class="tj_list">
          <div class="tj_list_icon" style="background: url(../../static/images/home/img_diaoxs.png) no-repeat center;">
          </div>
          <div class="tj_list_val">
            掉线：{{FjData.dropped}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sitewhere from "@/components/SiteWhere/js/index.js";
import bus from "@/assets/js/eventBus.js";

export default {
  data() {
    return {
      BzData: {
        sum: 0,
        open: 0,
        close: 0,
        dropped: 0
      },
      FjData: {
        sum: 0,
        open: 0,
        close: 0,
        dropped: 0
      }
    };
  },
  methods: {
    EditData: function(data) {
      var _self = this;
      var bzopen = 0;
      var bzclose = 0;
      var bzdropped = 0;

      var fjopen = 0;
      var fjclose = 0;
      var fjdropped = 0;

      for (var k in data) {
        //监测项
        $.each(data[k].list, function(i, site) {
          //区县
          for (var assetId in site.list) {
            if (site.list[assetId].assetType.indexOf("P") > -1) {
              bzdropped++;
            }
            if (site.list[assetId].assetType.indexOf("F") > -1) {
              fjdropped++;
            }
            //测量数据
            var assignment = site.list[assetId].assignment;
            //数据来源
            var n = 0;
            for (var s in assignment) {
              n++;
              var v = assignment[s];
              addNum(v);
            }
            //如果没有测量数据
            if (n == 0) {
              addNum(site.list[assetId]);
            }
          }
        });
      }

      function addNum(v) {
        if (getMinute(new Date(), v.eventDate) < 60) {
          if (v.BZ_S != undefined) {
            switch (v.BZ_S.toString()) {
              case "0":
                bzdropped--;
                bzclose++;
                break;
              case "1":
                bzdropped--;
                bzopen++;
                break;
            }
          }
          if (v.F_S != undefined) {
            switch (v.F_S.toString()) {
              case "0":
                fjclose++;
                fjdropped--;
                break;
              case "1":
                fjopen++;
                fjdropped--;
                break;
            }
          }
        }
      }

      _self.BzData.sum = bzopen + bzclose + bzdropped;
      _self.BzData.open = bzopen;
      _self.BzData.close = bzclose;
      _self.BzData.dropped = bzdropped;

      _self.FjData.sum = fjopen + fjclose + fjdropped;
      _self.FjData.open = fjopen;
      _self.FjData.close = fjclose;
      _self.FjData.dropped = fjdropped;
    }
  },
  mounted: function() {
    var _self = this;
    var list = sitewhere.DevicesGroupData;
    _self.EditData(list);

    bus.$on("DevicesGroup_OK", function(d) {
      _self.EditData(sitewhere.DevicesGroupData);
    });

    /* bus.$on("DevicesGroupRefresh", function(data) {
      _self.EditData(data);
    }); */
  }
};
</script>

<style>

</style>