import { FaCalendarAlt, FaFilter, FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store.ts';
import {
  setSelectedAuthor,
  setSelectedSource,
  setSelectedCategory,
  setSelectedDate,
  setQuery,
} from '../features/news/newsSlice.ts';

export default function Filters({
  authors,
  sources,
  categories,
}: {
  authors: string[];
  sources: string[];
  categories: string[];
}) {
  const [localQuery, setLocalQuery] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');
  const { selectedAuthor, selectedSource, selectedCategory, selectedDate } = useSelector(
    (state: RootState) => state.news
  );
  const dispatch = useAppDispatch();

  // Debounce the query input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(localQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [localQuery]);

  // Dispatch the debounced query to Redux
  useEffect(() => {
    dispatch(setQuery(debouncedQuery));
  }, [debouncedQuery, dispatch]);

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex items-center gap-2 mb-4">
          <FaFilter className="text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-700">Filters</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <input
                type="text"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Source Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
            <div className="relative">
              <select
                value={selectedSource}
                onChange={(e) => dispatch(setSelectedSource(e.target.value))}
                className="w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="">All Sources</option>
                {sources.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Author Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
            <div className="relative">
              <select
                value={selectedAuthor}
                onChange={(e) => dispatch(setSelectedAuthor(e.target.value))}
                className="w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="">All Authors</option>
                {authors.map((author) => (
                  <option key={author} value={author}>
                    {author}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
                className="w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Publish date</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <DatePicker
                  selected={selectedDate ? new Date(selectedDate) : null}
                  onChange={(date: Date | null) => {
                    if (date) {
                      const year = String(date.getFullYear());
                      const month = String(date.getMonth() + 1).padStart(2, '0');
                      const day = String(date.getDate()).padStart(2, '0');
                      dispatch(setSelectedDate(`${year}-${month}-${day}`));
                    } else {
                      dispatch(setSelectedDate(''));
                    }
                  }}
                  selectsStart
                  startDate={selectedDate ? new Date(selectedDate) : null}
                  placeholderText="Publish date"
                  className="w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  customInput={
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        value={selectedDate ? new Date(selectedDate).toLocaleDateString() : 'Publish date'}
                      />
                      <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}