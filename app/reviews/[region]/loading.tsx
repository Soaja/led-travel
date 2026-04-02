export default function Loading() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-[#1A1A2E] pt-32 pb-16 mb-12">
        <div className="container mx-auto px-4 animate-pulse">
          <div className="h-4 w-32 bg-white/15 rounded-full mb-8" />
          <div className="text-center space-y-4">
            <div className="h-3 w-28 bg-white/20 rounded-full mx-auto" />
            <div className="h-10 w-56 bg-white/20 rounded mx-auto" />
            <div className="flex items-center justify-center gap-4">
              <div className="h-4 w-20 bg-white/15 rounded-full" />
              <div className="h-4 w-24 bg-white/15 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Review cards grid */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 space-y-4">
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <div key={j} className="h-4 w-4 bg-gray-200 rounded-sm" />
                ))}
              </div>
              {/* Text lines */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="h-4 bg-gray-200 rounded w-4/5" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
              {/* Footer */}
              <div className="border-t border-gray-100 pt-4 flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-24" />
                <div className="h-4 bg-gray-200 rounded w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
