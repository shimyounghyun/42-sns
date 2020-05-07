import axios from "axios";

interface FileParams {
  saveOriginal?: boolean;
  targetClass?: string;
  targetId?: string;
  [k: string]: any;
}

export interface File {
  objectId?: string;
  sizeLargeUrl?: string;
  thumbUrl?: string;
  url?: string;
  mimetype?: string;
  width?: number;
  height?: number;
}

export async function uploadFile(
  files: any,
  params?: FileParams
): Promise<File[]> {
  return axios.post("/file/upload", { files, params });
}
