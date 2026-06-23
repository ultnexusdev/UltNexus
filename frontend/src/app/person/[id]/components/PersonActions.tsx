"use client";

import { useState } from "react";
import { Heart, Star, ThumbsUp, ThumbsDown } from "lucide-react";

interface PersonActionsProps {
  personName: string;
}

export default function PersonActions({ personName }: PersonActionsProps) {
  const [isLiked, setIsLiked] = useState<boolean | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleAction = (action: string) => {
    console.log(`Action triggered for ${personName}: ${action}`);
  };

  return (
    <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center w-full">
      <div className="flex items-center justify-between w-full mb-3 px-2">
        <button 
          onClick={() => { setIsLiked(isLiked === true ? null : true); handleAction('like_person'); }}
          className={`transition-colors ${isLiked === true ? 'text-rose-500' : 'text-white/30 hover:text-white/60'}`}
        >
          <ThumbsUp className={`w-5 h-5 ${isLiked === true ? 'fill-current' : ''}`} />
        </button>

        <span className="text-xs text-white/50 uppercase tracking-wider font-semibold">
          {rating ? "Your Rating" : "Rate Person"}
        </span>

        <button 
          onClick={() => { setIsLiked(isLiked === false ? null : false); handleAction('dislike_person'); }}
          className={`transition-colors ${isLiked === false ? 'text-red-500' : 'text-white/30 hover:text-white/60'}`}
        >
          <ThumbsDown className={`w-5 h-5 ${isLiked === false ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
          <button
            key={star}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(null)}
            onClick={() => { setRating(star); handleAction(`rate_person_${star}`); }}
            className="focus:outline-none transition-transform hover:scale-125"
          >
            <Star 
              className={`w-5 h-5 ${ 
                (hoverRating || rating || 0) >= star 
                  ? "fill-blue-500 text-blue-500" 
                  : "text-white/20"
              }`} 
            />
          </button>
        ))}
      </div>
    </div>
  );
}
