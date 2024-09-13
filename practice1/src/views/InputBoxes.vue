<template>
    <div id="inputboxes-wrapper">
        <form>
          <div class="boxes_container">
            <div class="selector_container">
              <select v-model="listboxes_selectedOption" name="options" @input="save" :style="{ width: '200px !important', margin: '5px', textAlign: 'right' }" >
                <option v-for="item in listboxes_items" :key="item.id" :value="item.text">{{item.text}}</option>
              </select>
            </div>
            <div class="custom-selector-container" @click="isOpen">
              <span class="custom-selector-value"> {{listboxes_selectedOption}} </span>
              <ul v-if="selectbox_item_display" class="custom-selector-item-container" >
                <li class="custom-selector-item" v-for="item in listboxes_items" :key="item.id" @click="onClick_option(item.text)">
                  <input :id="item.id" :value="item.text" readonly>
                  <label :for="item.id"></label>
                </li>
              </ul>
            </div>
            <div class="toggle-container">
              <div  class="toggle-pill-color" v-for="item in checkboxes_items" :key="item.id" >
                <input type="checkbox" v-model="checkboxes_selectedOption" :value="item.text" @input="save" :id="item.id">
                <label :for="item.id"></label>
                <span>{{item.text}}</span>
              </div>
            </div>
          </div>
        </form>
    </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import axios from 'axios'

const error_state = ref(null)
const loading = ref(true)
const selectbox_item_display = ref(false)
let id = 0
const listboxes_items = ref([
  {id: id++, text: "a"},
  {id: id++, text: "b"},
  {id: id++, text: "c"},
  {id: id++, text: "d"},
  {id: id++, text: "e"},
  {id: id++, text: "f"},
])
const listboxes_selectedOption = ref("a")

const checkboxes_items = ref([
  {id: id++, text: "A"},
  {id: id++, text: "B"},
  {id: id++, text: "C"},
  {id: id++, text: "D"},
  {id: id++, text: "E"},
  {id: id++, text: "F"},
])
const checkboxes_selectedOption = ref([])

function isOpen(){
  selectbox_item_display.value = !selectbox_item_display.value;
}

function onClick_option(value){
  listboxes_selectedOption.value = value;
}

const save = (event) => {
  event.preventDefault()
  updateData()
};

async function fetchData(){
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/boxes/1/');
        listboxes_selectedOption.value = response.data.listbox || "a";
        checkboxes_selectedOption.value = response.data.checkbox ? response.data.checkbox.split(',') : [];
      } catch (error) {
        error_state.value = error;
      } finally {
        loading.value = false;
      }
}

async function updateData(){
      try {
        const updatedData = {
          "listbox": listboxes_selectedOption.value,
          "checkbox": checkboxes_selectedOption.value.join(',')
        }
        const response = await axios.put('http://127.0.0.1:8000/api/boxes/1/', updatedData);
      } catch (error) {
        error_state.value = error;
      } finally {
        loading.value = false;
      }
}


onMounted(()=>{
  fetchData()
});

</script>

<style scoped>
#inputboxes-wrapper {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex; /* Flexbox 레이아웃 사용 */
  justify-content: center; /* 가로로 가운데 정렬 */
}
.boxes_container{
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.custom-selector-container{
  position: relative;
  width: 200px;
  height: 40px;
  line-height: 40px;
  margin: 5px;
}
.custom-selector-container .custom-selector-value {
  cursor: pointer;
  position: absolute;
  width: 90%;
  font-size: .86em;
  color: #606976;
  top: 0;
  left: 0;
  padding: 0 5%;
  border: 1px solid #606976;
  /* border-radius: 4px; */
  background: #fff;
}
.custom-selector-container .custom-selector-value:after {
  content: '▼';
  width: 40px;
  height: 40px;
  position: absolute;
  top: 0;
  right: 0;
  font-size: .76em;
  color: #fff;
  text-align: center;
  background: #606976;
}
.custom-selector-item-container{
  display: block;
  position: absolute;
  width: 200px;
  margin-top: 40px;
  left: 0;
  background-color: #fff;
  border: 1px solid #000/*#C4C4C4*/;
  box-sizing: content-box;
  box-shadow: 4px 4px 14px rgba(0, 0, 0, 0.15);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  z-index: 9;
  list-style-type: none;
  padding-left: 0;
}
.custom-selector-item{
  height: 40px;
  padding: 5px 8px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.custom-selector-item input {
  width: 100%;
  height: 100%;
  border: none;
  background-color: #fff;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  /* 말줄임 */
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 0;
  transition: all 0.3s ease; /* 모든 속성의 변화에 대해 애니메이션 추가 */
}
.custom-selector-item input:hover {
  background-color: #333333;
  color: #fff;
}

/* toggle-pill-color */
.toggle-container{
  margin-top: 20px;
}
.toggle-pill-color{
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.toggle-pill-color span{
  vertical-align: middle; 
}
.toggle-pill-color input[type="checkbox"] {
  display: none;
}
.toggle-pill-color input[type="checkbox"] + label {
  display: block;
  position: relative;
  width: 3em;
  height: 1.6em;
  border-radius: 1em;
  background: #e84d4d;
  box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-transition: background 0.1s ease-in-out;
  transition: background 0.1s ease-in-out;
}
.toggle-pill-color input[type="checkbox"] + label:before {
  content: "";
  display: block;
  width: 1.2em;
  height: 1.2em;
  border-radius: 1em;
  background: #fff;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.2);
  position: absolute;
  left: 0.2em;
  top: 0.2em;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
.toggle-pill-color input[type="checkbox"]:checked + label {
  background: #42b983;
}
.toggle-pill-color input[type="checkbox"]:checked + label:before {
  box-shadow: -2px 0px 5px rgba(0, 0, 0, 0.2);
  left: 1.6em;
}
/* toggle-pill-color end */

</style>
