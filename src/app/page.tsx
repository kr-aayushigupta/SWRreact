import PostList from "@/components/InfiniteLoading";
import TodoList from "@/components/TodoList";
import Polling from "@/components/pollinng";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      {/* <PostList/> */}
      {/* <TodoList/>? */}
      <Polling/>
    </div>
  );
}
