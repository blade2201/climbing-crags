import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function cardSkeleton() {
  return (
    <SkeletonTheme baseColor="#333333" highlightColor="#575757">
      <div className="list-section">
        <h3 className="text-5xl pb-10 pt-16 w-1/3">
          <Skeleton />
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10">
          {[0, 0, 0].map((item, i) => {
            return (
              <div
                className="col-span-1 bg-dark-card rounded-4xl p-5 shadow-8"
                key={i}
              >
                <Skeleton className="pb-[56.25%] rounded-3xl" />
                <div className="relative">
                  <div className="pt-4 flex gap-x-2.5">
                    <Skeleton height={30} width={180} className="rounded-4xl" />
                  </div>
                  <h4 className="mt-4 max-w-[60%]">
                    <Skeleton height={32} />
                  </h4>
                  <h5 className="max-w-[60%] mt-2">
                    <Skeleton height={24} />
                    <br />
                  </h5>
                  <a className="absolute right-0 bottom-0">
                    <Skeleton className="rounded-4xl w-[calc(5ch+3rem)] md:w-[calc(5ch+3rem)] h-7 md:h-12" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SkeletonTheme>
  );
}
