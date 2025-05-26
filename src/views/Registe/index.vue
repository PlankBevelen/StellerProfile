<template>
    <div class="registe-container">
        <div class="registe-box">
            <div class="registe-header">
                <h1 class="auth-title">注册新账号</h1>
                <p class="auth-subtitle">开启您的星简界之旅</p>
            </div>

            <div class="registe-form">
                <div class="registe-form-item">
                    <el-input v-model="registeForm.email" placeholder="请输入邮箱账号" :prefix-icon="Message" size="large"/>
                </div>

                <div class="registe-form-item"> 
                    <el-input v-model="registeForm.password" placeholder="请输入密码" :prefix-icon="Lock" type="password" size="large"/>
                </div>

                <div class="registe-form-item"> 
                    <el-input v-model="registeForm.confirmPassword" placeholder="请再次输入密码" :prefix-icon="Lock" type="password" size="large"/>
                </div>

                <div class="registe-form-item">
                    <span class="code-box">
                        <el-input v-model="registeForm.code" placeholder="请输入验证码" :prefix-icon="Key" size="large"/>
                        <el-button class="code-btn" :disabled="codeCount > 0" @click="sendCode"> {{ codeCount > 0 ? `重新获取(${codeCount})` : '获取验证码' }}</el-button>
                    </span>
                </div>

                <div class="registe-form-item">
                    <el-button class="registe-btn" type="primary" @click="register" size="large">注册</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock, Message, Key } from '@element-plus/icons-vue'
import axios from 'axios'

const router = useRouter()

// 注册表单数据
const registeForm = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  code: ''
});

const verifyCode = ref('')

// 验证码倒计时
const codeCount = ref(0)

// 发送验证码
const sendCode = async () => {
    if (registeForm.email === '') {
        ElMessage.error('请输入邮箱')
        return
    }
    // 发送验证码
    const res = await axios ({ method: 'GET', url: 'http://localhost:8080/generateCode', params: { to : registeForm.email }});
    if(res.data.code === '200') {
        verifyCode.value = res.data.data;
    }

    // 60秒倒计时
    codeCount.value = 60
    const timer = setInterval(() => {
        codeCount.value--
        if (codeCount.value === 0) {
        clearInterval(timer)
        }
    }, 1000)
}

// 注册
const register = async () => {
    if (registeForm.email === '') {
        ElMessage.error('请输入邮箱')
        return
    }
    if (registeForm.password !== registeForm.confirmPassword) {
        ElMessage.error('两次密码输入不一致')
        return
    }
    if (registeForm.code !== verifyCode.value) {
        ElMessage.error('验证码错误')
        return
    }
    const res = await axios ({ method: 'POST', url: 'http://localhost:8080/api/user/registe', data: { account : registeForm.email, password : registeForm.password } });
    console.log(res.data)
    if(res.data.code === '200') {
        ElMessage.success('注册成功，请登录')
        window.location.href = '/stellerprofile/login'
        return 
    }
    ElMessage.error('注册失败')
}

</script>

<style scoped>

.registe-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.registe-box {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);

    padding: 20px 40px;
    background: #fff;
    width: 40%;
}

.registe-header {
    text-align: center;
    margin-bottom: 40px;
}

.auth-title {
    font-size: 24px;
    color: #303133;
    margin-bottom: 8px;
}

.auth-subtitle {
    font-size: 14px;
    color: #909399;
}

.registe-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.registe-form-item {
    display: flex;
    height: 48px;
}

.code-box {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
}

.code-box > .el-input {
    height: 100%;
}

.code-btn {
    height: 100%;
}

.registe-btn {
    width: 100%;
}

</style>