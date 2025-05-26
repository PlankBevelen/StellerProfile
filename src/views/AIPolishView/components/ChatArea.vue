<!-- ChatArea.vue -->
<template>
    <div class="chat-container">
        <!-- 固定提示 -->
        <div class="fixed-notice">
            <h3>简历优化助手</h3>
            <p>请描述您的简历优化需求（建议100字以上）</p>
        </div>

        <!-- 可关闭提示框 -->
        <div v-if="showTip" class="tip-box">
            <div class="tip-header">
                <span>操作提示</span>
                <el-icon class="close-icon" @click="showTip = false"><Close /></el-icon>
            </div>
            <p>1. 请详细描述您的工作经历和项目经验</p>
            <p>2. 说明您期望优化的方向和重点</p>
        </div>

        <!-- 聊天区域 -->
        <div class="chat-messages">
            <div 
                v-for="(message, index) in messages" 
                :key="index" 
                class="chat-message"
                :class="message.type"
            >
                <div class="message-bubble">
                    <div v-if="message.type !== 'user'" class="reason-content">
                        <span class="reason-label">思维链：</span>
                        {{ message.reason_content }}
                    </div>
                    <div class="message-content">{{ message.content }}</div>
                    <div class="message-time">{{ message.time }}</div>
                </div>
            </div>
        </div>

        <!-- 输入区域 -->
        <div class="input-area">
            <el-input
                v-model="message"
                type="textarea"
                :rows="4"
                placeholder="请输入您的需求..."
            />
            <el-button 
                type="primary" 
                class="send-btn"
                @click="sendMessage"
            >
                发送
            </el-button>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { Close } from '@element-plus/icons-vue'
import axois from 'axios'

const showTip = ref(true)
const message = ref('')

const messages = ref([])

const formData = defineProps({
    formData: Object
})

const sendMessage = async () => {
    const account = localStorage.getItem('account')
    if (!account) {
        alert('请先登录')
        return
    }

    if (message.value.trim() === '') {
        return
    }

    const newMessage = {
        content: message.value.trim(),
        time: new Date().toLocaleString(),
        type: 'user'
    }

    messages.value.push(newMessage)
    let newMessageValue =  message.value.trim() 
    message.value = ''

    // 系统回复
    if(formData.formData.jobRequirements) {
        newMessageValue = "岗位要求：" + formData.formData.jobRequirements + newMessageValue
    }
    if(formData.formData.experience) {
        newMessageValue = "经历：" + formData.formData.experience + newMessageValue
    }
    
    const response = await axois({
        url : `http://localhost:8080/polish/get?message=${newMessageValue}&account=${account}`,
        method : 'GET',
    });
    const data = response.data.data
    const systemMessage = {
        reason_content: data.reason_content,
        content: data.content,
        time: new Date().toLocaleString(),
        type:'system'
    }

    messages.value.push(systemMessage)
}

</script>

<style scoped>
.chat-container {
    display: flex;
    flex-direction: column;
    height: 100%;

    box-sizing: border-box;
}

.fixed-notice {
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
    margin-bottom: 15px;
}

.fixed-notice h3 {
    margin: 0 0 8px;
    color: #303133;
}

.fixed-notice p {
    margin: 0;
    color: #909399;
    font-size: 13px;
}

.tip-box {
    background: #f4f4f5;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 15px;
    position: relative;
}

.tip-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.close-icon {
    cursor: pointer;
    color: #909399;
}

.chat-messages {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 15px;
    border: 1px solid #ebeef5;
    border-radius: 8px;
    padding: 10px;
}

.chat-message {
    margin: 12px 0;
    display: flex;
}

.chat-message.user {
    justify-content: flex-end;
}

.message-bubble {
    max-width: 500px;
    padding: 12px 16px;
    border-radius: 8px;
    position: relative;
    line-height: 1.5;
}

.user .message-bubble {
    background: #409EFF;
    color: white;
    border-bottom-right-radius: 2px;
}

.system .message-bubble {
    background: white;
    color: #303133;
    border-bottom-left-radius: 2px;
}

.message-time {
    font-size: 12px;
    color: rgba(255,255,255,0.7);
    margin-top: 4px;
    text-align: right;
}

.system .message-time {
    color: rgba(0,0,0,0.4);
}

.message-content {
    white-space: pre-wrap;
    word-break: break-word;
}

.chat-messages::-webkit-scrollbar {
    width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

.chat-messages::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
}

.chat-message.system {
    justify-content: flex-start;
}


.input-area {
    border-top: 1px solid #ebeef5;
    padding-top: 15px;
}

.send-btn {
    margin-top: 10px;
    width: 100%;
}

.reason-content {
    margin-top: 8px;
    font-size: 12px;
    color: #8d8d8d;
    line-height: 1.6;
    max-width: 500px;
    border-left: 2px solid #969595;
    padding-left: 10px;
    margin-bottom: 16px;
}

.reason-label {
    font-weight: bold;
    color: #999;
}
</style>