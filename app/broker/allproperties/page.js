import { fetchBrokerUser } from "@/app/api/getApi/getUser/user";
import LoadMore from "@/app/api/getApi/LoadMore";
import { fetchBrokerProperties2 } from "@/app/api/getApi/properties/getBrokerProperties";

export default async function Page() {
  const { user } = await fetchBrokerUser();
  const { error, data } = await fetchBrokerProperties2(1, user._id);
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-10">
      {data}
      <LoadMore params={user._id} fetchfun={fetchBrokerProperties2} />
    </section>
  );
}
