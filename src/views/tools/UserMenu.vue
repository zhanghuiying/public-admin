<template>
  <div>
    <div class="nav_content_box">
        <span class="hd-nav-item">
            <i class="el-icon-full-screen" ></i>
            <span class="hd-nav-bar"></span>
        </span>

        <el-popover
            placement="bottom"
            trigger="hover">
            <span class="hd-nav-item" slot="reference">
                <i class="el-icon-s-custom"></i>
            </span>
                <p class="hd-nav-btn" @click="editOpen">修改密码</p>
                <p class="hd-nav-btn" @click="logout">注册登录</p>
        </el-popover>

        <span class="hd-nav-item">
            <i class="el-icon-more"></i>
            <span class="hd-nav-bar"></span>
        </span>
    </div>

    <el-dialog title="修改密码" :visible.sync="openDialog" width="30%" append-to-body @close="close">
      <div  style="width:100%;text-align:center">
        <el-form :model="form" ref="form" :rules="rules" label-width="120px">
          <el-form-item label="原密码：" prop="oldPassword">
            <el-input show-password v-model="form.oldPassword" placeholder="请填写原密码" class="imput_discount"  maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="新密码：" prop="newPassword">
            <el-input show-password v-model="form.newPassword" placeholder="密码为6-20位字符,包含字母,数字,特殊字符@#$%&*" class="imput_discount" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="confirmPassword">
            <el-input show-password v-model="form.confirmPassword" placeholder="请填写确认密码" class="imput_discount"  maxlength="20"></el-input>
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
export default {
  data () {
      let validatePass = (rule, value, callback) => {
        if (value !== this.form.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else if(value==this.form.oldPassword){
          callback(new Error('新密码不能与旧密码相同!'));
        }
        else {
          callback();
        }
      };
    return {
        //弹出框
        openDialog: false,
        loading: false,
        form: {
          oldPassword: "",
          newPassword: "",
          confirmPassword: ""
        },
        rules: {
          oldPassword: [{required: true, message: "请输入原密码", trigger: "blur"}],
          newPassword: [{required: true, message: "请输入新密码，密码必须包含字母，数字，字符.", trigger: "blur"},
            { pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%&*]).{6,20}$/,message: '密码格式为6-20位字符,包含字母,数字,特殊字符@#$%&*', trigger: 'blur'}
            ],
          confirmPassword: [
            {required: true,  message: "请输入确认密码", trigger: "blur"},
            { required: true,validator: validatePass,  trigger: "blur"},
            { pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%&*]).{6,20}$/,message: '密码格式为6-20位字符,包含字母,数字,特殊字符@#$%&*', trigger: 'blur'}
          ]
        }

    };
  },

  created: {},

  methods:  {
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
          .catch(err => {
            this.msgError(err.message)
          })
      },
      submitForm(formName) {
        let data = {oldPassword:this.form.oldPassword,newPassword:this.form.newPassword}
        this.$refs[formName].validate((valid) => {
          if (valid) {
            return this.UpdatePassWord(data).then(res => {
              if (res.code == 0) {
                this.$notify.success({ title: '提示', message: '更改密码成功' })
                this.form = []
                this.openDialog = false
              } else {
                this.$notify.error({ title: '错误', message: res.msg })
              }
            })
              .catch(err => {
                this.$notify.error({ title: '错误', message: err })
              })
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
        return this.openDialog = true
      }

  },
}
</script>

<style>
.el-popover{
    margin-top: 0!important;
    padding: 0!important;
}
 .hd-nav-btn {
    height: 38px;
    line-height: 38px;
    font-size: 16px;
    color: #666;
    text-align: center;
    margin: 0;
    cursor: pointer;
}
 .hd-nav-btn:hover {
     background: #F6F6F6;
     color: #2d8cf0;
 }
</style>