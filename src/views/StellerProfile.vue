<template>
    <div class="page-container">
        <!-- 导航栏 -->
        <header class="nav-bar">
            <el-button class="brand-btn" @click="handleBrandClick">
                <img src="@/assets/logo.svg" alt="logo" class="brand-logo">
                <span class="brand-name"><i>星简界</i></span>
            </el-button>

            <el-menu 
                class="nav-menu"
                mode="horizontal"
                :default-active="activeRoutePath"
                :router="true"
            >
                <el-menu-item 
                    index="/stellerprofile/createview" 
                    class="nav-item"
                    >
                    在线制作
                </el-menu-item>

                <el-menu-item 
                    index="/stellerprofile/templatesview" 
                    class="nav-item"
                    >
                    模板挑选
                </el-menu-item>
                
                <el-menu-item 
                    index="/stellerprofile/aipolishview" 
                    class="nav-item"
                >
                    AI润色
                </el-menu-item>
                
                <el-menu-item 
                    index="/stellerprofile/profileview" 
                    class="nav-item-right"
                >
                    个人中心
                </el-menu-item>
            </el-menu>
        </header>
        <!-- 内容 -->
        <main class="page-content">
            <RouterView />
        </main>
    </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import router from '@/router/index.js';
import { useRoute } from 'vue-router';

const route = useRoute();

const activeRoutePath = ref('/stellerprofile/homeview')
watch(() => route.name, (newName) => {    
    const account = localStorage.getItem('account')
    console.log(account)
    if( newName === 'ProfileView' && account === null){
        window.location.href = '/stellerprofile/login'
        return 
    }
    activeRoutePath.value = '/stellerprofile/' + newName
})

const handleBrandClick = () => {
    router.push('/stellerprofile/homeview')
}

</script>

<style scoped>

.page-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.nav-bar {
    display: flex;
    align-items: center;
    height: 72px;
    padding: 0 40px;
    background: linear-gradient(135deg, rgba(137, 247, 254, 0.95) 0%, rgba(102, 166, 255, 0.95) 100%);
    backdrop-filter: blur(8px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
}

.brand-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px !important;
    margin-right: 60px;
    background: transparent !important;
    border: none !important;
    transition: transform 0.3s ease;
    width: auto;
    height: 48px;
    gap: 12px !important;

    &:hover {
        transform: scale(1.05);
    }
}

.brand-logo {
    width: 44px;
    height: 44px;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.brand-name {
    font-size: 24px;
    font-weight: 700;
    color: #2c3e50;
    letter-spacing: 1px;
    text-shadow: 0 2px 4px rgba(255, 255, 255, 0.3);
}

.nav-menu {
    flex: 1;
    height: 100%;
    background: transparent !important;
    border: none !important;
}

:deep(.nav-item) {
    height: 100% !important;
    padding: 0 28px !important;
    font-size: 16px;
    font-weight: 500;
    transition: all 0.3s ease;
    letter-spacing: 1px;

    &:hover {
        background: rgba(255, 255, 255, 0.3) !important;
    }

    &.is-active {
        background: rgba(255, 255, 255, 0.6) !important;
        border-bottom: 4px solid #fff !important;
        font-size: 18px;
    }
}

.nav-item-right {
    position: absolute;
    right: 30px;
}

.page-content {
    flex: 1;
    background: linear-gradient(45deg, #f8fafd 0%, #eef4f9 100%);
}

</style>