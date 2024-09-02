<template>
    <div id="boxes">
        <form>
          <div class="boxes_container">
            <select v-model="listboxes_selectedOption" name="options" @input="save" :style="{ width: '200px !important', margin: '5px', textAlign: 'right' }" >
              <option v-for="item in listboxes_items" :key="item.id" :value="item.text">{{item.text}}</option>
            </select>
            <label v-for="item in checkboxes_items" :key="item.id" >
              <input type="checkbox" v-model="checkboxes_selectedOption" :value="item.text" @input="save" >
              {{item.text}}
            </label>
          </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'InputBoxes',
};
</script>

<script setup>
import { ref,onMounted } from 'vue';
import axios from 'axios'

const error_state = ref(null)
const loading = ref(true)
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
#boxes {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex; /* Flexbox 레이아웃 사용 */
  justify-content: center; /* 가로로 가운데 정렬 */
}
.save_load_Btn{
    margin-top: 10px;
    margin-left: 5px;
    margin-right: 5px;
}
.boxes_container{
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>
