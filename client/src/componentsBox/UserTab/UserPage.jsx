import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../../store/actions/itemAction";
import CircularProgress from "@mui/material/CircularProgress";
import {
    BoxAddRecipe,
    BoxUserInfo,
    ContainerBtnUser,
    ContainerUserPage,
} from "./styled/userPage.styled";
import { Button, TextField } from "@mui/material";
import { CustomBox } from "../styled-components";
import { updateUserData } from "../../store/actions/authActions";
import { Redirect, useHistory } from "react-router-dom";
import ListOwnRecipes from "../ListOwnRecipes/OwnRecipes/ListOwnRecipes";
import CustomBtn from "../common/CustomBtn/CustomBtn";

const UserPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [editMode, setEditMode] = useState(false);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [photoImg, setPhotoImg] = useState([]);
    const [showRecipes, setShowRecipes] = useState(false);

    const { user, isLoading } = useSelector((store) => store.auth);
    // const { recipes } = useSelector((store) => store.recipes);
    const { msg } = useSelector((store) => store.error);

    const onChangeImg = (e) => {
        setPhotoImg(e.target.files[0]);
    };

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

    const handleShowRecipes = () => {
        setShowRecipes((prev) => !prev);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        if (userName !== "" && userEmail !== "" && photoImg.length !== 0) {
            console.log(1);
            // const userData = {
            //     name: userName,
            //     email: userEmail,
            //     avatar: photoImg,
            // };

            formData.append("name", userName);
            formData.append("email", userEmail);
            formData.append("avatar", photoImg);

            dispatch(updateUserData(formData, user._id));

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

    if (!user) {
        if (msg === "No token, authorization denied") {
            return <Redirect to="/" />;
        } else {
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
                                <CustomBox>
                                    <input
                                        onChange={(e) => onChangeImg(e)}
                                        accept="image/*"
                                        type="file"
                                        placeholder="photo"
                                    />
                                </CustomBox>
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
                        <CustomBtn
                            hover={"#1565C0"}
                            bg={"#1976D2"}
                            text={"Edit"}
                            type={"submit"}
                        />
                        <CustomBtn
                            hover={"#c62828"}
                            bg={"#D32F2F"}
                            text={"Close"}
                            onClick={() => onCloseEditMode()}
                        />
                    </ContainerBtnUser>
                ) : (
                    !isLoading && (
                        <CustomBtn
                            hover={"#1565C0"}
                            bg={"#1976D2"}
                            text={"Edit data"}
                            onClick={() => ChangeEditMode()}
                        />
                    )
                )}
            </form>
            <BoxAddRecipe>
                <CustomBtn
                    hover={"#1b5e20"}
                    bg={"#2e7d32"}
                    text={"Add Recipe"}
                    onClick={goToAddRecipe}
                />
            </BoxAddRecipe>
            <BoxAddRecipe>
                <CustomBtn
                    hover={"#1b5e20"}
                    bg={"#2e7d32"}
                    text={"See All your recipes"}
                    onClick={handleShowRecipes}
                />
            </BoxAddRecipe>
            {showRecipes && (
                <ListOwnRecipes user={user} showRecipes={showRecipes} />
            )}
        </ContainerUserPage>
    );
};

export default UserPage;
