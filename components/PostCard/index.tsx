import { Post } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

export default function PostCard({ post, onDelete }: { post: Post, onDelete?: (id: number) => void }) {
  return (
    <Card>
      <CardHeader className="flex">
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>User {post.userId}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{post.body}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onDelete?.(post.id)}>Delete</Button>
      </CardFooter>
    </Card>
  );
}
