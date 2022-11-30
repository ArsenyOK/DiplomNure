import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../../store/actions/itemAction";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import {
    BoxAddRecipe,
    BoxUserInfo,
    ContainerBtnUser,
    ContainerUserPage,
} from "./styled/userPage.styled";
import { Button, TextField } from "@mui/material";
import { CustomBox } from "../styled-components";
import { updateUserData } from "../../store/actions/authActions";
import { useHistory } from "react-router-dom";
import { useCallback } from "react";

const UserPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [editMode, setEditMode] = useState(false);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    // const [photoImg, setPhotoImg] = useState([]);

    const { user, isLoading } = useSelector((store) => store.auth);
    // const { recipes } = useSelector((store) => store.recipes);
    const { msg } = useSelector((store) => store.error);

    // const onChangeImg = (e) => {
    //     setPhotoImg(e.target.files[0]);
    // }

    const getUserRecipes = useCallback(() => {
        if (user && user._id) {
            axios
                .get(`/api/recipes/recipes-user/${user._id}`)
                .then((res) => {
                    console.log(res, "res");
                })
                .catch((err) => {
                    console.log(err, "err");
                });
        }
    }, [user]);

    const goToAddRecipe = () => {
        history.push("/add-recipe");
    };

    const onChangeName = (e) => {
        setUserName(e.target.value);
    };

    const onChangeEmail = (e) => {
        setUserEmail(e.target.value);
    };

    const ChangeEditMode = () => {
        setEditMode((prev) => !prev);
    };

    const onCloseEditMode = () => {
        ChangeEditMode();
        setUserName(user.name);
        setUserEmail(user.email);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        // const formData = new FormData();
        // formData.append('name', userName);
        // formData.append('email', userEmail);
        // formData.append('avatar', photoImg);

        // console.log(formData.get('avatar'))

        if (userName !== "" && userEmail !== "") {
            const userData = {
                name: userName,
                email: userEmail,
                // avatar: photoImg
            };

            dispatch(updateUserData(userData, user._id));

            if (!!msg) {
                onCloseEditMode();
            }
        }
    };

    useEffect(() => {
        dispatch(getItems());
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setUserName(user.name);
            setUserEmail(user.email);
        }
    }, [user]);

    useEffect(() => {
        getUserRecipes();
    }, [getUserRecipes]);

    if (!user) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <CircularProgress size={50} />
            </div>
        );
    }

    return (
        <ContainerUserPage>
            <h2>Profile</h2>
            <form onSubmit={onSubmit}>
                {editMode ? (
                    <BoxUserInfo>
                        {user && (
                            <>
                                <CustomBox>
                                    <TextField
                                        required
                                        value={userName}
                                        onChange={(e) => onChangeName(e)}
                                        id="outlined-basic"
                                        label="Your name"
                                        variant="outlined"
                                    />
                                </CustomBox>
                                <CustomBox>
                                    <TextField
                                        required
                                        value={userEmail}
                                        onChange={(e) => onChangeEmail(e)}
                                        id="outlined-basic"
                                        label="Your email"
                                        variant="outlined"
                                    />
                                </CustomBox>
                                {/* <CustomBox>
                                <input onChange={(e) => onChangeImg(e)} accept="image/*" type="file" placeholder="photo" />
                            </CustomBox> */}
                            </>
                        )}
                    </BoxUserInfo>
                ) : (
                    <BoxUserInfo>
                        {isLoading ? (
                            <CircularProgress size={30} />
                        ) : (
                            <>
                                <h4>{user.name}</h4>
                                <p>{user.email}</p>
                            </>
                        )}
                    </BoxUserInfo>
                )}
                {editMode ? (
                    <ContainerBtnUser>
                        <Button type="submit" variant="contained">
                            Edit
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => onCloseEditMode()}
                        >
                            Close
                        </Button>
                    </ContainerBtnUser>
                ) : (
                    !isLoading && (
                        <Button
                            variant="contained"
                            onClick={() => ChangeEditMode()}
                        >
                            Edit data
                        </Button>
                    )
                )}
            </form>
            <BoxAddRecipe>
                <Button
                    onClick={goToAddRecipe}
                    variant="contained"
                    color="success"
                >
                    Add Recipe
                </Button>
            </BoxAddRecipe>
        </ContainerUserPage>
    );
};

export default UserPage;
