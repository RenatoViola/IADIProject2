import { Box, Typography, Rating } from "@mui/material";
import { useState } from "react";
import { Reservation, Review } from "../models";
import useInput from "../utils";
import axios from "axios";
import { useUserSelector } from "../store/hooks";
import { State } from "../store/user";

type Props = {
    reservation: Reservation,
    closeModal: () => void;
};

const ReviewForm: React.FC<Props> = ({ reservation, closeModal }) => {
    const [value, setValue] = useState<number | null>(0);
    const [descriptionInput, description, setDescription] = useInput("", "Tell us about your experience.", "text", "w-full h-32 p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none");

    const userData = useUserSelector((state: State) => state);

    const review: Review = {
        text: description,
        rating: value!
    }

    const postReview = async () => {
        const url = `http://localhost:8080/clients/${userData.user?.username}/reservations/${reservation.id}/reviews`;
        
        try {
         const response = await axios.put(url, review, {
           headers: {
             'Authorization': `Bearer ${userData.token}`,
           }
         });
         console.log('Review published:', response.data);
         alert("Review published");
     }catch (error) {
         // Handle errors
         console.error('Error publishing review', error);
         alert("It was not possible to publish the review.");
       }
 }

    return (
      <Box
        sx={{
          '& > legend': { mt: 2 },
        }}
      >
        <Typography component="legend">Please give a rating to your stay</Typography>
        <Rating
          name="simple-controlled"
          size="large"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        <br />
        {descriptionInput}
        <div className="flex flex-row justify-center w-full ml-2">
          <button className="btn btn-primary mt-4 w-full" onClick={() => {
            postReview(); closeModal();}}>
            Publish review
          </button>
      </div>
      </Box>
    );
};

export default ReviewForm;
