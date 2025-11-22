import { createContext, useContext, useState } from "react";
import { faker } from "@faker-js/faker";

function createRandomPost() {
  //return random blog
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

const context = createContext();

function PostsProvider({ children }) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  ); //init 30 blogs
  const [searchQuery, setSearchQuery] = useState("");

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts; //after search array

  function handleAddPost(post) {
    //add
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    //clear all
    setPosts([]);
  }

  return (
    <context.Provider
      value={{
        posts: searchedPosts,
        onClearPosts: handleClearPosts,
        searchQuery,
        setSearchQuery,
        onAddPost: handleAddPost,
      }}
    >
      {children}
    </context.Provider>
  );
}

function usePosts() {
  const posts = useContext(context);
  if (posts === undefined) throw new Error("This hook was outside of range");
  return posts;
}

export { PostsProvider, usePosts };
