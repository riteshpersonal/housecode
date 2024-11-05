'use client'
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import FilterIcon from '@/Icons/FilterIcon';
import Select from 'react-select';

const FilterForm = ({ addressData }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  // State for each filter
  const [type, setType] = useState(searchParams.get('type') || '');
  const [city, setCity] = useState(searchParams.get('city') || '');
  const [state, setState] = useState(searchParams.get('state') || '');
  const [zipCode, setZipCode] = useState(searchParams.get('zipCode') || '');
  const [listingPrice, setListingPrice] = useState(searchParams.get('listingPrice') || '');
  const [bhk, setBhk] = useState(searchParams.get('bhk') || '');
  const [furnishingStatus, setFurnishingStatus] = useState(searchParams.get('furnishingStatus') || '');
  const [priceRange, setPriceRange] = useState([0, 100000]); // Initial price range
  const [address, setAddress] = useState(searchParams.get('address') || '');

  // Format options for react-select
  const cityOptions = addressData.city.map(city => ({ value: city, label: city }));
  const stateOptions = addressData.state.map(state => ({ value: state, label: state }));
  const zipCodeOptions = addressData.zipCode.map(zip => ({ value: zip, label: zip }));
  const streetOptions = addressData.street.map(street => ({ value: street, label: street }));

  const applyFilters = () => {
    const filters = [];
    if (type) filters.push(`type=${type}`);
    if (city) filters.push(`city=${city.value}`);
    if (state) filters.push(`state=${state.value}`);
    if (zipCode) filters.push(`zipCode=${zipCode.value}`);
    if (bhk) filters.push(`bhk=${bhk}`);
    if (furnishingStatus) filters.push(`furnishingStatus=${furnishingStatus}`);
   // Only include price range if the user has changed it from the default values
   if (priceRange[0] > 0 || priceRange[1] < 100000) {
    filters.push(`listingPriceMin=${priceRange[0]}`);
    filters.push(`listingPriceMax=${priceRange[1]}`);
  }
    if (address) filters.push(`address=${address}`);

    const filterString = filters.join('/');
    setShowFilters(false)
    router.push(`/find-property/${filterString}`);
    
  };

  const resetFilters = () => {
    setType('');
    setCity('');
    setState('');
    setZipCode('');
    setListingPrice('');
    setBhk('');
    setFurnishingStatus('');
    setPriceRange([0, 100000]);
    setAddress('');
    setShowFilters(false)
    router.push('/find-property');  // Clear all filters from URL
  };

  return (
    <div>
      <button onClick={() => setShowFilters(!showFilters)} className="p-2 ml-4 sm:ml-10 flex items-center gap-2 bg-gray-200 hover:bg-gray-300 rounded-md">
        <FilterIcon /> Filters
      </button>

      {showFilters && (
        <div className="fixed  left-0 right-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto top-0 md:inset-0 h-screen sm:h-full bg-black/60 backdrop-blur-sm" >
        <div className="p-4 pb-10 bg-white text-sm sm:text-base rounded-lg shadow-md mt-2 w-full mx-2 sm:w-4/5">
        <button
              onClick={() => setShowFilters(!showFilters)}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm p-1.5 ml-auto self-end flex items-center mb-5"
              data-modal-toggle="add-user-modal"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          <div className="grid grid-cols-2 gap-4">
            <Select
              value={type ? { value: type, label: type } : null}
              onChange={selected => setType(selected?.value || '')}
              options={[
                { value: 'Rental', label: 'Rental' },
                { value: 'Apartment', label: 'Apartment' },
                { value: 'Pg', label: 'PG' },
                { value: 'House', label: 'House' },
                { value: 'Flat', label: 'Flat' },
                { value: 'Other', label: 'Other' }
              ]}
              placeholder="Select Type"
            />
            <Select
              value={city}
              onChange={setCity}
              options={cityOptions}
              placeholder="Select City"
            />
            <Select
              value={state}
              onChange={setState}
              options={stateOptions}
              placeholder="Select State"
            />
            <Select
              value={zipCode}
              onChange={setZipCode}
              options={zipCodeOptions}
              placeholder="Select Zip Code"
            />
            <Select
              value={address}
              onChange={setAddress}
              options={streetOptions}
              placeholder="Select Street"
            />
            <input
              type="text"
              placeholder="Enter BHK"
              value={bhk}
              onChange={(e) => setBhk(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            />
            <Select
              value={furnishingStatus ? { value: furnishingStatus, label: furnishingStatus } : null}
              onChange={(selected) => setFurnishingStatus(selected?.value || '')}
              options={[
                { value: 'Furnished', label: 'Furnished' },
                { value: 'Semi-Furnished', label: 'Semi-Furnished' },
                { value: 'Unfurnished', label: 'Unfurnished' }
              ]}
              placeholder="Select Furnishing Status"
            />
          </div>
          <div className="mt-4">
            <label className='inline-flex mb-2'>Price Range:</label>
            <Slider
              range
              min={0}
              max={50000}
              step={500}
              value={priceRange}
              onChange={setPriceRange}
              trackStyle={{ backgroundColor: "#8b5cf6", height: 12, borderRadius: 6 }}
              railStyle={{ backgroundColor: "#e5e7eb", height: 12, borderRadius: 6 }}
              handleStyle={{
                borderColor: "#8b5cf6",
                height: 22,
                width: 22,
                backgroundColor: "#ffffff",
                boxShadow: "0px 4px 8px rgba(139, 92, 246, 0.4)", // Adding shadow to handles
              }}
              activeDotStyle={{
                borderColor: "#8b5cf6",
              }}
            />
            <div className='mt-3'>
              <span>Min: {priceRange[0]}</span> | <span>Max: {priceRange[1]}</span>
            </div>
          </div>
          <div className="flex justify-end mt-4 space-x-4">
            <button onClick={resetFilters} className="p-2 bg-gray-300 rounded">Reset Filters</button>
            <button onClick={applyFilters} className="p-2 bg-blue-500 text-white rounded">Apply Filters</button>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default FilterForm;
