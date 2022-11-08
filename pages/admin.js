import React, { useEffect, useState } from "react";

function admin() {
  const [data, setData] = useState([]);
  useEffect(() => {
    // fecth API data
    fetch("/api/get")
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setData(res);
      });
  }, []);

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
            {/* <tr className="odd:bg-[#F6F6F6]">
              <td className="text-center">1</td>
              <td className="text-center">Austin</td>
              <td className="text-center">Loh</td>
              <td className="text-center">madeinsg3@gmail.com</td>
              <td className="text-center">Y</td>
            </tr>
            <tr className="even:bg-white">
              <td className="text-center">1</td>
              <td className="text-center">Austin</td>
              <td className="text-center">Loh</td>
              <td className="text-center">madeinsg3@gmail.com</td>
              <td className="text-center">Y</td>
            </tr> */}
            {data.map((item) => {
              return (
                <tr className="even:bg-white odd:bg-[#F6F6F6]">
                  <td className="text-center">{item.gid}</td>
                  <td className="text-center">{item.firstName}</td>
                  <td className="text-center">{item.lastName}</td>
                  <td className="text-center">{item.email}</td>
                  <td className="text-center">{item.attending}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default admin;
