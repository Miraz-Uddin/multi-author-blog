export default function getSerializeData(data, fieldName, imageFile) {
  const formData = new FormData();
  formData.append(`files.${fieldName}`, imageFile, imageFile.name);
  formData.append("data", JSON.stringify(data));
  return formData;
}
