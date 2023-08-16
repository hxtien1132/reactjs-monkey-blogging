import { db } from "firebase-app/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const AuthorBox = ({ userId="" }) => {
    // console.log("userId",userId);
  const [user, setUser] = useState({});
  useEffect(() => {
    async function fetchData() {
      if (!userId) return
      const docRef =  doc(db, "users", userId);
      const docSnapshot = await getDoc(docRef);
      // console.log("data~~~~~", docSnapshot.data());
      if (docSnapshot.data()) {
        setUser(docSnapshot.data());
      }
    }
    fetchData();
  }, [userId]);
  if (!userId || !user.fullname) return null;
  return (
    <div className="author">
      <div className="author-image">
        <img src={user.avatar} alt="" />
      </div>
      <div className="author-content">
        <h3 className="author-name">{user?.fullname}</h3>
        <p className="author-desc">{user?.description}</p>
      </div>
    </div>
  );
};

export default AuthorBox;
