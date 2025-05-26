<!-- RequestArea.vue -->
<template>
    <div class="request-container">
        <h3 class="section-title">岗位要求</h3>
        <el-input
            v-model="jobRequirements"
            type="textarea"
            :rows="5"
            placeholder="请输入目标岗位的具体要求..."
        />

        <h3 class="section-title">个人经历</h3>
        <el-input
            v-model="experience"
            type="textarea"
            :rows="8"
            placeholder="请详细描述您的工作/项目经历..."
        />

        <el-button 
            type="success" 
            class="submit-btn"
            @click="submitRequest"
        >
        提交优化
        </el-button>
    </div>
</template>

<script setup>

import { ref, defineEmits } from 'vue'

const jobRequirements = ref('')
const experience = ref('')
const emit = defineEmits(['submit'])

const submitRequest = () => {
    emit('submit', {jobRequirements: jobRequirements.value, experience: experience.value})
}

</script>

<style scoped>
.request-container {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.section-title {
    margin: 15px 0 10px;
    color: #303133;
    font-size: 16px;
}

.submit-btn {
    margin-top: 20px;
    width: 100%;
}

.el-textarea {
    margin-bottom: 15px;
}
</style>