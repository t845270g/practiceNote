import { use } from 'echarts/core';
await import('echarts-wordcloud'); // 确保这个导入没有问题
// import 'echarts-wordcloud'
// 手動導入ECharts模組以縮小套件的大小
import { CanvasRenderer } from 'echarts/renderers';
import { TitleComponent,TooltipComponent,GridComponent,DatasetComponent,TransformComponent,LegendComponent,ToolboxComponent  } from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
export default defineNuxtPlugin(() => {
    use([
        TitleComponent,
        TooltipComponent,
        GridComponent,
        DatasetComponent,
        TransformComponent,
        LegendComponent,
        LabelLayout,
        UniversalTransition,
        CanvasRenderer,
        ToolboxComponent 
    ]);
});
