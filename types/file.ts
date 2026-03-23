export interface File {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'pending' | 'processing' | 'done' | 'error';
  uploadedAt: Date;
  processedAt: Date | null;
  errorMessage: string | null;
  downloadUrl: string | null;
}

export interface UploadFileRequest {
  file: File;
  onProgress?: (progress: number) => void;
}

export interface UploadResponse {
  file: File;
  id: string;
  status: 'pending';
}

export interface GetFilesParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  type?: string;
}
