import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

interface FileUploadOptions {
  allowedTypes?: string[] | null;
  maxSize?: number | null; // in bytes
  onSuccess?: (file: File) => void;
  onError?: (error: string) => void;
}

export default function useFileUpload(options: FileUploadOptions = {}) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const pickDocument = async () => {
    try {
      setError(null);
      setSuccess(false);

      const result = await DocumentPicker.getDocumentAsync({
        type: options.allowedTypes || undefined,
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        return;
      }

      const selectedFile = result.assets[0];

      // Check file size if maxSize is specified
      if (
        options.maxSize &&
        selectedFile.size &&
        selectedFile.size > options.maxSize
      ) {
        const errorMessage = `File size exceeds the maximum allowed size of ${
          options.maxSize / (1024 * 1024)
        }MB`;
        setError(errorMessage);
        options.onError?.(errorMessage);
        return;
      }

      setFile(selectedFile as unknown as File);
      setSuccess(true);
      options.onSuccess?.(selectedFile as unknown as File);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to pick document";
      setError(errorMessage);
      options.onError?.(errorMessage);
    }
  };

  const uploadFile = async (uploadUrl: string) => {
    if (!file) {
      const errorMessage = "No file selected";
      setError(errorMessage);
      options.onError?.(errorMessage);
      return;
    }

    try {
      setUploading(true);
      setError(null);
      setSuccess(false);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      setSuccess(true);
      options.onSuccess?.(file);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to upload file";
      setError(errorMessage);
      options.onError?.(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setError(null);
    setSuccess(false);
    setUploading(false);
  };

  return {
    file,
    uploading,
    error,
    success,
    pickDocument,
    uploadFile,
    reset,
  };
}
