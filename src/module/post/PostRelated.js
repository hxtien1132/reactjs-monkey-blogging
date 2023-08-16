import Heading from "components/layout/Heading";
import React from "react";
import PostItem from "./PostItem";
import { useState } from "react";
import { useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";

const PostRelated = ({ categoryId }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (!categoryId) return;
    const docRef = query(
      collection(db, "posts"),
      where("category.id", "==", categoryId)
    );
    onSnapshot(docRef, (snapshot) => {
      const results = [];
      snapshot.forEach((post) => {
        results.push({
          id: post.id,
          ...post.data(),
        });
      });
      setPosts(results);
    });
  },[categoryId]);

  // console.log(
  //   "🚀 ~ file: PostRelated.js:26 ~ onSnapshot ~ setPosts:",
  //   setPosts
  // );
  if (!categoryId || !posts) return null;
  // console.log(categoryId);
  return (
    <div className="post-related">
      <Heading>Bài viết liên quan</Heading>
      <div className="grid-layout grid-layout--primary">
        {posts.map((item) => (
           <PostItem key={item.id} data={item}></PostItem>
           ))}

      </div>
    </div>
  );
};

export default PostRelated;
