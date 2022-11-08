import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GuestSection from "./GuestSection";
import {
  emptyDataStructure,
  errorMessageTypes,
  dataTemplate,
  validateEmail,
} from "../../GLOBAL";

function Form({ formRef }) {
  const [data, setData] = useState(JSON.parse(JSON.stringify(dataTemplate)));
  const [errorMessage, setErrorMessage] = useState([""]);
  const [errorMessageTracking, setErrorMessageTracking] = useState(
    JSON.parse(JSON.stringify(dataTemplate))
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    // Error handling
    var tempErrorMessage = [];
    var tempErrorMessageTracking = errorMessageTracking;
    if (data.attending == "") {
      if (!tempErrorMessage.includes(errorMessageTypes.attending)) {
        tempErrorMessage.push(errorMessageTypes.attending);
      }
      tempErrorMessageTracking.attending = "Y";
    } else {
      tempErrorMessageTracking.attending = "N";
    }

    if (data.contactEmail == "" || validateEmail(data.contactEmail) == null) {
      if (!tempErrorMessage.includes(errorMessageTypes.email)) {
        tempErrorMessage.push(errorMessageTypes.email);
      }
      tempErrorMessageTracking.contactEmail = "Y";
    } else {
      tempErrorMessageTracking.contactEmail = "N";
    }

    if (data.mainGuest.firstName == "") {
      // tempErrorMessage.push(errorMessageTypes.firstName);
      if (!tempErrorMessage.includes(errorMessageTypes.firstName)) {
        tempErrorMessage.push(errorMessageTypes.firstName);
      }
      tempErrorMessageTracking.mainGuest.firstName = "Y";
    } else {
      tempErrorMessageTracking.mainGuest.firstName = "N";
    }

    if (data.mainGuest.lastName == "") {
      // tempErrorMessage.push(errorMessageTypes.lastName);
      if (!tempErrorMessage.includes(errorMessageTypes.lastName)) {
        tempErrorMessage.push(errorMessageTypes.lastName);
      }
      tempErrorMessageTracking.mainGuest.lastName = "Y";
    } else {
      tempErrorMessageTracking.mainGuest.lastName = "N";
    }

    if (data.additionalGuests.length != 0) {
      for (var i = 0; i < data.additionalGuests.length; i++) {
        // check firstName
        if (data.additionalGuests[i].firstName == "") {
          if (!tempErrorMessage.includes(errorMessageTypes.firstName)) {
            tempErrorMessage.push(errorMessageTypes.firstName);
          }
          tempErrorMessageTracking.additionalGuests[i].firstName = "Y";
        } else {
          tempErrorMessageTracking.additionalGuests[i].firstName = "N";
        }
        // check lastName
        if (data.additionalGuests[i].lastName == "") {
          if (!tempErrorMessage.includes(errorMessageTypes.lastName)) {
            tempErrorMessage.push(errorMessageTypes.lastName);
          }
          tempErrorMessageTracking.additionalGuests[i].lastName = "Y";
        } else {
          tempErrorMessageTracking.additionalGuests[i].lastName = "N";
        }
      }
    }

    setErrorMessage(tempErrorMessage);
    setErrorMessageTracking(tempErrorMessageTracking);

    if (tempErrorMessage.length == 0) {
      console.log("success");
      console.log(JSON.stringify(data));
      fetch("/api/add", {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          if (res.status == "success") {
            toast.success("Results submitted. Thank you.", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });

            // setData(JSON.parse(JSON.stringify(dataTemplate)));
          } else {
            toast.error("Something went wrong", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        });
    }
  };

  return (
    <div
      className="h-screen bg-[#031934] w-full flex flex-col items-centers py-5"
      id="formRef"
      ref={formRef}
    >
      <ToastContainer />
      <div className="border-[#DCB974] border-2 rounded-lg flex justify-center mx-auto py-5 max-h-screen overflow-y-scroll text-white px-5 scrollbar-thin scrollbar-thumb-[#DCB974]/40 scrollbar-track-[#031934]/40 ">
        <form onSubmit={handleSubmit} className="">
          {/* WILL YOU BE JOINING US SECTION  */}
          <div className="flex flex-col space-y-5">
            <p className="text-center">Will you be joining us ? * </p>
            <div
              className="flex flex-row space-x-5 border-red-500 rounded-lg p-1"
              style={{
                borderWidth:
                  errorMessageTracking.attending == "Y" ? "2px" : "0px",
              }}
            >
              <div
                className="cursor-pointer w-[50%] text-center border-2 rounded-lg py-2 border-green-500 group hover:bg-green-500"
                style={{
                  backgroundColor: data.attending == "Y" ? "#23C55E" : "",
                }}
                onClick={() => {
                  setData({ ...data, attending: "Y" });
                }}
              >
                <p className="text-green-500 group-hover:text-white">Yes</p>
              </div>
              <div
                className="cursor-pointer w-[50%] text-center border-2 rounded-lg py-2 border-red-500 group hover:bg-red-500"
                style={{
                  backgroundColor: data.attending == "N" ? "red" : "",
                }}
                onClick={() => {
                  setData({ ...data, attending: "N" });
                }}
              >
                <p className="text-red-500 group-hover:text-white">No</p>
              </div>
            </div>
          </div>

          {/* CONTACT EMAIL SECTION */}
          <div className="text-center pt-10">
            <p className="">Contact Email * </p>
            <input
              type="text"
              className="w-full text-black border-red-400 rounded-sm outline-none px-1"
              style={{
                borderWidth:
                  errorMessageTracking.contactEmail == "Y" ? "2px" : "0px",
              }}
              value={data.contactEmail}
              onChange={(event) => {
                setData({ ...data, contactEmail: event.target.value });
              }}
            />
          </div>

          <GuestSection
            number="main"
            data={data}
            setData={setData}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            errorMessageTracking={errorMessageTracking}
            setErrorMessageTracking={setErrorMessageTracking}
          />

          {data.additionalGuests.map((guest) => {
            return (
              <GuestSection
                number={guest.id}
                data={data}
                setData={setData}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                errorMessageTracking={errorMessageTracking}
                setErrorMessageTracking={setErrorMessageTracking}
              />
            );
          })}

          {/* ADD GUEST SECTION  */}
          <div
            onClick={() => {
              if (data.additionalGuests.length <= 4) {
                const temp = JSON.parse(JSON.stringify(data));
                const tempErrorMessageTracking = JSON.parse(
                  JSON.stringify(errorMessageTracking)
                );

                temp.additionalGuests.push({
                  ...emptyDataStructure,
                  id: data.additionalGuests.length,
                });
                tempErrorMessageTracking.additionalGuests.push({
                  ...emptyDataStructure,
                  id: errorMessageTracking.additionalGuests.length,
                });
                setData(temp);
                setErrorMessageTracking(tempErrorMessageTracking);
              } else {
                setErrorMessage("maximum of 4 additional guests");
              }
            }}
            className="cursor-pointer border-2 py-2 rounded-lg text-center border-blue-500 group hover:bg-blue-500 my-5"
          >
            <p className="text-blue-500 group-hover:text-white"> Add guest</p>
          </div>

          {/* ERROR MESSAGE SECTION */}
          <div className="px-2">
            {errorMessage.map((error) => (
              <div>
                {/* <FaBeer /> */}
                <p className="text-red-500">{error}</p>
              </div>
            ))}
          </div>

          {/* CONFIRM SECTION */}
          <input
            type="submit"
            value="Confirm"
            className="text-center border-2 rounded-lg cursor-pointer py-2 w-full hover:bg-transparent border-[#DCB974] hover:text-[#DCB974] bg-[#DCB974] text-white my-10"
          />
        </form>
      </div>
    </div>
  );
}

export default Form;
