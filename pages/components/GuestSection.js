import React from "react";

function GuestSection({
  number,
  data,
  setData,
  errorMessage,
  setErrorMessage,
  errorMessageTracking,
  setErrorMessageTracking,
}) {
  var firstNameStyle = { borderWidth: "0px" };
  var lastNameStyle = { borderWidth: "0px" };

  if (errorMessageTracking?.guests[number]?.lastName == "Y") {
    lastNameStyle = { borderWidth: "2px" };
  }

  if (errorMessageTracking?.guests[number]?.fristName == "Y") {
    lastNameStyle = { borderWidth: "2px" };
  }

  return (
    <div>
      {number != "0" && (
        <div className="text-center my-1">
          <p className="italic text-sm">Additional guest {number + 1}</p>
        </div>
      )}

      <div className="flex flex-row space-x-5">
        <div className="text-center">
          <p>First Name * </p>
          <input
            type="text"
            className="text-black border-red-400 rounded-sm outline-none px-1"
            style={firstNameStyle}
            value={data?.guests[number].firstName}
            onChange={(event) => {
              const temp = JSON.parse(JSON.stringify(data));
              temp.guests[number].firstName = event.target.value;

              setData(temp);
            }}
          />
        </div>
        <div className="text-center">
          <p>Last Name * </p>
          <input
            type="text"
            className="text-black border-red-400 rounded-sm outline-none px-1"
            style={lastNameStyle}
            value={data?.guests[number].lastName}
            onChange={(event) => {
              const temp = JSON.parse(JSON.stringify(data));
              temp.guests[number].lastName = event.target.value;

              setData(temp);
            }}
          />
        </div>
      </div>

      <div className="text-center">
        <p>Notes</p>
        <textarea
          className="w-full text-black rounded-sm placeholder:text-sm placeholder:px-1 outline-none px-1"
          placeholder="Dietary requirements and sepcial needs, if any"
          value={data?.guests[number].notes}
          onChange={(event) => {
            const temp = JSON.parse(JSON.stringify(data));
            temp.guests[number].notes = event.target.value;

            setData(temp);
          }}
        />
      </div>

      {number != "0" && (
        <div
          className="text-center py-2 border-2 rounded-lg border-red-500 cursor-pointer mt-3 hover:bg-red-500 group"
          onClick={() => {
            var temp = JSON.parse(JSON.stringify(data));
            temp.guests.splice(number, 1);

            var tempErrorMessageTracking = JSON.parse(
              JSON.stringify(errorMessageTracking)
            );
            tempErrorMessageTracking.guests.splice(number, 1);

            // console.log(temp);
            console.log(tempErrorMessageTracking);

            setData(temp);
            setErrorMessageTracking(tempErrorMessageTracking);
            setErrorMessage([""]);
          }}
        >
          <p className="text-red-500 group-hover:text-white">Remove Guest</p>
        </div>
      )}
    </div>
  );
}

export default GuestSection;
