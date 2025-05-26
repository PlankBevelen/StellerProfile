<template>
    <div class="resume-container">
        <!-- 头部 -->
        <div class="resume-header">
            <!-- shadow --><div class="fold-shadow"></div>
            <!-- 头像 -->
            <div class="resume-avatar">
                <img :src="resumeData.baseinfo.avatar" alt="avatar">
            </div>

            <!-- 头部内容 -->
            <div class="header-content">
                <span class="header-name"> {{ resumeData.baseinfo.name || '姓名'}} </span>
            </div>
        </div>

        <!-- 内容 -->
        <div class="resume-content">
            <!-- 左侧 -->
            <div class="resume-left">
                <!-- 教育经历 -->
                <div class="resumeData-item-container">
                    <div class="section-title">
                        <img class="section-icon" src="./assets/educations.png" alt="icon">
                        <span class="section-name">教育经历</span>
                    </div>
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
                    <div class="section-title">
                        <img class="section-icon" src="./assets/works.png" alt="icon">
                        <span class="section-name">工作经历</span>
                    </div>
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
                    <div class="section-title">
                        <img class="section-icon" src="./assets/projects.png" alt="icon">
                        <span class="section-name">项目经历</span>
                    </div>
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
                    <div class="section-title">
                        <img class="section-icon" src="./assets/awards.png" alt="icon">
                        <span class="section-name">奖项荣誉</span>
                    </div>
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
                    <div class="section-title">
                        <img class="section-icon" src="./assets/self-evaluation.png" alt="icon">
                        <span class="section-name">自我评价</span>
                    </div>
                    <div class="evaluation-desc">
                        {{resumeData.self_evaluation}}
                    </div>
                </div>
            </div>
            <!-- 右侧 -->
            <div class="resume-right">
                <div class="base-info"> 
                    <div class="base-info-item" v-if="resumeData.baseinfo.email">
                        年龄 {{resumeData.baseinfo.age}}
                    </div>
                    <div class="base-info-item" v-if="resumeData.baseinfo.gender">
                        性别 {{resumeData.baseinfo.gender === '1' ? '男' : '女'}}
                    </div>
                    <div class="base-info-item" v-if="resumeData.baseinfo.phone">
                        电话 {{resumeData.baseinfo.phone}}
                    </div>
                    <div class="base-info-item" v-if="resumeData.baseinfo.email">
                        邮箱 {{resumeData.baseinfo.email}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { defineProps, onMounted } from 'vue';

const props = defineProps({
    resumeData: {
        type: Object,
        required: true
    }
});

// 父组件数据
const resumeData = props.resumeData;


</script>

<style scoped>
.resume-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
}

.resume-header {
    margin-top: 10px;
    position: relative;
    width: 100%;
    height: 90px;
    overflow: hidden;
}

.resume-header::before {
    content: '';
    position: absolute;
    left: 0;
    top: 25px;
    width: 75%;
    height: 100%;
    background: rgb(55, 184, 87);
    z-index: 1;
}

.resume-header::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0px;
    width: 25%;
    height: 100%;
    background: rgb(55, 184, 87);
    transform: translateY(-20px);

    box-shadow: -4px 0 12px rgba(0,0,0,0.2);
    z-index: 2;
}

.fold-shadow {
    position: absolute;
    left: 64%;
    top: 0;
    width: 110px;
    height: 100px;
    background: rgba(55, 184, 87, 0.414);
    transform: rotate(15deg);
    z-index: 3;
}

/* 头部内容 */
.resume-avatar {
    z-index: 100;
    position: absolute;
    left: 8%;
    width: 76px;
    height: 90px;
    border: 2px solid #d1cfcf;
}

.resume-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.header-content {
    position: absolute;
    left: 28%;
    top: 25px;
    z-index: 100;
    height: 72%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
}

.header-name {
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    font-family: '黑体', Arial, "Helvetica Neue", Helvetica, sans-serif;
    letter-spacing: 2px;
}

/* 内容 */
.resume-content {
    display: flex;
    gap: 14px;
    flex: 1;
    margin: 20px 0;
}   

.resume-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.resume-right {
    width: 28%;
    height: 100%;

    box-sizing: border-box;
    display: flex;
    flex-direction: column; 
    gap: 10px;
    background: rgb(55, 184, 87);

    clip-path: polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 6%);
}

/* 左侧 */
.resumeData-item-container {
    display: flex;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    flex-direction: column;
}

.section-title {
    height: 40px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 8px;
}

.section-icon {
    width: 20px;
    height: 20px;
    object-fit: cover;
    object-position: center;
    overflow: hidden;
    background: rgb(55, 184, 87);
    border-radius: 50%;
    padding: 4px;
    box-sizing: border-box;
    display: flex;
}

.section-name {
    font-size: 12px;
    color: rgb(55, 184, 87);
    font-weight: 600;
    flex: 1;

    padding-bottom: 6px;
    border-bottom: 1px solid rgb(55, 184, 87);
    box-sizing: border-box;
}

/* 各ITEM */
.edu-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 8px;
    width: 100%;
}

.project-link {
    font-size: 8px;
}

.work-item {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 8px;
    width: 100%;
}

.work-desc {
    word-wrap: break-word;
    word-break: break-all;
    line-height: 1.2;
    font-size: 8px;
}

.project-item,
.award-item {
    line-height: 1.6;
    font-size: 8px;
    width: 100%;
}

.evaluation-desc {
    word-wrap: break-word;
    word-break: break-all;
    line-height: 1.4;
    font-size: 8px;
    display: flex;
    width: 100%;
}

/* 右侧 */
.base-info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 54px;
    padding: 0 10px;
}

.base-info-item {
    font-size: 9px;
    color: #fff;
    font-weight: 400;
    font-family: '黑体', Arial, "Helvetica Neue", Helvetica, sans-serif;
}

</style>