<template>
  <div class="app-container home">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="24">
        <el-card class="update-log">
          <div slot="header" class="clearfix" style="text-align: center;">
            <span style="font-size: 20px; ">北邮太平来历</span>
          </div>
          <div class="body">
            <el-row :gutter="50" type="flex" justify="center">
              <el-col :xs="24" :sm="24" :md="12" :lg="6">
                <img src="@/assets/images/company2.jpg" alt="donate" width="100%" />
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" style="font-size: 16px;">
                <p></p>
                中国保险精算行业刚刚起步，处在与国际接轨阶段。在2019年中国总精算师论坛上，透露出一个至关重要的信息——当前保险业正在回归保障本源，产品方向和费率的调整需要保险精算师的出谋划策。然而当前，在国内185家保险公司中，有65家公司急缺总精算师，占比超35%。在这种情况下迫切需要一款专业的精算软件去协助精算师们提高精算师的工作效率和精准度，并为不同用户量身打造不同的投保方案，缓解精算师的工作压力。
                基于上述情况，我们准备开发一款拥有自主版权的专业的保险精算软件来填补国内空白，解决当下精算师工作效率较低，并为不同用户量身打造不同的投保方案。
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-divider />

    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="24">
        <el-card class="update-log">
          <div slot="header" class="clearfix" style="text-align: center;">
            <span style="font-size: 20px;">创新点与特色</span>
          </div>
          <div class="body">
            <el-row :gutter="50" type="flex" justify="center">
              <el-col :xs="24" :sm="24" :md="12" :lg="8" style="font-size: 16px;">
                目前国内急缺专业的保险精算软件，我们的保险精算系统恰能解决这个燃眉之急。而基于大数据的研发首先可以帮助保险公司从“样本精算”升级至“全量精算”，保险公司可以真正以客户为中心, 把客户分为成千上万种,
                这样保险公司经营就完全可以实现差别费率, 对于风险低的客户敢于大胆降低费率, 对于风险高的客户提高费率甚至拒绝承保,
                这样保险公司之间就可以实现真正的差异化竞争。其次大数据能够弱化用户与保险公司之间的部分不对称的信息，减少双方信息不对称的情况，从而减少保险欺诈的概率。
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="6">
                <img src="@/assets/images/company1.jpg" alt="donate" width="100%" />
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-divider />

    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <el-card class="update-log">
          <div slot="header" class="clearfix" style="text-align: center;">
            <span style="font-size: 20px;">功能优势</span>
          </div>
          <div class="body">
            <el-row :gutter="50" type="flex" justify="center">
              <el-col :xs="24" :sm="24" :md="12" :lg="6">
                <span style="font-size: 18px;"> 定制化</span>
                <p style="font-size: 16px;"> 针对痛点，将精算算法的应用普及到个人，实现对个人的低预算保险定制，让个人购买保险不再摇摆不定，集成大量用户需求数据也有助于保险公司提高精算定价的准确性。
                </p>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="6">
                <span style="font-size: 18px;"> 深度比对 </span>
                <p style="font-size: 16px;"> 利用精算结果，对在售保险进行性价比分析；基于比价系统以及客户个人信息，测算个性化保险配置；基于比价系统和个性化保险配置的产品评测系统。 </p>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="6">
                <span style="font-size: 18px;"> 一对一服务 </span>
                <p style="font-size: 16px;">
                  保险公司推销人员也可使用个人精算定制服务，快速根据客户需求得到匹配度和性价比最高的产品，同时实现了保险公司产品接口的接入，完成精算定制之后用户即可进行保险购买，实现产品商业化。 </p>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-divider />

    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="24">
        <el-card class="update-log">
          <div slot="header" class="clearfix" style="text-align: center;">
            <span style="font-size: 20px;"> 项目前景 </span>
          </div>
          <div class="body">
            <el-row>
              <el-col :lg="16" :offset="4">
                <p>
              精算是干什么的?主流的来说，精算就是开发保险产品，然后为保险公司保驾护航的。因为保险是现在把钱收进来，用于未来的赔付，所以保险产品在定价时必须基于现有假设的统计模型制定出合理的价格，在销售之后精算师还要负责把收进来的钱进行整理，哪些花在赔付的保险金，哪些花给了公司运作，甚至还要根据对未来现金流的评估，提出一部分钱分给股东。有句调侃叫“精算师并不产生利润，他们只是利润的搬运工”，这并不全对，但核心意思大概就是这样。
              在国内185家保险公司中，有65家公司急缺总精算师，占比超35%。在这种情况下迫切需要一款专业的精算软件去协助精算师们提高精算师的工作效率和精准度，并为不同用户量身打造不同的投保方案，缓解精算师的工作压力。
              目前，国内的精算软件市场几乎没有被开发。国外引进的精算软件，而且使用起来比较复杂，上手门槛较高，编程灵活度有限，且版权费用较高。因此，国内的保险精算软件市场急需去填补空白。 保险精算比价:
              将精算算法结合保险打破垄断，将精算算法的应用普及到个人，不仅对个人实现低预算保险定制提供了实现的可能，让个人购买保险不再隔雾看花，搜集到的用户需求数据也可以帮助保险公司提高精算定价的准确性。这对市场中的买方和卖方都有利。
              经调查得知目前国内保险市场有类似的比价产品，基本上品类单一，只有比价功能但没有精算定制。对于一款能够面向大众的智能化精算定价软件，市场需求是非常高的，因此精算定制功能市场可行性比较高。 精算功能:
              由《中国精算与风险管理报告》表面，我国精算产品受国外软件垄断，本软件最终算法实现后可以打破市场垄断。精算软件在我国市场稀缺，大多为国外软件，因此精算功能的市场可行性很高。
            </p>
              </el-col>
            </el-row>

          </div>
        </el-card>
      </el-col>
    </el-row>


  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      // 版本号
      version: "3.8.5"
    };
  },
  methods: {
    goTarget(href) {
      window.open(href, "_blank");
    }
  }
};
</script>

<style scoped lang="scss">
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }

  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }

  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans",
  "Helvetica Neue",
  Helvetica,
  Arial,
  sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}</style>

