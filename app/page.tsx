"use client";

import PostCard from "@/components/PostCard";
import PostCardSkeleton from "@/components/PostCard/PostCardSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import useFetchJson from "@/hooks/useFetchJson";
import { Post } from "@/types";
import { useEffect, useState } from "react";

export default function Home() {
  const { data, isFetching, error, refetch } = useFetchJson<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );

  // new state to delete posts in ui
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data]);

  return (
    <>
      <Button
        size={"lg"}
        className="fixed bottom-4 right-4"
        onClick={() => refetch()}
      >
        Refresh
      </Button>
      <main className="flex min-h-screen flex-col items-stretch justify-start p-24 gap-8">
        {error && error.name !== "AbortError" && <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error.message}
          </AlertDescription>
        </Alert>}
        {isFetching &&
          new Array(10)
            .fill(0)
            .map((_, index) => <PostCardSkeleton key={index} />)}
        {posts &&
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onDelete={(id) =>
                setPosts(posts.filter((post) => post.id !== id))
              }
            />
          ))}
      </main>
    </>
  );
}
