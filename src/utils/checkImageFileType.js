export default function checkImageFileType(
  fileInput,
  placeholder,
  defaultImage = "/images/author/user.jpg"
) {
  const filePath = fileInput.value;
  let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.webp)$/i;
  if (!allowedExtensions.exec(filePath)) {
    fileInput.value = "";
    document.getElementById(placeholder).innerHTML = `
    <figure className="figure"><img style="width: auto;height: 14.3rem;display: block;margin: auto" className="custom-avatar" src=${
      window.origin + defaultImage
    } 
    className="custom-avatar" alt="preview author"/></figure>
    `;
    return false;
  } else {
    // Image preview
    if (fileInput.files && fileInput.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById(
          placeholder
        ).innerHTML = `<figure className="figure"><img style="width: auto;height: 14.3rem;display: block;margin: auto" className="custom-avatar" src="${e.target.result}"/></figure>`;
      };
      reader.readAsDataURL(fileInput.files[0]);
      return true;
    }
  }
}
