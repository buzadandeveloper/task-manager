import React, {
  useReducer,
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: {
    name: "",
    email: "",
    password: "",
    image: ""
  }
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    case "LOGOUT":
      return {
        ...initialState
      };
    case "UPDATE_PROFILE":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      };
    default:
      return state;
  }
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch({ type: "LOGIN", payload: parsedUser });
    }
    setIsInitialized(true);
  }, []);

  const login = (name, email, password, image) => {
    const userData = { name, email, password, image };
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    dispatch({ type: "LOGIN", payload: userData });
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    dispatch({ type: "LOGOUT" });
    setIsProfileVisible(false);
  };

  const updateProfile = (image, name, email, password) => {
    const updatedUser = { image, name, email, password };
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map(user =>
      user.email === state.user.email ? updatedUser : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    dispatch({ type: "UPDATE_PROFILE", payload: updatedUser });
  };

  const toggleProfile = () => {
    setIsProfileVisible(prev => !prev);
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        updateProfile,
        isInitialized,
        isProfileVisible,
        toggleProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
