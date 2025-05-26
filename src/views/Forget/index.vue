<template>
    <div class="forget-container">
        <div class="forget-box">
        <div class="forget-header">
            <h1 class="auth-title">找回密码</h1>
            <p class="auth-subtitle">重置您的账户密码</p>
        </div>

        <div class="forget-form">
            <!-- 邮箱输入 -->
            <div class="form-item">
            <el-input 
                v-model="forgetForm.email"
                placeholder="请输入注册邮箱"
                :prefix-icon="Message"
                size="large"
                clearable
            />
            </div>

            <!-- 验证码 -->
            <div class="form-item" v-if="!isFinding">
                <div class="code-wrapper">
                    <el-input
                        v-model="forgetForm.code"
                        placeholder="请输入验证码"
                        :prefix-icon="Key"
                        size="large"
                        class="code-input"
                    />
                    <el-button 
                        class="code-btn"
                        :disabled="codeCount > 0"
                        @click="sendVerifyCode"
                    >
                    {{ codeCount > 0 ? `重新发送(${codeCount})` : '获取验证码' }}
                    </el-button>
                </div>
            </div>

            <!-- 新密码 -->
            <div class="form-item" v-if="isFinding">
                <el-input
                    v-model="forgetForm.newPassword"
                    placeholder="请输入新密码"
                    :prefix-icon="Lock"
                    type="password"
                    size="large"
                    show-password
                />
            </div>

            <!-- 确认密码 -->
            <div class="form-item" v-if="isFinding">
                <el-input
                    v-model="forgetForm.confirmPassword"
                    placeholder="请再次输入新密码"
                    :prefix-icon="Lock"
                    type="password"
                    size="large"
                    show-password
                />
            </div>

            <!-- 提交按钮 -->
            <div class="form-item">
                <el-button 
                    type="primary" 
                    class="submit-btn"
                    @click="handleSubmit"
                >
                    {{ !isFinding ? '提交' : '重置密码' }}
                </el-button>
            </div>
        </div>

        <div class="back-login">
            <el-link type="primary" @click="goBackLogin">
            <el-icon><ArrowLeft /></el-icon>
            返回登录
            </el-link>
        </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Message, Key, Lock, ArrowLeft } from '@element-plus/icons-vue'
import axios from 'axios'

const router = useRouter()

// 表单数据
const forgetForm = reactive({
    email: '',
    code: '',
    newPassword: '',
    confirmPassword: ''
})

// 验证码相关
const verifyCode = ref('')
const codeCount = ref(0)

const isFinding = ref(false)

// 发送验证码
const sendVerifyCode = async () => {
    if (!forgetForm.email) {
        ElMessage.error('请输入邮箱地址')
        return
    }
    
    try {
        const res = await axios.get('http://localhost:8080/generateCode', {
        params: { to: forgetForm.email }
        })
        
        if (res.data.code === '200') {
            verifyCode.value = res.data.data
            startCountDown()
            ElMessage.success('验证码已发送')
        }
    } catch (error) {
        ElMessage.error('验证码发送失败')
    }
}

// 倒计时
const startCountDown = () => {
    codeCount.value = 60
    const timer = setInterval(() => {
        codeCount.value--
        if (codeCount.value <= 0) {
        clearInterval(timer)
        }
    }, 1000)
}

// 提交重置
const handleSubmit = async () => {
    // 表单验证
    if(!isFinding.value) {
        if (!forgetForm.code) {
            ElMessage.error('请输入验证码')
            return
        }
        if (forgetForm.code !== verifyCode.value) {
            ElMessage.error('验证码错误')
            return
        }
        isFinding.value = true;
        return;
    }

    if(isFinding.value) {
        if (!forgetForm.email) {
            ElMessage.error('请输入邮箱')
            return
        }
        if (!forgetForm.newPassword) {
            ElMessage.error('请输入新密码')
            return
        }
        if (forgetForm.newPassword !== forgetForm.confirmPassword) {
            ElMessage.error('两次输入密码不一致')
            return
        }

        try {
            const res = await axios.post('http://localhost:8080/api/user/changePassword', {
                account: forgetForm.email,
                password: forgetForm.newPassword
            });

            if(res.data.code === '200') {
                ElMessage.success('密码修改成功')
                router.push('/stellerprofile/login')
            }else {
                ElMessage.error('密码修改失败')
            }
        } catch (error) {
            ElMessage.error('密码修改失败')
        }
    }
}

// 返回登录
const goBackLogin = () => {
    router.push('/stellerprofile/login')
}
</script>

<style scoped>
.forget-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 91vh;
    box-sizing: border-box;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.forget-box {
    width: 420px;
    padding: 40px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.forget-header {
    text-align: center;
    margin-bottom: 32px;
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

.forget-form {
    margin-bottom: 24px;
}

.form-item {
    margin-bottom: 20px;
}

.code-wrapper {
    display: flex;
    gap: 12px;
}

.code-input {
    flex: 1;
}

.code-btn {
    width: 120px;
}

.submit-btn {
    width: 100%;
    height: 42px;
    margin-top: 8px;
}

.back-login {
    text-align: center;
    margin-top: 16px;
}

.el-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
}
</style>