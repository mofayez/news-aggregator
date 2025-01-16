# News Aggregator

A full-stack news aggregator application that fetches news from multiple sources and displays them in a unified interface. Built with **Laravel** (backend) and **React** (frontend), and deployed using **Docker**.

---

## Features

- **Multi-Source News**: Fetch news from multiple APIs (e.g., NewsAPI, The Guardian, NY Times).
- **User Preferences**: Allow users to customize their news feed based on categories and sources.
- **Search and Filter**: Search for news articles and filter by date, category, or source.
- **Responsive Design**: Optimized for both desktop and mobile devices.

---

## Technologies Used

- **Backend**: Laravel (PHP)
- **Frontend**: React (Vite)
- **Database**: MySQL
- **Containerization**: Docker
- **API Integration**: NewsAPI, The Guardian API, NY Times API

---

## Getting Started

### Prerequisites

- Docker and Docker Compose installed on your machine.
- API keys for [NewsAPI](https://newsapi.org/), [The Guardian](https://open-platform.theguardian.com/), and [NY Times](https://developer.nytimes.com/).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/news-aggregator.git
   cd news-aggregator
   ```

2. Set up your environment variables:
   ```bash
   cp .env.example .env
   ```
  Update the .env file with your API keys and database credentials.
  ```env
    DB_CONNECTION=mysql
    DB_HOST=db
    DB_PORT=3306
    DB_DATABASE=news_aggregator
    DB_USERNAME=root
    DB_PASSWORD=rootPass

    NEWS_API_KEY=79a4c5819bfb496789edf3c02c963c82
    THE_GUARDIAN_KEY=a7435fea-72d4-4f47-b1e3-07db9c76c8b6
    NY_TIMES_KEY=ea0wofgiLMsgWxYOCbMHFU98q07jh54a
    NY_TIME_SECRET=BXWcxrcVwXoWKuWA
    NY_APP_ID=2ec2efa2-4d01-4483-9c73-64207beb80ea
  ```

3. Run the Docker Compose setup:
  ```bash
  docker compose up -d
  ```

4. Access the application:
  ```bash
  http://localhost:8000
  ```

5. Fetch news (this will fetch news from the APIs and store them in the database while building the image):
  ```bash
  docker compose exec app php artisan news:fetch
  ```
---

## License

This project is open-sourced under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 

- [NewsAPI](https://newsapi.org/)
- [The Guardian](https://open-platform.theguardian.com/)
- [NY Times](https://developer.nytimes.com/)
- [Cursor AI](https://cursor.sh/) for assisting with code generation and debugging.
- [OpenAI ChatGPT](https://openai.com/chatgpt) for providing AI-powered assistance in project for tasks like problem solving


## Notes

- The application is deployed using Docker, so you need to have Docker and Docker Compose installed on your machine.
