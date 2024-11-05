"use client";
import { useCallback, useEffect, useState, startTransition } from "react";
import { useInView } from "react-intersection-observer";

function LoadMore({ params, fetchfun, user=true }) {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(2);

  // Intersection Observer hook to track the scrolling element
  const { ref, inView } = useInView({
    threshold: 1.0, // Triggers when 100% in view
    triggerOnce: false,
  });

  // Fetch data when scrolling
  const fetchDataOnScroll = useCallback(async () => {
    try {
      console.log("Loading more data...");

      const res = await fetchfun(pageNumber, params, user);
      if (res.data.length !== 0) {
        startTransition(() => {
          setData((prev) => [...prev, ...res.data]);
          setPageNumber((prev) => prev + 1);
        });
      } else {
        setHasMore(false); // Stop fetching when no more data
      }
    } catch (error) {
      console.error("Error during data fetching on scroll:", error.message);
      setHasMore(false); // Stop fetching on error
    }
  }, [pageNumber, params]);

  // Fetch data when the observer is in view
  useEffect(() => {
    if (inView && hasMore) {
      fetchDataOnScroll();
    }
  }, [inView, hasMore, fetchDataOnScroll]);

  return (
    <>
    {data}
    
      {/* <BrokersTable users={data} /> */}

      {/* Loader at the bottom, this element is observed for scrolling */}
      {hasMore && (
        <div
          ref={ref}
          className="flex justify-center items-center py-4 text-xl font-extrabold font-mono"
        >
          Loading...
        </div>
      )}

      {!hasMore && (
        <h1 className="text-xl flex flex-col font-extrabold items-center font-mono w-full">
          END
        </h1>
      )}
    </>
  );
}

export default LoadMore;
