type formData = {
  name: string;
  surname: string;
  email: string;
  department: string;
};

export const verifyAddForm = (formData: formData) => {
  if (
    !formData.name.trim() ||
    !formData.surname.trim() ||
    !formData.email.trim() ||
    !formData.department
  ) {
    return false;
  }

  return true;
};
