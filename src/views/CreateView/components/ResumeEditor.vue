<template>
    <div class="resume-editor">
        <!-- 工具栏 -->
        <div class="toolbar">
            <el-button type="primary" @click="handleBlank">预览填充</el-button>
            <el-button type="danger" plain @click="handleClear">清空数据</el-button>
        </div>
        <!-- 编辑器 -->
        <el-collapse v-model="activePanels" accordion class="editor-collapse">
            <!-- 基本信息 -->
            <el-collapse-item title="基本信息" name="baseinfo" :col="2">
                <template #title>
                    <span class="collapse-title">👤 基本信息</span>
                </template>
                <el-form label-width="80px">
                    <el-row :gutter="20">
                        <!-- 头像 -->
                        <el-col :span="18">
                            <el-form-item label="头像">
                                <el-upload
                                    class="avatar-uploader"
                                    :show-file-list="false"
                                    :auto-upload="false"
                                    :on-change="handleAvatarChange"
                                >
                                    <img
                                        v-if="resumeData.baseinfo.avatar"
                                        :src="resumeData.baseinfo.avatar"
                                        class="avatar"
                                    >
                                    <el-icon v-else class="avatar-uploader-icon">
                                        <Plus/>
                                    </el-icon>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="16">
                            <el-form-item label="姓名">
                                <el-input v-model="resumeData.baseinfo.name" placeholder="请输入姓名"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item label="手机号码">
                                <el-input v-model="resumeData.baseinfo.phone" placeholder="请输入手机号" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="16">
                            <el-form-item label="邮箱">
                                <el-input v-model="resumeData.baseinfo.email" placeholder="请输入邮箱" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="年龄">
                                <el-input v-model="resumeData.baseinfo.age" placeholder="请输入年龄" :min="1" :max="100" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="性别">
                                <el-select v-model="resumeData.baseinfo.gender" placeholder="请选择性别">
                                    <el-option label="男" value="1" />
                                    <el-option label="女" value="0" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-collapse-item>
            <!-- 教育经历 -->
            <el-collapse-item title="教育经历" name="education" :col="2">
                <template #title>
                    <span class="collapse-title">🎓 教育经历</span>
                </template>
                
                <div v-for="(education, index) in resumeData.educations" :key="index" class="dynamic-item">
                    <el-form label-width="80px">
                        <el-row :gutter="20">
                            <el-col :span="18">
                                <el-form-item label="学校名称">
                                    <el-input v-model="education.school" placeholder="请输入学校名称" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="18">
                                <el-form-item label="学历">
                                    <el-select v-model="education.degree">
                                        <el-option v-for="item in degrees" :key="item.value" :label="item.label" :value="item.value" />
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="18">
                                <el-form-item label="专业">
                                    <el-input v-model="education.major" placeholder="请输入专业" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="16">
                            <el-col :span="9">
                                <el-form-item label="开始时间">
                                    <el-input v-model="education.start_time" type="date" placeholder="请选择开始时间" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="9">
                                <el-form-item label="结束时间">
                                    <el-input v-model="education.end_time" type="date" placeholder="请选择结束时间" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </el-collapse-item>
            <!-- 工作经历 -->
            <el-collapse-item title="工作经历" name="work" :col="2">     
                <template #title>
                    <div class="custom-title">
                        <span class="collapse-title">💼 工作经历</span>
                        <el-checkbox v-model="resumeData.works.is_empty" class="title-checkbox" @click.stop/>
                    </div>
                </template>
                <div v-if="!resumeData.works.is_empty"
                    v-for="(work, index) in resumeData.works.list"
                    :key="index"
                    class="dynamic-item"
                    >
                    <el-form label-width="80px">
                        <el-row :gutter="20">
                            <el-col :span="18">
                                <el-form-item label="公司名称">
                                    <el-input v-model="work.company" placeholder="请输入公司名称" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="18">
                                <el-form-item label="职位">
                                    <el-input v-model="work.position" placeholder="请输入职位" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="9">
                                <el-form-item label="开始时间">
                                    <el-input v-model="work.start_time" type="date" placeholder="请选择开始时间" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="9">
                                <el-form-item label="结束时间">
                                    <el-input v-model="work.end_time" type="date" placeholder="请选择结束时间" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="18">
                                <el-form-item label="描述">
                                    <el-input v-model="work.description" placeholder="请输入描述" type="textarea" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </el-collapse-item>
            <!-- 项目经历 -->
            <el-collapse-item title="项目经历" name="project" :col="2">
                <template #title>
                    <span class="collapse-title">🗂️ 项目经历</span>
                </template>

                <div v-for="(project, index) in resumeData.projects" :key="index" class="dynamic-item">
                    <el-form label-width="80px">
                        <el-row :gutter="20">
                            <el-col :span="11">
                                <el-form-item label="项目名称">
                                    <el-input v-model="project.name" placeholder="请输入项目名称" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="7">
                                <el-form-item label="角色">
                                    <el-input v-model="project.role" placeholder="请输入角色" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="9">
                                <el-form-item label="开始时间">
                                    <el-input v-model="project.start_time" type="date" placeholder="请选择开始时间" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="9">
                                <el-form-item label="结束时间">
                                    <el-input v-model="project.end_time" type="date" placeholder="请选择结束时间" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="18">
                                <el-form-item label="项目链接">
                                    <el-input v-model="project.link" placeholder="请输入项目链接" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="18">
                                <el-form-item label="项目描述">
                                    <el-input v-model="project.description" placeholder="请输入描述" type="textarea" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </el-collapse-item>
            <!-- 获奖 -->
            <el-collapse-item title="获奖" name="awards" :col="2">
                <template #title>
                    <div class="custom-title">
                        <span class="collapse-title">🏆 获奖</span>
                        <el-checkbox v-model="resumeData.awards.is_empty" class="title-checkbox" @click.stop/>
                    </div>
                </template>
                <div v-if="!resumeData.awards.is_empty"
                    v-for="(award, index) in resumeData.awards.list"
                    :key="index"
                    class="dynamic-item"
                    >
                    <el-form label-width="80px">
                        <el-row :gutter="20">
                            <el-col :span="18">
                                <el-form-item label="奖项名称">
                                    <el-input v-model="award.name" placeholder="请输入奖项名称" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="10">
                                <el-form-item label="时间">
                                    <el-input v-model="award.time" type="date" placeholder="请选择时间" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="18">
                                <el-form-item label="描述">
                                    <el-input v-model="award.description" placeholder="请输入描述" type="textarea" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>

            </el-collapse-item>
            <!-- 自我评价 -->
            <el-collapse-item title="自我评价" name="self_evaluation" :col="2">
                <template #title>
                    <span class="collapse-title">🤔 自我评价</span>
                </template>
                <el-form label-width="80px">
                    <el-row :gutter="20">
                        <el-col :span="18">
                            <el-form-item label="自我评价">
                                <el-input v-model="props.modelValue.self_evaluation" placeholder="请输入自我评价" type="textarea" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    
                </el-form>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script setup>
