<template>
    <div class="templates-container">
        <div class="templates-grid">
            <div 
                v-for="(template, index) in templates" 
                :key="index"
                class="template-card"
                :class="{ 'selected': template.selected }"
                @click="selectTemplate(index)"
            >
                <div class="card-top">
                    <el-image 
                        :src="template.preview" 
                        fit="cover" 
                        class="template-image"
                    />
                    <div v-if="template.selected" class="selected-badge">
                        <el-icon :size="24" color="#67C23A">
                            <Edit />
                        </el-icon>
                    </div>
                </div>
                
                <div class="card-bottom">
                    <h3 class="template-title">{{ template.title }}</h3>
                    <p class="template-desc">{{ template.desc }}</p>
                    <el-button 
                        :type="template.selected ? 'success' : 'primary'" 
                        class="select-btn"
                        @click.stop="selectTemplate(index)"
                    >
                        {{ template.selected ? '已选择' : '选择模板' }}
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Edit } from '@element-plus/icons-vue'

import img1 from './assets/1.png'
import img2 from './assets/2.png'
import img3 from './assets/3.png'
import img4 from './assets/4.png'
import img5 from './assets/5.png'

const templates = ref([
    {
        preview: img1,
        title: '简约风格',
        desc: '极简设计，专注内容展示',
        selected: false
    },
    {
        preview: img2,
        title: '现代风格',
        desc: '动态布局，强调视觉层次',
        selected: false
    },
    {
        preview: img3,
        title: '经典风格',
        desc: '传统版式，适合正式场景',
        selected: false
    },
    {
        preview: img4,
        title: '创意风格',
        desc: '个性设计，展现独特魅力',
        selected: false
    },
    {
        preview: img5,
        title: '技术风格',
        desc: '代码高亮，适合开发者',
        selected: false
    }
])

const selectTemplate = (index) => {
    templates.value.forEach((t, i) => {
        t.selected = i === index
    })
    localStorage.setItem('selected-template', index)
}

onMounted(() => {
    const selectedIndex = localStorage.getItem('selected-template')
    if (selectedIndex) {
        selectTemplate(parseInt(selectedIndex))
    }
})
</script>

<style scoped>
.templates-container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.templates-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 30px;
    padding: 20px 0;
}

.template-card {
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    border: 2px solid transparent;
}

.template-card:hover {
    transform: translateY(-5px);
}

.template-card.selected {
    transform: scale(1.05);
    border-color: #67C23A;
    box-shadow: 0 8px 20px rgba(103, 194, 58, 0.2);
}

.card-top {
    position: relative;
    height: 480px;
    background: #f5f7fa;
}

.template-image {
    width: 100%;
    height: 100%;
    border-radius: 12px 12px 0 0;
}

.selected-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    padding: 4px;
}

.card-bottom {
    padding: 16px;
}

.template-title {
    margin: 0 0 8px;
    font-size: 16px;
    color: #303133;
}

.template-desc {
    margin: 0 0 12px;
    font-size: 13px;
    color: #606266;
    line-height: 1.4;
    height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.select-btn {
    width: 100%;
    transition: all 0.2s;
}
</style>