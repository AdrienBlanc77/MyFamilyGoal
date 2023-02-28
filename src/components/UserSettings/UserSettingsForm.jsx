import { useState } from "react";
import { TextField } from "../Common/TextField";
import { ValidateButton } from "../Common/ValidateButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setToken, setUser } from "../../store/slices/userSlice";
import { Alert } from "@mui/material";
import { Button } from "../Common/Button";
import { Colors } from "../../constants/Colors";
import styles from "./UserSettingsForm.module.scss";

const UserSettingsForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [passwordConfirm, setPasswordConfirm] = useState();
    const [isError, setIsError] = useState(false);
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState();

    const token = useSelector(state => state.user.token);
    const user = useSelector(state => state.user.user);

    const { userId } = useParams();
    // console.log("mon userid", userId);

    // const [name, setName] = useState(user.lastname);
    // console.log("name du usestate", name);

    //console.log("mon token", token);
    //console.log("mon user", user);

    const onSubmit = async e => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const firstname = data.get("firstname");
        const lastname = data.get("lastname");
        const pseudo = data.get("pseudo");
        const email = data.get("email");
        const password = data.get("password");
        const newPassword = data.get("newpassword");

        setIsConfirmPasswordValid(true);

        // if (newPassword !== passwordConfirm) {
        //     setIsConfirmPasswordValid(false);

        //     return;
        // }

        setIsError(false);

        console.log("c'est ma data", lastname, firstname);
        const response = await fetch(import.meta.env.VITE_API_ROOT + `/user/${userId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", authorization: `bearer ${token}` },
            body: JSON.stringify({
                firstname,
                lastname,
                pseudo,
                email,
                password,
                newPassword,
            }),
        });

        if (response.ok) {
            const { token, user } = await response.json();
            console.log("votre formulaire a été modifié");
            dispatch(setToken(token));
            dispatch(setUser(user));
            console.log("mon nouveau token", token);
            console.log("mon nouveau user", user);
            // navigate("/dashboard");
        } else {
            setIsError(true);
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={onSubmit} className={styles.form}>
                <TextField label="Nom" placeholder={user.lastname} name="lastname" />
                <TextField label="Prénom" placeholder={user.firstname} name="firstname" />
                <TextField label="Pseudo" placeholder={user.pseudo} name="pseudo" />
                <TextField label="Email" name="email" type="email" />
                <TextField label="Mot de passe actuel" name="password" type="password" />
                <TextField label="Nouveau mot de passe" name="newPassword" type="password" />
                <TextField
                    label="Confirmation du mot de passe ou du nouveau"
                    value={passwordConfirm}
                    onChange={setPasswordConfirm}
                    type="password"
                    // errorText={isConfirmPasswordValid === false ? "Ne correspond pas au mot de passe entré" : undefined}
                />
                <div className={styles.formButton}>
                    <ValidateButton text="Valider les modifications" />
                    <Button text="Annuler" color={Colors.Warning} href="/dashboard" />
                </div>
                {isError && <Alert severity="warning">Une erreur est survenue. Veuillez réessayer plus tard.</Alert>}
            </form>
            <div className={styles.formButton}>
                <Button text="Déconnexion" color={Colors.Success} href="/" />
                <Button text="Supprimer le compte" color={Colors.Warning} />
            </div>
        </div>
    );
};
export default UserSettingsForm;