import { ref, reactive, defineProps } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElLoading } from 'element-plus'
import axios from 'axios'

const props = defineProps({
    modelValue: {
        type: Object,
        required: true
    }
})

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
            props.modelValue.baseinfo = data.baseinfo;
            resumeData.baseinfo = data.baseinfo;
            props.modelValue.educations = data.educations;
            resumeData.educations = data.educations;
            props.modelValue.works.list = data.works.list;
            resumeData.works.list = data.works.list;
            props.modelValue.projects = data.projects;
            resumeData.projects = data.projects;
            props.modelValue.awards.list = data.awards.list;
            resumeData.awards.list = data.awards.list;
            props.modelValue.self_evaluation = data.self_evaluation;
            resumeData.self_evaluation = data.self_evaluation;
        }

        console.log(response);
    } catch (error) {
        console.log(error);
    } finally {
        loading.close();
    }
}

// 父组件数据
const resumeData = reactive({
    ...props.modelValue,
    educations: props.modelValue.educations || [createEducation()],
    works: { is_empty: false, list: props.modelValue.works.list || [createWork()]},
    projects: props.modelValue.projects || [createProject()],
    awards: { is_empty: false, list: props.modelValue.awards.list || [createAward()]},
})

// 预览填充
const handleBlank = async () => {
    fetchResumeData();
}

// 清空数据
const handleClear = async () => {
    resumeData.baseinfo.name = ''
    resumeData.baseinfo.phone = ''
    resumeData.baseinfo.email = ''
    resumeData.baseinfo.age = ''
    resumeData.baseinfo.avatar = ''
    resumeData.educations = [createEducation()]
    resumeData.works = { is_empty: false, list: [createWork()]}
    resumeData.projects = [createProject()]
    resumeData.awards = { is_empty: false, list: [createAward()]}
    resumeData.self_evaluation = ''

    props.modelValue.baseinfo = resumeData.baseinfo
    props.modelValue.educations = resumeData.educations
    props.modelValue.works.list = resumeData.works.list
    props.modelValue.projects = resumeData.projects
    props.modelValue.awards.list = resumeData.awards.list
    props.modelValue.self_evaluation = resumeData.self_evaluation
}

// 头像上传
const handleAvatarChange = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.raw);
    reader.onload = (e) => {
        resumeData.baseinfo.avatar = e.target.result;
    }
    reader.readAsDataURL(file.raw)
}

// 默认展开
const activePanels = ref(['baseinfo'])

// 学历选项
const degrees = [
    { value: '其他', label: '其他' },
    { value: '小学', label: '小学' },
    { value: '初中', label: '初中' },
    { value: '高中', label: '高中' },
    { value: '专科', label: '专科' },
    { value: '本科', label: '本科' },
    { value: '硕士', label: '硕士' },
    { value: '博士', label: '博士' },
]

// 动态添加项
const createEducation = () => ({
    school: '',
    degree: '',
    major: '',
    start_time: '',
    end_time: ''
});
const createWork = () => ({
    company: '',
    position: '',
    start_time: '',
    end_time: '',
    description: ''
})
const createProject = () => ({
    name: '',
    role: '',
    start_time: '',
    end_time: '',
    link: '',
    description: ''
})
const createAward = () => ({
    name: '',
    time: '',
    description: ''
})

</script>

<style scoped>

.resume-editor {
    padding: 20px;
    background: #fff;
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
}

.toolbar {
    margin-bottom: 20px;
    display: flex;
    gap: 10px;
}

.custom-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.title-checkbox {
    margin-right: 10px;
}

.avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.avatar-uploader:hover {
    border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}

.avatar-uploader {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 178px;
    height: 178px;
}
</style>