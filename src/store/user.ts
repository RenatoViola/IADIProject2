import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User, UserDetails } from '../models'
import axios, { AxiosResponse } from 'axios';

//tirar o username e o role , passar a ter um atributo user.
export interface RdxUserState {
    token: string | null,
    isAuthenticated: boolean,
    user: User | null;
}

export type State = RdxUserState

const initialState: State = {
    token: null,
    isAuthenticated: false,
    user: null
}


export const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<RdxUserState>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
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
        token: null,
        isAuthenticated: true,
        user: null
    }



    axios.post(loginUrl, userDetails)
        .then((response: AxiosResponse) => {
            if (response.status === 200) {

                const authorizationHeader = response.headers['authorization'];

                if (authorizationHeader) {
                    temp.token = authorizationHeader.split('Bearer ')[1];

                    const userUrl = `http://localhost:8080/users/${username}`;

                    const userHeaders = {
                        Authorization: `Bearer ${temp.token}`,
                    };

                    return axios.get(userUrl, { headers: userHeaders });
                } else {
                    console.error('Authorization header not found in the response.');
                }
            } else {
                console.error('Login request failed with status:', response.status);
            }
        })
        .then((userResponse?: AxiosResponse) => {
            temp.user = userResponse!.data
            dispatch(setCredentials(temp));
        })
        .catch((error) => {
            console.error('An error occurred:', error);
            alert("Invalid credentials")
        });
}

export default slice.reducer