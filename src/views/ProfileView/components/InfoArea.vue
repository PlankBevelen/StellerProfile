<template>
    <div class="info-area">
        <div class="baseinfo-box section-card">
            <el-descriptions title="基础信息" :column="2" direction="vertical">
                <el-descriptions-item label="姓名" width="150px">{{ resumeData.baseinfo.name }}</el-descriptions-item>
                <el-descriptions-item label="手机号码">{{ resumeData.baseinfo.phone }}</el-descriptions-item>
                <el-descriptions-item label="邮箱">{{ resumeData.baseinfo.email }}</el-descriptions-item>
                <el-descriptions-item label="年龄">{{ resumeData.baseinfo.age }}</el-descriptions-item>
                <el-descriptions-item label="性别">{{ resumeData.baseinfo.gender === 1 ? '男' : '女' }}</el-descriptions-item>
            </el-descriptions>
        </div>

        <div class="educations-box section-card" >
            <h3 class="section-title">教育经历</h3>
            <div v-for="(edu, index) in resumeData.educations" :key="index" class="education-item">
                <el-descriptions :column="2" direction="vertical">
                    <el-descriptions-item label="学校">{{ edu.school }}</el-descriptions-item>
                    <el-descriptions-item label="学历">{{ edu.degree }}</el-descriptions-item>
                    <el-descriptions-item label="专业">{{ edu.major }}</el-descriptions-item>
                    <el-descriptions-item label="时间">{{ edu.start_time }} 至 {{ edu.end_time }}</el-descriptions-item>
                </el-descriptions>
            </div>
        </div>

        <div class="works-box section-card" v-if="!resumeData.works.is_empty">
            <h3 class="section-title">工作经历</h3>
            <div v-for="(work, index) in resumeData.works.list" :key="index" class="work-item">
                <el-descriptions :column="2" direction="vertical">
                    <el-descriptions-item label="公司">{{ work.company }}</el-descriptions-item>
                    <el-descriptions-item label="职位">{{ work.position }}</el-descriptions-item>
                    <el-descriptions-item label="时间" :span="2">
                        {{ work.start_time }} 至 {{ work.end_time }}
                    </el-descriptions-item>
                    <el-descriptions-item label="工作描述" :span="2">
                        {{ work.description }}
                    </el-descriptions-item>
                </el-descriptions>
            </div>
        </div>

        <div class="projects-box section-card" >
            <h3 class="section-title">项目经历</h3>
            <div v-for="(project, index) in resumeData.projects" :key="index" class="project-item">
                <el-descriptions :column="2" direction="vertical">
                    <el-descriptions-item label="项目名称">{{ project.name }}</el-descriptions-item>
                    <el-descriptions-item label="担任角色">{{ project.role }}</el-descriptions-item>
                    <el-descriptions-item label="项目时间">{{ project.start_time }} 至 {{ project.end_time }}</el-descriptions-item>
                    <el-descriptions-item label="项目链接">
                        <el-link :href="project.link" target="_blank">{{ project.link }}</el-link>
                    </el-descriptions-item>
                    <el-descriptions-item label="项目描述" :span="2">
                        <pre style="white-space: pre-wrap;">{{ project.description }}</pre>
                    </el-descriptions-item>
                </el-descriptions>
            </div>
        </div>

        <div class="awards-box section-card" v-if="!resumeData.awards.is_empty">
            <h3 class="section-title">获奖情况</h3>
            <div v-for="(award, index) in resumeData.awards.list" :key="index" class="award-item">
                <el-descriptions :column="2" direction="vertical">
                    <el-descriptions-item label="奖项名称">{{ award.name }}</el-descriptions-item>
                    <el-descriptions-item label="获奖时间">{{ award.time }}</el-descriptions-item>
                    <el-descriptions-item label="奖项描述" :span="2">
                        <pre style="white-space: pre-wrap;">{{ award.description }}</pre>
                    </el-descriptions-item>
                </el-descriptions>
            </div>
        </div>

        <div class="selfevaluation-box section-card">
            <h3 class="section-title">自我评价</h3>
            <pre class="self-evaluation-content">{{ resumeData.self_evaluation }}</pre>
        </div>
    </div>
</template>

<script setup>

import { ElLoading } from 'element-plus';
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';

const resumeData = reactive({
    baseinfo: {
        name: '',
        phone: '',
        email: '',
        age: '',
        gender: '',
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
});

const fetchResumeData = async () => {
    const loading = ElLoading.service({
        lock: true,
        text: '正在加载...',
        background: 'rgba(0, 0, 0, 0.7)'
    });

    try {
        const account = localStorage.getItem('account');
        const response = await axios({
            method: 'GET',
            url: `http://localhost:8080/api/resume/get?account=${account}`
        });
        if(response.data.code === '200'){
            const data = response.data.data;
            resumeData.baseinfo = data.baseinfo;
            resumeData.educations = data.educations;
            resumeData.works.is_empty = data.works.is_empty;
            resumeData.works.list = data.works.list;
            resumeData.projects = data.projects;
            resumeData.awards.is_empty = data.awards.is_empty;
            resumeData.awards.list = data.awards.list;
            resumeData.self_evaluation = data.self_evaluation;
        }

        console.log(response);
    } catch (error) {
        console.log(error);
    } finally {
        loading.close();
    }
}

onMounted(() => {
    fetchResumeData();
});

</script>

<style scoped>

.info-area {
    padding: 30px;
    max-width: 1000px;
    margin: 20px auto;

    background: #fff;
    box-shadow: 10px 12px 12px 0 rgba(0,0,0,0.1);
    border-radius: 12px;
}

.section-card {
    padding: 24px;
}

.section-title {
    color: #303133;
    font-size: 18px;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid #409EFF;
    width: 75px;
}

.education-item,
.work-item,
.project-item,
.award-item {
    margin-bottom: 20px;
}

.self-evaluation-content {
    line-height: 1.6;
    color: #606266;
    white-space: pre-wrap;
    padding: 10px;
    background: #f8f9fa;
    border-radius: 4px;
}

:deep(.el-descriptions__label) {
    font-weight: 500;
    color: rgb(171, 171, 171);
}

:deep(.el-descriptions__cell) {
    width: 50%;
}

</style>