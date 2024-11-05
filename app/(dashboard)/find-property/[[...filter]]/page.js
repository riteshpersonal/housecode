import Filter from '@/components/FilterComponent/Filter'
import LoadMore from '@/app/api/getApi/LoadMore';
import { fetchAddresses, fetchProperties } from '@/app/api/getApi/properties/getProperties';

export default async function Page({ params }) {
    const { error, data } = await fetchProperties(1, params.filter, false);
    const {  address } = await   fetchAddresses()
    return (
      <div className='my-8'>       
       <Filter addressData={address} />
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-10" >
           {data}
            <LoadMore
                params={params.filter}
                fetchfun={fetchProperties}
                user={false}
            />
        </section>
        </div>
    )
}
