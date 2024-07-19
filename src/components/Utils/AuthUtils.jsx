export const saveAuthDataLocalStorage = authData => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(authData);
  localStorage.setItem("users", JSON.stringify(users));
};
export const checkAuthDataLocalStorage = authData => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    user => user.email === authData.email && user.password === authData.password
  );

  if (!user)
    return { success: false, message: "Email or password is incorrect." };

  localStorage.setItem("loggedInUser", authData.email);
  return { success: true };
};
export const isEmailRegistered = email => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  return users.some(user => user.email === email);
};
