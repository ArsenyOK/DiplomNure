import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../store/actions/itemAction';
import CircularProgress from '@mui/material/CircularProgress';
import { BoxUserInfo, ContainerUserPage } from './styled/userPage.styled';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';

const UserPage = () => {
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const { user } = useSelector((store) => store.auth);
    const { recipes } = useSelector((store) => store.recipes);
    const { data } = useSelector((store) => store.load);

    const { register, handleSubmit } = useForm();

    const ChangeEditMode = () => {
        setEditMode(prev => !prev);
    }

    const onSubmit = (data) => {
        console.log(data);
    }

    useEffect(() => {
        dispatch(getItems());
    }, [])

    useEffect(() => {
        if (user) {
            setUserName(user.name);
            setUserEmail(user.email);
        }
    }, [user])

    if (!user) {
        return <div style={{
            display: 'flex',
            justifyContent: 'center'
        }}>
            <CircularProgress size={50} />
        </div>
    }

    return (
        <ContainerUserPage>
            <h2>Profile</h2>
            {
                editMode ? <BoxUserInfo>
                    {user && <form onSubmit={handleSubmit(onSubmit)}><input type="text" {...register("name")} />
                        <input type="text" {...register("email")} />
                        <input type="submit" value="click blya" />
                        </form>}
                </BoxUserInfo> : <BoxUserInfo>
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                </BoxUserInfo>
            }
            <Button onClick={() => ChangeEditMode()}>Edit data</Button>
        </ContainerUserPage>
    )
}

export default UserPage