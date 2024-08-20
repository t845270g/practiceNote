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
    <div style="display: flex;flex-direction: column;">
      <h4>
        showPositions-顯示物体位置 : 
        <el-switch
          v-model="showPositions"
          class="ml-2"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
      </h4>
      <h4>
        showCollisions-顯示物件接觸點 : 
        <el-switch
          v-model="showCollisions"
          class="ml-2"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
      </h4>
      <h4>
        showBounds-顯示物件邊界 : 
        <el-switch
          v-model="showBounds"
          class="ml-2"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
      </h4>
      <h4>
        showAngleIndicator-顯示物體旋轉的角度 : 
        <el-switch
          v-model="showAngleIndicator"
          class="ml-2"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
      </h4>
      <h4>
        wireframes-線框 : 
        <el-switch
          v-model="wireframes"
          class="ml-2"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
      </h4>
    </div>
    <h3 id="score">{{score}}</h3>
    <div id="c"></div>
</template>
<script setup>
import { useMainStore } from "@/store/currentStore";
import { Engine, Render, Runner, Events , Composite, MouseConstraint,Mouse , Bodies,Body }  from "matter-js";
const mainStore = useMainStore();
const switchD=ref(false)
const play=ref(false)
let engine, render, runner,customBody,customBodyB;
const score=ref(0)
const showPositions=ref(false)
const showCollisions=ref(false)
const showBounds=ref(false)
const showAngleIndicator=ref(false)
const wireframes=ref(false)
watch([showPositions, showCollisions, showBounds, showAngleIndicator,wireframes], ([pos, coll, bounds, angle,wire]) => {
    if (render) {
        render.options.showPositions = pos;
        render.options.showCollisions = coll;
        render.options.showBounds = bounds;
        render.options.showAngleIndicator = angle;
        render.options.wireframes = wire;
    }
});
//執行
const startSimulation = () => {
  // 启动引擎和渲染器
  if(!switchD.value){
    switchD.value=true
    Runner.start(runner, engine);
  }
};

const playContinue=()=>{

  if (runner) { 
    if(play.value){
      // console.log("開")
      Runner.start(runner, engine)
      play.value=false
    }else{
      // console.log("關")
      Runner.stop(runner)
      play.value=true
    }
  }

}

//清除渲染
const cleanUp=()=>{
   // 停止并清理运行器
   if (runner) {
    Runner.stop(runner);
  }

  // 停止并清理渲染器
  if (render) {
    Render.stop(render);
    render.canvas.remove();
    render.context = null;
    render.textures = {};
  }

  // 清理引擎
  if (engine) {
    Events.off(engine, 'scoreUpdate')
    Events.off(engine, 'collisionStart')
    Composite.clear(engine.world, false);
    Engine.clear(engine);
  }
  score.value=0
  play.value=false
}
function onScoreUpdate(event) {
    console.log('Score updated:', event);//因為在觸發時添加了參數score，會存在於event下
    // 例如，可以更新显示得分的HTML元素
    score.value=score.value+event.score
}

