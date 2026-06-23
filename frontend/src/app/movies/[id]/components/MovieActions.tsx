"use client";

import { useState } from "react";
import { Activity, Heart, Trophy, Star, Eye, Clock, Plus, Share2, ThumbsUp, ThumbsDown } from "lucide-react";
import { MovieDetail } from "@/lib/api";

interface MovieActionsProps {
  movie: MovieDetail;
}

export default function MovieActions({ movie }: MovieActionsProps) {
  const [isWatched, setIsWatched] = useState(false);
  const [isWatchlist, setIsWatchlist] = useState(false);
  const [isLiked, setIsLiked] = useState<boolean | null>(null); // true for like, false for dislike, null for none
  
  const [rating, setRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  // Local dynamic metrics (Starting from 0 as requested)
  const views = isWatched ? 1 : 0;
  const likes = isLiked === true ? 1 : 0;
  
  // Dynamic rank simulation
  // Formula: if rated, rank becomes #1 since it's the only one in the local 'database' so far, 
  // otherwise we can just say 'Unranked' or calculate a fake rank.
  const rank = rating ? Math.floor(10000 / rating) : "-";

  const handleAction = (action: string) => {
    // Future auth hook check here
    console.log(`Action triggered: ${action}`);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* METRICS ROW (Views, Likes, Rank) */}
      <div className="flex items-center justify-center gap-6 py-3 border-b border-white/10">
        <div className="group relative flex items-center gap-2 cursor-pointer">
          <Activity className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
          <span className="text-sm text-white/80">{formatNumber(views)}</span>
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 text-white text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap">
            Total Views
          </div>
        </div>
        
        <div className="group relative flex items-center gap-2 cursor-pointer">
          <Heart className="w-5 h-5 text-rose-500 group-hover:scale-110 transition-transform" />
          <span className="text-sm text-white/80">{formatNumber(likes)}</span>
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 text-white text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap">
            Total Likes
          </div>
        </div>

        <div className="group relative flex items-center gap-2 cursor-pointer">
          <Trophy className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
          <span className="text-sm text-white/80">#{rank}</span>
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 text-white text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap">
            UltNexus Rank
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="grid grid-cols-4 gap-2">
        <button 
          onClick={() => { setIsWatched(!isWatched); handleAction('watched'); }}
          className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-colors ${isWatched ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
        >
          <Eye className={`w-5 h-5 mb-1 ${isWatched ? 'fill-emerald-400/20' : ''}`} />
          <span className="text-[10px] font-semibold uppercase tracking-wider">Watched</span>
        </button>
        <button 
          onClick={() => { setIsWatchlist(!isWatchlist); handleAction('watchlist'); }}
          className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-colors ${isWatchlist ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
        >
          <Clock className={`w-5 h-5 mb-1 ${isWatchlist ? 'fill-blue-400/20' : ''}`} />
          <span className="text-[10px] font-semibold uppercase tracking-wider">Watchlist</span>
        </button>
        <button 
          onClick={() => handleAction('custom_list')}
          className="flex flex-col items-center justify-center p-3 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
        >
          <Plus className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-semibold uppercase tracking-wider">Add</span>
        </button>
        <button 
          onClick={() => handleAction('share')}
          className="flex flex-col items-center justify-center p-3 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
        >
          <Share2 className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-semibold uppercase tracking-wider">Share</span>
        </button>
      </div>

      {/* RATING COMPONENT */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col items-center">
        <div className="flex items-center justify-between w-full mb-3 px-2">
           <button 
              onClick={() => { setIsLiked(isLiked === true ? null : true); handleAction('like'); }}
              className={`transition-colors ${isLiked === true ? 'text-rose-500' : 'text-white/30 hover:text-white/60'}`}
            >
              <ThumbsUp className={`w-5 h-5 ${isLiked === true ? 'fill-current' : ''}`} />
            </button>

            <span className="text-xs text-white/50 uppercase tracking-wider font-semibold">
              {rating ? "Your Rating" : "Rate This"}
            </span>

            <button 
              onClick={() => { setIsLiked(isLiked === false ? null : false); handleAction('dislike'); }}
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
              onClick={() => { setRating(star); handleAction(`rate_${star}`); }}
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
    </div>
  );
}

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}
