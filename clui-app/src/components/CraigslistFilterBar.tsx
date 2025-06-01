
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Grid, List, Map, Calendar, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CraigslistFilterBar = () => {
  const [activeView, setActiveView] = useState('gallery');
  const [sortMode, setSortMode] = useState('newest');
  const [currentPage, setCurrentPage] = useState('Today');

  const filterButtons = [
    { label: '+', type: 'show-filters' },
    { label: 'price' },
    { label: 'sold by' },
    { label: 'type' },
    { label: 'model year' },
    { label: 'fuel' },
    { label: 'condition' }
  ];

  const viewModes = [
    { id: 'list', icon: List, title: 'list' },
    { id: 'thumb', icon: Grid, title: 'thumb' },
    { id: 'grid', icon: Grid, title: 'grid' },
    { id: 'gallery', icon: Grid, title: 'gallery' }
  ];

  return (
    <div className="w-full bg-white border-b border-gray-200 py-3">
      <div className="flex items-center justify-between gap-4 px-4">
        {/* Filter Buttons Section */}
        <div className="flex-1 min-w-0">
          <div className="relative">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 pb-2">
              {filterButtons.map((filter, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className={`whitespace-nowrap flex-shrink-0 h-8 px-3 text-sm border-gray-300 hover:bg-gray-50 ${
                    filter.type === 'show-filters' 
                      ? 'bg-blue-50 border-blue-300 text-blue-700' 
                      : 'bg-white text-gray-700'
                  }`}
                >
                  {filter.label === '+' ? <Plus className="w-3 h-3" /> : filter.label}
                </Button>
              ))}
            </div>
            {/* Scroll buttons */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-0 top-0 h-8 w-8 p-0 bg-white shadow-sm border border-gray-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-8 w-8 p-0 bg-white shadow-sm border border-gray-300"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Day Paginator */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => console.log('Previous day')}
            title="previous day"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm text-gray-600 min-w-16 text-center">{currentPage}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => console.log('Next day')}
            title="next day"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Left Group - View Controls */}
        <div className="flex items-center gap-3">
          {/* View Mode Selector */}
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white">
            {viewModes.map((mode) => {
              const IconComponent = mode.icon;
              return (
                <Button
                  key={mode.id}
                  variant="ghost"
                  size="sm"
                  className={`h-8 w-8 p-0 rounded-none border-r border-gray-300 last:border-r-0 ${
                    activeView === mode.id 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveView(mode.id)}
                  title={mode.title}
                >
                  <IconComponent className="w-4 h-4" />
                </Button>
              );
            })}
          </div>

          {/* Map View Button */}
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3 text-sm border-gray-300 hover:bg-gray-50 text-gray-700"
            title="show map"
          >
            <Map className="w-4 h-4 mr-1" />
            map view
          </Button>

          {/* Sort Dropdown */}
          <Select value={sortMode} onValueChange={setSortMode}>
            <SelectTrigger className="w-32 h-8 text-sm border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 shadow-lg">
              <SelectItem value="newest">newest</SelectItem>
              <SelectItem value="price_low">price low</SelectItem>
              <SelectItem value="price_high">price high</SelectItem>
              <SelectItem value="distance">distance</SelectItem>
              <SelectItem value="relevant">relevant</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Right Group - Results Count */}
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-medium">1 - 3</span>
          <span className="ml-1">of 10,000+</span>
        </div>
      </div>
    </div>
  );
};

export default CraigslistFilterBar;
