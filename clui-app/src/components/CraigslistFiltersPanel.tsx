
import React, { useState } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface FilterState {
  purveyor: string;
  milesFromLocation: string;
  fromZip: string;
  minPrice: string;
  maxPrice: string;
  minMonthlyPayment: string;
  maxMonthlyPayment: string;
  makeAndModel: string;
  minOdometer: string;
  maxOdometer: string;
  minModelYear: string;
  maxModelYear: string;
  drive: string[];
  transmission: string[];
  cylinders: string[];
  condition: string[];
  fuel: string[];
  type: string[];
  titleStatus: string[];
  paintColor: string[];
  deliveryAvailable: boolean;
  cryptoOk: boolean;
}

const CraigslistFiltersPanel = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    purveyor: 'all',
    milesFromLocation: '',
    fromZip: '',
    minPrice: '',
    maxPrice: '',
    minMonthlyPayment: '',
    maxMonthlyPayment: '',
    makeAndModel: '',
    minOdometer: '',
    maxOdometer: '',
    minModelYear: '',
    maxModelYear: '',
    drive: [],
    transmission: [],
    cylinders: [],
    condition: [],
    fuel: [],
    type: [],
    titleStatus: [],
    paintColor: [],
    deliveryAvailable: false,
    cryptoOk: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleInputChange = (field: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleBooleanChange = (field: keyof FilterState, checked: boolean) => {
    setFilters(prev => ({ ...prev, [field]: checked }));
  };

  const handleMultiSelectChange = (field: keyof FilterState, value: string, checked: boolean) => {
    setFilters(prev => {
      const currentArray = prev[field] as string[];
      if (checked) {
        return { ...prev, [field]: [...currentArray, value] };
      } else {
        return { ...prev, [field]: currentArray.filter(item => item !== value) };
      }
    });
  };

  const handleApply = () => { // submit
    console.log('Sidebar JSON:', JSON.stringify(filters, null, 2));
  };

  const handleReset = () => {
    setFilters({
      purveyor: 'all',
      milesFromLocation: '',
      fromZip: '',
      minPrice: '',
      maxPrice: '',
      minMonthlyPayment: '',
      maxMonthlyPayment: '',
      makeAndModel: '',
      minOdometer: '',
      maxOdometer: '',
      minModelYear: '',
      maxModelYear: '',
      drive: [],
      transmission: [],
      cylinders: [],
      condition: [],
      fuel: [],
      type: [],
      titleStatus: [],
      paintColor: [],
      deliveryAvailable: false,
      cryptoOk: false
    });
    setExpandedSections([]);
  };

  const multiSelectOptions = {
    drive: [
      { value: '1', label: 'fwd' },
      { value: '2', label: 'rwd' },
      { value: '3', label: '4wd' }
    ],
    transmission: [
      { value: '1', label: 'manual' },
      { value: '2', label: 'automatic' },
      { value: '3', label: 'other' }
    ],
    cylinders: [
      { value: '1', label: '3 cylinders' },
      { value: '2', label: '4 cylinders' },
      { value: '3', label: '5 cylinders' },
      { value: '4', label: '6 cylinders' },
      { value: '5', label: '8 cylinders' },
      { value: '6', label: '10 cylinders' },
      { value: '7', label: '12 cylinders' },
      { value: '8', label: 'other' }
    ],
    condition: [
      { value: '10', label: 'new' },
      { value: '20', label: 'like new' },
      { value: '30', label: 'excellent' },
      { value: '40', label: 'good' },
      { value: '50', label: 'fair' },
      { value: '60', label: 'salvage' }
    ],
    fuel: [
      { value: '1', label: 'gas' },
      { value: '2', label: 'diesel' },
      { value: '3', label: 'hybrid' },
      { value: '4', label: 'electric' },
      { value: '6', label: 'other' }
    ],
    type: [
      { value: '1', label: 'bus' },
      { value: '2', label: 'convertible' },
      { value: '3', label: 'coupe' },
      { value: '4', label: 'hatchback' },
      { value: '5', label: 'minivan' },
      { value: '6', label: 'offroad' },
      { value: '7', label: 'pickup' },
      { value: '8', label: 'sedan' },
      { value: '9', label: 'truck' },
      { value: '10', label: 'SUV' },
      { value: '11', label: 'wagon' },
      { value: '12', label: 'van' },
      { value: '13', label: 'other' }
    ],
    titleStatus: [
      { value: '1', label: 'clean' },
      { value: '2', label: 'salvage' },
      { value: '3', label: 'rebuilt' },
      { value: '4', label: 'parts only' },
      { value: '5', label: 'lien' },
      { value: '6', label: 'missing' }
    ],
    paintColor: [
      { value: '1', label: 'black' },
      { value: '2', label: 'blue' },
      { value: '20', label: 'brown' },
      { value: '3', label: 'green' },
      { value: '4', label: 'grey' },
      { value: '5', label: 'orange' },
      { value: '6', label: 'purple' },
      { value: '7', label: 'red' },
      { value: '8', label: 'silver' },
      { value: '9', label: 'white' },
      { value: '10', label: 'yellow' },
      { value: '11', label: 'custom' }
    ]
  };

  const renderMultiSelect = (title: string, options: {value: string, label: string}[], fieldName: keyof FilterState, hasSelectAll = false) => {
    const isExpanded = expandedSections.includes(title);
    const selectedValues = filters[fieldName] as string[];
    
    return (
      <div className="border-b border-gray-200 py-3">
        <Button
          variant="ghost"
          className="w-full justify-start px-0 py-1 h-auto font-normal text-blue-600 hover:text-blue-800"
          onClick={() => toggleSection(title)}
        >
          <ChevronDown className={`w-4 h-4 mr-2 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          {title}
        </Button>
        
        {isExpanded && (
          <div className="mt-2 ml-6">
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2 py-1">
                <Checkbox 
                  id={`${title}-${option.value}`}
                  checked={selectedValues.includes(option.value)}
                  onCheckedChange={(checked) => handleMultiSelectChange(fieldName, option.value, !!checked)}
                />
                <Label htmlFor={`${title}-${option.value}`} className="text-sm font-normal cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
            {hasSelectAll && (
              <div className="flex gap-4 mt-2 pt-2 border-t border-gray-100">
                <Button 
                  variant="link" 
                  className="h-auto p-0 text-xs text-blue-600"
                  onClick={() => {
                    const allValues = options.map(opt => opt.value);
                    setFilters(prev => ({ ...prev, [fieldName]: allValues }));
                  }}
                >
                  select all
                </Button>
                <Button 
                  variant="link" 
                  className="h-auto p-0 text-xs text-gray-400"
                  onClick={() => setFilters(prev => ({ ...prev, [fieldName]: [] }))}
                >
                  deselect all
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderRangeInput = (label: string, minPlaceholder: string, maxPlaceholder: string, minField: keyof FilterState, maxField: keyof FilterState, prefix?: string) => (
    <div className="py-3 border-b border-gray-200">
      <div className="text-sm font-medium text-gray-700 mb-2">{label}</div>
      <div className="flex items-center gap-2">
        {prefix && <span className="text-sm text-gray-600">{prefix}</span>}
        <Input 
          className="h-8 text-sm" 
          placeholder={minPlaceholder}
          value={filters[minField] as string}
          onChange={(e) => handleInputChange(minField, e.target.value)}
        />
        <span className="text-gray-500">-</span>
        {prefix && <span className="text-sm text-gray-600">{prefix}</span>}
        <Input 
          className="h-8 text-sm" 
          placeholder={maxPlaceholder}
          value={filters[maxField] as string}
          onChange={(e) => handleInputChange(maxField, e.target.value)}
        />
      </div>
    </div>
  );

  return (
    <div className="bg-white border-r border-gray-200">
      {/* Title Bar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <h1 className="text-xl font-semibold text-gray-900">cars+trucks</h1>
      </div>

      <div className="p-4 space-y-0">
        {/*
        {/* Purveyor Selector 
        <div className="py-3 border-b border-gray-200">
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white">
            {['all', 'owner', 'dealer'].map((option) => (
              <Button
                key={option}
                variant="ghost"
                size="sm"
                className={`h-8 px-4 rounded-none border-r border-gray-300 last:border-r-0 ${
                  filters.purveyor === option 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => handleInputChange('purveyor', option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>


        {/* Location 
        <div className="py-3 border-b border-gray-200">
          <div className="text-sm font-medium text-gray-700 mb-2">miles from location</div>
          <div className="flex items-center gap-2 mb-2">
            <Input 
              className="h-8 text-sm w-20" 
              placeholder="miles"
              value={filters.milesFromLocation}
              onChange={(e) => handleInputChange('milesFromLocation', e.target.value)}
            />
            <Input 
              className="h-8 text-sm w-24" 
              placeholder="from zip"
              value={filters.fromZip}
              onChange={(e) => handleInputChange('fromZip', e.target.value)}
            />
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MapPin className="w-4 h-4" />
            </Button>
          </div>
          <Button variant="link" className="h-auto p-0 text-sm text-blue-600">use map...</Button>
        </div> 
*/}

        {/* Price */}
        {renderRangeInput('price', 'min', 'max', 'minPrice', 'maxPrice', '$')}

        {/* Monthly Payment */}
        {renderRangeInput('monthly payment', 'min', 'max', 'minMonthlyPayment', 'maxMonthlyPayment', '$')}

        {/* Make and Model */}
        <div className="py-3 border-b border-gray-200">
          <div className="text-sm font-medium text-gray-700 mb-2">make and model</div>
          <Input 
            className="h-8 text-sm" 
            placeholder=""
            value={filters.makeAndModel}
            onChange={(e) => handleInputChange('makeAndModel', e.target.value)}
          />
        </div>

        {/* Odometer */}
        {renderRangeInput('odometer', 'min', 'max', 'minOdometer', 'maxOdometer')}

        {/* Model Year */}
        {renderRangeInput('model year', 'min', 'max', 'minModelYear', 'maxModelYear')}

        {/* Multi-select filters */}
        {renderMultiSelect('drive', multiSelectOptions.drive, 'drive')}
        {renderMultiSelect('transmission', multiSelectOptions.transmission, 'transmission')}
        {renderMultiSelect('cylinders', multiSelectOptions.cylinders, 'cylinders', true)}
        {renderMultiSelect('condition', multiSelectOptions.condition, 'condition')}
        {renderMultiSelect('fuel', multiSelectOptions.fuel, 'fuel')}
        {renderMultiSelect('type', multiSelectOptions.type, 'type', true)}
        {renderMultiSelect('title status', multiSelectOptions.titleStatus, 'titleStatus')}
        {renderMultiSelect('paint color', multiSelectOptions.paintColor, 'paintColor', true)}

        {/* Boolean Filters Group */}
        <div className="py-3 border-b border-gray-200 space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="deliveryAvailable"
              checked={filters.deliveryAvailable}
              onCheckedChange={(checked) => handleBooleanChange('deliveryAvailable', !!checked)}
            />
            <Label htmlFor="deliveryAvailable" className="text-sm font-normal cursor-pointer">
              delivery available
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="cryptoOk"
              checked={filters.cryptoOk}
              onCheckedChange={(checked) => handleBooleanChange('cryptoOk', !!checked)}
            />
            <Label htmlFor="cryptoOk" className="text-sm font-normal cursor-pointer">
              cryptocurrency ok
            </Label>
          </div>
        </div>

        {/* Command Buttons */}
        <div className="flex gap-2 py-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-sm"
            onClick={handleReset}
          >
            reset
          </Button>
          <Button 
            size="sm" 
            className="text-sm bg-blue-600 hover:bg-blue-700"
            onClick={handleApply}
          >
            apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CraigslistFiltersPanel;
