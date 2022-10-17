export default function checkImageFileType(fileInput, placeholder) {
  const filePath = fileInput.value;
  let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
  if (!allowedExtensions.exec(filePath)) {
    fileInput.value = "";
    document.getElementById(placeholder).innerHTML = `
    <figure className="figure"><img src=${
      window.origin + "/images/author/user.jpg"
    } 
    className="figure-img img-fluid rounded" alt="preview author"/></figure>
    `;
    return false;
  } else {
    // Image preview
    if (fileInput.files && fileInput.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById(placeholder).innerHTML =
          '<img className="img-fluid" src="' + e.target.result + '"/>';
      };
      reader.readAsDataURL(fileInput.files[0]);
      return true;
    }
  }
}
