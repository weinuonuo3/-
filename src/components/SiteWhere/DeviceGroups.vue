<template>
  <div class='devicegroups-div'>
    <div class="l_h_bgcolor">
      <div class="l_h_bgcolor_t">实时监测</div>
      <autocomplete></autocomplete>
    </div>
    <div class="l_con">
      <div>
        <div class="item-title">
          <span>监测项</span>
          <div class='select-div'>
            <span class="radiobutton-span">
              <label><input type="radio" name='radiobutton1' id="radio1" v-on:click="CheckButton(0,true);" checked>
                <i>
                  <i class="second"></i>
                </i>全选</label>
            </span>
            <span class="radiobutton-span">
              <label><input type="radio" name='radiobutton1' id="radio2" value="1" v-on:click="CheckButton(0,false);">
                <i>
                  <i class="second"></i>
                </i>取消</label>
            </span>
          </div>
        </div>
        <div class='checkJCX'>
          <template v-for="items in JcxItems">
            <div class="checkbox-div">
              <label><input type="checkbox" v-bind:id="items.token" v-bind:value="items.name" v-on:change="checkClick()" v-model="checkJCX">
                <div class="frist">
                  <div class="secend"></div>
                </div>
              </label>
              <label class="checkstr" v-bind:for="items.token">{{items.name}}</label>
            </div>
          </template>
          <div class="clear"></div>
        </div>
      </div>
      <div>
        <div class="item-title">
          <span>所属区</span>
          <div class='select-div'>
            <span class="radiobutton-span">
              <label><input type="radio" name='radiobutton2' id="radio1" v-on:click="CheckButton(1,true);" checked>
                <i>
                  <i class="second"></i>
                </i>全选</label>
            </span>
            <span class="radiobutton-span">
              <label><input type="radio" name='radiobutton2' id="radio2" value="1" v-on:click="CheckButton(1,false);">
                <i>
                  <i class="second"></i>
                </i>取消</label>
            </span>
          </div>
        </div>
        <div class='checkQX'>
          <template v-for="items in QhItems">
            <div class="checkbox-div">
              <label><input type="checkbox" v-bind:id="items.token" v-bind:value="items.token" v-on:change="checkClick()" v-model="checkQX">
                <div class="frist">
                  <div class="secend"></div>
                </div>
              </label>
              <label class="checkstr" v-bind:for="items.token">{{items.name}}</label>
            </div>
          </template>
          <div class="clear"></div>
        </div>
      </div>
      <div>
        <div class="item-title">
          <span>数据来源</span>
          <div class="select-div">
            <span class="radiobutton-span">
              <label><input type="radio" name='radiobutton3' id="radio1" v-on:click="CheckButton(2,true);" checked>
                <i>
                  <i class="second"></i>
                </i>全选</label>
            </span>
            <span class="radiobutton-span">
              <label><input type="radio" name='radiobutton3' id="radio2" value="1" v-on:click="CheckButton(2,false);">
                <i>
                  <i class="second"></i>
                </i>取消</label>
            </span>
          </div>
        </div>
        <div class='checkSJLY'>
          <template v-for="items in SjlyItems">
            <div class="checkbox-div">
              <label><input type="checkbox" v-bind:id="items.id" v-bind:value="items.name" v-on:change="checkClick()" v-model="checkSJLY">
                <div class="frist">
                  <div class="secend"></div>
                </div>
              </label>
              <label class="checkstr" v-bind:for="items.id">{{items.name}}</label>
              <label class="checkstr" v-bind:for="items.id">({{items.num}})</label>
            </div>
          </template>
          <div class="clear"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import autocomplete from "@/components/KendoUIDefault/AutoComplete.vue";
import sitewhere from "./js/index";
import bus from "@/assets/js/eventBus.js";

