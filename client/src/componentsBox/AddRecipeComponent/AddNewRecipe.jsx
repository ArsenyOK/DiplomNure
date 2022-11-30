import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { categoriesArray } from "../Header/common/dataList";
import { useSelector } from "react-redux";

const AddNewRecipe = () => {
    const { register, handleSubmit } = useForm();
    const [photoImg, setPhotoImg] = useState([]);
    const { user } = useSelector((store) => store.auth);

    const onChangeImg = (e) => {
        setPhotoImg(e.target.files[0]);
    };

    const onSubmit = (data) => {
        console.log(data, "data");
        const userId = user._id;
        const formData = new FormData();
        console.log(userId);
        if (userId) {
            formData.append("title", data.title);
            formData.append("userId", userId);
            formData.append("category", data.categories);
            formData.append("description", data.description);
            formData.append("img", photoImg);
        }
        // const buffer = new ArrayBuffer(photoImg);
        // console.log(buffer, 'buffer');

        // const recipe = {
        //     title: data.title,
        //     categories: data.categories,
        //     description: data.description,
        //     img: data.photo,
        // };

        // console.log(recipe)
        // formData.append('recipe', recipe);
        axios
            .post("/api/recipes", formData)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register("title")}
                    type="text"
                    placeholder="title of dish"
                />
                <select {...register("categories")}>
                    <option value="">Select categories</option>
                    {categoriesArray.map((cat) => {
                        return (
                            <option value={cat} key={cat}>
                                {cat}
                            </option>
                        );
                    })}
                </select>
                <input
                    onChange={onChangeImg}
                    accept="image/*"
                    type="file"
                    placeholder="photo"
                />
                <textarea
                    {...register("description")}
                    cols="30"
                    rows="10"
                    placeholder="description"
                ></textarea>
                <input type="submit" placeholder="send" />
            </form>
        </div>
    );
};

export default AddNewRecipe;
