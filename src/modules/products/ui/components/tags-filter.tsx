import { useInfiniteQuery } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";

import { useTRPC } from "@/trpc/client";
import { Checkbox } from "@/components/ui/checkbox";
import { DEFAULT_LIMIT } from "@/constants";

interface TagsFilterProps {
  value: string[] | null;
  onChange: (value: string[]) => void;
}

export const TagsFilter = ({ value, onChange }: TagsFilterProps) => {
  const trpc = useTRPC();
  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery(
      trpc.tags.getMany.infiniteQueryOptions(
        {
          limit: DEFAULT_LIMIT,
        },
        {
          getNextPageParam: (lastPage) =>
            lastPage.docs.length > 0 ? lastPage.nextPage : undefined,
        },
      ),
    );

  const onClick = (tag: string) => {
    if (value?.includes(tag)) {
      onChange(value.filter((id) => id !== tag) || []);
    } else {
      onChange([...(value || []), tag]);
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      {isLoading ? (
        <div className="flex items-center justify-center p-4">
          <LoaderIcon className="size-4 animate-spin" />
        </div>
      ) : (
        data?.pages.map((page) =>
          page.docs.map((tag) => (
            <div
              key={tag.id}
              className="flex cursor-pointer items-center justify-between"
              onClick={() => onClick(tag.name)}
            >
              <p className="font-medium">{tag.name}</p>
              <Checkbox
                checked={value?.includes(tag.name)}
                onCheckedChange={() => onClick(tag.name)}
              />
            </div>
          )),
        )
      )}

      {hasNextPage && (
        <button
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
          className="cursor-pointer justify-start text-start font-medium underline disabled:opacity-50"
        >
          Load more
        </button>
      )}
    </div>
  );
};