//重置並創建物件
const resetSimulation  = () => {
    cleanUp()//清理canvas容器
    engine = Engine.create();// 创建引擎
    Events.on(engine, 'scoreUpdate', onScoreUpdate);//建立一個自訂的事件，如果此事件被觸發將會執行onScoreUpdate()
    //監聽互相碰撞的物件id
    Events.on(engine, 'collisionStart', (event) => {
      Events.trigger(engine, 'scoreUpdate', { score: 1 });//觸發自訂義的事件
        // 获取碰撞事件中的所有碰撞对
        const pairs = event.pairs;
        // 遍历每一对碰撞
        pairs.forEach((pair) => {
            // 获取碰撞的两个物体
            const bodyA = pair.bodyA;
            const bodyB = pair.bodyB;
            
            // 在控制台输出碰撞的两个物体的标识符
            console.log('Collision between:', bodyA.id, 'and', bodyB.id);
            
        });
    });

    //初始畫面(渲染器)
    render = Render.create({
      element: document.getElementById('c'),//繪製在指定容器中
      engine: engine,//這些繪製套用的引擎
      options: {
        width: 800,//畫板寬度
        height: 600,//畫板高度
        wireframes: wireframes.value, // 關閉線框，顯示實際物體樣式
        background: 'white', // 设置背景色
        showPositions: showPositions.value, // 顯示物体位置
        showCollisions:showCollisions.value,//顯示物件接觸點
        showBounds:showBounds.value,//顯示物件邊界
        showAngleIndicator:showAngleIndicator.value//顯示角度指示器
      }
    });
/////////////////////////////////////////////////////創建物體/////////////////////////////////////////////////////////
    //用Body繪製自訂複雜圖像-星星
    customBody = Body.create({
      position: { x: 400, y: 200 },//起始點
      vertices: [
        { x: 0, y: -50 }, // 顶点1
        { x: 14, y: -20 }, // 顶点2
        { x: 47, y: -15 }, // 顶点3
        { x: 23, y: 7 },   // 顶点4
        { x: 29, y: 40 },  // 顶点5
        { x: 0, y: 25 },   // 顶点6
        { x: -29, y: 40 }, // 顶点7
        { x: -23, y: 7 },  // 顶点8
        { x: -47, y: -15 },// 顶点9
        { x: -14, y: -20 } // 顶点10
      ],
      // angle:1,//初始旋轉的角度
      render: {
        fillStyle: '#d5d4ff',
      }
      // ,chamfer: {
      //   radius: [10,0,0,0,0,0,0,0,0,0]
      // }
    });
    //用Bodies繪製簡單幾何圖形
    customBodyB =  Bodies.fromVertices(200, 200,[
                                                      { x: 0, y: 0 },
                                                      { x: 40, y: 60 },
                                                      { x: -40, y: 60 }
                                                    ], 
                                                    
                                                    {
                                                      render: {
                                                        fillStyle: 'green'
                                                      }
                                                    }) 
    let customBodyC =  Bodies.rectangle(200, 150, 100, 100, { 
    chamfer: {
      radius: 10
    }
  })
    Composite.add(engine.world, customBodyC);
    //密度設定
    Body.setDensity(customBodyB, 1);//密度較小，一撞就飛
    Body.setDensity(customBody, 2);//密度較大質量較大

    //旋轉
    Body.setAngularVelocity(customBodyB, 1);//順時針選轉，速度為1
    Body.setAngularVelocity(customBody, -1);//逆時針選轉，速度為1

    //物體角度改變
    // Body.setAngle(customBody, 0)//動態修改角度

    // 将自定义实体添加到世界中
    Composite.add(engine.world, customBody);
    Composite.add(engine.world, customBodyB);
/////////////////////////////////////////////////////創建地面/////////////////////////////////////////////////////////

    //静态的地面
    const ground = Bodies.rectangle(570, 580, 900, 40, {
      isStatic: true,
      render: {
        fillStyle: '#f0f0f0',
      }
    });
    const groundB = Bodies.rectangle(0, 400, 120, 800, {
      isStatic: true,
      render: {
        fillStyle: '#f0f0f0',
      }
    });
    // 将自定义实体添加到世界中
    Composite.add(engine.world, ground);
    Composite.add(engine.world, groundB);
/////////////////////////////////////////////////////其他/////////////////////////////////////////////////////////
    //持續更新畫面
    runner = Runner.create();
    Render.run(render);

    //防止重新點及start鈕
    switchD.value=false
}

//初始化時先渲染初始畫面
onMounted(() => {
  mainStore.routeName="matter模組-body與bodies"
  resetSimulation()
});

//離開頁面時清除渲染
onBeforeUnmount(() => {
  cleanUp()
});


</script>

<style></style>
