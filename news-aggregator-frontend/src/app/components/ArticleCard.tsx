export interface Article {
  id: number;
  title: string;
  description: string;
  content: string;
  source: string;
  category: string;
  author: string | null;
  url: string;
  image_url: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {article.image_url ? (
        <img src={article.image_url} alt={article.title} className="w-full h-48 object-cover" />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No Image Available</span>
        </div>
      )}
      <div className="p-6">
      <div className="mb-2">
      <span className={`inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-2 py-1 rounded`}>
      {article.category}  
          </span>
        </div>
        <h2 className="text-xl font-semibold text-gray-800">{article.title}</h2>
        <p className="mt-2 text-gray-600">{article.description}</p>
        <div className="mt-4 text-sm text-gray-500">
          <span>{article.source}</span> · <span>{new Date(article.published_at).toLocaleDateString()}</span>
        </div>
        {article.author && <div className="mt-4 text-sm text-gray-500">
          By {article.author}
        </div>}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-blue-500 hover:text-blue-700"
        >
          Read More
        </a>
      </div>
    </div>
  );
}