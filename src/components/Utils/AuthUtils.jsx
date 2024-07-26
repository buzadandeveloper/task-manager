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

  const loggedInUser = { ...user, isAuthenticated: true };
  localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
  return { success: true, user: loggedInUser };
};

export const isEmailRegistered = email => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  return users.some(user => user.email === email);
};
