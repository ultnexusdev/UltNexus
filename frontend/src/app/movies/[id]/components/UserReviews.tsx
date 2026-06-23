"use client";

import { useState } from "react";
import { Heart, MessageSquare } from "lucide-react";

interface Review {
  id: number;
  username: string;
  content: string;
  likes: number;
  comments: number;
  avatarColor: string;
}

export default function UserReviews() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      username: "Karsten",
      content: "Bet it smells crazy in there",
      likes: 6278,
      comments: 0,
      avatarColor: "bg-emerald-400",
    },
    {
      id: 2,
      username: "Branson Reese",
      content: "This is exactly what I was looking for. Masterpiece.",
      likes: 421,
      comments: 25,
      avatarColor: "bg-pink-500",
    }
  ]);
  const [newReview, setNewReview] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.trim()) return;
    
    setReviews([
      {
        id: Date.now(),
        username: "You",
        content: newReview,
        likes: 0,
        comments: 0,
        avatarColor: "bg-blue-500",
      },
      ...reviews
    ]);
    setNewReview("");
  };

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-6">
        <h3 className="text-white/70 text-xs uppercase tracking-wider font-semibold">Popular Reviews</h3>
        <button className="text-white/50 text-xs uppercase tracking-wider hover:text-white transition-colors">
          More
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-500 shrink-0"></div>
          <div className="flex-grow flex flex-col gap-2">
            <textarea 
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Add a review..."
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder:text-white/30 focus:outline-none focus:border-emerald-500 min-h-[80px] resize-y"
            />
            <div className="flex justify-end">
              <button 
                type="submit"
                disabled={!newReview.trim()}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-white/10 disabled:text-white/30 text-white rounded-md text-sm font-medium transition-colors"
              >
                Post Review
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="flex flex-col gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="flex gap-4 border-b border-white/5 pb-6 last:border-0">
            <div className={`w-10 h-10 rounded-full ${review.avatarColor} shrink-0`}></div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-white/50 text-sm">Review by</span>
                <span className="text-white font-bold text-sm">{review.username}</span>
              </div>
              <p className="text-white/80 leading-relaxed text-sm md:text-base">
                {review.content}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <button className="flex items-center gap-1.5 text-white/40 hover:text-rose-400 transition-colors text-xs font-medium">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  {review.likes > 0 ? review.likes.toLocaleString() + " likes" : "Like"}
                </button>
                <button className="flex items-center gap-1.5 text-white/40 hover:text-white transition-colors text-xs font-medium">
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  {review.comments > 0 ? review.comments : "Reply"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
