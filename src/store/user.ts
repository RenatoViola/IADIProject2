import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserDetails } from '../models'
import axios, { AxiosResponse } from 'axios';

export interface RdxUserState {
    username: string | null,
    token: string | null,
    isAuthenticated: boolean,
    role: string | null
}

export type State = RdxUserState

const initialState: State = {
    username: null,
    token: null,
    isAuthenticated: false,
    role: null
}

export const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<RdxUserState>) => {
            state.username = action.payload.username;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.role = action.payload.role;
        },
        logout: (state) => {
            state.username = null;
            state.token = null;
            state.isAuthenticated = false;
            state.role = null;
        },
    }
})

export const { setCredentials, logout } = slice.actions

export const loadUser = (username: string, password: string) => (dispatch: any) => {
    const loginUrl = 'http://localhost:8080/login';

    const userDetails: UserDetails = {
        username: username,
        password: password
    };

    const temp: State = {
        username: username,
        token: null,
        isAuthenticated: true,
        role: null
    }

    axios.post(loginUrl, userDetails)
        .then((response: AxiosResponse) => {
            if (response.status === 200) {

                const authorizationHeader = response.headers['authorization'];

                if (authorizationHeader) {
                    temp.token = authorizationHeader.split('Bearer ')[1];

                    const roleUrl = `http://localhost:8080/${username}/role`;

                    const roleHeaders = {
                        Authorization: `Bearer ${temp.token}`,
                    };

                    return axios.get(roleUrl, { headers: roleHeaders });
                } else {
                    console.error('Authorization header not found in the response.');
                }
            } else {
                console.error('Login request failed with status:', response.status);
            }
        })
        .then((roleResponse?: AxiosResponse) => {
            temp.role = roleResponse!.data

            dispatch(setCredentials(temp));
        })
        .catch((error) => {
            console.error('An error occurred:', error);
            alert("Invalid credentials")
        });
}

export default slice.reducer