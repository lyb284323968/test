<template>
  <div class="app-container home">
    <el-row :gutter="20">
      <el-col :sm="24" :lg="24">
        <blockquote class="text-warning" style="font-size: 14px">
          尊敬的 {{ user.userName }} ， 欢迎使用北邮太平
        </blockquote>

        <hr />
      </el-col>
    </el-row>

    <el-row type="flex" justify="space-around">
      <el-col :lg="6">
        <ImageZoom :url="{ src: require('@/assets/images/1.jpg') }" />
      </el-col>
      <el-col :lg="5">
        <ImageZoom :url="{ src: require('@/assets/images/2.jpg') }" />
      </el-col>
      <el-col :lg="4">
        <el-row>
          <ImageZoom :url="{ src: require('@/assets/images/3.jpg') }" />
        </el-row>
        <el-row>
          <ImageZoom :url="{ src: require('@/assets/images/4.png') }" />
        </el-row>
      </el-col>
    </el-row>

    <el-row type="flex" justify="space-around">
      <el-col :lg="4">
        <ImageZoom :url="{ src: require('@/assets/images/5.jpg') }" />
      </el-col>
      <el-col :lg="4">
        <ImageZoom :url="{ src: require('@/assets/images/6.jpg') }" />
      </el-col>
      <el-col :lg="4">
        <ImageZoom :url="{ src: require('@/assets/images/7.jpg') }" />
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :sm="24" :lg="24" style="padding-left: 20px; text-align: center;">
        <h2>北邮太平</h2>
        <p>
          打造专属您个人的保险网站，给您最佳的购险体验
        </p>
      </el-col>

      <el-col :sm="24" :lg="12" style="padding-left: 50px">
        <el-row>
          <el-col :span="12">
            <h2>技术栈</h2>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <h4>后端技术</h4>
            <ul>
              <li>SpringBoot</li>
              <!-- <li>Spring Security</li>
              <li>JWT</li>
              <li>MyBatis</li>
              <li>Druid</li>
              <li>Fastjson</li>
              <li>...</li> -->
            </ul>
          </el-col>
          <el-col :span="6">
            <h4>前端技术</h4>
            <ul>
              <li>Vue</li>
              <!-- <li>Vuex</li> -->
              <li>Element-ui</li>
              <!-- <li>Axios</li>
              <li>Sass</li>
              <li>Quill</li>
              <li>...</li> -->
            </ul>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-divider />
    <el-row :gutter="20">
      <!--<el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-card class="update-log">
          <div slot="header" class="clearfix">
            <span>展示块1</span>
          </div>
          <div class="body">
            内容1
          </div>
        </el-card>
      </el-col> -->
      <!--<el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-card class="update-log">
          <div slot="header" class="clearfix">
            <span>展示块2</span>
          </div>
          <el-collapse accordion>
            <el-collapse-item title="列表1">
              <ol>
                <li>1</li>
                <li>2</li>
                <li>3</li>
              </ol>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>-->
      <!--<el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-card class="update-log">
          <div slot="header" class="clearfix">
            <span>展示3</span>
          </div>
          <div class="body">
            <img src="@/assets/images/profile.jpg" alt="donate" width="100%" />
            <span style="display: inline-block; height: 30px; line-height: 30px">标题1</span>
          </div>
        </el-card>
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
import { getUserProfile } from "@/api/system/user";
import ImageZoom from '@/components/ImageZoom/index.vue';

export default {
  name: "Index",
  components: {
    ImageZoom
  },
  data() {
    return {
      user: {},
      // 版本号
      version: "3.8.5",
      isHover: false
    };
  },
  created() {
    this.getUser();
    console.log(this.user)
  },
  methods: {
    goTarget(href) {
      window.open(href, "_blank");
    },
    getUser() {
      getUserProfile().then(response => {
        this.user = response.data;
      });
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

  .image-container {
    overflow: hidden;
  }

  img {
    max-width: 100%;
    max-height: 100%;
    transition: transform 0.3s ease-out;
  }
}
</style>

