import { ValidateButton } from "../components/Common/ValidateButton";
import { TextField } from "../components/Common/TextField";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../store/slices/userSlice";

import { useNavigate } from "react-router-dom";

import styles from "./LoginPage.module.scss";

import logo from "/logo.svg";
import { useState } from "react";
import { Alert, useTheme } from "@mui/material";
import { Button } from "../components/Common/Button";
import { Colors } from "../constants/Colors";

export default function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const theme = useTheme();

    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isError, setIsError] = useState(false);

    const onSubmit = async e => {
        e.preventDefault();

        // On récupère les champs du formulaire
        const data = new FormData(e.currentTarget);

        const email = data.get("email");
        const password = data.get("password");

        // On valide les données si besoin ici

        setIsLoggingIn(true);
        setIsError(false);

        // On envoie la requête
        const response = await fetch(import.meta.env.VITE_API_ROOT + "/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        // On traite la réponse
        if (response.ok) {
            // Ici on a recu un code HTTP valide
            const { token, user } = await response.json();
            console.log(user);
            console.log(token);

            dispatch(setToken(token));
            dispatch(setUser(user));

            navigate("/dashboard");
        } else {
            // Ici on a recu une erreur du serveur
            setIsError(true);
        }

        setIsLoggingIn(false);
    };

    return (
        <div className={styles.container}>
            <img src={logo} />

            <div className={styles.actionContainer}>
                <form onSubmit={onSubmit} className={styles.form}>
                    {isError && <Alert severity="warning">Email ou mot de passe invalide</Alert>}

                    <TextField name="email" label="Email" type="email" required disabled={isLoggingIn} />
                    <TextField name="password" label="Mot de passe" type="password" required disabled={isLoggingIn} />
                    <ValidateButton disabled={isLoggingIn} />
                </form>

                <Button text="S'inscrire" href="/signup" color={Colors.Secondary} />
            </div>
        </div>
    );
}