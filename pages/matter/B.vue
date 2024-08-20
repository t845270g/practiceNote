<template>
  <div>
    <el-button type="success" style="width: 100px;margin-bottom: 10px;">   
        <NuxtLink to="/matter">matter模組</NuxtLink>
    </el-button><br/>
    <div style="width:800px;display: flex;justify-content: space-between;">
      <div>
        <el-button  style="width: 100px;margin-bottom: 10px;" @click="startSimulation" type="primary">start</el-button>
        <el-button  style="width: 100px;margin-bottom: 10px;" @click="playContinue" v-if="switchD"  type="warning">
          <font-awesome-icon :icon="['fas', 'pause']"  v-if="!play"/>
          <font-awesome-icon :icon="['fas', 'play']"  v-else/>
        </el-button>
      </div>
      <el-button  style="width: 100px;margin-bottom: 10px;" type="danger" @click="resetSimulation ">重置</el-button>
    </div>
  </div>

  <div id="c"></div>
</template>
<script setup>
import { useMainStore } from "@/store/currentStore";
import { Engine, Render, Runner, Events , Composite, Constraint,Vertices , Bodies,Body,MouseConstraint }  from "matter-js";
const mainStore = useMainStore();

let render,customBody,engine,runner
//初始化時先渲染初始畫面
onMounted(() => {
mainStore.routeName="matter模組-B"
    engine = Engine.create();// 创建引擎
    //初始畫面(渲染器)
    render = Render.create({
      element: document.getElementById('c'),//繪製在指定容器中
      engine: engine,//這些繪製套用的引擎
      options: {
        width: 800,//畫板寬度
        height: 600,//畫板高度
        background: 'white', // 设置背景色
        // showPositions: true, // 顯示物体位置
      }
    });



    const triangleVertices = [
        { x: 100, y:20 },
        { x: 200, y:20 },
        { x: 200, y:100 },
        { x: 100, y:100 },
        { x: 0, y: 60 }
    ];

    let triangle = Bodies.fromVertices(400, 400, [Vertices.create(triangleVertices)], {
        // isStatic: true,
        render: {
            fillStyle: '#ff0000' // 设置填充颜色为红色
        }
    });

    // 设置圆角半径
    const cornerRadius = [35,10,10,35,15];

    // 将三角形的顶点圆角化
    triangle = Body.create({
        parts: triangle.parts.map(part => {
            part.vertices = Vertices.chamfer(part.vertices, cornerRadius);
            return part;
        }),
    });
    const fixedPointConstraint = Constraint.create({
        pointA: { x: 440, y: 400 }, // 指定固定点的坐标
        bodyB: triangle, // 三角形的物体
        length: 0 ,// 设定固定距离为0，即固定在点上
        pointB: { x: 0, y: 0 } // 初始相对位置
    });
    Body.setCentre(triangle, { x: 440, y: 400 });
    Body.setAngularVelocity(triangle, 0.2);//逆時針選轉，速度為1

    const mouseConstraint = MouseConstraint.create(engine);

    Events.on(mouseConstraint, "mousemove", (event) => {
    // 获取鼠标相对于三角形中心的方向向量
    const mousePosition = event.mouse.position;
    const trianglePosition = triangle.position;
    const dx = mousePosition.x - trianglePosition.x;
    const dy = mousePosition.y - trianglePosition.y;
    let angle = Math.atan2(dy, dx);

    // 将角度限制在0到2π之间
    if (angle < 0) {
        angle += 2 * Math.PI;
    }

    // 计算力的大小
    const forceMagnitude = 0.01; // 根据需要调整力的大小
    const force = {
        x: forceMagnitude * Math.cos(angle),
        y: forceMagnitude * Math.sin(angle)
    };

    // 应用力到三角形上
    Body.applyForce(triangle, triangle.position, force);
});
    Composite.add(engine.world, mouseConstraint);
    Composite.add(engine.world, triangle);
    Composite.add(engine.world, fixedPointConstraint);
    runner = Runner.create();
    Render.run(render);
    Runner.start(runner, engine);
});



</script> 

<style></style>
