<template>
  <div class="app-container home">
    <el-row v-if="jiemian1">
      <!-- 下拉框 -->
      <el-col :span="4">
        <div class="grid-content bg-purple" style="margin-top: 10px;">
          <el-select v-model="select.id" placeholder="函数工具" @change="optionChange">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.functionName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
      </el-col>

      <!-- 介绍 -->
      <div v-if="aaa">
        <el-col :span="8" v-if="isShow">
          <div class="grid-content bg-purple-light">
            <h2>图表介绍:{{ select.desc }}</h2>
            <h2>当前图表工具为:{{ select.name }}</h2>
            <h2>当前上传状态为:<span style="background-color: #13CE66">{{ uploadData.statues }}</span></h2>
            <el-button type="success" round v-if="uploadData.buttonShow" @click="generateFunctions"
                       style="float: right;margin-right: 20px"
            >确定进行计算
            </el-button>
          </div>

        </el-col>

        <!-- 表格 -->
        <el-col :span="12" v-if="isShow">
          <div class="grid-content bg-purple" style="margin-top: 10px;">

            <el-upload
              ref="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :before-upload="upload"
              :show-file-list="false"
              accept=".xlsx,.xls"
              style="width: 100px; display: inline-flex;"
            >
              <el-button type="primary" style="">导入excel</el-button>
            </el-upload>
            <br>
            <el-table
              :data="tableData"
              stripe
              style="width: 100%"
              v-if="tableIsShow"
            >
              <el-table-column
                prop="name"
                label="保险费"
              >
              </el-table-column>
              <el-table-column
                prop="value"
                label="赔偿费"
              >
              </el-table-column>
              <el-table-column
                prop="result"
                label="计算结果"
              >
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </div>

    </el-row>
    <div v-if="jiemian2" style="margin-left: 20%;">
      <div id="function" style="width:80%;height:555px"></div>
    </div>
  </div>
</template>

<script>
// 创建axios实例
import axios from 'axios'
import { getToken } from '@/utils/auth'
import { read, utils } from 'xlsx'
import { parseStrEmpty } from '@/utils/ruoyi'

const _axios = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_API,
  // 超时
  timeout: 10000
})

_axios.interceptors.request.use(function(config) {
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
      options: [],
      select: {
        id: '',
        name: '',
        desc: ''
      },
      uploadData: {
        statues: '',
        buttonShow: false
      },
      isShow: false,
      tableIsShow: false,
      jiemian1: true,
      jiemian2: true,
      aaa: true,
      fileList: [],
      // 表格
      tableData: [{
        name: '11',
        value: '1111',
        result: ''
      }]

    }
  },
  created() {
    this.getDataList()
  },
  mounted() {
  },
  methods: {
    // 获取下拉框数据
    getDataList() {
      _axios.get('/system/functionTool/list', {}).then(res => {
        this.options = res.data.rows
      })

    },
    // 监听下拉框选项
    optionChange(id) {
      console.log(id)
      _axios.get('/system/functionTool/query/' + id, {}).then(res => {
        this.select.name = res.data.data.functionName
        this.select.desc = res.data.data.functionDescribe
        this.isShow = true

      })
    },
    // 文件选择回调
    upload(file, fileList) {
      console.log('file', file)
      console.log('fileList', fileList)
      let files = { 0: file }
      this.readExcel1(files)
    },
    // 表格导入
    readExcel1(files) {
      let that = this
      console.log(files)
      // 此处判断不严谨，思路只是根据传入的参数校验数据的完整性，可根据自己需求修改
      // 如果没有文件名
      if (files.length <= 0) {
        return
      }
      if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        this.$Message.error('上传格式不正确，请上传xls或者xlsx格式')
        return
      }

      const fileReader = new FileReader()
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result
          const workbook = read(data, {
            type: 'binary'
          })
          // 取第一张表
          const wsname = workbook.SheetNames[0]
          // 生成json表格内容
          const ws = utils.sheet_to_json(workbook.Sheets[wsname])
          console.log(ws)
          // 对数据的处理
          this.dataHandle(ws)
        } catch (e) {
          return false
        }
      }
      fileReader.readAsBinaryString(files[0])
    },
    // 对excel数据进行处理
    dataHandle(ws) {
      this.tableData = ws
      this.tableIsShow = true
      this.uploadData.statues = 'excel导入成功'
      this.uploadData.buttonShow = true
    },
    // 计算结果
    generateFunctions() {
      let tableData = this.tableData
      let tableList = []
      if (this.select.name == '+') {
        for (let i = 0; i < tableData.length; i++) {
          let table = {}
          table.name = tableData[i].name
          table.value = tableData[i].value
          // table.result = tableData[i].name +  this.select.name + tableData[i].value
          table.result = tableData[i].name + tableData[i].value
          tableList.push(table)
        }
        this.tableData = tableList
      } else if (this.select.name == '-') {
        for (let i = 0; i < tableData.length; i++) {
          let table = {}
          table.name = tableData[i].name
          table.value = tableData[i].value
          table.result = tableData[i].name - tableData[i].value
          tableList.push(table)
        }
        this.tableData = tableList
      } else if (this.select.name == 'x') {
        for (let i = 0; i < tableData.length; i++) {
          let table = {}
          table.name = tableData[i].name
          table.value = tableData[i].value
          table.result = tableData[i].name * tableData[i].value
          tableList.push(table)
        }
        this.tableData = tableList
      } else if (this.select.name == '/') {
        for (let i = 0; i < tableData.length; i++) {
          let table = {}
          table.name = tableData[i].name
          table.value = tableData[i].value
          // table.result = tableData[i].name +  this.select.name + tableData[i].value
          table.result = tableData[i].name / tableData[i].value
          tableList.push(table)
        }
        this.tableData = tableList
      } else if (this.select.name == 'sin') {
        for (let i = 0; i < tableData.length; i++) {
          let table = {}
          table.name = tableData[i].name
          table.value = tableData[i].value
          table.result = Math.sin(tableData[i].name * Math.PI / tableData[i].value)
          tableList.push(table)
        }
        this.tableData = tableList
      } else if (this.select.name == 'cos') {
        for (let i = 0; i < tableData.length; i++) {
          let table = {}
          table.name = tableData[i].name
          table.value = tableData[i].value
          table.result = Math.cos(tableData[i].name * Math.PI / tableData[i].value)
          tableList.push(table)
        }
        this.tableData = tableList
      } else if (this.select.name == 'tan') {
        for (let i = 0; i < tableData.length; i++) {
          let table = {}
          table.name = tableData[i].name
          table.value = tableData[i].value
          table.result = Math.tan(tableData[i].name * Math.PI / tableData[i].value)
          tableList.push(table)
        }
        this.tableData = tableList
      } else if (this.select.name == '%') {
        for (let i = 0; i < tableData.length; i++) {
          let table = {}
          table.name = tableData[i].name
          table.value = tableData[i].value
          table.result = table.result = tableData[i].name % tableData[i].value

          tableList.push(table)
        }
        this.tableData = tableList
      }

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
  //background: #e5e9f2;
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
