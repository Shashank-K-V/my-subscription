import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000",
});

// Automatically attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export const getSubscriptions = async () => (await api.get("/subscriptions")).data;
export const addSubscription = async (sub) => (await api.post("/subscriptions", sub)).data;
export const updateSubscription = async (id, data) => (await api.put(`/subscriptions/${id}`, data)).data;
export const deleteSubscription = async (id) => (await api.delete(`/subscriptions/${id}`)).data;
