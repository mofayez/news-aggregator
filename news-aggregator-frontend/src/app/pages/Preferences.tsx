import { useEffect, useState } from 'react';
import { RootState, useAppDispatch } from '../store.ts';
import { fetchPreferences, savePreferences } from '../features/preferences/preferencesSlice';
import { ClipLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import { authors, sources, categories } from "../config";
import { useNavigate } from 'react-router-dom';
import AuthGuard from '../components/AuthGuard.tsx';
import { fetchNews } from '../features/news/newsSlice.ts';

export default function Preferences() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { preferences, loading, error } = useSelector((state: RootState) => state.preferences);

  // State for user preferences
  const [preferredSources, setPreferredSources] = useState<string[]>([]);
  const [preferredCategories, setPreferredCategories] = useState<string[]>([]);
  const [preferredAuthors, setPreferredAuthors] = useState<string[]>([]);


  useEffect(() => {
    dispatch(fetchPreferences());
  }, [dispatch]);

  useEffect(() => {
    if (preferences) {
      setPreferredSources(preferences.preferred_sources);
      setPreferredCategories(preferences.preferred_categories);
      setPreferredAuthors(preferences.preferred_authors);
    }
  }, [preferences]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const preferences = {
      preferred_sources: preferredSources,
      preferred_categories: preferredCategories,
      preferred_authors: preferredAuthors,
    };
    await dispatch(savePreferences(preferences));
    await dispatch(fetchNews({ page: 1 }));
    navigate('/');
  };

  return (
    <AuthGuard> 
      <div className="pt-20">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Customize Your News Feed</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
    
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Preferred Sources */}
          <div>
            <label className="block text-xl font-bold text-black">Preferred Sources</label>
            <div className="mt-2 flex flex-wrap gap-4">
            {sources.map((source) => (
                <div key={source} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`source-${source}`}
                    value={source}
                    checked={preferredSources.includes(source)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setPreferredSources([...preferredSources, source]);
                      } else {
                        setPreferredSources(preferredSources.filter((s) => s !== source));
                      }
                    }}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={`source-${source}`} className="ml-2 text-gray-700">
                    {source}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Preferred Categories */}
          <div>
            <label className="block text-xl font-bold text-black">Preferred Categories</label>
            <div className="mt-2 flex flex-wrap gap-2">
            {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`category-${category}`}
                    value={category}
                    checked={preferredCategories.includes(category)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setPreferredCategories([...preferredCategories, category]);
                      } else {
                        setPreferredCategories(preferredCategories.filter((c) => c !== category));
                      }
                    }}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={`category-${category}`} className="ml-2 text-gray-700">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Preferred Authors */}
          <div>
            <label className="block text-xl font-bold text-black">Preferred Authors</label>
            <div className="mt-2 flex flex-wrap gap-2">
            {authors.map((author) => (
                <div key={author} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`author-${author}`}
                    value={author}
                    checked={preferredAuthors.includes(author)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setPreferredAuthors([...preferredAuthors, author]);
                      } else {
                        setPreferredAuthors(preferredAuthors.filter((a) => a !== author));
                      }
                    }}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={`author-${author}`} className="ml-2 text-gray-700">
                    {author}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-blue-300 flex justify-center items-center"
            >
              Save Preferences
              {loading && <ClipLoader color="#ffffff" size={16} className="ml-2" />} {/* Spinner */}
            </button>
          </div>
        </form>
      </div>
    </div>
    </AuthGuard>
  );
}