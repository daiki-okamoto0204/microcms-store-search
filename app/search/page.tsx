import React, { Suspense } from 'react'
import Spinner from '../_components/Spinner'
import Results from './_components/Results'
import Search from './_components/Search'

type Props = {
  q?: string
  area?: string
  categories?: string[]
  currentLat?: string
  currentLng?: string
}
const KYOTO_STATION_LOCATION = { lat: 34.985109, lng: 135.758829 }
const Page = ({ searchParams = {} }: { searchParams?: Props }) => {
  const {
    q = '',
    area = '',
    categories = [],
    currentLat = KYOTO_STATION_LOCATION.lat.toString(),
    currentLng = KYOTO_STATION_LOCATION.lng.toString()
  } = searchParams
  return (
    <div className="flex h-screen">
      <div className="w-1/4">
        <Suspense fallback={<Spinner />}>
          <Search />
        </Suspense>
      </div>
      <div className="w-3/4">
        <Suspense key={area + q + categories} fallback={<Spinner />}>
          <Results
            q={q}
            area={area}
            categories={Array.isArray(categories) ? categories : [categories]}
            currentLat={currentLat}
            currentLng={currentLng}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default Page
