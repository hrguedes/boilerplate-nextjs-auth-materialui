import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

// ui
import Swal from 'sweetalert2'

// Models
import ReturnOk from "../models/Base/ReturnOk";

class ApiService {
  private readonly api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:5030/api",
    });

    const token = Cookies.get("authenticationapp.token");
    if (token) {
      this.api.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }

  private handleApiError<T>(error: any): ReturnOk<T> {
    if (error.response && error.response.data.statusCode === 500) {
      Swal.fire({
        icon: 'error',
        title: 'Bad Request',
        text: error.response.data.messages[0].message,
      });
    }
    return new ReturnOk<T>(400, error.response.data.messages, false, null);
  }

  async get<T>(url: string, params: any): Promise<ReturnOk<T>> {
    try {
      const response = await this.api.get<ReturnOk<T>>(url, { params });
      return response.data;
    } catch (error: any) {
      return this.handleApiError(error);
    }
  }

  async post<T>(url: string, data: any): Promise<ReturnOk<T>> {
    try {
      const response = await this.api.post<ReturnOk<T>>(url, data);
      return response.data;
    } catch (error: any) {
      return this.handleApiError(error);
    }
  }

  async put<T>(url: string, data: any): Promise<ReturnOk<T>> {
    try {
      const response = await this.api.put<ReturnOk<T>>(url, data);
      return response.data;
    } catch (error: any) {
      return this.handleApiError(error);
    }
  }

  async delete<T>(url: string): Promise<ReturnOk<T>> {
    try {
      const response = await this.api.delete<ReturnOk<T>>(url);
      return response.data;
    } catch (error: any) {
      return this.handleApiError(error);
    }
  }
}

export default ApiService;
