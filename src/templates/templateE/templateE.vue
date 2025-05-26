<template>
    <div class="resume-container">
        <div class="resume-header">
            <!-- 头部内容 -->
            <div class="header-box">
                <span class="header-name"> {{ resumeData.baseinfo.name || '姓名'}} </span>
                <img :src="resumeData.baseinfo.avatar" alt="avatar">
            </div>
            <div class="header-content">
                <span class="baseinfo-item" v-if="resumeData.baseinfo.age"> 年龄:{{ resumeData.baseinfo.age }} </span>
                <span class="baseinfo-item" v-if="resumeData.baseinfo.gender"> 性别:{{ resumeData.baseinfo.gender === '1' ? '男' : '女' }} </span>
                <span class="baseinfo-item" v-if="resumeData.baseinfo.email"> 邮箱:{{ resumeData.baseinfo.email }} </span>
                <span class="baseinfo-item" v-if="resumeData.baseinfo.phone"> 手机:{{ resumeData.baseinfo.phone }} </span>
            </div>
        </div>

        <!-- 主体内容 -->
        <div class="resume-content">
            <!-- 教育经历 -->
            <div class="resumeData-item-container" style="margin-top: 0 !important;">
                <div class="section-title">
                    <span class="section-title-text"> 教育经历 </span>
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
            <div class="resumeData-item-container">
                <div class="section-title">
                    <span class="section-title-text"> 工作经历 </span>
                </div>
                <div 
                    v-for="(work, index) in resumeData.works.list"
                    class="work-item"
                    >   
                    <div class="edu-item" style="padding: 10px 10px 0 10px !important;">
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
                    <span class="section-title-text"> 项目经历 </span>
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
            <div class="resumeData-item-container">
                <div class="section-title">
                    <span class="section-title-text"> 奖项荣誉 </span>
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
                    <span class="section-title-text"> 自我评价 </span>
                </div>
                <div class="evaluation-desc">
                    {{resumeData.self_evaluation}}
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

/* 头部内容 */
.resume-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 110px;
    margin-top: 10px;
    box-sizing: border-box;
    flex-direction: column;
}

.header-box {
    height: 100%;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    display: flex;
    padding: 5px 32px;
    box-sizing: border-box;
    background: rgb(189, 4, 4);
}

.header-name {
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    font-family: '黑体', Arial, "Helvetica Neue", Helvetica, sans-serif;
    letter-spacing: 2px;
    margin-bottom: 8px;
}

.header-box img {
    width: 64px;
    height: 100%;
    border: 1px solid black;
    box-sizing: border-box;
    object-fit: cover;
    object-position: center;
}

.header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 30px;
    padding: 6px 50px 4px 0px;
    box-sizing: border-box;
}

.baseinfo-item {
    font-size: 10px;
    font-weight: 400;
    font-family: '黑体', Arial, "Helvetica Neue", Helvetica, sans-serif;
}

/* 主体内容 */
.resume-content {
    display: flex;
    flex: 1;
    margin: 20px 0;   
    flex-direction: column; 
}   

.resumeData-item-container {
    display: flex;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    flex-direction: column;
    margin-bottom: 10px;
}

.section-title {
    height: 24px;
    width: 100%;
    box-sizing: border-box;
    clip-path: polygon(0 0, 16% 0, 20% 100%, 0% 100%, 0 100%);
    background: rgb(189, 4, 4);
    display: flex;
    align-items: center;
    padding-left: 12px;
}   

.section-title-text {
    color: white;
    font-size: 13px;
}

/* 各ITEM */
.edu-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 8px;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
}

.project-link {
    font-size: 8px;
    padding: 0 10px;
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
    padding: 0 10px 10px 10px ;
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
    padding: 10px;
    box-sizing: border-box;
}

</style>