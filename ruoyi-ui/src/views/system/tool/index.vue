<template>
  <div class="app-container home">
    <el-row :gutter="20">
      <el-col :span="5">
        <el-button type="primary" @click="add" style="">添加工具</el-button>

        <div class="grid-content bg-purple" style="margin-top: 20px;">
          <!-- 下拉框1 -->
          <el-select v-model="select1.id" placeholder="图表工具" @change="optionChange1">
            <el-option
              v-for="item in options1"
              :key="item.id"
              :label="item.chartName"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <!-- 下拉框2 -->
          <el-select v-model="select2.id" placeholder="函数工具" @change="optionChange2" style="margin-top: 50px">
            <el-option
              v-for="item in options2"
              :key="item.id"
              :label="item.functionName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="15">
        <!-- <el-button type="primary" @click="add" style="margin-left: 50px;">添加工具</el-button> -->
        <div class="grid-content bg-purple" v-if="updateShow" style="margin-top: 20px;">
          <el-form ref="form1" :model="form1" label-width="80px" :rulus="rules1">
            <el-form-item label="工具id">
              <el-input v-model="form1.id" disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="工具名称">
              <el-input v-model="form1.name"></el-input>
            </el-form-item>
            <el-form-item label="工具介绍">
              <el-input type="textarea" v-model="form1.desc"></el-input>
            </el-form-item>
             <el-form-item label="即时生效">
              <el-switch v-model="form1.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="是否有效">
              <el-radio-group v-model="form1.isdelivery">
                <el-radio label="有效"></el-radio>
                <el-radio label="无效"></el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item>
              <el-button type="primary" @click="onSubmit(form1)">立即修改</el-button>
              <el-button type="primary" @click="onDelete(form1)">立即删除</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 添加表单 -->
        <div class="grid-content bg-purple" v-if="addShow" style="margin-top: 20px;">
          <el-form ref="form" :model="form2" label-width="80px" :rulus="rules2" >
             <!-- <el-form-item label="工具id">
              <el-input v-model="form2.id" disabled="disabled"></el-input>
            </el-form-item>  -->
            <el-form-item label="工具名称">
              <el-input v-model="form2.name"></el-input>
            </el-form-item>
            <el-form-item label="工具介绍">
              <el-input type="textarea" v-model="form2.desc"></el-input>
            </el-form-item>
            <el-form-item label="工具类型">
              <el-select v-model="form2.type" placeholder="请选择工具类型">
                <el-option label="图表工具" value="1"></el-option>
                <el-option label="函数工具" value="2"></el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="即时生效">
              <el-switch v-model="form2.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="是否有效">
              <el-radio-group v-model="form2.isdelivery">
                <el-radio label="有效"></el-radio>
                <el-radio label="无效"></el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item>
              <el-button type="primary" @click="addTool(form2)">立即添加</el-button>
              <el-button type="primary" @click="backkTool(form2)">返回</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
// 创建axios实例
import axios from 'axios'
import { getToken } from '@/utils/auth'

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
      options1: [],
      options2: [],
      select1: {
        id: '',
        name: '',
        desc: ''
      },
      select2: {
        id: '',
        name: '',
        desc: ''
      },
      form1: {
        id: '',
        name: '',
        desc: ''
      },
      form2: {
        id: '',
        name: '',
        desc: '',
        type: ''
      },
      updateShow: false,
      addShow: false,
      rules1: {
          id: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          name: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请选择', trigger: 'change' }
          ]
        },
      rules2: {
        name: [
          { required: true, message: '请输入名称', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请输入描述', trigger: 'change' }
        ]
      },

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
      _axios.get('/system/chartTool/list', {}).then(res => {
        this.options1 = res.data.rows
      })

      _axios.get('/system/functionTool/list', {}).then(res => {
        this.options2 = res.data.rows
      })

    },
    // 监听下拉框选项
    optionChange1(id) {
      this.updateShow=true
      this.addShow=false
      console.log(id)
      _axios.get('/system/chartTool/query/' + id, {}).then(res => {
        this.select1.name = res.data.data.chartName
        this.select1.desc = res.data.data.chartDescribe

        this.form1.id = res.data.data.id
        this.form1.name = res.data.data.chartName
        this.form1.desc = res.data.data.chartDescribe
      })
      localStorage.setItem("tool","图表")
    },
    optionChange2(id) {
      console.log(id)
      this.updateShow=true
      this.addShow=false
      _axios.get('/system/functionTool/query/' + id, {}).then(res => {
        this.select1.name = res.data.data.functionName
        this.select1.desc = res.data.data.functionDescribe
        this.form1.id = res.data.data.id
        this.form1.name = res.data.data.functionName
        this.form1.desc = res.data.data.functionDescribe
      })
      localStorage.setItem("tool","函数")
    },
    onSubmit(form1) {
      if (localStorage.getItem("tool")=="图表") {
        _axios.post('/system/chartTool/update', {
          id: this.form1.id,
          chartName: this.form1.name,
          chartDescribe: this.form1.desc
        }).then(res => {
          this.$message({
          message: '恭喜你，操作成功',
          type: 'success'
        });   
        })
      } else {
        _axios.post('/system/functionTool/update', {
          id: this.form1.id,
          functionName: this.form1.name,
          functionDescribe: this.form1.desc
        }).then(res => {
          this.$message({
          message: '恭喜你，操作成功',
          type: 'success'
        });   
        })
      this.getDataList()
      }
    },
    onDelete(){
      if (localStorage.getItem("tool")=="图表") {
        _axios.get('/system/chartTool/delete/'+this.form1.id, {
        }).then(res => {
          this.$message({
          message: '恭喜你，操作成功',
          type: 'success'
        });      
        })
      } else {
        _axios.get('/system/functionTool/delete/'+this.form1.id, {
        }).then(res => {
          this.$message({
          message: '恭喜你，操作成功',
          type: 'success'
        });   
        })
      }
      this.form1.id = ''
        this.form1.name = ''
        this.form1.desc = ''
      this.getDataList()
    },
    addTool() {
      console.log(this.form2.type)
      if (this.form2.type == 1) {
        _axios.post('/system/chartTool/add', {
          chartName: this.form2.name,
          chartDescribe: this.form2.desc
        }).then(res => {
          this.$message({
          message: '恭喜你，操作成功',
          type: 'success'
        });   
        })
        this.getDataList();
      } else {
        _axios.post('/system/functionTool/add', {
          functionName: this.form2.name,
          functionDescribe: this.form2.desc
        }).then(res => {
          this.$message({
          message: '恭喜你，操作成功',
          type: 'success'
        });   
        })
      }
      this.getDataList()
      this.addShow = false
      this.updateShow = true
    },
    add() {
      this.addShow = true
      this.updateShow = false
    },
    backkTool() {
      this.addShow = false
      this.updateShow = true
    },
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
