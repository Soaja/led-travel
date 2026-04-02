export default function Loading() {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Dark header */}
      <div className="bg-[#1A1A2E] pt-32 pb-8 mb-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="h-4 w-72 bg-white/10 rounded-full animate-pulse" />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 animate-pulse">
        {/* Gallery skeleton */}
        <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[420px] rounded-2xl overflow-hidden mb-8">
          <div className="col-span-3 row-span-2 bg-gray-200" />
          <div className="bg-gray-200" />
          <div className="bg-gray-200" />
        </div>

        {/* Main content + booking card */}
        <div className="flex flex-col lg:flex-row gap-12 mt-8">

          {/* Left column */}
          <div className="flex-grow lg:w-2/3 space-y-6">
            {/* Badge + title */}
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded-full w-28" />
              <div className="h-9 bg-gray-200 rounded w-3/4" />
              <div className="flex gap-4">
                <div className="h-4 bg-gray-200 rounded-full w-24" />
                <div className="h-4 bg-gray-200 rounded-full w-20" />
                <div className="h-4 bg-gray-200 rounded-full w-28" />
              </div>
            </div>

            <div className="h-px bg-gray-100" />

            {/* Description */}
            <div className="space-y-3">
              <div className="h-6 bg-gray-200 rounded w-28" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="h-4 bg-gray-200 rounded w-4/5" />
            </div>

            {/* Highlights box */}
            <div className="bg-gray-50 rounded-2xl p-8 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-40" />
              <div className="grid grid-cols-2 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <div className="h-3 w-3 bg-gray-200 rounded-full shrink-0" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                  </div>
                ))}
              </div>
            </div>

            {/* Included / not included */}
            <div className="rounded-3xl overflow-hidden border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-10 bg-emerald-50/50 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-36" />
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="h-4 w-4 bg-gray-200 rounded shrink-0" />
                      <div className="h-4 bg-gray-200 rounded w-full" />
                    </div>
                  ))}
                </div>
                <div className="p-10 bg-rose-50/40 border-t md:border-t-0 md:border-l border-gray-100 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-28" />
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="h-4 w-4 bg-gray-200 rounded shrink-0" />
                      <div className="h-4 bg-gray-200 rounded w-4/5" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right column — booking card */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-6 space-y-5">
              <div className="h-8 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-px bg-gray-100" />
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-24" />
                  <div className="h-4 bg-gray-200 rounded w-16" />
                </div>
              ))}
              <div className="h-12 bg-gray-200 rounded-xl" />
              <div className="h-12 bg-gray-200 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
