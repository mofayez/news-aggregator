<?php

use App\Services\NewsService;
use Illuminate\Support\Facades\Artisan;

Artisan::command('news:fetch', function () {
    $newsService = new NewsService();
    $newsService->fetchNewsFromNewsAPI();
    $newsService->fetchNewsFromTheGuardian();
    $newsService->fetchNewsFromNewYorkTimes();
})->purpose('Fetch news from various APIs and store them in the database');
