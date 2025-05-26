<template>
    <div class="resume-container">
        <!-- 左边编辑区域 -->
        <div class="edit-section">
            <ResumeEditor v-model="resumeData" />
        </div>
        <div class="preview-section">
            <ResumePreview :resumeData="resumeData" />
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import ResumeEditor from './components/ResumeEditor.vue';
import ResumePreview from './components/ResumePreview.vue';

const resumeData = reactive({
    baseinfo: {
        name: '',
        phone: '',
        email: '',
        age: '',
        gender: '',
        avatar: '',
    },
    educations: [
        {
            school: '',
            degree: '',
            major: '',
            start_time: '',
            end_time: '',
        }
    ],
    works: {
        is_empty: true,
        list: [{
            company: '',
            position: '',
            start_time: '',
            end_time: '',
            description: ''
        }]
    },
    projects: [
        {
        name: '',
        role: '',
        start_time: '',
        end_time: '',
        link: '',
        description: ''
    }],
    awards: {
        is_empty: true,
        list: [{
            name: '',
            time: '',
            description: ''
        }]
    },
    self_evaluation : ''
})

</script>

<style scoped>
.resume-container {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    height: calc(100vh - 75px);
    background: #f6f6f6;
}

.edit-section {
    flex: 1;
    max-width: 40%;
}

.preview-section {
    flex: 1;
    max-width: 60%;
}
</style>