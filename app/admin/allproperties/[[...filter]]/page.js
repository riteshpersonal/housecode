import LoadMore from '@/app/api/getApi/LoadMore';
import { fetchProperties } from '@/app/api/getApi/properties/getProperties';
import SingleProperty from '@/components/PropertyListing/SingleProperty';

export default async function Page({ params }) {
    const { error, data } = await fetchProperties(1, params.filter);
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-10" >
           {data}
            <LoadMore
                params={params.filter}
                fetchfun={fetchProperties}
            />
        </section>
    )
}
