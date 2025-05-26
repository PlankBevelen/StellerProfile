<!-- index.vue -->
<template>
    <div class="polish-container">
        <div class="main-content">
        <!-- 左部聊天部分 -->
        <ChatArea class="left-section" :formData = "formData"/>
        
        <!-- 右部Request部分 -->
        <RequestArea class="right-section" @submit="handleRequestSubmit"/>
        </div>
    </div>
</template>

<script setup>
import ChatArea from './components/ChatArea.vue'
import RequestArea from './components/RequestArea.vue'
import { ref, provide } from 'vue'

const jobRequirements = ref('')
const experience = ref('')

provide('jobRequirements', jobRequirements)
provide('experience', experience)

const formData = ref({})

// 处理通信
const handleRequestSubmit  = (data) => {
    formData.value = data
}
</script>

<style scoped>
.polish-container {
    position: absolute;
    top: 54%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    border: 1px solid #ebeef5;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.main-content {
    display: flex;
    height: 100%;
}

.left-section {
    flex: 1;
    border-right: 1px solid #ebeef5;
    padding: 20px;
    display: flex;
    flex-direction: column;
}

.right-section {
    width: 280px;
    padding: 20px;
    background: #f8f9fa;
}
</style>