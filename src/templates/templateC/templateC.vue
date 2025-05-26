<template>
    <div class="resume-container">
        <div class="resume-header">
            <!-- 头部内容 -->
            <div class="header-content">
                <span class="header-name"> {{ resumeData.baseinfo.name || '姓名'}} </span>

                <el-row gutter="16">
                    <el-col :span="8">
                        <span class="baseinfo-item" v-if="resumeData.baseinfo.age"> 年龄:{{ resumeData.baseinfo.age }} </span>
                    </el-col>
                    <el-col :span="8">
                        <span class="baseinfo-item" v-if="resumeData.baseinfo.gender"> 性别:{{ resumeData.baseinfo.gender === '1' ? '男' : '女' }} </span>       
                    </el-col>
                </el-row>
                <el-row gutter="16">
                    <el-col :span="8">
                        <span class="baseinfo-item" v-if="resumeData.baseinfo.phone"> 电话号码:{{ resumeData.baseinfo.phone }} </span>
                    </el-col>
                    <el-col :span="8">
                        <span class="baseinfo-item" v-if="resumeData.baseinfo.email"> 邮箱:{{ resumeData.baseinfo.email }} </span>
                    </el-col>
                </el-row>
            </div>

            <!-- 头像 -->
            <div class="resume-avatar">
                <img :src="resumeData.baseinfo.avatar" alt="avatar">
            </div> 
        </div>

        <!-- 主体内容 -->
        <div class="resume-content">
            <!-- 教育经历 -->
            <div class="resumeData-item-container" style="margin-top: 0 !important;">
                <div class="section-title">
                    <span class="section-title-text"> 教育经历 </span>
                </div>
                <div class="items-container">
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
            </div>    
            <!-- 工作经历 -->
            <div class="resumeData-item-container">
                <div class="section-title">
                    <span class="section-title-text"> 工作经历 </span>
                </div>
                <div class="items-container">
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
            </div>
            <!-- 项目经历 -->
            <div class="resumeData-item-container">
                <div class="section-title">
                    <span class="section-title-text"> 项目经历 </span>
                </div>
                <div class="items-container">
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
            </div>
            <!-- 奖项荣誉 -->
            <div class="resumeData-item-container">
                <div class="section-title">
                    <span class="section-title-text"> 奖项荣誉 </span>
                </div>
                <div class="items-container">
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
            </div>
            <!-- 自我评价 -->
            <div class="resumeData-item-container">
                <div class="section-title">
                    <span class="section-title-text"> 自我评价 </span>
                </div>
                <div class="items-container">
                    <div class="evaluation-desc">
                        {{resumeData.self_evaluation}}
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

/* 头部内容 */
.resume-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90px;
    margin-top: 10px;
    box-sizing: border-box;
    gap: 12px;
}

.header-content {
    height: 100%;
    width: 90%;
    display: flex;
    flex-direction: column;

    padding: 10px 20px;
    box-sizing: border-box;
    background: rgb(128, 128, 128);
}

.header-name {
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    font-family: '黑体', Arial, "Helvetica Neue", Helvetica, sans-serif;
    letter-spacing: 2px;
    margin-bottom: 8px;
}

.resume-avatar {
    width: 80px;
    height: 100%;
    box-sizing: border-box;
}

.resume-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.baseinfo-item {
    font-size: 10px;
    color: #eaeaea;
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
    border-left: 1px solid rgb(128, 128, 128);
}

.section-title {
    height: 36px;
    width: 100%;
    box-sizing: border-box;
    clip-path: polygon(0 0, 24% 0, 30% 70%, 5% 70%, 5% 100%, 0 70%);
    background: rgb(128, 128, 128);
    padding: 2px 32px; 
}   

.section-title-text {
    color: white;
    font-size: 14px;
}

/* 各ITEM */
.items-container {    
    width: 100%;
    box-sizing: border-box;
    position: relative;
    padding: 6px 32px 12px 32px;
}

.items-container::before {
    content: "";
    background: rgb(128, 128, 128);
    height: 1px;
    width: 100%;
    position: absolute;
    top: -11px;
    left: 0;
}

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

</style>