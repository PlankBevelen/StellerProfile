<template>
    <div class="resume-container">
        <!-- header -->
        <div class="header-container">
            <div style="height: 100%; width: 100%; display: flex; flex-direction: column; justify-content: center; ">
                
                <el-descriptions 
                    :title="resumeData.baseinfo.name"
                    :column="2"
                    class="custom-descriptions" >

                    <el-descriptions-item label="年龄" label-class-name="desc-label" v-if="resumeData.baseinfo.age">
                        {{resumeData.baseinfo.age}}
                    </el-descriptions-item>
                    
                    <el-descriptions-item label="邮箱" label-class-name="desc-label" v-if="resumeData.baseinfo.email"> 
                        {{resumeData.baseinfo.email}}
                    </el-descriptions-item>
                    
                    <el-descriptions-item label="电话号码" label-class-name="desc-label" v-if="resumeData.baseinfo.phone">
                        {{resumeData.baseinfo.phone}}
                    </el-descriptions-item>

                    <el-descriptions-item label="性别" label-class-name="desc-label" v-if="resumeData.baseinfo.gender">
                        {{resumeData.baseinfo.gender ? '男' : '女'}}
                    </el-descriptions-item>
                </el-descriptions>
            </div>
            
            
            <div class="avatar-container">
                <img :src="resumeData.baseinfo.avatar" alt="avatar" class="avatar-img">
            </div>
        </div>

        <!-- main content -->
        <div class="main-content-container">
            <!-- 教育经历 -->
            <div class="resumeData-item-container">
                <h4 class="section-title">教育经历</h4>
                <div 
                    v-for="(edu, index) in resumeData.educations"
                    class="edu-item"
                    >
                    <!-- 时间 --> <span v-if="edu.start_time && edu.end_time">{{edu.start_time}} 至 {{edu.end_time}}</span>
                    <!-- 学校 --> <span>{{edu.school}}</span>
                    <!-- 专业 --> <span>{{edu.major}}</span>
                    <!-- 学历 --> <span>{{edu.degree}}</span>
                </div>
            </div>
            <!-- 工作经历 -->
            <div class="resumeData-item-container" v-if="resumeData.works.is_empty === true">
                <h4 class="section-title">工作经历</h4>
                <div 
                    v-for="(work, index) in resumeData.works.list"
                    class="work-item"
                    >   
                    <div class="edu-item">
                        <!-- 时间 --> <span v-if="work.start_time && work.end_time">{{work.start_time}} 至 {{work.end_time}}</span>
                        <!-- 公司 --> <span>{{work.company}}</span>
                        <!-- 职位 --> <span>{{work.position}}</span>
                    </div>
                    <div class="work-desc">
                        <span v-if="work.description">职责：</span>
                        {{work.description}}
                    </div>
                </div>
            </div>
            <!-- 项目经历 -->
            <div class="resumeData-item-container">
                <h4 class="section-title">项目经历</h4>
                <div 
                    v-for="(project, index) in resumeData.projects"
                    class="project-item"
                    >
                    <div class="edu-item">
                        <!-- 时间 --> <span v-if="project.start_time && project.end_time">{{project.start_time}} 至 {{project.end_time}}</span>
                        <!-- 项目名称 --> <span><b>{{project.name}}</b></span>
                        <!-- 角色 --> <span>{{project.role}}</span>
                    </div>
                    <div class="project-link" v-if="project.link">
                        项目链接：<a href="{{project.link}}" target="_blank">{{project.link}}</a>
                    </div>
                    <div class="work-desc" v-if="project.description">
                        <span>项目描述：</span>
                        {{project.description}}
                    </div>
                </div>
            </div>
            <!-- 奖项荣誉 -->
            <div class="resumeData-item-container" v-if="resumeData.awards.is_empty === true">
                <h4 class="section-title">奖项荣誉</h4>
                <div 
                    v-for="(award, index) in resumeData.awards.list"
                    class="award-item"
                    >
                    <div class="edu-item">
                        <!-- 时间 --> <span>{{award.time}}</span>
                        <!-- 奖项名称 --> <span><b>{{award.name}}</b></span>
                    </div>
                    <div class="work-desc">
                        <span v-if="award.description">奖项描述：</span>
                        {{award.description}}
                    </div>
                </div>
            </div>
            <!-- 自我评价 -->
            <div class="resumeData-item-container">
                <h4 class="section-title">自我评价</h4>
                <div class="work-desc">
                    {{resumeData.self_evaluation}}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    resumeData: {
        type: Object,
        required: true
    }
});

// 父组件数据
const resumeData = props.resumeData;

</script>

<!-- 头部区域 -->
<style scoped>
.resume-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}


/* 头部区域 */
.header-container {
    width: 100%;
    background: rgba(0, 0, 0, 0.75);
    height: 18%;
    padding: 0px 32px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
}

.custom-descriptions {
    box-sizing: border-box;
    width: 100%;
    height: 80%;
}

.main-title {
    margin: 20px 0 10px 0;
    color: #fff;
    letter-spacing: 2px;
    font-size: 18px;
    font-family: '黑体', sans-serif;
}

:deep(.el-descriptions__title) {
    color: #fff;
}

:deep(.el-descriptions__cell) {
    border: none;
    background: rgba(0, 0, 0, 0.75) !important;
    padding: 0;
    margin: 0;
}

:deep(.el-descriptions__label) {
    color: #fff;
    font-size: 12px;
}

:deep(.el-descriptions__content) {
    color: #ffffff73;
    font-size: 12px;
}

.avatar-container {
    width: 80px;
    height: 90px;
    overflow: hidden;
    box-sizing: border-box;
}

.avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.2);
}

.main-content-container {
    flex: 1;
    height: 100%;
    width: 100%;

    box-sizing: border-box;
    background: #ffffff;

    padding: 2px 34px;
}

.resumeData-item-container {
    width: 100%;
    margin-bottom: 20px;
}

.section-title::after {
    background: #000;
    content: "";
    display: block;
    height: 2px;
    margin-top: 10px;
}

.edu-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
}

.project-link {
    font-size: 12px;
}

.work-item {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 12px;
}

.work-desc {
    word-wrap: break-word;
    word-break: break-all;
    line-height: 1.2;
    font-size: 12px;
}

.project-item,
.award-item {
    line-height: 1.6;
    font-size: 12px;
}

</style>
