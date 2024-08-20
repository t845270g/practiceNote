<template>
<div>
    <el-button type="success" style="width: 100px;margin-bottom: 10px;">   
        <NuxtLink to="/matter/A">其他練習-A</NuxtLink>
    </el-button>
    <el-button type="success" style="width: 100px;margin-bottom: 10px;">   
        <NuxtLink to="/matter/B">其他練習-B</NuxtLink>
    </el-button>
</div>
<h3>1.Engine引擎:負責計算物體的運動和碰撞。</h3></br>
<h3>2.Render渲染:負責物理世界的狀態繪製到畫面上。</h3></br>
<h3>3.Runner運作:更新引擎的狀態和渲染器的畫面。</h3></br>
<h3>4.Composites複合物:將多個物件群組在一起。</h3></br>
<h3>5.Composite組合物:由多個物件或複合體組成。</h3></br>
<h3>6.MouseConstraint滑鼠:將滑鼠控制添加到物理世界的功能。</h3></br>
<h3>7.Mouse:處理滑鼠事件。</h3></br>
<h3>8.Bodies物件:創建基本幾何形狀（如矩形、圓形、多邊形等）的功能。</h3>
<div id="c"></div>


</template>

<script setup>
import { useMainStore } from "@/store/currentStore";
import { Engine, Render, Runner, Composites, Composite, MouseConstraint,Mouse , Bodies }  from "matter-js";
const mainStore = useMainStore();

var runner,render,engine,world
//matter模組需在client端才可使用，因此須寫在onMounted中。
onMounted(()=>{
    mainStore.routeName="matter模組"
    // 創建引擎
    engine = Engine.create(),
    world = engine.world;
    // 执行渲染操作
    render = Render.create({
        element: document.getElementById('c'),
        engine: engine,//綁定引擎
        options: {
            width:600,
            height: 400,
            showStats: false,//顯示統計數據
            showPerformance: false//顯示表現數據
        }
    });

    Render.run(render);
    // scene code
    var stack = Composites.stack(90, 600 - 25 - 15 * 35, 18, 15, 0, 0, function(x, y) {
        return Bodies.rectangle(x, y, 35, 35);
    });
    
    Composite.add(world, [
        stack,
        Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
        Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
        Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
        Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
    ]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });

    // 运行渲染器
    runner = Runner.create();
    Runner.run(runner, engine);
})

onBeforeUnmount(() => {
    //運作器
    if (runner) {
        // 停止運作器
        Runner.stop(runner)
        runner = null
    }
    //渲染器
    if (render) {
        // 停止渲染器
        Render.stop(render)
        // 釋放渲染器資源
        render.canvas.remove()
        render.context = null
        render.textures = {}
        render = null
    }
    //引擎
    if (engine) {
        // 清理引擎
        Composite.clear(engine.world, false)
        Engine.clear(engine)
        engine = null
    }
})
</script>

<style></style>
