import Heading from "components/layout/Heading";
import Layout from "components/layout/Layout";
import PostCategory from "module/post/PostCategory";
import PostImage from "module/post/PostImage";
import PostItem from "module/post/PostItem";
import PostMeta from "module/post/PostMeta";
import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PageNotFound from "./PageNotFound";
import {
  collection,
  onSnapshot,
  query,
  snapshotEqual,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import parse from "html-react-parser";
import { db } from "firebase-app/firebase-config";
import AuthorBox from "components/author/AuthorBox";
import PostRelated from "module/post/PostRelated";
import PostTitle from "module/post/PostTitle";
import slugify from "slugify";
const PostDetailsPageStyles = styled.div`
  padding-bottom: 100px;
  .post {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      margin: 40px 0;
    }
    &-feature {
      width: 100%;
      max-width: 640px;
      height: 466px;
      border-radius: 20px;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 16px;
    }
    &-info {
      flex: 1;
    }
    &-content {
      max-width: 700px;
      margin: 80px auto;
    }
  }
  .author {
    margin-top: 40px;
    margin-bottom: 80px;
    display: flex;
    border-radius: 20px;
    background-color: ${(props) => props.theme.grayF3};
    &-image {
      width: 200px;
      height: 200px;
      flex-shrink: 0;
      border-radius: inherit;
    }
    &-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    &-content {
      flex: 1;
      padding: 20px;
    }
    &-name {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 20px;
    }
    &-desc {
      font-size: 14px;
      line-height: 2;
    }
  }
  @media screen and (max-width: 1023.98px) {
    padding-bottom: 40px;
    .post {
      &-header {
        flex-direction: column;
      }
      &-feature {
        height: auto;
      }
      &-heading {
        font-size: 26px;
      }
      &-content {
        margin: 40px 0;
      }
    }
    .author {
      flex-direction: column;
      &-image {
        width: 100%;
        height: auto;
      }
    }
  }
`;

const PostDetailsPage = () => {
  const { slug } = useParams();
  const [postInfo, setPostInfo] = useState({});
  useEffect(() => {
    document.title = "Details Page"
    async function featchData() {
      if (!slug) return;
      const colRef = query(
        collection(db, "posts"),
        where("slug", "==", slug)
      );
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) => {
          doc.data() && setPostInfo(doc.data());
        });
      });
    }
    featchData();
  }, [slug]);
  useEffect(() => {
    //  window.scroll(0, 0);
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [slug]);
  console.log("post info",postInfo);
  const { user } = postInfo;
   const date = user?.createdAt?.seconds
     ? new Date(user?.createdAt?.seconds * 1000)
     : new Date();
   const formatDate = new Date(date).toLocaleDateString("vi-VI");
  console.log("user~~~~",user);
  if(!postInfo) return null;
  if (!slug ) return <PageNotFound></PageNotFound>;
  return (
    <PostDetailsPageStyles>
      <Layout>
        <div className="container">
          <div className="post-header">
            <PostImage
              className="w-[600px] h-[500px]"
              url={postInfo?.image}
            ></PostImage>
            <div className="post-info">
              <PostCategory className="mb-6" to={postInfo.category?.slug}>
                {postInfo?.category?.name}
              </PostCategory>
              <PostTitle className="post-heading" to={postInfo?.slug}>
                {postInfo.title}
              </PostTitle>
              <PostMeta
                date={formatDate}
                authorName={postInfo?.user?.fullname}
                to={slugify(postInfo.user?.fullname || "", { lower: true })}
              ></PostMeta>
            </div>
          </div>
          <div className="post-content">
            <div className="entry-content">{parse(postInfo.content || "")}</div>
            <AuthorBox userId={user?.id}></AuthorBox>
          </div>
          <PostRelated categoryId={postInfo.category?.id}></PostRelated>
        </div>
      </Layout>
    </PostDetailsPageStyles>
  );
};

export default PostDetailsPage;
