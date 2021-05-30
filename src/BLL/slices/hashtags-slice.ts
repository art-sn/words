import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {HashtagType} from "../../common-types";
import API from "../../DAL/API";


export const getMyHashtags = createAsyncThunk<Array<HashtagType>, void>(
    'hashtags/getHashtags',
    async (_, {rejectWithValue}) => {
        try {
            return await API.getHashtags()
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

const hashtagsSlice = createSlice({
    name: 'hashtags',
    initialState: [
        {
            id: 1,
            title: 'Hey',
            image: 'https://res.cloudinary.com/artur0015/image/upload/v1621432815/Image_25_e406nl.jpg'
        }
    ] as Array<HashtagType>,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getMyHashtags.fulfilled, (_, {payload}) => payload)
    }
})

export default hashtagsSlice