export default {
  components: {
    autocomplete
  },
  data() {
    return {
      JcxItems: [],
      QhItems: [],
      SjlyItems: [],
      SjlyOk: false,
      checkJCX: [],
      checkQX: [],
      checkSJLY: []
    };
  },
  watch: {
    JcxItems: function(v) {
      //初始化绑定
      bus.$emit("TabListBind", v);
      //默认选中第一个
      this.checkJCX = this.SetCheck(v, "name", -1);
      sitewhere.DevicesRefresh(this.QhItems);
    },
    checkJCX: function(v) {
      var _self = this;
      sitewhere.checkJCX = v;
      bus.$emit("JCXListRefresh", v);
      var data = sitewhere.DevicesGroupData;
      for (var k in data) {
        if (data[k].TabPage == "BZYX") {
          sitewhere.GetDevicesGroupSite(k, data[k].name, _self.QhItems);
        }
      }
    },
    checkQX: function(v) {
      sitewhere.checkQX = v;
    },
    checkSJLY: function(v) {
      sitewhere.checkSJLY = v;
    },
    QhItems: function(v) {
      this.checkQX = this.SetCheck(v, "token", -1);
    },
    SjlyItems: function(v) {
      if (!this.SjlyOk) {
        this.checkSJLY = this.SetCheck(v, "name", -1);
        this.SjlyOk = true;
      }
    }
  },
  methods: {
    GetOrder: function(data, str) {
      var arr = [];
      $.each(data, function(i, v) {
        if (v[str] != undefined && v[str].N_OrderBy != undefined) {
          arr[parseInt(v[str].N_OrderBy)] = v;
        }
      });
      var list = [];
      $.each(arr, function(i, v) {
        if (v != undefined) {
          list.push(v);
        }
      });
      return list;
    },
    Init: function() {
      var _self = this;
      sitewhere.SetQHList(function(data) {
        _self.QhItems = _self.GetOrder(data, "metadata");
        sitewhere.SetJCXList(function(data) {
          _self.JcxItems = _self.GetOrder(data, "metadata");
        });
      });

      sitewhere.SetSourceList(function(data) {
        $.each(data, function(i, v) {
          data[i]["num"] = 0;
          data[i]["list"] = [];
        });
        _self.SjlyItems = _self.GetOrder(data, "properties");
      });
    },
    SetCheck: function(allData, name, n) {
      //勾选
      //allData：原始数据
      //name: 判定的字段
      //n：是否全选，-1为全选
      var resultData = [];
      $.each(allData, function(i, item) {
        if (n > -1) {
          if (n == i) {
            resultData.push(item[name]);
          }
        } else {
          resultData.push(item[name]);
        }
      });
      return resultData;
    },
    CheckButton: function(n, t) {
      //全选、全部取消
      var _self = this;
      switch (n) {
        case 0:
          if (t) {
            _self.checkJCX = _self.SetCheck(_self.JcxItems, "name", -1);
          } else {
            _self.checkJCX = _self.SetCheck([], "name", -1);
          }
          break;
        case 1:
          if (t) {
            _self.checkQX = _self.SetCheck(_self.QhItems, "token", -1);
          } else {
            _self.checkQX = _self.SetCheck([], "token", -1);
          }
          break;
        case 2:
          if (t) {
            _self.checkSJLY = _self.SetCheck(_self.SjlyItems, "name", -1);
          } else {
            _self.checkSJLY = _self.SetCheck([], "name", -1);
          }
          break;
      }
      if (t) {
        $(".select-div:eq(" + n + ")")
          .find(".leftselected-div")
          .addClass("selected_color");
        $(".select-div:eq(" + n + ")")
          .find(".rightselected-div")
          .removeClass("selected_color");
      } else {
        $(".select-div:eq(" + n + ")")
          .find(".leftselected-div")
          .removeClass("selected_color");
        $(".select-div:eq(" + n + ")")
          .find(".rightselected-div")
          .addClass("selected_color");
      }
      _self.checkClick();
    },
    checkClick: function() {
      //点击不同选项筛选数据
      bus.$emit("ChartsPanelHide", {});
      var _self = this;
      sitewhere.AssetsNameList = [];
      var AssetsNewData = sitewhere.DevicesGroupData;
      for (var k in AssetsNewData) {
        //判断监测项
        if ($.inArray(AssetsNewData[k].name, _self.checkJCX) < 0) {
          AssetsNewData[k].deleted = true;
        } else {
          AssetsNewData[k].deleted = false;
          var arr = [];
          var assetsList = AssetsNewData[k].list;
          $.each(assetsList, function(site, item) {
            //判断区县
            if ($.inArray(site, _self.checkQX) < 0) {
              assetsList[site].deleted = true;
            } else {
              assetsList[site].deleted = false;
              for (var assetId in assetsList[site].list) {
                //单个泵站的数据
                var assets = assetsList[site].list[assetId];
                //不同数据来源
                for (var k in assets) {
                  if (k == "assignment") {
                    //测量数据
                    var assignment = assets.assignment;
                    for (var s in assignment) {
                      //判断数据来源
                      if ($.inArray(s, _self.checkSJLY) < 0) {
                        assignment[s].deleted = true;
                      } else {
                        assignment[s].deleted = false;
                        if (
                          $.inArray(
                            assets.assetName,
                            sitewhere.AssetsNameList
                          ) < 0
                        ) {
                          sitewhere.AssetsNameList.push(assets.assetName);
                        }
                      }
                    }
                  }
                }
              }
            }
          });
        }
        //bus.$emit("DevicesGroupRefresh", AssetsNewData);
        bus.$emit(AssetsNewData[k].TabPage + "_Refresh", AssetsNewData);
      }
    },
    SJLYCount: function() {
      var _self = this;
      bus.$on("DevicesGroup_OK", function(groupToken) {
        var data = sitewhere.DevicesGroupData;
        //监测项
        $.each(data[groupToken].list, function(i, site) {
          for (var assetId in site.list) {
            //不同数据来源
            var assignment = site.list[assetId].assignment;
            //数据来源
            for (var s in assignment) {
              //s=数据来源名称
              $.each(_self.SjlyItems, function(i, sjly) {
                if (s == sjly.name) {
                  if ($.inArray(assetId, sjly.list) < 0) {
                    sjly.list.push(assetId);
                  }
                }
              });
            }
          }
        });

        $.each(_self.SjlyItems, function(i, v) {
          v.num = v.list.length;
        });
      });
    }
  },
  mounted: function() {
    this.Init();
    this.SJLYCount();
  }
};
</script>

<style>

</style>