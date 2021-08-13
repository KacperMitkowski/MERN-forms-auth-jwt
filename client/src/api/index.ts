import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        const profile = localStorage.getItem('profile') || '';
        req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`;
    }

    return req;
});


API.interceptors.response.use(response => {
    return response;
 }, error => {
   if (error.response.status === 401) {
        window.location.assign('/loginUser');
   }
   else if(error.response.status === 500) {
       alert("Server error");
   }
   return error;
   
 });


export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

export const fetchForms = () => API.get('/forms');
export const fetchForm = (id) => API.get(`/forms/${id}`);
export const createForm = (form) => API.post('/forms', form);
export const updateForm = (id, updatedForm) => API.patch(`/forms/${id}`, updatedForm);
export const deleteForm = (id) => API.delete(`/forms/${id}`);

export const getAnswers = (formId) => API.get(`/answers/${formId}`); 
export const addAnswer = (formAnswer) => API.post(`/answers/${formAnswer.formId}`, { formAnswer });
