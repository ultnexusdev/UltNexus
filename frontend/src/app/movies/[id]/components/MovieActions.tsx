"use client";

import React, { useState, useEffect } from "react";
import { Activity, Heart, Trophy, Star, Eye, Clock, Plus, Share2, ExternalLink } from "lucide-react";
import { MovieDetail, API_BASE } from "@/lib/api";
import { useAuthStore } from "@/lib/store/useAuthStore";

// Mock i18n & Toast
const t = (key: string) => key;
const toast = { error: (msg: string) => alert(msg), success: (msg: string) => console.log(msg) };

interface MovieActionsProps {
  movie: MovieDetail;
}

export default function MovieActions({ movie }: MovieActionsProps) {
  const { user, token } = useAuthStore();

  // Action states
  const [isWatched, setIsWatched] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [rating, setRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  // Local dynamic metrics for Optimistic UI
  const [views, setViews] = useState(movie.stats?.views || 0);
  const [likes, setLikes] = useState(movie.stats?.likes || 0);
  const rank = movie.stats?.rank || "-";

  // Popover states
  const [isOpen, setIsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [lists, setLists] = useState(['Favorites', 'Sci-Fi Masterpieces']);
  const [newListName, setNewListName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const executeInteraction = async (action: 'watch' | 'like' | 'rate', payload?: any) => {
    if (!user && !token) {
      toast.error(t("ERROR.AUTH_REQUIRED"));
      return false;
    }
    try {
      const token = useAuthStore.getState().token;
      const res = await fetch(`${API_BASE}/interact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          itemId: movie.id,
          type: movie.type || 'MOVIE',
          action,
          payload
        })
      });
      if (!res.ok) throw new Error('API request failed');
      return true;
    } catch (err) {
      toast.error(t("ERROR.AUTH_ACTION_FAILED"));
      return false;
    }
  };

  const handleWatchedToggle = async () => {
    const previousState = isWatched;
    const previousViews = views;
    setIsWatched(!previousState);
    setViews(previousState ? views - 1 : views + 1);
    if (!previousState) setInWatchlist(false);

    const success = await executeInteraction('watch');
    if (!success) {
      setIsWatched(previousState);
      setViews(previousViews);
    }
  };

  const handleWatchlistToggle = () => {
    setInWatchlist(!inWatchlist);
    if (!inWatchlist) setIsWatched(false);
  };

  const handleLikeToggle = async () => {
    const previousState = isLiked;
    const previousLikes = likes;
    setIsLiked(!previousState);
    setLikes(previousState ? likes - 1 : likes + 1);

    const success = await executeInteraction('like');
    if (!success) {
      setIsLiked(previousState);
      setLikes(previousLikes);
    }
  };

  const handleRate = async (star: number) => {
    const previousRating = rating;
    setRating(star);
    const success = await executeInteraction('rate', { rating: star });
    if (!success) {
      setRating(previousRating);
    }
  };


  const handleCreateList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListName.trim()) return;
    setLists([...lists, newListName.trim()]);
    setNewListName('');
    setIsCreating(false);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* METRICS ROW (Views, Likes, Rank) */}
      <div className="flex items-center justify-center gap-6 py-3 border-b border-white/10">
        <div title={`Watched by ${views} members`} className="group relative flex items-center gap-2 cursor-pointer">
          <Activity className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
          <span className="text-sm text-white/80">{formatNumber(views)}</span>
        </div>
        <div title={`Liked by ${likes} members`} className="group relative flex items-center gap-2 cursor-pointer">
          <Heart className="w-5 h-5 text-rose-500 group-hover:scale-110 transition-transform" />
          <span className="text-sm text-white/80">{formatNumber(likes)}</span>
        </div>
        <div title={`Ranked #${rank} overall`} className="group relative flex items-center gap-2 cursor-pointer">
          <Trophy className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
          <span className="text-sm text-white/80">#{rank}</span>
        </div>
      </div>

      {/* NEW ACTION BUTTONS FROM USER */}
      <div className="flex flex-col gap-4">
        {/* Action Row */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleWatchedToggle}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border font-medium transition-all ${
                isWatched
                  ? 'bg-emerald-600/20 border-emerald-500/30 text-emerald-500 shadow-lg shadow-emerald-900/20'
                  : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              <Eye className={`w-5 h-5 ${isWatched ? 'fill-current' : ''}`} />
              <span className="text-sm">Watched</span>
            </button>

            <button
              onClick={handleWatchlistToggle}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border font-medium transition-all ${
                inWatchlist
                  ? 'bg-amber-600/20 border-amber-500/30 text-amber-500 shadow-lg shadow-amber-900/20'
                  : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              <Clock className={`w-5 h-5 ${inWatchlist ? 'fill-current' : ''}`} />
              <span className="text-sm">Watchlist</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleLikeToggle}
              className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition-colors ${isLiked ? 'bg-rose-500/20 border-rose-500/40 text-rose-500 hover:bg-rose-500/30' : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'}`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm">Like</span>
            </button>
            <div className="relative flex-1">
               <button 
                 onClick={() => setIsShareOpen(!isShareOpen)}
                 className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
               >
                 <Share2 className="w-5 h-5" />
                 <span className="text-sm">Share</span>
               </button>
               {isShareOpen && (
                 <div className="absolute right-0 bottom-full mb-2 w-full bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl p-2 z-50 flex flex-col gap-1">
                   <a href={`https://api.whatsapp.com/send?text=Check out ${movie.title} on UltNexus!`} target="_blank" rel="noopener noreferrer" className="text-xs text-white p-2 hover:bg-zinc-800 rounded">
                     WhatsApp
                   </a>
                   <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} target="_blank" rel="noopener noreferrer" className="text-xs text-white p-2 hover:bg-zinc-800 rounded">
                     Facebook
                   </a>
                   <button onClick={() => { if(typeof window !== 'undefined') { navigator.clipboard.writeText(window.location.href); alert('Link copied!'); setIsShareOpen(false); } }} className="text-xs text-left text-white p-2 hover:bg-zinc-800 rounded">
                     Copy Link
                   </button>
                 </div>
               )}
            </div>
          </div>
        </div>

        {/* Add To List Popover */}
        <div className="relative inline-block text-left w-full">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-indigo-900/20"
          >
            <Plus className="w-5 h-5" />
            <span>Add to List</span>
          </button>

          {isOpen && (
            <div className="absolute right-0 left-0 mt-2 w-full bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 px-1">Select List</p>
              
              <div className="space-y-1 max-h-40 overflow-y-auto mb-2 custom-scrollbar">
                {lists.map((list, index) => (
                  <label key={index} className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-zinc-800 cursor-pointer text-zinc-300 transition-colors">
                    <input type="checkbox" className="rounded bg-zinc-800 border-zinc-700 text-indigo-600 focus:ring-0 focus:ring-offset-0" />
                    <span className="text-sm font-medium">{list}</span>
                  </label>
                ))}
              </div>

              <div className="border-t border-zinc-800 my-2 pt-2">
                {!isCreating ? (
                  <button
                    onClick={() => setIsCreating(true)}
                    className="w-full text-left flex items-center gap-2 text-xs font-medium text-indigo-400 hover:text-indigo-300 px-1 py-1 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Create New List / Folder
                  </button>
                ) : (
                  <form onSubmit={handleCreateList} className="space-y-2">
                    <input
                      type="text"
                      autoFocus
                      placeholder="List name..."
                      value={newListName}
                      onChange={(e) => setNewListName(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-1.5 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                    <div className="flex justify-end gap-1.5 text-xs">
                      <button
                        type="button"
                        onClick={() => setIsCreating(false)}
                        className="px-2 py-1 rounded bg-zinc-800 text-zinc-400 hover:text-zinc-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-2 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-500 font-medium"
                      >
                        Create
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RATING COMPONENT */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 flex flex-col items-center mt-2 shadow-xl">
        <div className="flex items-center justify-center w-full mb-3">
            <span className="text-xs text-zinc-400 uppercase tracking-wider font-bold">
              {rating ? "Your Rating" : "Rate This"}
            </span>
        </div>

        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
            <button
              key={star}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(null)}
              onClick={() => handleRate(star)}
              className="focus:outline-none transition-transform hover:scale-125"
            >
              <Star 
                className={`w-5 h-5 md:w-6 md:h-6 ${ 
                  (hoverRating || rating || 0) >= star 
                    ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" 
                    : "text-zinc-700"
                }`} 
              />
            </button>
          ))}
        </div>
      </div>

      {/* EXTERNAL LINKS */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mr-2">
          More at
        </span>
        {movie.id && (
          <a 
            href={`https://www.themoviedb.org/movie/${movie.id.replace('m_', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 bg-zinc-900/80 border border-zinc-700/50 rounded text-xs font-bold text-zinc-400 hover:text-white hover:border-zinc-500 transition-all"
          >
            TMDB
          </a>
        )}
        {movie.imdbId && (
          <a 
            href={`https://www.imdb.com/title/${movie.imdbId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 bg-zinc-900/80 border border-zinc-700/50 rounded text-xs font-bold text-zinc-400 hover:text-white hover:border-zinc-500 transition-all"
          >
            IMDB
          </a>
        )}
        <a 
          href={`https://www.rottentomatoes.com/m/${movie.title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 bg-zinc-900/80 border border-zinc-700/50 rounded text-xs font-bold text-zinc-400 hover:text-white hover:border-zinc-500 transition-all"
        >
          Rotten Tomatoes
        </a>
      </div>
    </div>
  );
}

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}
