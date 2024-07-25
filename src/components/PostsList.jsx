import NewPost from "./NewPost";
import Post from "./Post";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import styles from "./PostsList.module.css";

function PostsList({ isPosting, onStopPosting }) {
  const [posts, setPosts] = useState([]);
  const [isFetching, setFetching] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      setFetching(true);
      const response = await fetch("http://localhost:8080/posts");
      const resData = await response.json();
      setPosts(resData.posts);
      setFetching(false);
    }
    fetchPosts();
  }, []);

  function addPostHandler(postData) {
    fetch("http://localhost:8080/posts", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setPosts((existingPosts) => [postData, ...existingPosts]);
  }

  return (
    <>
      {isPosting ? (
        <Modal onClose={onStopPosting}>
          <NewPost onCancel={onStopPosting} onAddPost={addPostHandler} />
        </Modal>
      ) : (
        false
      )}
      {!isFetching && posts.length > 0 && (
        <ul className={styles.posts}>
          {posts.map((post) => (
            <Post key={post.body} author={post.author} body={post.body} />
          ))}
        </ul>
      )}
      {!isFetching && posts.length === 0 && (
        <div>You are the first poster.</div>
      )}

      {isFetching && (
        <div style={{ textAlign: "center", color: "white" }}>
          <p>Loading posts ...</p>
        </div>
      )}
    </>
  );
}

export default PostsList;
