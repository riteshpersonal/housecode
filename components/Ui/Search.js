"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Select from 'react-select';

const Search = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (query.length > 1) {
      const fetchSuggestions = async () => {
        const res = await fetch(`/api/admin/broker/search?search=${query}`);
        const data = await res.json();
        if (res.ok) {
          // Map suggestions for react-select format
          const options = data.map((suggestion) => ({
            value: suggestion.name,
            label: suggestion.name
          }));
          setSuggestions(options);
        } else {
          setSuggestions([]);
        }
      };

      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSelect = (selectedOption) => {
    if (selectedOption) {
      router.push(`/admin/brokers/${selectedOption.value}`);
      
    }
  };

  return (
    <div className="lg:pr-3">
      <label htmlFor="users-search" className="sr-only">
        Search
      </label>
      <div className="relative mt-1 lg:w-64 xl:w-96">
        <Select
          id="users-search"
          placeholder="Search for users"
          options={suggestions}
          onInputChange={(inputValue) => setQuery(inputValue)}
          onChange={handleSelect}
          value={null} // Clears selection after navigation
          isClearable
          className="react-select-container"
          classNamePrefix="react-select"
          styles={{
            control: (provided) => ({
              ...provided,
              borderColor: 'gray',
              backgroundColor: 'transparent'
            }),
            menu: (provided) => ({
              ...provided,
              zIndex: 10 // Ensure dropdown is on top
            })
          }}
        />
      </div>
    </div>
  );
};

export default Search;
