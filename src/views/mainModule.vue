<template>
<div class="main_module_app">
  <div class="d-display-center">
        <div class="visit-w v_module">
          <p class="public_card_header">今日访问</p>
            <div class="visit_col_space">
              <div class="col_space4_fl top_panel_number">440.34</div>
              <div  class="col_space_fr">
                <img src="../assets/images/visit_card_img1.png" alt="">
              </div>
            </div>
        </div>
        <div class="visit-w v_module">
          <p class="public_card_header">提交次数</p>
            <div class="visit_col_space">
              <div class="col_space4_fl top_panel_number">440.34</div>
              <div  class="col_space_fr">
                <img src="../assets/images/visit_card_img2.png" alt="">
              </div>
            </div>
        </div>
        <div class="visit-w v_module">
          <p class="public_card_header">下载数量</p>
            <div class="visit_col_space">
              <div class="col_space4_fl top_panel_number">440.34</div>
              <div  class="col_space_fr">
                <img src="../assets/images/visit_card_img3.png" alt="">
              </div>
            </div>
        </div>
        <div class="visit-w v_module">
          <p class="public_card_header">流量统计</p>
            <div class="visit_col_space">
              <div class="col_space4_fl top_panel_number">440.34</div>
              <div  class="col_space_fr">
                <img src="../assets/images/visit_card_img4.png" alt="">
              </div>
            </div>
        </div>
      </div>

    <div class="d-display card_body">
        <div class="card_body_left">
          <div id="main" style="height:420px;" class="main_echarts"></div>

          <div class="card_dynamic">
            <p class="public_card_header" style="text-align: left;">更 新</p>
            <div class="d-display admin-card-status" v-for="item in 6" :key="item">
              <div class="left">
                <img src="../assets/logo.png" class="status_img">
              </div>
              <div class="right">
                <p class="status_p">七彩枫叶 在 
                  <a href="/">Pear Admin 专区</a>
                  回答问题
                </p>
                <span>几秒前</span>
              </div>
            </div>
          </div>

        </div>
        <div class="card_body_right">
          <div class="card_list_item">
            <p class="public_card_header" style="text-align: left;">更 新</p>
            <p class="list_item" v-for="item in 8" :key="item">
              <span class="text">优化代码格式</span>
              <span class="data">2021-09-06 11:28</span>
            </p>
          </div>

          <div class="card_link">
            <p class="public_card_header" style="text-align: left;">链接</p>
            <p class="card_body_btn pear-btn-primary">
              官网
            </p>
            <p class="card_body_btn pear-btn-warming">
              下载
            </p>
            <p class="card_body_btn pear-btn-danger">
              后端
            </p>
          </div>

          <div class="card_message">
            <p class="public_card_header" style="text-align: left;">寄语</p>
            <p>
              原想将澎湃的爱平平稳稳放置你手心，奈何我徒有一股蛮劲，只顾向你跑去，一个不稳跌的满身脏兮兮。试图爬起的我， 心想你会不会笑我 " 献爱献的这样笨拙, 怎么不知避开爱里的埋伏 "
            </p>
          </div>

        </div>
    </div>
</div>
</template>

<script>
import '@/views/style/mainmodule.less'
export default {
  data () {
    return {

    };
  },

  created: {},

  methods:  {

  },
}
</script>

<style lang='less' scoped>

</style>