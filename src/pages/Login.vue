<template>
  <div>
    <van-nav-bar
      title="用户登录"
      left-text="返回"
      left-arrow
      @click-left="goBack"
      />
      <div class="login-panel">
        <van-field
          v-model="username"
          label="用户名"
          icon="clear"
          placeholder="请输入用户名"
          required
          @click-icon="username = ''"
          :error-message="usernameErrorMsg"
        />
        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
          :error-message="passwordErrorMsg"
        />
        <div class="login-button">
          <van-button type="primary" size="large" :loading="openLoading" @click="loginAction">登录</van-button>
        </div>
      </div>
  </div>
</template>
<script>
import axios from 'axios'
import url from '@/api/serviceAPI'
import { Toast } from 'vant'
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      openLoading: false,
      usernameErrorMsg: '',
      passwordErrorMsg: ''
    }
  },
  created () {
    if (localStorage.userInfo) {
      Toast.success('您已经登录')
      this.$router.push('/')
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    login () {
      this.openLoading = true
      axios({
        url: url.loginUser,
        method: 'post',
        data: {
          username: this.username,
          password: this.password
        }
      }).then(res => {
        if (res.data.code === 200 && res.data.message) {
          new Promise((resolve, reject) => {
            localStorage.userInfo = {userName: this.username}
            setTimeout(() => {
              resolve()
            }, 500)
          }).then(() => {
            Toast.success('登录成功')
            this.$router.push('/')
          }).catch(err => {
            Toast.fail('登录状态保存失败')
            console.log(err)
          })
        } else {
          Toast.fail('登录失败')
          this.openLoading = false
        }
      }).catch(error => {
        console.log(error)
        Toast.fail('登录失败')
        this.openLoading = false
      })
    },
    checkForm () {
      let isOk = true
      if (this.username.length < 5) {
        this.usernameErrorMsg = '用户名不能小于5位'
        isOk = false
      } else {
        this.usernameErrorMsg = ''
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = '密码不能少于6位'
        isOk = false
      } else {
        this.passwordErrorMsg = ''
      }
      return isOk
    },
    loginAction () {
      this.checkForm() && this.login()
    }
  }
}
</script>
<style lang="less" scoped>
  .login-panel{
    width:96%;
    border-radius: 5px;
    margin:20px auto;
    padding-bottom:50px;
  }
  .login-button{
    padding-top:10px;
  }
</style>
