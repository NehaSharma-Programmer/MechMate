
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const FeedbackPage = () => {
  const { id } = useParams();
  const { user } = useAuthContext();

  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://mechmate.onrender.com/api/feedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            bookingId: id,
            rating,
            review,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Feedback submission failed");
        return;
      }

      alert("Feedback submitted successfully!");

      setRating(5);
      setReview("");

    } catch (error) {
      console.error("Feedback Error:", error);
      alert("Server error");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>⭐ Customer Feedback</h2>

      <form onSubmit={handleSubmit}>

        <label>
          Rating:
        </label>

        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>
        </select>

        <br /><br />

        <textarea
          placeholder="Write your feedback..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows="5"
          cols="40"
          required
        />

        <br /><br />

        <button type="submit">
          Submit Feedback
        </button>

      </form>
    </div>
  );
};

export default FeedbackPage;