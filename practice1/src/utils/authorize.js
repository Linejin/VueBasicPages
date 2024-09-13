import axios from 'axios'
export async function isAuthorize(){
    console.log("in")
    try {
        await axios.get('http://localhost:8000/api/check-auth/', {
            withCredentials: true,  // 서버 측에서 세션 쿠키를 전송받기 위해 필요,
        });
        return true;
    } catch (error) {
        console.error(error)
        return false;
    }
}

export async function login(id, password, message){
    try {
      const info = {"username": id.value, "password": btoa(password.value)};
      const response = await axios.post('http://localhost:8000/api/login/', info, {
        withCredentials: true,  // 서버 측에서 세션 쿠키를 전송받기 위해 필요
      });
      message.value = response.data.detail
      return true;
    } catch (error) {
      message.value = error.response.data.detail;
      return false;
    }
}