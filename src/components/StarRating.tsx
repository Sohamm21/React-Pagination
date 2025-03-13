import { useState, useEffect } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

import "../index.css";

interface StarRatingProps {
  rating?: number;
  totalStars?: number;
  size?: number;
  isEditable?: boolean;
  onChange?: (rating: number) => void;
}

const StarRating = ({
  rating = 0,
  totalStars = 5,
  size = 30,
  isEditable = false,
  onChange,
}: StarRatingProps) => {
  const [hover, setHover] = useState<number | null>(null);
  const [currentRating, setCurrentRating] = useState(rating);

  useEffect(() => {
    setCurrentRating(rating);
  }, [rating]);

  const handleClick = (newRating: number) => {
    if (isEditable) {
      setCurrentRating(newRating);
      onChange?.(newRating);
    }
  };

  return (
    <div>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        const hoveredValue = hover ?? currentRating;

        const isFull = starValue <= hoveredValue;
        const isHalf = !isFull && starValue - 0.5 <= hoveredValue;

        return (
          <span
            key={index}
            onMouseEnter={() => isEditable && setHover(starValue - 0.5)}
            onMouseMove={(e) => {
              if (isEditable) {
                const { left, width } = e.currentTarget.getBoundingClientRect();
                const isHalfStar = e.clientX < left + width / 2;
                setHover(isHalfStar ? starValue - 0.5 : starValue);
              }
            }}
            onMouseLeave={() => isEditable && setHover(null)}
            onClick={() => handleClick(isHalf ? starValue - 0.5 : starValue)}
            style={{ cursor: isEditable ? "pointer" : "default" }}
          >
            {isFull ? (
              <FaStar size={size} color="#ffc107" />
            ) : isHalf ? (
              <FaStarHalfAlt size={size} color="#ffc107" />
            ) : (
              <FaStar size={size} color="#e4e5e9" />
            )}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
