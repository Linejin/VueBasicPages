
import axios from 'axios';
export async function fetchComment(){
    try {
        const response = await axios.get('http://localhost:8000/api/comment/');
        return response.data.map((element) => {
            return {id: element.id, comment: element.comment, editText: null};
        });
    } catch (error) {
        console.error(error)
    } 
}

export async function createComment(comment){
    try {
        const data = {"comment": comment};
        const response = await axios.post('http://localhost:8000/api/comment/', data);
        const element = response.data;
        return {id: element.id, comment: element.comment, editText: null};
    } catch (error) {
        console.error(error)
    } 
}

export async function updateComment(id, comment){
    try {
        const data = {"comment": comment};
        const response = await axios.put('http://localhost:8000/api/comment/'+id+'/', data);
        const element = response.data;
        return {id: element.id, comment: element.comment, editText: null};
    } catch (error) {
        console.error(error)
    } 
}

export async function deleteComment(id){
    try {
        await axios.delete('http://localhost:8000/api/comment/'+id+'/');
    } catch (error) {
        console.error(error)
    } 
}