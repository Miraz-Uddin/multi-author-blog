export default function getFullName(firstName, lastName) {
  let fullname;
  const fName = firstName.trim();
  const lName = lastName.trim();
  const isFirstNameEmpty =
    fName === "" || fName === null || fName === undefined;
  const isLastNameEmpty = lName === "" || lName === null || lName === undefined;
  if (isFirstNameEmpty && isLastNameEmpty) {
    fullname = "";
  } else {
    if (isFirstNameEmpty) {
      fullname = lName.charAt(0).toUpperCase() + lName.slice(1);
    } else if (isLastNameEmpty) {
      fullname = fName.charAt(0).toUpperCase() + fName.slice(1);
    } else {
      fullname =
        fName.charAt(0).toUpperCase() +
        fName.slice(1) +
        " " +
        lName.charAt(0).toUpperCase() +
        lName.slice(1);
    }
  }
  return fullname;
}
