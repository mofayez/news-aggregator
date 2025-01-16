<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\NewsService;

class FetchNews extends Command
{
    protected $signature = 'news:fetch';
    protected $description = 'Fetch news from various APIs and store them in the database';

    protected $newsService;

    public function __construct(NewsService $newsService)
    {
        parent::__construct();
        $this->newsService = $newsService;
    }

    public function handle()
    {
        $this->info('Fetching news from NewsAPI...');
        $this->newsService->fetchNewsFromNewsAPI();

        $this->info('Fetching news from The Guardian...');
        $this->newsService->fetchNewsFromTheGuardian();

        $this->info('Fetching news from New York Times...');
        $this->newsService->fetchNewsFromNewYorkTimes();

        $this->info('News fetching completed!');
    }
}