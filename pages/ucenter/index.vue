<template>
  <div id="aCoursesList" class="bg-fa of">
    <section class="container">
      <!-- /个人信息 开始 -->
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">个人信息</span>
        </h2>
      </header>
      <el-form ref="form" :model="userInfo" label-width="80px">
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            :action="this.UPLOAD_API"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
<!--        <el-form-item label="头像">
          <el-avatar :size="60">
            <img :src="userInfo.avatar"/>
          </el-avatar>
        </el-form-item>-->
        <el-form-item label="昵称">
          <el-col span="7">
            <el-input v-model="userInfo.nickname"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="年龄">
          <el-col span="7">
            <el-input v-model="userInfo.age"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-col span="7">
            <el-input v-model="userInfo.email"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="手机号">
          <el-col span="7">
            <el-input v-model="userInfo.mobile"></el-input>
          </el-col>
        </el-form-item><el-form-item label="性别">
        <el-col span="7">
          <el-radio v-model="userInfo.sex" label="1">女</el-radio>
          <el-radio v-model="userInfo.sex" label="2">男</el-radio>
        </el-col>
      </el-form-item>
        <el-form-item label="签名">
          <el-col span="7">
            <el-input v-model="userInfo.sign"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateUserInfo">保存信息</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dialogFormVisible = true">修改密码</el-button>
        </el-form-item>
      </el-form>
      <!-- /个人信息 结束 -->
    </section>

    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">已购课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="purchasedCourse.length===0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有购买任何课程</span>
          </section>
          <!-- /无数据提示 结束-->
          <article class="comm-course-list">
            <ul class="of" id="bna">
              <li v-for="item in purchasedCourse" :key="item.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img style="height: 150px; width: 270px;" :src="item.cover" class="img-responsive" :alt="item.title">
                    <div class="cc-mask">
                      <a :href="'/course/'+item.id" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a :href="'/course/'+item.id" :title="item.title" class="course-title fsize18 c-333">{{item.title}}</a>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span v-if="Number(item.price) === 0" class="fr jgTag bg-green">
                      <i class="c-fff fsize12 f-fA">免费</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">{{ item.buyCount }}人学习</i>
                      |
                      <i class="c-999 f-fA">{{ item.viewCount }}浏览</i>
                    </span>
                  </section>
                </div>
              </li>

            </ul>
            <div class="clear"></div>
          </article>
        </div>

        <!-- 分页 -->
<!--        <el-pagination
          :current-page="page"
          :page-size="limit"
          :total="total"
          style="padding: 30px 0; text-align: center;"
          layout="total, prev, pager, next, jumper"
          @current-change="getPage"
        />-->
      </section>
    </section>
    <!-- /课程列表 结束 -->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form :model="userInfo">
        <el-form-item prop="email"
                      :rules="[{ required: true, message: '请输入邮箱', trigger: 'blur' },
                      {validator: checkEmail, trigger: 'blur'}]">
          <el-input prefix-icon="el-icon-message"
                    placeholder="请输入邮箱"
                    v-model="params.email"
                    clearable/>
        </el-form-item>

        <el-form-item prop="code" :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]">
          <div style="width: 100%;display: block;float: left;position: relative">
            <el-input prefix-icon="el-icon-circle-check"
                      placeholder="请输入验证码"
                      v-model="params.code"/>
          </div>
          <div class="btn" style="position:absolute;right: 0;width: 40%;">
            <el-button type="text" :disabled="sending" @click="getCodeFun()" :value="codeTest">{{codeTest}}</el-button>
          </div>
        </el-form-item>

        <el-form-item prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
          <el-input prefix-icon="el-icon-lock"
                    placeholder="请输入密码"
                    v-model="params.password"
                    show-password
                    clearable/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false; updateUserPassword()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import courseApi from '@/api/course'
import ucenterApi from '@/api/ucenter'
import registerApi from '@/api/register'
export default {
  data() {
    return {
      page:1, //当前页
      data:{},  //课程列表

      limit: 5, // 每页记录数
      total: 0, // 总记录数

      index:-1,

      userInfo:'',
      purchasedCourse:{},

      params: { //封装注册输入数据
        email: '',
        code: '',  //验证码
        password: ''
      },

      sending: false,    //是否发送验证码
      second: 60,        //倒计时间
      codeTest: '获取验证码',

      dialogFormVisible: false,

      UPLOAD_API: 'http://39.96.82.231:9001'+'/eduoss/fileoss'
    }
  },
  created() {
    this.initUcenterInfo()
  },
  methods:{
    //上传封面成功
    handleAvatarSuccess(res, file) {
      this.userInfo.avatar=res.data.url
      this.$message.success('头像上传成功')
    },
    //上传之前
    beforeAvatarUpload(file){
      console.log(this.UPLOAD_API)
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    updateUserPassword() {
      ucenterApi.updateUserPassword(this.params)
        .then(response => {
          if (response.data.code === 20001) {
            //失败提示信息
            this.$message({
              type: 'error',
              message: response.data.message
            })
          } else {
            this.$message({
              type: 'success',
              message: response.data.message
            })
          }
        })
    },
    updateUserInfo () {
      ucenterApi.updateUcenterInfo(this.userInfo)
        .then(response => {
          if (response.data.code === 20001) {
            //失败提示信息
            this.$message({
              type: 'error',
              message: response.data.message
            })
          } else {
            this.$message({
              type: 'success',
              message: response.data.message
            })
          }

        })
    },
    initUcenterInfo() {
      ucenterApi.getUcenterInfo().then(response => {
        this.userInfo = response.data.data.userInfo
        this.purchasedCourse = response.data.data.purchasedCourse
      })
    },
    // 1 查询某一页
    getPage(page) {
      courseApi.getCourseList(page,8,this.searchObj).then(response => {
        this.data = response.data.data.page
        this.total = this.data.total
      })
    },
    timeDown() {
      let result = setInterval(() => {
        --this.second;
        this.codeTest = this.second
        if (this.second < 1) {
          clearInterval(result);
          this.sending = false;
          this.second = 60;
          this.codeTest = "获取验证码"
        }
      }, 1000);

    },
    //通过输入手机号发送验证码
    getCodeFun() {
      //调用倒计时的方法
      this.timeDown()
      this.sending = true
      registerApi.sendCode(this.params.email)
        .then(response => {

        })
    },

    checkPhone (rule, value, callback) {
      //debugger
      if (!(/^1[34578]\d{9}$/.test(value))) {
        return callback(new Error('手机号码格式不正确'))
      }
      return callback()
    },

    checkEmail (rule, value, callback) {
      //debugger
      if (!(/[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+/.test(value))) {
        return callback(new Error('邮箱格式不正确'))
      }
      return callback()
    }

  }
};
</script>
