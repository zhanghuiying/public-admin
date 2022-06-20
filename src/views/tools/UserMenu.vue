<template>
  <div class="user_menu">
    <div class="nav_content_box">
      <span class="hd-nav-item" @click="screen">
        <i :class="fullscreen == true?'el-icon-rank' : 'el-icon-full-screen'"></i>
        <span class="hd-nav-bar"></span>
      </span>

      <el-popover placement="bottom" trigger="click">
        <span class="hd-nav-item" slot="reference">
          <i class="el-icon-user"></i>
        </span>
        <p class="hd-nav-btn" @click="editOpen">修改密码</p>
        <p class="hd-nav-btn" @click="logout">注册登录</p>
      </el-popover>

      <span class="hd-nav-item">
        <i class="el-icon-more"></i>
        <span class="hd-nav-bar"></span>
      </span>
    </div>

    <el-dialog
      title="修改密码"
      :visible.sync="openDialog"
      width="30%"
      append-to-body
      @close="close"
    >
      <div style="width: 100%; text-align: center">
        <el-form :model="form" ref="form" :rules="rules" label-width="120px">
          <el-form-item label="原密码：" prop="Y_PWD">
            <el-input
              show-password
              v-model="form.Y_PWD"
              placeholder="请填写原密码"
              class="imput_discount"
              maxlength="20"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码：" prop="NEW_PWD">
            <el-input
              show-password
              v-model="form.NEW_PWD"
              placeholder="密码为6-20位字符,包含字母,数字,特殊字符@#$%&*"
              class="imput_discount"
              maxlength="20"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="NEW_PASSWORD2">
            <el-input
              show-password
              v-model="form.NEW_PASSWORD2"
              placeholder="请填写确认密码"
              class="imput_discount"
              maxlength="20"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  changePassword,
} from '../../api/menu'
export default {
  components: {
    changePassword,
  },
  data() {
    let validatePass = (rule, value, callback) => {
      if (value !== this.form.NEW_PWD) {
        callback(new Error('两次输入密码不一致!'))
      } else if (value == this.form.Y_PWD) {
        callback(new Error('新密码不能与旧密码相同!'))
      } else {
        callback()
      }
    }
    return {
      //弹出框
      openDialog: false,
      loading: false,
      fullscreen: false,
      form: {
        Y_PWD: '',
        NEW_PWD: '',
        NEW_PASSWORD2: '',
      },
      rules: {
        Y_PWD: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
        ],
        NEW_PWD: [
          {
            required: true,
            message: '请输入新密码，密码必须包含字母，数字，字符.',
            trigger: 'blur',
          },
          {
            pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%&*]).{6,20}$/,
            message: '密码格式为6-20位字符,包含字母,数字,特殊字符@#$%&*',
            trigger: 'blur',
          },
        ],
        NEW_PASSWORD2: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { required: true, validator: validatePass, trigger: 'blur' },
          {
            pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%&*]).{6,20}$/,
            message: '密码格式为6-20位字符,包含字母,数字,特殊字符@#$%&*',
            trigger: 'blur',
          },
        ],
      },
    }
  },

  created() {
  },

  methods: {
    logout() {
      //   window.sessionStorage.clear()
      this.$router.push('/login')
    },

    handleLogout() {
      return this.Logout({})
        .then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 16)
        })
        .catch((err) => {
          this.msgError(err.message)
        })
    },
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          changePassword(this.form)
            .then((res) => {
              if (res.statusCode == 200) {
                this.$notify.success({ title: '提示', message: '更改密码成功' })
              } else {
                this.$notify.error({ title: '错误', message: res.message })
              }
              this.openDialog = false
            })
            .catch((error) => {
            })
        } else {
          return false
        }
      })
    },

    close() {
      this.form = []
      this.openDialog = false
    },
    // 取消按钮
    cancel() {
      this.form = []
      this.openDialog = false
    },
    editOpen() {
      return (this.openDialog = true)
    },
    screen(){
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }

  },
}
</script>

<style>
.el-popover {
  margin-top: 0 !important;
} 

</style>