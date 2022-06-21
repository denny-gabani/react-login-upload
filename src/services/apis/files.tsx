import { doFetch } from "../fetcher";

export declare type FileResponse = {
  FileId: string;
  FileName: string;
  FileExt: string;
  Url: string;
}

export default {
  uploadFile: (data: FormData) => doFetch("https://v2.convertapi.com/upload", "POST", data)
}