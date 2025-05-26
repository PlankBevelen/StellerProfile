<template>
    <div class="resume-preview">
        <!-- view部分 -->
        <el-button type="warning" @click="handleDownloadPDF" >导出PDF</el-button>
        <div class="preview-box" ref="previewBox">
            <component :is="templates[selectedTemplate]" :resumeData="resumeData" />
        </div>
    </div>
</template>

<script setup>
import { defineProps, nextTick, onMounted, ref } from 'vue';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import templateA from '@/templates/templateA/templateA.vue';
import templateB from '@/templates/templateB/templateB.vue';
import templateC from '@/templates/templateC/templateC.vue';
import templateD from '@/templates/templateD/templateD.vue';
import templateE from '@/templates/templateE/templateE.vue';
import { UploadFilled } from '@element-plus/icons-vue';

const templates = [
    templateA,
    templateB,
    templateC,
    templateD,
    templateE
];

const props = defineProps({
    resumeData: {
        type: Object,
        required: true
    }
});
// 父组件数据
const { resumeData } = props;
// 模板选择
const selectedTemplate = ref(0)
onMounted(() => {
    selectedTemplate.value = localStorage.getItem('selected-template') || 0;
});
const previewBox = ref(null);
// 下载
const handleDownloadPDF = async () => {
    await nextTick();

    const element = previewBox.value;
    const scale = 2;  // 提升清晰度
    const options = {
        scale,
        useCORS: true,  // 允许跨域图片
        logging: false,
    };

    alert('正在导出PDF，请稍后...');
    try {
        const canvas = await html2canvas(element, options);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');  // A4纸纵向
        const imgWidth = 210;  // A4宽度210mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let position = 0;

        // 添加首頁
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        position -= 297;  // 297mm为A4高度

        // 多页处理（如果内容超过一页）
        while (position > -canvas.height * (imgWidth / canvas.width)) {
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        position -= 297;
        }

        pdf.save('简历.pdf');  // 保存文件
    } catch (error) {
        console.error('导出失败:', error);
    }
}

</script>

<style scoped>

.resume-preview {
    display: flex;
    height: 100%;
    box-sizing: border-box;
    flex-direction: column;

}

.toolbar {
    display: flex;
    height: 80px;
    background: #E3F2FD;
    width: 100%;
    box-shadow: 10px 6px 10px rgba(0, 0, 0, 0.1);
    align-items: center;
    justify-content: flex-end;
    padding: 0 20px;
    box-sizing: border-box;
}

.preview-box {
    align-self: center;
    width: 54%;
    height: 90%;
    box-sizing: border-box;
    margin: 40px auto;
    box-shadow: 10px 16px 10px rgba(0, 0, 0, 0.1);
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    border-top: 1px solid rgba(0, 0, 0, 0.1);
}

</style>