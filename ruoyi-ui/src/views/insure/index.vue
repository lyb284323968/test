<template>
  <div class="app-container home">
    <template>
      <el-row :gutter="20">
        <el-col :span="11">
          <div class="grid-content bg-purple">
            <!-- 相同保险名称数量柱形图 -->
            <div id="zhutu" style="width:100%;height:555px"></div>
          </div>
        </el-col>
        <el-col :span="11">
          <div class="grid-content bg-purple">
            <!-- 保险类型饼图 -->
            <div id="bingtu" style="width:100%;height:555px"></div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="11">
          <div class="grid-content bg-purple">
            <!-- 投保金额与赔偿金散点图 -->
            <div id="sandian" style="width:100%;height:555px"></div>
          </div>
        </el-col>
        <el-col :span="11">
          <div class="grid-content bg-purple">
            <!-- 保险推荐漏斗图 -->
            <div id="loudou" style="width:100%;height:555px"></div>
          </div>
        </el-col>
      </el-row>


    </template>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import axios from 'axios'
import { getToken } from '@/utils/auth'

// 创建axios实例
const getEcharts = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_API,
  // 超时
  timeout: 10000
})

getEcharts.interceptors.request.use(function(config) {
  config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  return config
}, function(error) {
  // Do something with request error
  return Promise.reject(error)
})

export default {
  name: 'Index',
  data() {
    return {
      // 版本号
      version: '3.8.5',
      bingtuData: '',
      zhuxingData: '',
      sandianData: '',
      loudouData: ''
    }
  },
  created() {
    this.initEchartsData()
  },
  mounted() {

  },
  methods: {
    goTarget(href) {
      window.open(href, '_blank')
    },
    async initEchartsData() {
      await getEcharts.get('/system/insure/echarts/zhuxing', {}).then(res => {
        this.zhuxingData = {
          xAxis: {
            type: 'category',
            data: res.data.name
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: res.data.value,
              type: 'bar'
            }
          ]
        }
      })
      await getEcharts.get('/system/insure/echarts/bingtu', {}).then(res => {
        this.bingtuData = {
          title: {
            text: '保险类型',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: '保险数量',
              type: 'pie',
              radius: '50%',
              data: res.data,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      })
      await getEcharts.get('/system/insure/echarts/sandian', {}).then(res => {
        this.sandianData = {
          xAxis: {},
          yAxis: {},
          series: [
            {
              symbolSize: 20,
              data: res.data,
              type: 'scatter'
            }
          ]
        }

      })
      await getEcharts.get('/system/insure/echarts/loudou', {}).then(res => {
        this.sandianData = {
          title: {
            text: '保险推荐'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}%'
          },
          toolbox: {
            feature: {
              dataView: { readOnly: false },
              restore: {},
              saveAsImage: {}
            }
          },
          legend: {
            data: res.data.name
          },
          series: [
            {
              name: 'Funnel',
              type: 'funnel',
              left: '10%',
              top: 60,
              bottom: 60,
              width: '80%',
              min: 0,
              max: 100,
              minSize: '0%',
              maxSize: '100%',
              sort: 'descending',
              gap: 2,
              label: {
                show: true,
                position: 'inside'
              },
              labelLine: {
                length: 10,
                lineStyle: {
                  width: 1,
                  type: 'solid'
                }
              },
              itemStyle: {
                borderColor: '#fff',
                borderWidth: 1
              },
              emphasis: {
                label: {
                  fontSize: 20
                }
              },
              data: res.data.value
            }
          ]
        }

      })

      this.zhutufun()
      this.bingtufun()
      this.sandianfun()
      this.loudoufun()
    },
    zhutufun() {
      // 基于准备好的dom，初始化echarts实例
      let zhutu = echarts.init(document.getElementById('zhutu'))
      // 绘制图表
      zhutu.setOption(this.zhuxingData)
    },
    bingtufun() {
      // 基于准备好的dom，初始化echarts实例
      let bingtu = echarts.init(document.getElementById('bingtu'))
      // 绘制图表
      bingtu.setOption(this.bingtuData)
    },
    sandianfun() {
      // 基于准备好的dom，初始化echarts实例
      let sandian = echarts.init(document.getElementById('sandian'))
      // 绘制图表
      sandian.setOption(this.sandianData)
    },
    loudoufun() {
      // 基于准备好的dom，初始化echarts实例
      let loudou = echarts.init(document.getElementById('loudou'))
      // 绘制图表
      loudou.setOption(this.loudouData)
    }
  }
}
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

  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
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
}

.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  //background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>

