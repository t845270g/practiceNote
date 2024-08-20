<template>
    <div style="display: flex;flex-direction: column;align-items: center;margin-top: 100px;" class="draggable">
      <el-form
        ref="ruleFormRef"
        :model="tableData"
        label-position="top"
        style="display: flex;flex-direction: column;align-items: flex-end;"
      >
      <el-table :data="tableData" style="width:500px;">
        <!-- height: 200px; -->
            <el-table-column prop="id" label="拖曳功能" width="100px" align="center" className="move">
              <template #default="scope">
                ☰
              </template>
            </el-table-column>
            <el-table-column prop="name" label="name" width="100px" align="center" className="nodragable"/>
            <el-table-column prop="gender" label="gender" width="100px" align="center" className="nodragable"/>
            <el-table-column prop="age" label="age" width="100px" align="center" className="nodragable"/>
            <el-table-column prop="text" label="text" align="center" className="nodragable">
              <template #default="scope">
                <el-form-item
                  :rules="[{ validator: checkValue, trigger: 'blur' }]"
                  :prop="scope.row.id+'.'+scope.$index + '.text'"
                >
                <el-input 
                v-model="scope.row.text"
                placeholder="輸入" 
                 @blur="inputBlur(scope.row.id, $event)"
                 />
                </el-form-item>
              </template>
            </el-table-column>
      </el-table>
      <el-button type="primary" @click="save(ruleFormRef)" style="margin-top: 1rem;">送出</el-button>
      </el-form>

    </div>
    <div id="index">
      <div id="chart" />
    </div>
</template>
<script setup>
  import { useMainStore } from "@/store/currentStore";
  const { $Sortable } = useNuxtApp();
  const ruleFormRef = ref(); //實體化表單物件，指向表單的ref
  const mainStore = useMainStore();
  onMounted(()=>{
      mainStore.routeName="draggable模組"
  })
  const tableData= ref([
        {
          id:2,
            name:'李2',
            gender:'男',
            age:20,
            text:''
        },
        {
          id:5,
            name:'王5',
            gender:'未知',
            age:18,
            text:''
        },
        {
          id:7,
            name:'张7',
            gender:'男',
            age:22,
            text:''
        }, {
          id:4,
            name:'张4',
            gender:'女',
            age:22,
            text:''
        },
    ])
  let orderList= ref([])
  //將原本資料的唯一值當成順序列表的值
  if(tableData.value){
    tableData.value.forEach(i => {
      orderList.value.push(i.id)
    });
  }

  //輸入的內容部分
  const inputBlur=(index,e)=>{
    // console.log(index,e.target.value)
    // console.log(tableData.value)
  }
  //驗證
  const checkValue=(rule, value, callback)=>{
    let arr = rule.field.split(".");
    const id = parseInt(arr[0]); //rule.field的值為'0.activityValue'
    const index = parseInt(arr[1]); //rule.field的值為'0.activityValue'
    if(tableData.value[index].text==="A"){
      callback("AAA")
    }else if(!tableData.value[index].text){
      callback("必填")
    }else{
      callback()
    }
  }
  function rowDrop () {
        // 要拖拽元素的父容器
        const tbody = document.querySelector('.draggable .el-table__body-wrapper tbody');
        $Sortable.create(tbody, {
            //  可被拖拽的子元素
            draggable: ".draggable .el-table__row",
            // disabled: true, //停用拖曳
            filter:".draggable .el-table__row .nodragable",
            preventOnFilter: false,//選項確保在這些過濾的元素中，預設行為（例如文字選擇）不會被阻止。
            forceFallback: true,//拖曳時可以看到淺淺的被拖曳物件
            onStart(evt) {
              evt.item.classList.add('grabbing'); // 添加拖动时的样式
            },
            onEnd(evt) {
              const currRow = orderList.value.splice(evt.oldIndex, 1)[0];
              orderList.value.splice(evt.newIndex, 0, currRow);
              evt.item.classList.remove('grabbing'); // 移除拖动结束后的样式
            },
        });

    }
  onMounted(()=>{
    rowDrop()
  })

  const save = async (formEl) => {
    if (!formEl) return; //如果formEl為 undefined 如果表單沒有創建實例
    formEl.clearValidate(); //先清空前面驗證錯誤訊息，因為await formEl.validate會全部再驗證一次，並產生錯誤訊息。

    await formEl.validate(async (valid, fields) => {
      if (!valid) {
        ElMessageBox.alert("dfs", "fff", {
          confirmButtonText: "OK",
          type: "warning",
        });
      }else{
        // console.log("順序列表:",orderList.value)
        // console.log("資料(沒照新順序):",tableData.value)
        let data=[]
        orderList.value.forEach(index => {
          data.push(tableData.value.filter(n=>n.id===index)[0])
        });
        console.log("正確資料",data)
      }
  });
};


</script>

<style>
.move:hover{
  cursor:grab;
}

.grabbing :hover{
  cursor:grabbing;
}
#chart{
	width: 100%;
	height: 500px;
  	margin: 50px auto;
}
</style>