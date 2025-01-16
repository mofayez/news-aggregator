import { useEffect, useCallback } from 'react';
import { fetchNews, setCurrentPage } from '../features/news/newsSlice';
import ArticleCard, { Article } from '../components/ArticleCard';
import { RootState, useAppDispatch } from '../store.ts';
import { useSelector } from 'react-redux';
import Filters from '../components/Filters';
import { sources, categories, authors } from "../config";
import AuthGuard from '../components/AuthGuard.tsx';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { articles, totalPages, loading, error, currentPage, selectedAuthor, selectedSource, selectedCategory, selectedDate, query } = useSelector((state: RootState) => state.news);
  const { user } = useSelector((state: RootState) => state.auth);

  const fetchNewsHandler = useCallback(() => {
    if (currentPage <= totalPages) {
      dispatch(fetchNews({
        page: currentPage,
        author: selectedAuthor,
        category: selectedCategory,
        source: selectedSource,
        date: selectedDate,
        query: query,
      }));
    }
  }, [currentPage, totalPages, dispatch, selectedAuthor, selectedCategory, selectedSource, selectedDate, query]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    fetchNewsHandler();
  }, [navigate, user, fetchNewsHandler]);

  // Implement infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        if (!loading && currentPage < totalPages) {
          dispatch(setCurrentPage(currentPage + 1));
        }
      }
    };

    const debouncedScroll = debounce(handleScroll, 300);
    window.addEventListener('scroll', debouncedScroll);
    return () => window.removeEventListener('scroll', debouncedScroll);
  }, [loading, currentPage, totalPages, dispatch]);

  return (
    <AuthGuard>
      <div className="pt-20">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Latest News</h1>

        {/* Filters */}
        <Filters sources={sources} authors={authors} categories={categories} />

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article: Article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {/* Loading Spinner */}
        {loading && <div className="spinner my-8"></div>}

        {/* Error Message */}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}

        {/* No More Articles Message */}
        {currentPage >= totalPages && !loading && (
          <p className="text-center text-gray-600 mt-4">No more articles to load.</p>
        )}
      </div>
    </div>
    </AuthGuard>
  );
}

function debounce(func: () => void, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func, delay);
  };
}