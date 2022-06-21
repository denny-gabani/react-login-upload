const checkError = async (response: Response) => {
  if (response.status > 400) {
    const errResponse: any = await response.json();
    throw Error(errResponse.message)
  }

  return await response.json()
}

export const doFetch = (url: string, method: string = "POST", body: any) => {
  let options: RequestInit = {
    method
  }

  // set header according to login api
  if (url.includes("login")) {
    options.headers = {
      "content-type": "application/json"
    }
    options.body = JSON.stringify(body)
  }

  // set header according to login api
  if (url.includes("upload")) {
    options.body = body
  }

  return fetch(url, options).then(checkError)
}