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
            recieverId
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

  async acceptRequest({
  token,
  requestId,
}: {
  token: string
  requestId: string
}) {
  try {
    const response = await this.api.patch(
      "/accept-request",
      { requestId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data ?? error
    }
    throw error
  }
}

async rejectRequest({
  token,
  requestId,
}: {
  token: string
  requestId: string
}) {
  try {
    const response = await this.api.patch(
      "/reject-request",
      { requestId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data ?? error
    }
    throw error
  }
}

async getAllRequest(token: string) {
  try {
    const response = await this.api.get(
      "/get-all-request",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data ?? error
    }
    throw error
  }
}

async getConnectionStatus({
  token,
  userId,
}: {
  token: string
  userId: string
}) {
  try {
    const response = await this.api.get(
      `/connection-status/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data ?? error
    }
    throw error
  }
}
}