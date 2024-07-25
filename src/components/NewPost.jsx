import styles from "./NewPost.module.css";
import { useState } from "react";

function NewPost({ onCancel, onAddPost }) {
  const [postBody, setPostBody] = useState("");
  const [postAuthor, setPostAuthor] = useState("");

  function postBodyHandler(event) {
    setPostBody(event.target.value);
  }

  function postAuthorHandler(event) {
    setPostAuthor(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
    const postData = {
      body: postBody,
      author: postAuthor,
    };
    onAddPost(postData);
    onCancel();
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <p>
        <label htmlFor='body'>Text</label>
        <textarea id='body' required rows={3} onChange={postBodyHandler} />
      </p>
      <p>
        <label htmlFor='name'>Your name</label>
        <input type='text' id='name' required onChange={postAuthorHandler} />
      </p>
      <p className={styles.actions}>
        <button type='submit'>Submit</button>
        <button type='button' onClick={onCancel}>
          Cancel
        </button>
      </p>
    </form>
  );
}

export default NewPost;
