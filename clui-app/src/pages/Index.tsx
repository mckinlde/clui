
import CraigslistFiltersPanel from "@/components/CraigslistFiltersPanel";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white">
          <div className="px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Craigslist Components Demo</h1>
            <p className="text-gray-600 mb-6">React recreations of Craigslist's search interface components</p>
          </div>
          
          <div className="flex">
            <div className="w-80 flex-shrink-0">
              <CraigslistFiltersPanel />
            </div>
            
            <div className="flex-1 p-8">
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Search Results Would Appear Here</h3>
                <p className="text-gray-500">This area would contain the actual search results in a real application</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
