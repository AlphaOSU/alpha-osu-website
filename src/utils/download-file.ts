/**
 * 下载文件
 * @param url 下载链接
 * @param filename 下载文件名
 */
export const downloadFile = (url: string, filename: string) => {
  if (!url || !filename) {
    throw new Error('文件名或下载链接无效！');
  }

  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  a.click();
};

/**
 * 从二进制流下载文件
 * @param blob
 * @param filename
 */
export const downloadFileFromBlob = (blob: Blob, filename: string) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onload = (e) => {
    downloadFile(String(e?.target?.result || ''), filename);
  };
};
