import React, { useEffect, useState } from "react";
import { app } from "../firebase/clientApp";
import { getFirestore, where } from "firebase/firestore";
import { collection, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

function Admin() {
  const db = getFirestore(app);
  const guestListCollection = collection(db, "guestList");
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState("");
  const [all, allLoading, allError] = useCollection(
    collection(db, "guestList")
  );
  const [notAttending, notAttendingLoading, notAttendingError] = useCollection(
    query(guestListCollection, where("attending", "==", "N"))
  );
  const [attending, attendingLoading, attendingError] = useCollection(
    query(guestListCollection, where("attending", "==", "Y"))
  );

  useEffect(() => {
    if (selected == "NA") {
      setData(notAttending);
    } else if (selected == "A") {
      setData(attending);
    } else {
      setData(all);
    }
  }, [all, notAttending, attending, selected]);

  return (
    <div className="w-full h-screen bg-[#031934] flex items-center flex-col py-5">
      <div className="w-full xl:w-[1000px] flex flex-row justify-evenly">
        <div
          className="px-3 py-2 border-2 rounded-lg text-center cursor-pointer"
          onClick={() => {
            if (selected == "NA") {
              setSelected("");
            } else {
              setSelected("NA");
            }
          }}
        >
          <p className="text-white">Not Attending</p>
          <p className="text-white">
            {notAttendingLoading ? "loading" : notAttending.docs.length}
          </p>
        </div>

        <div
          className="px-3 py-2 border-2 rounded-lg text-center cursor-pointer"
          onClick={() => {
            if (selected == "A") {
              setSelected("");
            } else {
              setSelected("A");
            }
          }}
        >
          <p className="text-white">Attending</p>
          <p className="text-white">
            {attendingLoading ? "loading" : attending.docs.length}
          </p>
        </div>
      </div>
      <div className="rounded-lg border-2 inline-block my-3 xl:w-[1000px] w-full overflow-y-auto">
        <table className="w-full border-lg">
          <thead className="">
            <tr className="text-white bg-[#362F4B] font-PublicSans text-sm">
              <th className="">
                <div className="py-3">ID</div>
              </th>
              <th>
                <div className="py-3">First Name</div>
              </th>
              <th>
                <div className="py-3">Last Name</div>
              </th>
              <th>
                <div className="py-3">Contact Email</div>
              </th>
              <th>
                <div className="py-3">Attending</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.docs?.map((item, index) => {
              return (
                <tr className="even:bg-white odd:bg-[#F6F6F6]" key={item.id}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{item.data().firstName}</td>
                  <td className="text-center">{item.data().lastName}</td>
                  <td className="text-center">{item.data().email}</td>
                  <td className="text-center">{item.data().attending}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
