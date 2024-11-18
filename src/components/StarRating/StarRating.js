import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import './StarRating.css'; // تأكد من إضافة الأنماط الخاصة بالمكون

const StarRating = ({ rating }) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        const starValue = index + 1;
        return (
          <FontAwesomeIcon
            key={index}
            icon={starValue <= rating ? faStar : (starValue - 0.5 <= rating ? faStarHalfAlt : faStar)}
            className={starValue <= rating ? "star active" : (starValue - 0.5 <= rating ? "star half-active" : "star")}
          />
        );
      })}
    </div>
  );
}

export default StarRating;

