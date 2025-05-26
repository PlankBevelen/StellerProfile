<template>
    <div class="resume-edit">
        <div class="resume-edit-wrapper">
            <div class="resume-edit-header">
                <h1>编辑简历</h1>
            </div>
            <div class="resume-edit-content">
                <el-form 
                    :model="resumeData" 
                    :rules="rules" 
                    label-width="auto" 
                    class="resume-edit-form"
                    ref="formRef"
                >
                    <!-- 基础信息 -->
                    <div class="resume-edit-baseinfo">
                        <div class="createFormSection-left">
                            <div class="createFormSection-title">
                                <p class="createFormSection-text">基本信息</p>
                            </div>
                            <p class="createFormSection-desc">
                                请填写基本信息
                            </p>
                        </div>
                        <div class="createFormSection-right">
                            <el-form-item label="姓名" style="font-weight: 600;" prop="baseinfo.name" label-position="top" required>
                                <el-input v-model="resumeData.baseinfo.name" class="input-item" placeholder="请输入姓名"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号码" style="font-weight: 600;"  prop="baseinfo.phone" label-position="top" required>
                                <el-input v-model="resumeData.baseinfo.phone" class="input-item" placeholder="请输入手机号码"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱" style="font-weight: 600;" prop="baseinfo.email" label-position="top" required>
                                <el-input v-model="resumeData.baseinfo.email" class="input-item" placeholder="请输入邮箱"></el-input>
                            </el-form-item>
                            <el-form-item label="年龄" style="font-weight: 600;" prop="baseinfo.age" label-position="top">
                                <el-input v-model="resumeData.baseinfo.age" class="input-item" placeholder="请输入年龄"></el-input>
                            </el-form-item>
                            <el-form-item label="性别" style="font-weight: 600;" prop="baseinfo.gender" label-position="top">
                                <el-select v-model="resumeData.baseinfo.gender" class="input-item" placeholder="请选择性别">   
                                    <el-option label="男" value="1"></el-option>
                                    <el-option label="女" value="0"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                    <!-- 教育经历 -->
                    <div class="resume-edit-education">
                        <div class="createFormSection-left">
                            <div class="createFormSection-title">
                                <p class="createFormSection-text">教育经历</p>
                            </div>
                            <p class="createFormSection-desc">
                                请填写教育经历
                            </p>
                        </div>
                        <div class="createFormSection-right">
                            <div class="createFormSection-right-item" v-for="(item, index) in resumeData.educations" :key="index">
                                <el-form-item label="学校" style="font-weight: 600;" :prop="'educations.' + index + '.school'" :rules="rules.educations[index]?.school" label-position="top" required>
                                    <el-input v-model="item.school" class="input-item" placeholder="请输入"></el-input>
                                </el-form-item>
                                <el-form-item label="学历" style="font-weight: 600;" :prop="'educations.' + index + '.degree'" :rules="rules.educations[index]?.degree" label-position="top" required>
                                    <el-select v-model="item.degree" class="input-item" placeholder="请选择">
                                        <el-option v-for="(degree, index) in degrees" :key="index" :label="degree.label" :value="degree.value">
                                
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="专业" style="font-weight: 600;" :prop="'educations.' + index + '.major'" :rules="rules.educations[index]?.major" label-position="top" required>
                                    <el-input v-model="item.major" class="input-item" placeholder="请输入"></el-input>
                                </el-form-item>
                                <el-form-item label="起止时间" style="font-weight: 600;" label-position="top" required>
                                    <div style="display: flex; width: 100%;">
                                        <el-input v-model="item.start_time" type="date" class="input-item" :prop="'educations.' + index + '.start_time'" placeholder="请选择"></el-input>
                                        <el-input v-model="item.end_time" type="date" class="input-item" :prop="'educations.' + index + '.end_time'" placeholder="请选择"></el-input>
                                    </div>
                                </el-form-item>

                                <div style="display: flex; align-items: center;">
                                    <!-- 如果是最后一项，则显示添加按钮 -->
                                    <template v-if="index === resumeData.educations.length - 1 && resumeData.educations.length < 3">
                                        <div style="display: flex; justify-self: flex-start; margin-top: 16px;">
                                            <el-button style="font-size: 16px;" type="text" :icon="Plus" @click="handleAddEducation">添加</el-button>
                                        </div>
                                    </template>

                                    <!-- 如果不是第一项，则显示删除按钮 -->
                                    <template v-if="resumeData.educations.length > 1">
                                        <div style="display: flex; margin-left: auto; margin-top: 16px;">
                                            <el-button style="font-size: 20px;" type="text" :icon="DeleteFilled" @click="handleDeleteEducation(index)"></el-button>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 工作经历 -->
                    <div class="resume-edit-work">
                        <div class="createFormSection-left">
                            <div class="createFormSection-title">
                                <p class="createFormSection-text">工作经历</p>
                            </div>
                            <p class="createFormSection-desc">
                                请填写工作经历
                            </p>
                        </div>
                        <div class="createFormSection-right">
                            <div class="resume-edit-work-is-empty">
                                <el-checkbox label="没有工作经历" :default="resumeData.works.is_empty" v-model="resumeData.works.is_empty">
                                </el-checkbox>
                            </div>
                            <div class="createFormSection-right-item" 
                                v-if="!resumeData.works.is_empty"
                                v-for="(item, index) in resumeData.works.list"
                                :key="index"
                                >
                                <el-form-item label="公司" style="font-weight: 600;" :prop="'works.list.' + index + '.company'" :rules="rules.works.list[index]?.company" label-position="top" required>
                                    <el-input v-model="item.company" class="input-item" placeholder="请输入"></el-input>
                                </el-form-item>
                                <el-form-item label="职位" style="font-weight: 600;" :prop="'works.list.' + index + '.position'" :rules="rules.works.list[index]?.position" label-position="top" required>
                                    <el-input v-model="item.position" class="input-item" placeholder="请输入"></el-input>
                                </el-form-item>
                                <el-form-item label="起止时间" style="font-weight: 600;" label-position="top" required>
                                    <div style="display: flex; width: 100%;">
                                        <el-input v-model="item.start_time" type="date" class="input-item" :prop="'works.list.' + index + '.start_time'" placeholder="请选择"></el-input>
                                        <el-input v-model="item.end_time" type="date" class="input-item" :prop="'works.list.' + index + '.end_time'" placeholder="请选择"></el-input>
                                    </div>
                                </el-form-item>
                                <el-form-item label="描述" style="font-weight: 600;" :prop="'works.list.' + index + '.description'" :rules="rules.works.list[index]?.description" label-position="top">
                                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" v-model="item.description" placeholder="请输入"></el-input>
                                </el-form-item>

                                <div style="display: flex; align-items: center;">
                                    <!-- 如果是最后一项，则显示添加按钮 -->
                                    <template v-if="index === resumeData.works.list.length - 1 && resumeData.works.list.length < 3">
                                        <div style="display: flex; justify-self: flex-start; margin-top: 16px;">
                                            <el-button style="font-size: 16px;" type="text" :icon="Plus" @click="handleAddWork">添加</el-button>
                                        </div>
                                    </template>

                                    <!-- 如果不是第一项，则显示删除按钮 -->
                                    <template v-if="resumeData.works.list.length > 1">
                                        <div style="display: flex; margin-left: auto; margin-top: 16px;">
                                            <el-button style="font-size: 20px;" type="text" :icon="DeleteFilled" @click="handleDeleteWork(index)"></el-button>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 项目经历 -->
                    <div class="resume-edit-project">
                        <div class="createFormSection-left">
                            <div class="createFormSection-title">
                                <p class="createFormSection-text">项目经历</p>
                            </div>
                            <p class="createFormSection-desc">
                                请填写项目经历
                            </p>
                        </div>

                        <div class="createFormSection-right">
                            <div 
                                v-for="(item, index) in resumeData.projects"
                                :key="index"
                                class="createFormSection-right-item">
                                <el-form-item label="项目名称" style="font-weight: 600;" :prop="'projects.' + index + '.name'" :rules="rules.projects[index]?.name" label-position="top" required>
                                    <el-input v-model="item.name" class="input-item" placeholder="请输入"></el-input>
                                </el-form-item>
                                <el-form-item label="项目角色" style="font-weight: 600;" :prop="'projects.' + index + '.role'" :rules="rules.projects[index]?.role" label-position="top" required>
                                    <el-input v-model="item.role" class="input-item" placeholder="请输入"></el-input>
                                </el-form-item>
                                <el-form-item label="起止时间" style="font-weight: 600;" label-position="top" required>
                                    <div style="display: flex; width: 100%;">
                                        <el-input v-model="item.start_time" type="date" class="input-item" :prop="'projects.' + index + '.start_time'" placeholder="请选择"></el-input>
                                        <el-input v-model="item.end_time" type="date" class="input-item" :prop="'projects.' + index + '.end_time'" placeholder="请选择"></el-input>
                                    </div>
                                </el-form-item>
                                <el-form-item label="项目链接" style="font-weight: 600;" :prop="'projects.' + index + '.link'" :rules="rules.projects[index]?.link" label-position="top" required>
                                    <el-input v-model="item.link" class="input-item" placeholder="请输入"></el-input>
                                </el-form-item>
                                <el-form-item label="描述" style="font-weight: 600;" :prop="'projects.' + index + '.description'" :rules="rules.projects[index]?.description" label-position="top">
                                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" v-model="item.description" placeholder="请输入"></el-input>
                                </el-form-item>

                                <div style="display: flex; align-items: center;">
                                    <!-- 如果是最后一项，则显示添加按钮 -->
                                    <template v-if="index === resumeData.projects.length - 1 && resumeData.projects.length < 3">
                                        <div style="display: flex; justify-self: flex-start; margin-top: 16px;">
                                            <el-button style="font-size: 16px;" type="text" :icon="Plus" @click="handleAddProject">添加</el-button>
                                        </div>
                                    </template>

                                    <!-- 如果不是第一项，则显示删除按钮 -->
                                    <template v-if="resumeData.projects.length > 1">
                                        <div style="display: flex; margin-left: auto; margin-top: 16px;">
                                            <el-button style="font-size: 20px;" type="text" :icon="DeleteFilled" @click="handleDeleteProject(index)"></el-button>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 获奖 -->
                    <div class="resume-edit-awards">
                        <div class="createFormSection-left">
                            <div class="createFormSection-title">
                                <p class="createFormSection-text">获奖</p>
                            </div>
                        </div>
                        <div class="createFormSection-right">
                            <div class="resume-edit-work-is-empty">
                                <el-checkbox label="没有奖项" :default="resumeData.awards.is_empty" v-model="resumeData.awards.is_empty">
                                </el-checkbox>
                            </div>
                            <div 
                                class="createFormSection-right-item" 
                                v-if="!resumeData.awards.is_empty"
                                v-for="(item, index) in resumeData.awards.list"
                                :key="index"
                            >
                                <el-form-item label="奖项名称" style="font-weight: 600;" :prop="'awards.list.' + index + '.name'" :rules="rules.awards.list[index]?.name" label-position="top" required>
                                    <el-input v-model="item.name" class="input-item" placeholder="请输入"></el-input>
                                </el-form-item>
                                <el-form-item label="时间" style="font-weight: 600;" label-position="top" required>
                                    <el-input v-model="item.time" type="date" class="input-item" placeholder="请选择"></el-input>
                                </el-form-item>
                                <el-form-item label="描述" style="font-weight: 600;" :prop="'awards.list.' + index + '.description'" :rules="rules.awards.list[index]?.description" label-position="top">
                                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" v-model="item.description" placeholder="请输入"></el-input>
                                </el-form-item>

                                <div style="display: flex; align-items: center;">
                                    <!-- 如果是最后一项，则显示添加按钮 -->
                                    <template v-if="index === resumeData.awards.list.length - 1 && resumeData.awards.list.length < 3">
                                        <div style="display: flex; justify-self: flex-start; margin-top: 16px;">
                                            <el-button style="font-size: 16px;" type="text" :icon="Plus" @click="handleAddAward">添加</el-button>
                                        </div>
                                    </template>

                                    <!-- 如果不是第一项，则显示删除按钮 -->
                                    <template v-if="resumeData.awards.list.length > 1">
                                        <div style="display: flex; margin-left: auto; margin-top: 16px;">
                                            <el-button style="font-size: 20px;" type="text" :icon="DeleteFilled" @click="handleDeleteAward(index)"></el-button>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 自我评价 -->
                    <div class="resume-edit-self-evaluation">
                        <div class="createFormSection-left">
                            <div class="createFormSection-title">
                                <p class="createFormSection-text">自我评价</p>
                            </div>
                            <p class="createFormSection-desc"></p>
                        </div>
                        <div class="createFormSection-right">
                            <el-form-item label="自我评价" style="font-weight: 600;" label-position="top" required prop="self_evaluation">
                                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" v-model="resumeData.self_evaluation" placeholder="请输入" autosize></el-input>
                            </el-form-item>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
    </div>

    <div class="resume-edit-footer">
        <div class="resume-edit-footer-btngroup">
            <el-button type="default" @click="handleCancel" class="resume-edit-footer-btn">取消</el-button>
            <el-button type="primary" @click="handleSave" class="resume-edit-footer-btn">保存</el-button>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { DeleteFilled, Plus } from '@element-plus/icons-vue' 
