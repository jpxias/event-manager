import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { useAuthContext } from "../../contexts/Auth.context";
import "./Login.css";

interface ILoginData {
  username?: string | undefined;
  password?: string | undefined;
}
const LoginScreen = () => {
  const { login } = useAuthContext();
  const [loginData, setLoginData] = useState<ILoginData>();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit = () => {
    console.log("iowajdosjaoiasd");
    if (login && loginData?.username && loginData.password) login(loginData?.username, loginData?.password);
  };

  const onChangeLoginData = (key: string, ev: any) => {
    setLoginData({ ...loginData, [key]: ev.target.value });
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h3>Event Management</h3>
        <TextField label="Username" onChange={(ev: any) => onChangeLoginData("username", ev)} id="username" />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          onChange={(ev: any) => onChangeLoginData("password", ev)}
          id="password"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <Button fullWidth variant="contained" onClick={onSubmit}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default LoginScreen;
