export default function objectToFormData(obj: Record<string, any>): FormData {
    const formData = new FormData();
    for (const [key, value] of Object.entries(obj)) {
      if (value instanceof FileList) {
        for (let i = 0; i < value.length; i++) {
          formData.append(`${key}[]`, value[i]);
        }
      } else {
        formData.append(key, value);
      }
    }
    return formData;
  }
  