import { ElLoading, ElMessage } from 'element-plus';
import router from '@/router/index.js'
import axios from 'axios'

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
            resumeData.educations = data.educations.length > 0 ? data.educations : resumeData.educations;
            resumeData.works.is_empty = data.works.is_empty;
            resumeData.works.list = data.works.list.length > 0 ? data.works.list : resumeData.works.list;
            resumeData.projects = data.projects.length > 0 ? data.projects : resumeData.projects;
            resumeData.awards.is_empty = data.awards.is_empty;
            resumeData.awards.list = data.awards.list.length > 0 ? data.awards.list : resumeData.awards.list;
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
})

const formRef = ref(null)

const rules = reactive({
    baseinfo: {
        name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 4, message: '姓名长度在 2 到 4 个字符', trigger: 'blur' }
        ],
        phone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' }, 
            { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
        ],
        email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱', trigger: ['blur', 'change'] }
        ],
        age: [
            { pattern: /^(?:[1-9][0-9]?|100)$/, message: '年龄在 1 到 100 岁之间', trigger: 'blur' },
        ]
    },
    educations: [{
        school: [
            { required: true, message: '请输入学校', trigger: 'blur' },
            { min: 4, max: 10, message: '学校长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        degree: [
            { required: true, message: '请选择学历', trigger: 'blur' }
        ],
        major: [
            { required: true, min: 2, max: 10, message: '专业长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        start_time: [
            { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
        ],
        end_time: [
            { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
        ]
    }],
    works: {
        list: [{
            company: [
                { required: true, message: '请输入公司名称', trigger: 'blur' },
                { min: 2, max: 20, message: '公司名称长度在 2 到 20 个字符', trigger: 'blur' }
            ],
            position: [
                { required: true, message: '请输入职位名称', trigger: 'blur' },
                { min: 2, max: 20, message: '职位名称长度在 2 到 20 个字符', trigger: 'blur' }
            ],
            start_time: [
                { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
            ],
            end_time: [
                { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
            ],
            description: [
                { required: true, message: '请输入描述', trigger: 'blur' },
                { min: 2, max: 300, message: '描述长度在 2 到 300 个字符', trigger: 'blur' }
            ]
        }] 
    },
    projects: [{
        name: [
            { required: true, message: '请输入项目名称', trigger: 'blur' },
            { min: 2, max: 20, message: '项目名称长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        role: [
            { required: true, message: '请输入项目角色', trigger: 'blur' },
            { min: 2, max: 20, message: '项目角色长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        start_time: [
            { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
        ],
        end_time: [
            { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
        ],
        link: [
            { required: true, message: '请输入项目链接', trigger: 'blur' },
            { type: 'url', message: '请输入正确的链接', trigger: 'blur' }
        ],
        description: [
            { required: true, message: '请输入描述', trigger: 'blur' },
            { min: 2, max: 300, message: '描述长度在 2 到 300 个字符', trigger: 'blur' }
        ]
    }],
    awards: {
        list: [{
            name: [
                { required: true, message: '请输入奖项名称', trigger: 'blur' },
                { min: 2, max: 20, message: '奖项名称长度在 2 到 20 个字符', trigger: 'blur' }
            ],
            time: [
                { required: true, type: 'date', message: '请选择年份', trigger: 'change' }
            ],
            description: [
                { required: true, message: '请输入描述', trigger: 'blur' },
                { min: 2, max: 300, message: '描述长度在 2 到 300 个字符', trigger: 'blur' }
            ]
        }],
    },
    self_evaluation: [
        { required: true, message: '请输入自我评价', trigger: 'blur' },
        { min: 2, max: 300, message: '自我评价长度在 2 到 300 个字符', trigger: 'blur' }
    ]
})

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
})

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

const handleAddEducation = () => {
    resumeData.educations.push({
        school: '',
        degree: '',
        major: '',
        start_time: '',
        end_time: '',
    })
    rules.educations.push({
        school: [
            { required: true, message: '请输入学校', trigger: 'blur' },
            { min: 4, max: 10, message: '学校长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        degree: [
            { required: true, message: '请选择学历', trigger: 'blur' }
        ],
        major: [
            { required: true, min: 2, max: 10, message: '专业长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        start_time: [
            { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
        ],
        end_time: [
            { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
        ]   
    })
}

const handleDeleteEducation = (index) => {
    resumeData.educations.splice(index, 1)
    rules.educations.splice(index, 1)
}

const handleAddWork = () => {
    resumeData.works.list.push({
        company: '',
        position: '',
        start_time: '',
        end_time: '',
        description: ''
    })
    rules.works.list.push({
        company: [
            { required: true, message: '请输入公司名称', trigger: 'blur' },
            { min: 2, max: 20, message: '公司名称长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        position: [
            { required: true, message: '请输入职位名称', trigger: 'blur' },
            { min: 2, max: 20, message: '职位名称长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        start_time: [
            { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
        ],
        end_time: [
            { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
        ],
        description: [
            { required: true, message: '请输入描述', trigger: 'blur' },
            { min: 2, max: 300, message: '描述长度在 2 到 300 个字符', trigger: 'blur' }
        ]
    })
}

const handleDeleteWork = (index) => {
    resumeData.works.list.splice(index, 1)
    rules.works.list.splice(index, 1)
}

const handleAddProject = () => {
    resumeData.projects.push({
        name: '',
        role: '',
        start_time: '',
        end_time: '',
        link: '',
        description: ''
    })
    rules.projects.push({
        name: [
            { required: true, message: '请输入项目名称', trigger: 'blur' },
            { min: 2, max: 20, message: '项目名称长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        role: [
            { required: true, message: '请输入项目角色', trigger: 'blur' },
            { min: 2, max: 20, message: '项目角色长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        start_time: [
            { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
        ],
        end_time: [
            { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
        ],
        link: [
            { required: true, message: '请输入项目链接', trigger: 'blur' },
            { type: 'url', message: '请输入正确的链接', trigger: 'blur' }
        ],
        description: [
            { required: true, message: '请输入描述', trigger: 'blur' },
            { min: 2, max: 300, message: '描述长度在 2 到 300 个字符', trigger: 'blur' }
        ]
    })
}

const handleDeleteProject = (index) => {
    resumeData.projects.splice(index, 1)
    rules.projects.splice(index, 1)
}

const handleCancel = () => {
    router.push( {name: 'ProfileView'} )
}

const handleSave = async () => {
    const user = localStorage.getItem('account');
    formRef.value.validate(async (valid) => {
        if (valid) {
            console.log(resumeData);
            const res = await axios({ 
                method: 'POST',
                url: 'http://localhost:8080/api/resume/edit',
                data: Object.assign( resumeData, { user: user })
            });
            
            ElMessage.success({
                message: '保存成功',
                type: 'success'
            });
            window.location.href = '/stellerprofile/profileview';
        } else {
            console.log('error submit!!')
            return false
        }
    })
}

const handleAddAward = () => {
    resumeData.awards.list.push({
        name: '',
        time: '',
        description: ''
    })
    rules.awards.list.push({
        name: [
            { required: true, message: '请输入奖项名称', trigger: 'blur' },
            { min: 2, max: 20, message: '奖项名称长度在 2 到 20 个字符', trigger: 'blur' }
        ],  
        time: [
            { required: true, type: 'date', message: '请选择年份', trigger: 'change' }
        ],
        description: [
            { required: true, message: '请输入描述', trigger: 'blur' },
            { min: 2, max: 300, message: '描述长度在 2 到 300 个字符', trigger: 'blur' }
        ]
    })
}

const handleDeleteAward = (index) => {
    resumeData.awards.list.splice(index, 1)
    rules.awards.list.splice(index, 1)
}

</script>

<style scoped>

body {
    min-height: 100vh;
}

.resume-edit {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 40px;
    width: 100%;
    box-sizing: border-box;
}

.resume-edit-footer {
    position: fixed;
    width: 100%;
    height: 80px;
    bottom: 0;
    border: none;
    box-sizing: border-box;
    background: #fff;
    box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.resume-edit-footer-btngroup {
    position: absolute;
    right: 12%;
    display: flex;
    gap: 6px;
}

.resume-edit-footer-btn {
    width: 140px;
    height: 42px;
}

.resume-edit-wrapper {
    width: 80%;
    padding: 30px 80px;
    background-color: #fff;
    box-sizing: border-box;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
}

.resume-edit-header {
    margin-bottom: 54px;
}

.resume-edit-content {

}

.resume-edit-form {
    width: 100%;
    min-height: 100vh;
    margin-bottom: 80px;
}

.resume-edit-baseinfo, 
.resume-edit-education,
.resume-edit-work,
.resume-edit-project,
.resume-edit-awards {
    display: flex;
    border-bottom: 0.5px solid #666;
    margin-top: 60px;
}

.createFormSection-text {
    font-size: 22px;
    font-weight: 600;
    font-family: '黑体', '幼圆', 'Arial';
    color: #333;
}

.createFormSection-text::after {
    content: "";
    display: block;
    width: 30px;
    height: 5px;
    background: #5e5bef;
    margin-top: 8px;
}

.createFormSection-desc {
    font-size: 14px;
    font-weight: 400;
    font-family: '黑体', '幼圆', 'Arial';
    color: #666;
}

.createFormSection-left {
    width: 35%;
}

.createFormSection-right {
    display: flex;
    flex-direction: column;
    flex: 1;
    box-sizing: border-box;
    padding: 20px 40px;
}

.createFormSection-right-item {
    padding: 16px 32px;
    &:hover {
        background: #f2f2f2;
    }
}

.input-item { 
    width: 100%; 
    height: 38px;
    font-weight: 500;
}

.resume-edit-work-is-empty {
    margin-left: auto;
}

</style>

