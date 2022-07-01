import React, { useState, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { logModalChange } from "../feature/loginModal.slice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const theme = createTheme();

export default function SignUp() {
  const [imageBack, setImageBack] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const handleImage = (e) => {

    setImageBack(e.target.files[0]);

  }
  const handleData = (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      password,
      image: imageBack,
    };
    axios
      .post("http://82.223.139.193:3001/api/auth/signup", data,
        { headers: { "Content-Type": "multipart/form-data" } })
      .then((res) => {
        console.log(res);
        setMsg("Votre compte a été créé avec succès");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const dispatch = useDispatch();
  const modal = useSelector((state) => state.logModal.logModal);

  // };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            S'inscrire
          </Typography>

          <Box component="form" noValidate onSubmit={handleData} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Nom"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                  id="email"
                  label="Adresse Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleImage}

                  type="file"

                />
              </Grid>
              <Grid item xs={12}>
                {msg !== "" ? (
                  <p
                    onClick={() => dispatch(logModalChange(null))}
                    style={{ color: "rgb(49, 222, 11)", cursor: "pointer" }}
                  >
                    {msg} cliquez ici pour vous connecter{" "}
                  </p>
                ) : null}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              S'inscrire
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  style={{ cursor: "pointer" }}
                  onClick={() => dispatch(logModalChange(null))}
                  variant="body2"
                >
                  Se connecter
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
