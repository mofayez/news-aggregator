<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\UserPreference;
use Illuminate\Http\Request;

class UserPreferenceController extends Controller
{
    public function show(Request $request)
    {
        $preferences = $request->user()->preferences;

        return response()->json($preferences ?? [
            'preferred_sources' => [],
            'preferred_categories' => [],
            'preferred_authors' => [],
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'preferred_sources' => 'nullable|array',
            'preferred_categories' => 'nullable|array',
            'preferred_authors' => 'nullable|array',
        ]);

        $preferences = $request->user()->preferences()->updateOrCreate(
            ['user_id' => $request->user()->id],
            [
                'preferred_sources' => $request->preferred_sources ?? [],
                'preferred_categories' => $request->preferred_categories ?? [],
                'preferred_authors' => $request->preferred_authors ?? [],
            ]
        );

        return response()->json($preferences, 200);
    }
}