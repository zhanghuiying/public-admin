<template>
  <div
    class="content-login"
    :style="loginStyle"
  >
    <div class="login_box">
      <p class="login_title">盛鼎科技</p>
        <el-form ref="queryForm" :model="loginForm" :rules="loginFormRules" label-width="60px" class="login_form">
          <el-form-item prop="username" label="账号">
            <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
          </el-form-item>
          <div class="btn_s">
            <span class="login_btn" @click="login">登录</span>
            <span class="reset_btn" @click="resetLoginForm">重置</span>
          </div>
        </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  components: {
  },
  data () {
    return {
      loginStyle: {
        'background-repeat': 'no-repeat no-repeat',
        'background-repeat': 'no-repeat no-repeat',
        'background-image':
          'url(' + require('../assets/images/loginbg.jpg') + ')',
        'background-size': '100% 100%',
        '-webkit-background-size': '100% 100%',
        '-o-background-size': '100% 100%'
      },
      loginForm: {
        username: 'sdadmin',
        password: 'qQ123456'
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入账号密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }

    }
  },
  created () {
  },
  methods: {
    resetLoginForm() {
      this.resetForm("queryForm");
    },
    login() {
      this.$router.push('/home')
      // this.$refs.loginFormRef.validate(async valid => {
      //   if (!valid) return
      //   const { data: res } = await this.$http.post('login', this.loginForm)
      //   if (res.meta.status !== 200) return this.$message.error('登录失败！')
      //   // this.$message.success('登录成功')
      //   window.sessionStorage.setItem('token', res.data.token)
      //   this.$router.push('/home')
      // })
    }
    
    // checkPhone(rule, value, callback){
    //   if (!/^1\d{10}$/.test(value)) {
    //     callback("请输入正确的手机号码！");
    //     return false;
    //   }
    //    callback();
    //  },

    // submitForm(formName) {
    //   this.$refs[formName].validate(valid => {
    //     if (valid) {
    //       // this.$router.push('/dataaccessusername');
    //       let param = {
    //           'client_id':'Baldur_Partner_Backend',
    //           'client_secret':'ErdjLOY9IUVm06H1',
    //           'grant_type':'password',
    //           'password':this.form.password,
    //           'username':this.form.username,
    //         }
    //         this.$http({
    //           method:'post',
    //           url:'connect/token',
    //           headers:{
    //             'Content-Type':'application/x-www-form-urlencoded'
    //           },
    //           data:this.$qs.stringify(param)
    //         }).then((res)=>{
    //           localStorage.setItem('username', this.form.username);
    //           if(res.status == 200){//登录成功跳转并保存token
    //           const access_token=res.data.access_token;
    //             sessionStorage.setItem('access_token', access_token);
    //             this.$router.push('/dataaccessusername');
    //           }

    //         }).catch((response)=>{
    //           console.log(response);
    //         })
    //     } else {
    //       console.log('error submit!!')
    //       return false
    //     }
    //   })
    // }
  }
}
</script>
<style>
  .el-input.is-active .el-input__inner, .el-input__inner:focus {
    border-color: #2d8cf0;
}
</style>
<style lang='less' scoped>
.content-login{
  width: 100%;
  height: 100%;
}
.content-login .login_box{
  position: absolute;
  left: 50%;
  top: 50%;
  width: 450px;
  height: 300px;
  background: #fff;
  border-radius: 3px;
  transform: translate(-50%,-50%);
  padding: 0 25px;
}
.login_box .login_title{
  font-size: 24px;
  font-weight: bold;
  color: #000;
  letter-spacing: 6px; 
  margin: 20px 0;
}
.login_box .btn_s{
  margin-top: 38px;
}
.login_box .btn_s span{
  display: inline-block;
  height: 38px;
  line-height: 38px;
  padding: 0 24px;
  font-size: 16px;
  text-align: center;
  border-radius: 3px;
  cursor: pointer;
  margin: 0 38px;
}
.login_box .btn_s .login_btn{
  background: #409EFF;
  color: #fff;
}
.login_box .btn_s .reset_btn{
  background: #a6a9ad;
  color: #fff;
}
.login_box .btn_s .login_btn:hover{
  background: #2d8cf0;
}
.login_box .btn_s .reset_btn:hover{
  background: #82848a;
}



</style>
