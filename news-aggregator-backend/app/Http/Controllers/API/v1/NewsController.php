<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NewsController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $articles = Article::query();

        // Apply user preferences if available
        if ($user && $user->preferences) {
            $preferences = $user->preferences;

            // Filter by preferred sources
            if (!empty($preferences->preferred_sources)) {
                $articles->whereIn('source', $preferences->preferred_sources);
            }

            // Filter by preferred categories
            if (!empty($preferences->preferred_categories)) {
                $articles->whereIn('category', $preferences->preferred_categories);
            }

            // Filter by preferred authors
            if (!empty($preferences->preferred_authors)) {
                $articles->whereIn('author', $preferences->preferred_authors);
            }
        }

        // Full-text search by keyword (title or description)
        if ($request->has('query') && !empty($request->input('query'))) {
            $search = $request->input('query');
            $articles->whereFullText(['title', 'description', 'content'], $search);
        }

        // Apply filters
        if ($request->has('category') && !empty($request->input('category'))) {
            $articles->where('category', $request->input('category'));
        }
        if ($request->has('source') && !empty($request->input('source'))) {
            $articles->where('source', $request->input('source'));
        }
        if ($request->has('author') && !empty($request->input('author'))) {
            $articles->where('author', $request->input('author'));
        }
        if ($request->has('date') && !empty($request->input('date'))) {
            $articles->whereDate('published_at', date('Y-m-d', strtotime($request->input('date'))));
        }

        return response()->json($articles->paginate(10));
    }
}