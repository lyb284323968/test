<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="保险名称" prop="insureName">
        <el-input
          v-model="queryParams.insureName"
          placeholder="请输入保险名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="保险类型" prop="type">
        <el-input
          v-model="queryParams.type"
          placeholder="请输入保险类型"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="受众人群" prop="people">
        <el-input
          v-model="queryParams.people"
          placeholder="请输入受众人群"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="价格" prop="money">
        <el-input
          v-model="queryParams.money"
          placeholder="请输入价格"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="赔付价格" prop="payment">
        <el-input
          v-model="queryParams.payment"
          placeholder="请输入赔付价格"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="保险产品年限" prop="insureYear">
        <el-input
          v-model="queryParams.insureYear"
          placeholder="请输入保险产品年限"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="属于哪个保险公司" prop="company">
        <el-input
          v-model="queryParams.company"
          placeholder="请输入属于哪个保险公司"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:insure:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:insure:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:insure:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:insure:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="insureList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="保险id" align="center" prop="insureId" />
      <el-table-column label="保险名称" align="center" prop="insureName" />
      <el-table-column label="保险类型" align="center" prop="type" />
      <el-table-column label="受众人群" align="center" prop="people" />
      <el-table-column label="价格" align="center" prop="money" />
      <el-table-column label="赔付价格" align="center" prop="payment" />
      <el-table-column label="保险产品年限" align="center" prop="insureYear" />
      <el-table-column label="属于哪个保险公司" align="center" prop="company" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:insure:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:insure:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改保险对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="保险名称" prop="insureName">
          <el-input v-model="form.insureName" placeholder="请输入保险名称" />
        </el-form-item>
        <el-form-item label="保险类型" prop="type">
          <el-input v-model="form.type" placeholder="请输入保险类型" />
        </el-form-item>
        <el-form-item label="受众人群" prop="people">
          <el-input v-model="form.people" placeholder="请输入受众人群" />
        </el-form-item>
        <el-form-item label="价格" prop="money">
          <el-input v-model="form.money" placeholder="请输入价格" />
        </el-form-item>
        <el-form-item label="赔付价格" prop="payment">
          <el-input v-model="form.payment" placeholder="请输入赔付价格" />
        </el-form-item>
        <el-form-item label="保险产品年限" prop="insureYear">
          <el-input v-model="form.insureYear" placeholder="请输入保险产品年限" />
        </el-form-item>
        <el-form-item label="属于哪个保险公司" prop="company">
          <el-input v-model="form.company" placeholder="请输入属于哪个保险公司" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listInsure, getInsure, delInsure, addInsure, updateInsure } from "@/api/system/insure";

export default {
  name: "Insure",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 保险表格数据
      insureList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        insureName: null,
        type: null,
        people: null,
        money: null,
        payment: null,
        insureYear: null,
        company: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询保险列表 */
    getList() {
      this.loading = true;
      listInsure(this.queryParams).then(response => {
        this.insureList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        insureId: null,
        insureName: null,
        type: null,
        people: null,
        money: null,
        payment: null,
        insureYear: null,
        company: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.insureId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加保险";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const insureId = row.insureId || this.ids
      getInsure(insureId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改保险";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.insureId != null) {
            updateInsure(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addInsure(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const insureIds = row.insureId || this.ids;
      this.$modal.confirm('是否确认删除保险编号为"' + insureIds + '"的数据项？').then(function() {
        return delInsure(insureIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/insure/export', {
        ...this.queryParams
      }, `insure_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
