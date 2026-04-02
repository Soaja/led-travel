export default function Loading() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-[#1A1A2E] pt-32 pb-16 mb-12">
        <div className="container mx-auto px-4 text-center space-y-4 animate-pulse">
          <div className="h-3 w-32 bg-white/20 rounded-full mx-auto" />
          <div className="h-10 w-80 bg-white/20 rounded mx-auto" />
          <div className="h-4 w-96 bg-white/10 rounded mx-auto" />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 animate-pulse">
        {/* Form card skeleton */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-10 mb-20 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-56 space-y-3">
              <div className="h-3 bg-gray-200 rounded-full w-24" />
              <div className="h-6 bg-gray-200 rounded w-48" />
              <div className="h-6 bg-gray-200 rounded w-40" />
              <div className="h-4 bg-gray-200 rounded w-44" />
            </div>
            <div className="hidden md:block w-px bg-gray-100 self-stretch" />
            <div className="flex-1 space-y-5">
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-9 w-9 bg-gray-200 rounded-full" />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-12 bg-gray-200 rounded-xl" />
                <div className="h-12 bg-gray-200 rounded-xl" />
              </div>
              <div className="h-28 bg-gray-200 rounded-xl" />
              <div className="h-12 bg-gray-200 rounded-xl" />
            </div>
          </div>
        </div>

        {/* Section heading */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-7 bg-gray-200 rounded w-52" />
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Destination cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="h-52 bg-gray-200" />
              <div className="p-5 space-y-3">
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded-full w-24" />
                  <div className="h-4 bg-gray-200 rounded-full w-16" />
                </div>
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-4/5" />
                <div className="h-4 bg-gray-200 rounded-full w-28 mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
