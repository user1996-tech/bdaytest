import React, { useEffect } from "react";
import { app, db } from "../firebase/clientApp";
import { useCollection } from "react-firebase-hooks/firestore";
import { getFirestore, collection } from "firebase/firestore";

function TestPage() {
  const [votes, votesLoadin, votesError] = useCollection(
    collection(getFirestore(app), "votes")
  );

  const addVoteDocument = async (vote) => {
    await db.collection("votes").doc().set({ vote: "noew" });
  };

  useEffect(() => {
    if (votes != undefined) {
      console.log(votes.docs);
    }
  }, [votes]);
  return (
    <div>
      <p>button down</p>
      <div
        className="bg-orange-300"
        onClick={() => {
          addVoteDocument();
        }}
      >
        {" "}
        click
      </div>
    </div>
  );
}

export default TestPage;
