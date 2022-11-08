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

  if (number == "main") {
    if (errorMessageTracking.mainGuest.firstName == "Y") {
      firstNameStyle = { borderWidth: "2px" };
    }
  } else {
    if (errorMessageTracking.additionalGuests[number].firstName == "Y") {
      firstNameStyle = { borderWidth: "2px" };
    }
  }

  if (number == "main") {
    if (errorMessageTracking.mainGuest.lastName == "Y") {
      lastNameStyle = { borderWidth: "2px" };
    }
  } else {
    if (errorMessageTracking.additionalGuests[number].lastName == "Y") {
      lastNameStyle = { borderWidth: "2px" };
    }
  }

  return (
    <div>
      {number != "main" && (
        <div className="text-center">
          <p className="">Additional guest {number + 1}</p>
        </div>
      )}

      <div className="flex flex-row space-x-5">
        <div className="text-center">
          <p>First Name</p>
          <input
            type="text"
            className="text-black border-red-400"
            style={firstNameStyle}
            value={
              number == "main"
                ? data.mainGuest.firstName
                : data.additionalGuests[number]?.firstName
            }
            onChange={(event) => {
              const temp = JSON.parse(JSON.stringify(data));
              if (number == "main") {
                temp.mainGuest.firstName = event.target.value;
              } else {
                temp.additionalGuests[number].firstName = event.target.value;
              }

              setData(temp);
            }}
          />
        </div>
        <div className="text-center">
          <p>Last Name</p>
          <input
            type="text"
            className="text-black border-red-400"
            style={lastNameStyle}
            value={
              number == "main"
                ? data.mainGuest.lastName
                : data.additionalGuests[number]?.lastName
            }
            onChange={(event) => {
              const temp = JSON.parse(JSON.stringify(data));
              if (number == "main") {
                temp.mainGuest.lastName = event.target.value;
              } else {
                temp.additionalGuests[number].lastName = event.target.value;
              }

              setData(temp);
            }}
          />
        </div>
      </div>

      <div className="text-center">
        <p>Notes</p>
        <textarea
          className="w-full text-black"
          value={
            number == "main"
              ? data.mainGuest.notes
              : data.additionalGuests[number]?.notes
          }
          onChange={(event) => {
            const temp = JSON.parse(JSON.stringify(data));
            if (number == "main") {
              temp.mainGuest.notes = event.target.value;
            } else {
              temp.additionalGuests[number].notes = event.target.value;
            }

            setData(temp);
          }}
        />
      </div>

      {number != "main" && (
        <div
          className="text-center py-2 border-2 rounded-lg"
          onClick={() => {
            var temp = JSON.parse(JSON.stringify(data));
            temp.additionalGuests.splice(
              temp.additionalGuests.findIndex((item) => item.id == number),
              1
            );

            var tempErrorMessageTracking = JSON.parse(
              JSON.stringify(errorMessageTracking)
            );
            tempErrorMessageTracking.additionalGuests.splice(
              tempErrorMessageTracking.additionalGuests.findIndex(
                (item) => item.id == number
              ),
              1
            );
            setData(temp);
            setErrorMessageTracking(tempErrorMessageTracking);
            setErrorMessage([""]);
          }}
        >
          <p>Remove Guest</p>
        </div>
      )}
    </div>
  );
}

export default GuestSection;
