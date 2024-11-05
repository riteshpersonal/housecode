import { fetchSingleProperty } from '@/app/api/getApi/properties/getProperties'
import PropertyDetailView from '@/components/PropertyListing/PropertyDetailView'
import PropertyDetailView2 from '@/components/PropertyListing/PropertyDetailView2'
import React from 'react'

const page = async({params}) => {
  const property = await fetchSingleProperty(params.id)
  console.log(property,"hi")
  return (
    <div>
        <PropertyDetailView2 propertyData={property.properties} />
    </div>
  )
}

export default page