<template>
    <!-- 全局背景 -->
    <div class="home-view">
        <!-- 左右分栏 -->
        <div class="home-view-left">
            <div class="header-group">
                <h1 class="gradient-title">
                    一款开源、免费、专业的AI简历生成制作神器
                </h1>
                <h2 class="subtitle">
                    全面接入星火大模型，AI智能润色、修改、AI智能诊断，交付源码级JSON，提供海量模版。
                </h2>
            </div>
            <div class="btn-group">
                <el-button type="primary" size="large" class="btn-group-item" @click="handleCreateViewClick" round>
                    免费制作简历
                </el-button>
                <el-button type="primary" size="large" class="btn-group-item" @click="handlePolishViewClick" round>
                    AI智能润色
                </el-button>
            </div>
            <!-- 功能网格 -->
            <div class="grid-group">
                <div class="grid-item" v-for="item in data.grid_items" :key="item">
                    <div class="grid-content">{{ item }}</div>
                </div>
            </div>
        </div>
        <div class="home-view-right">
            <img src="@/assets/homeview/bg1.png" alt="home背景插图" class="feature-image">
        </div>
    </div>
</template>

<script setup>
import router from "@/router/index.js";

const data = {
    grid_items : [
        "AI诊断", "AI润色", "AI翻译", "AI生成"
    ]
}

const handleCreateViewClick = () => {
    router.push({ name: 'CreateView' })
}

const handlePolishViewClick = () => {
    router.push({ name: 'AIPolishView' })
}

</script>

<style scoped>

.home-view { 
    height: calc(100vh - 80px);
    box-sizing: border-box;
    background: radial-gradient(circle at top left, #F7FAFF 0%, #E3F2FD 100%);
    display: flex;
}

.home-view-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;
    gap: 40px;
    padding: 0 80px;
}

.header-group {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.gradient-title {
    font-size: 3.5rem;
    background: linear-gradient(135deg, #c5f5fc 0%, #4B0082 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin: 0 0 1rem 0;
    font-size: 48px;
    line-height: 1.2;
}

.subtitle {
    font-size: 1.5rem;
    color: #a870d0;
    font-weight: 600;
    margin: 0;
    font-size: 14px;
    font-family: "幼圆", "黑体", "Arial";
}

.btn-group {
    display: flex;
    align-self: start;
    gap: 20px;
}

.btn-group-item {
    background: linear-gradient(135deg, #5e5bef 0%, #7E57C2 100%);
    border: none;
    
    &:hover {
        transform: scale(1.1);
    }

    &:active {
        transform: scale(0.9);
    }   
}

.grid-group {
    display: grid;
    width: 100%;
    box-sizing: border-box;
    grid-template-columns: repeat(4, 1fr);
    gap: 25px;
    margin-top: 40px;
}

.grid-item {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease;
}

.grid-item:hover {
    transform: translateY(-5px);
}

.grid-content {
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #7f50a1;
    font-weight: 500;
    background: linear-gradient(45deg, #f8f8ff, #f0f2ff);
    border-radius: 8px;
    letter-spacing: 2px;
    font-size: large;
}

.home-view-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.feature-image {
    max-width: 90%;
    height: auto;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    transform: perspective(1000px) rotateY(-5deg);
    transition: transform 0.5s ease;
}

.feature-image:hover {
    transform: perspective(1000px) rotateY(0deg);
}

</style>
