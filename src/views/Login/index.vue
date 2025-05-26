<template>
    <div class="login-container">
        <div class="login-box">
            <div class="login-header">
                <h1 class="title">欢迎回来</h1>
                <p class="subtitle">请登录您的账号</p>
            </div>

            <div class="login-form">
                <div class="username-input-box">
                    <el-input class="input-item" v-model="loginForm.account" placeholder="请输入邮箱账号" :prefix-icon="User" clearable>

                    </el-input>
                </div>
                <div class="password-input-box">
                    <el-input class="input-item" v-model="loginForm.password" placeholder="请输入密码" :prefix-icon="Lock" type="password" clearable>
                        
                    </el-input>
                </div>
                <div class="login-btn-box">
                    <el-button type="primary" @click="login" class="login-btn">登录</el-button>
                </div>
            </div>

            <div class="login-footer">
                <el-link type="info" @click="gotoRegister">注册账号</el-link>
                <el-link type="primary" @click="gotoForget">忘记密码?</el-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import axios from 'axios'

const router = useRouter()

// 登录表单数据
const loginForm = reactive({
    account: '',
    password: ''
})

// 登录方法
const login = async () => {
    if(loginForm.account === '' || loginForm.password === '') {
        ElMessage.error('用户名或密码不能为空')
        return
    }
    // 登录逻辑
    const res = await axios({ method: 'POST', url: 'http://localhost:8080/api/user/login', data: { account: loginForm.account, password: loginForm.password }})
    console.log(res.data)
    if( res.data.code === '200' ) {
        window.localStorage.setItem('account', loginForm.account)
        window.location.href = '/stellerprofile/profileview'
    } else {
        ElMessage.error('用户名或密码错误')
    }
}

// 跳转到注册页面
const gotoRegister = () => {
    router.push('/stellerprofile/registe')
}

// 跳转到忘记密码页面
const gotoForget = () => {
    window.location.href = '/stellerprofile/forget'
}

</script>

<style scoped>

.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 91vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.login-box {
    width: 420px;
    padding: 40px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.login-header {
    text-align: center;
    margin-bottom: 40px;
}

.title {
    font-size: 24px;
    color: #303133;
    margin-bottom: 8px;
}

.subtitle {
    font-size: 14px;
    color: #909399;
}

.login-form {
    margin-bottom: 40px;
}

.username-input-box,
.password-input-box {
    margin-bottom: 20px;
}

.el-input__inner {
    border-radius: 8px;
    border: 1px solid #dcdfe6;
    padding: 10px;
    font-size: 16px;
    color: #606266;
    height: 40px;
}

.input-item {
    height: 42px;
}

.login-btn {
    width: 100%;
    margin-top: 10px;
    height: 42px;
}

.login-footer {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
}

.el-link {
    font-size: 14px;
}

</style>