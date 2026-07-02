import axios from "axios";
import { Interface } from "readline";


export interface IProject {
  title: string,
  description: string,
  githubLink?: string,
  liveLink?: string
}
export interface CompleteProfileData {
  fullname: string;
  skills: string[];
  projects: IProject[];
  university?: string;
  githubLink: string;
  bio?: string;
}
export interface query {
  page?: number,
  limit?: string,
  skill?: string,
  university?: string,
  token?: string | null,
}

class UserService {
  private api = axios.create({
    baseURL: "http://localhost:8001/api/v1/user",
    withCredentials: true,
  })

  async syncUser(token: string) {
    try {
      const response = await this.api.post(
        "/sync",
        undefined,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data ?? error
      }
      throw error
    }
  }

  async completeProfile(token: string,
    data: CompleteProfileData) {
    try {
      const response = await this.api.patch("/complete-profile",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data ?? error
      }
      throw error
    }
  }

// services/user.service.ts

getCurrentUser = async () => {
  try {
    const response = await this.api.get("/me");
  
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
        throw error.response?.data ?? error
      }
      throw error
  }
};
getUserProfile=async (id:string)=>{
  try {
    const response =await this.api.get(`/${id}`)
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
        throw error.response?.data ?? error
      }
      throw error
  }
}
getAllUserProfile=async(data:query)=>{
    try {
       const response = await this.api.get("/", {
         params: {
           page: data.page,
           limit: data.limit,
           skill: data.skill || undefined,
           university: data.university || undefined,
         },
          headers:data.token? {
            Authorization: `Bearer ${data.token}`,
          }:{},
       });
       return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data ?? error
      }
      throw error
    }
}
}

const userService = new UserService()

export default userService
