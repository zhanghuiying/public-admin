<template>
  <div class="main_module_app">
    <div class="d-display-center">
      <div class="visit-w v_module">
        <p class="public_card_header">今日访问</p>
        <div class="visit_col_space">
          <div class="col_space4_fl top_panel_number">
            <count-to :startVal='startVal' :endVal='endVal' :duration='2000'></count-to>
            </div>
          <div class="col_space_fr">
            <img src="../assets/images/visit_card_img1.png" alt="" />
          </div>
        </div>
      </div>
      <div class="visit-w v_module">
        <p class="public_card_header">提交次数</p>
        <div class="visit_col_space">
          <div class="col_space4_fl top_panel_number">
            <count-to :startVal='startVal' :endVal='endVal' :duration='2000'></count-to>
          </div>
          <div class="col_space_fr">
            <img src="../assets/images/visit_card_img2.png" alt="" />
          </div>
        </div>
      </div>
      <div class="visit-w v_module">
        <p class="public_card_header">下载数量</p>
        <div class="visit_col_space">
          <div class="col_space4_fl top_panel_number">
            <count-to :startVal='startVal' :endVal='endVal' :duration='2000'></count-to>
          </div>
          <div class="col_space_fr">
            <img src="../assets/images/visit_card_img3.png" alt="" />
          </div>
        </div>
      </div>
      <div class="visit-w v_module">
        <p class="public_card_header">流量统计</p>
        <div class="visit_col_space">
          <div class="col_space4_fl top_panel_number">
            <count-to :startVal='startVal' :endVal='endVal' :duration='2000'></count-to>
          </div>
          <div class="col_space_fr">
            <img src="../assets/images/visit_card_img4.png" alt="" />
          </div>
        </div>
      </div>
    </div>

    <div class="d-display card_body">
      <div class="card_body_left">
        <div id="echarts" style="height: 420px" class="main_echarts"></div>

        <div class="card_dynamic">
          <p class="public_card_header" style="text-align: left">更 新</p>

          <div class="pub_scroll_list height_dynamic">
            <div class="pub_scroll_list_column">
              <div
                class="d-display admin-card-status"
                v-for="item in 6"
                :key="item"
              >
                <div class="left">
                  <img src="../assets/logo.png" class="status_img" />
                </div>
                <div class="right">
                  <p class="status_p">
                    七彩枫叶 在
                    <a href="/">Pear Admin 专区</a>
                    回答问题
                  </p>
                  <span>几秒前</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card_body_right">
        <div class="card_list_item">
          <p class="public_card_header" style="text-align: left">更 新</p>
          <div class="pub_scroll_list height_right_list">
            <div class="pub_scroll_list_column">
              <p class="list_item" v-for="item in 12" :key="item">
                <span class="text">优化代码格式</span>
                <span class="data">2021-09-06 11:28</span>
              </p>
            </div>
          </div>
        </div>

        <div class="card_link">
          <p class="public_card_header" style="text-align: left">链接</p>
          <p class="card_body_btn pear-btn-primary">官网</p>
          <p class="card_body_btn pear-btn-warming">下载</p>
          <p class="card_body_btn pear-btn-danger">后端</p>
        </div>

        <div class="card_message">
          <p class="public_card_header" style="text-align: left">寄语</p>
          <p>
            原想将澎湃的爱平平稳稳放置你手心，奈何我徒有一股蛮劲，只顾向你跑去，一个不稳跌的满身脏兮兮。试图爬起的我，
            心想你会不会笑我 " 献爱献的这样笨拙, 怎么不知避开爱里的埋伏 "
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import countTo from 'vue-count-to';
import '@/views/style/mainmodule.less'
import { getPearData} from '../api/menu'
export default {
  components:{
  echarts,
  countTo,
  getPearData
},
  data() {
    return {
      //数字开始
      startVal: 0,
      //数字结束
      endVal: 440.34,
      pearlist: [],
    }
  },

  created() {
    this.getPearList()
  },

  mounted() {
    this.charts('echarts')
  },

  methods: {
    // 获取所有的菜单
    getPearList() {
      getPearData().then((response) => {
        this.pearlist = response
        console.log(this.pearlist)
      })
    },
    charts(id) {
      let myChart = echarts.init(document.getElementById(id))
      const colorList = ["#FE6E71", '#4277F7']
      let option = {
        legend: {
            icon: 'circle',
            top: '5%',
            right: '5%',
            itemWidth: 6,
            itemGap: 20,
            textStyle: {
                color: '#999999'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                label: {
                    show: true,
                    backgroundColor: '#fff',
                    color: '#999999',
                    borderColor: 'rgba(0,0,0,0)',
                    shadowColor: 'rgba(0,0,0,0)',
                    shadowOffsetY: 0
                },
                lineStyle: {
                    width: 0
                }
            },
            backgroundColor: '#fff',
            textStyle: {
                color: '#5c6c7c'
            },
            padding: [10, 10],
            extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)'
        },
        grid: {
            top: '15%'
        },
        xAxis: [{
            type: 'category',
            data: ['10：00', '11：00', '12：00', '1：00', '2：00', '4：00'],
            axisLine: {
                lineStyle: {
                    color: '#DCE2E8'
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                interval: 0,
                textStyle: {
                    color: '#556677'
                },
                fontSize: 12,
                margin: 15
            },
            axisPointer: {
                label: {
                    padding: [0, 0, 10, 0],
                    margin: 15,
                    // 移入时的字体大小
                    fontSize: 12,
                    backgroundColor: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: '#fff' // 0% 处的颜色
                        }, {
                            offset: 0.86,
                            color: '#fff' // 0% 处的颜色
                        }, {
                            offset: 0.86,
                            color: '#4277F7' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#4277F7' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                }
            },
            boundaryGap: false
        }],
        yAxis: [{
            type: 'value',
            axisTick: {
                show: false
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#DCE2E8'
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#556677'
                }
            },
            splitLine: {
                show: false
            }
        }],
        series: [{
                name: '1',
                type: 'line',
                data: [10, 10, 30, 12, 15, 3],
                symbolSize: 1,
                symbol: 'circle',
                smooth: true,
                yAxisIndex: 0,
                showSymbol: false,
                lineStyle: {
                    width: 5,
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                            offset: 0,
                            color: '#FE6E71'
                        },
                        {
                            offset: 1,
                            color: '#FE6E71'
                        }
                    ]),
                    shadowColor: 'rgba(158,135,255, 0.3)',
                    shadowBlur: 10,
                    shadowOffsetY: 20
                },
                itemStyle: {
                    normal: {
                        color: colorList[0],
                        borderColor: colorList[0]
                    }
                }
            }, {
                name: '2',
                type: 'line',
                data: [5, 12, 11, 14, 25, 16],
                symbolSize: 1,
                symbol: 'circle',
                smooth: true,
                yAxisIndex: 0,
                showSymbol: false,
                lineStyle: {
                    width: 5,
                    color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [{
                            offset: 0,
                            color: '#4277F7'
                        },
                        {
                            offset: 1,
                            color: '#4277F7'
                        }
                    ]),
                    shadowColor: 'rgba(66,119,247, 0.3)',
                    shadowBlur: 10,
                    shadowOffsetY: 20
                },
                itemStyle: {
                    normal: {
                        color: colorList[1],
                        borderColor: colorList[1]
                    }
                }
            },

        ]

      }
      myChart.setOption(option)
    },
  },
}
</script>

<style lang='less' scoped>
</style>