<template>
    <div class="profile-view">
        <!-- 背景图 -->
        <div class="profile-bg">
            <img src="@/assets/profileview/bg1.jpg" class="bg-img">
        </div>

        <!-- 主体内容 -->
        <div class="profile-content">
            <div class="profile-header">
                <h1>我的简历</h1>
                <span>
                    <el-button :icon="Edit" size="large" round @click="handleEdit">编辑</el-button>
                    <el-button size="large" round @click="handleLogout" type="danger">退出登录</el-button>
                </span>
                
            </div>

            <div class="profile-body">
                <InfoArea/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Edit } from '@element-plus/icons-vue'
import { ref } from 'vue'
import router from '@/router/index.js'
import InfoArea from './components/InfoArea.vue'

const handleEdit = () => {
    router.push({ name: 'ResumeEdit' })
}

const handleLogout = () => {
    // 退出登录逻辑
    localStorage.removeItem('account');
    window.location.href = '/';
}

</script>


<style scoped>

.profile-view {
    height: calc(100vh - 80px);
    box-sizing: border-box;
    background: radial-gradient(circle at top left, #F7FAFF 0%, #E3F2FD 100%);
    display: flex;
}

.profile-bg {
    width: 100%;
    height: 280px;
}

.bg-img {
    width: 100%;
    height: 100%;
}

.profile-content {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 65%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    top: 100px;
}

.profile-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.profile-header h1 {
    color: #fff;
    letter-spacing: 1px;
    font-size: xx-large;
}

.profile-body {
    width: 100%;
}

</style>