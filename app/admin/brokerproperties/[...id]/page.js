import LoadMore from '@/app/api/getApi/LoadMore';
import { fetchBrokerProperties } from '@/app/api/getApi/properties/getBrokerProperties';
import SingleProperty from '@/components/PropertyListing/SingleProperty';

export default async function Page({ params }) {
    console.log(params,"params")
    const { error, data } = await fetchBrokerProperties(1, params.id);
    return (
        <section  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-10" >
               {data}
            <LoadMore
                params={params.id}
                fetchfun={fetchBrokerProperties}
            />
        </section>
    )
}
