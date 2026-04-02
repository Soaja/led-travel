export default function Loading() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header bar */}
      <div className="bg-[#1A1A2E] pt-32 pb-8 mb-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="h-4 w-56 bg-white/10 rounded-full animate-pulse" />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        {/* Filter bar skeleton */}
        <div className="flex gap-3 mb-8 overflow-hidden">
          {[100, 88, 110, 96, 104, 80].map((w, i) => (
            <div
              key={i}
              className="h-9 rounded-full bg-gray-200 animate-pulse shrink-0"
              style={{ width: w }}
            />
          ))}
        </div>

        {/* Tour cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 animate-pulse">
              <div className="h-48 bg-gray-200" />
              <div className="p-5 space-y-3">
                <div className="flex gap-2">
                  <div className="h-3 bg-gray-200 rounded-full w-16" />
                  <div className="h-3 bg-gray-200 rounded-full w-12" />
                </div>
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <div className="h-4 bg-gray-200 rounded w-10" />
                  <div className="h-4 bg-gray-200 rounded w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
