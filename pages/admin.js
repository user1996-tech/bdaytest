import React, { useEffect, useState } from "react";
import { app } from "../firebase/clientApp";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

function Admin() {
  const [data, dataLoadin, dataError] = useCollection(
    collection(getFirestore(app), "guestList")
  );

  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   // fecth API data -> MYSQL
  //   fetch("/api/get")
  //     .then((response) => response.json())
  //     .then((res) => {
  //       console.log(res);
  //       setData(res);
  //     });
  // }, []);

  // useEffect(() => {
  //   // fetch API data -> Firebase
  // }, []);

  return (
    <div className="w-full h-screen bg-[#031934] flex justify-center">
      <div className="rounded-lg border-2 inline-block my-10 xl:w-[1000px] w-full overflow-y-auto">
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
            {data?.docs.map((item, index) => {
              return (
                <tr className="even:bg-white odd:bg-[#F6F6F6]">
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
