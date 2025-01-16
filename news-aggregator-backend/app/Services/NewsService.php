<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;
use App\Models\Article;

class NewsService
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client();
    }

    /**
     * Fetch news from NewsAPI.
     */
    public function fetchNewsFromNewsAPI()
    {
        $apiKey = config('services.newsapi.key');
        $url = "https://newsapi.org/v2/top-headlines?country=us&apiKey={$apiKey}";

        try {
            $response = $this->client->get($url);
            $data = json_decode($response->getBody(), true);

            foreach ($data['articles'] as $article) {
                $this->saveArticle([
                    'title' => $article['title'],
                    'description' => $article['description'],
                    'content' => $article['content'] ?? null,
                    'source' => $article['source']['name'],
                    'category' => 'general',
                    'published_at' => $article['publishedAt'],
                    'author' => $article['author'] ?? null,
                    'url' => $article['url'],
                    'image_url' => $article['urlToImage'] ?? null,
                ]);
            }
        } catch (\Exception $e) {
            Log::error("NewsAPI Error: " . $e->getMessage());
        }
    }

    /**
     * Fetch news from The Guardian.
     */
    public function fetchNewsFromTheGuardian()
    {
        $apiKey = config('services.theguardian.key');
        $url = "https://content.guardianapis.com/search?api-key={$apiKey}";

        try {
            $response = $this->client->get($url);
            $data = json_decode($response->getBody(), true);

            foreach ($data['response']['results'] as $article) {
                $this->saveArticle([
                    'title' => $article['webTitle'],
                    'content' => $article['fields']['body'] ?? null,
                    'description' => $article['webTitle'],
                    'source' => 'The Guardian',
                    'category' => $article['sectionName'],
                    'published_at' => $article['webPublicationDate'],
                    'author' => $article['fields']['byline'] ?? null,
                    'url' => $article['webUrl'],
                    'image_url' => $article['fields']['thumbnail'] ?? null,
                ]);
            }
        } catch (\Exception $e) {
            Log::error("The Guardian Error: " . $e->getMessage());
        }
    }

    /**
     * Fetch news from New York Times.
     */
    public function fetchNewsFromNewYorkTimes()
    {
        $apiKey = config('services.nytimes.key');
        $url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key={$apiKey}";

        try {
            $response = $this->client->get($url);
            $data = json_decode($response->getBody(), true);
            $image_url = null;
            foreach ($data['response']['docs'] as $article) {
                if (isset($article['multimedia'][0]['url'])) {
                    $image_url = "https://www.nytimes.com/" . $article['multimedia'][0]['url'];
                }
                $this->saveArticle([
                    'title' => $article['headline']['main'] ?? 'No title available',
                    'description' => $article['abstract'] ?? ($article['snippet'] ?? 'No description available'), 
                    'content' => $article['lead_paragraph'] ?? ($article['abstract'] ?? null),
                    'source' => 'New York Times',
                    'category' => $article['section_name'],
                    'published_at' => $article['pub_date'],
                    'author' => $article['byline']['original'] ?? null,
                    'url' => $article['web_url'],
                    'image_url' => $image_url,
                ]);
            }
        } catch (\Exception $e) {
            Log::error("New York Times Error: " . $e->getMessage());
        }
    }

    /**
     * Save an article to the database.
     */
    protected function saveArticle($data)
    {
        Article::updateOrCreate(
            ['url' => $data['url']],
            [
                'title' => $data['title'],
                'description' => $data['description'],
                'content' => $data['content'],
                'source' => $data['source'],
                'category' => $data['category'],
                'published_at' => $data['published_at'],
                'author' => $data['author'] ? str_replace('By ', '', $data['author']) : null,
                'url' => $data['url'],
                'image_url' => substr($data['image_url'], 0, 255),
            ]
        );
    }
}