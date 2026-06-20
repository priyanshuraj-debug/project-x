import axios from "axios";

class ConnectUser {

    private api = axios.create({
        baseURL: "http://localhost:8001/api/v1/connect-user",
        withCredentials: true,
    })

 async  sendRequest({token, recieverId}: {token: string, recieverId: string}){
      try {
        const response = await this.api.post(
        "/send-request",
        {
            token,recieverId
        },
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
}