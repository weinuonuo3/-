<template>
    <div id="factAlarm">
        <div class="fact_alarm">
            <div class="fact_alarm_type">
                进口
            </div>
            <div class="fact_list">
                <div class="fact_item">
                    <div class="fact_item_title">COD(mg/L)</div>
                    <div class="fact_item_table">
                        <div>
                            <div class="fact_item_left">运行正常</div>
                            <div>0-500</div>
                        </div>
                        <div>
                            <div class="fact_item_left">一般超标</div>
                            <div>500-800</div>
                        </div>
                        <div>
                            <div class="fact_item_left">严重超标</div>
                            <div>>=800</div>
                        </div>
                    </div>
                </div>
                <div class="fact_item">
                    <div class="fact_item_title">NH3-N(mg/L)</div>
                    <div class="fact_item_table">
                        <div>
                            <div class="fact_item_left">运行正常</div>
                            <div>--</div>
                        </div>
                        <div>
                            <div class="fact_item_left">一般超标</div>
                            <div>--</div>
                        </div>
                        <div>
                            <div class="fact_item_left">严重超标</div>
                            <div>--</div>
                        </div>
                    </div>
                </div>
                <div class="fact_item">
                    <div class="fact_item_title">TP(mg/L)</div>
                    <div class="fact_item_table">
                        <div>
                            <div class="fact_item_left">运行正常</div>
                            <div>--</div>
                        </div>
                        <div>
                            <div class="fact_item_left">一般超标</div>
                            <div>--</div>
                        </div>
                        <div>
                            <div class="fact_item_left">严重超标</div>
                            <div>--</div>
                        </div>
                    </div>
                </div>
                <div class="fact_item">
                    <div class="fact_item_title">TN(mg/L)</div>
                    <div class="fact_item_table">
                        <div>
                            <div class="fact_item_left">运行正常</div>
                            <div>--</div>
                        </div>
                        <div>
                            <div class="fact_item_left">一般超标</div>
                            <div>--</div>
                        </div>
                        <div>
                            <div class="fact_item_left">严重超标</div>
                            <div>--</div>
                        </div>
                    </div>
                </div>
                <div class="fact_item">
                    <div class="fact_item_title">PH值(pH)</div>
                    <div class="fact_item_table">
                        <div>
                            <div class="fact_item_left">运行正常</div>
                            <div>6-9</div>
                        </div>
                        <div>
                            <div class="fact_item_left">&nbsp;</div>
                            <div></div>
                        </div>
                        <div>
                            <div class="fact_item_left">&nbsp;</div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="fact_alarm">
            <div class="fact_alarm_type">
                出口
            </div>
            <div class="fact_list">
                <div class="fact_item">
                    <div class="fact_item_title">COD(mg/L)</div>
                    <div class="fact_item_table">
                        <div>
                            <div class="fact_item_left">运行正常</div>
                            <div>0-100</div>
                        </div>
                        <div>
                            <div class="fact_item_left">一般超标</div>
                            <div>100-130</div>
                        </div>
                        <div>
                            <div class="fact_item_left">严重超标</div>
                            <div>>=130</div>
                        </div>
                    </div>
                </div>
                <div class="fact_item">
                    <div class="fact_item_title">NH3-N(mg/L)</div>
                    <div class="fact_item_table">
                        <div>
                            <div class="fact_item_left">运行正常</div>
                            <div>0-30</div>
                        </div>
                        <div>
                            <div class="fact_item_left">一般超标</div>
                            <div>30-39</div>
                        </div>
                        <div>
                            <div class="fact_item_left">严重超标</div>
                            <div>>=39</div>
                        </div>
                    </div>
                </div>
                <div class="fact_item">
                    <div class="fact_item_title">TP(mg/L)</div>
                    <div class="fact_item_table">
                        <div>
                            <div class="fact_item_left">运行正常</div>
                            <div>0-3</div>
                        </div>
                        <div>
                            <div class="fact_item_left">一般超标</div>
                            <div>3-3.9</div>
                        </div>
                        <div>
                            <div class="fact_item_left">严重超标</div>
                            <div>>=3.9</div>
                        </div>
                    </div>
                </div>
                <div class="fact_item">
                    <div class="fact_item_title">TN(mg/L)</div>
                    <div class="fact_item_table">
                        <div>
                            <div class="fact_item_left">运行正常</div>
                            <div>--</div>
                        </div>
                        <div>
                            <div class="fact_item_left">一般超标</div>
                            <div>--</div>
                        </div>
                        <div>
                            <div class="fact_item_left">严重超标</div>
                            <div>--</div>
                        </div>
                    </div>
                </div>
                <div class="fact_item">
                    <div class="fact_item_title">PH值(pH)</div>
                    <div class="fact_item_table">
                        <div>
                            <div class="fact_item_left">运行正常</div>
                            <div>6-9</div>
                        </div>
                        <div>
                            <div class="fact_item_left">&nbsp;</div>
                            <div></div>
                        </div>
                        <div>
                            <div class="fact_item_left">&nbsp;</div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import devicefun from "../js/index.js";

export default {
  props: ["assets"],
  data() {
    return {
      list: []
    };
  },
  watch: {
    list: function(newData) {},
    assets: function(obj) {
      var _self = this;
    }
  },
  mounted: function() {}
};
</script>

<style>

</style>
