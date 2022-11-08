import { useEffect, useState } from "react";
import GuestSection from "./components/GuestSection";
import { ToastContainer, toast } from "react-toastify";
import {
  emptyDataStructure,
  errorMessageTypes,
  dataTemplate,
  validateEmail,
} from "../GLOBAL";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [data, setData] = useState(JSON.parse(JSON.stringify(dataTemplate)));
  const [errorMessage, setErrorMessage] = useState(["error message"]);
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

  const testToast = () => {
    console.log("testToast");
    toast.success("test", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex items-center flex-col bg-[#00000075]">
        <div className="h-screen flex flex-col items-center">
          <div className="text-center">
            <p className="text-white text-[120px] font-GreatVibes">Haukur's </p>
            <p className="text-white text-[100px] font-GreatVibes mt-[-70px]">
              60th
            </p>
          </div>

          <div className="text-center">
            <p className="text-white font-Forum text-[35px]">
              18 November 2022 - 6pm
            </p>
          </div>

          <div
            className="bg-[#ffffff70] flex flex-row rounded-lg p-3 cursor-pointer group hover:bg-[#9C814D95] transition ease-in-out duration-500  "
            onClick={() => {
              window.location.assign(
                "https://www.google.com/maps/place/CLAY+-+Cocktails+%26+Cuisine/@10.8075637,106.7410537,17.01z/data=!4m5!3m4!1s0x31752752280eca6d:0x7254050ac6326a17!8m2!3d10.8075446!4d106.7410753"
              );
            }}
          >
            <div>
              <img
                src="restaurant.png"
                className="w-[200px] h-[200px] rounded-lg"
              />
            </div>

            <div className="p-10">
              <p className="font-Forum text-[30px] group-hover:text-white transition ease-in-out duration-500">
                CLAY - Cocktails & Cuisine
              </p>
              <p className="font-Forum text-[20px] group-hover:text-white transition ease-in-out duration-500">
                18 Đường Số 6, Thảo Điền, Quận 2, Thành phố Hồ Chí Minh 700000,
                Vietnam
              </p>
            </div>
          </div>

          <div className="bg-[#ffffff95] py-3 px-5 cursor-pointer rounded-lg hover:bg-[#9C814D95] group transition ease-in-out duration-500 mt-5 inline-block ">
            <p className="group-hover:text-white">RSVP Now</p>
          </div>
        </div>

        <div className="h-screen bg-[#031934] w-full flex flex-col items-centers">
          <div className="border-[#DCB974] border-2 rounded-lg flex justify-center mx-auto py-5 max-h-screen overflow-y-auto text-white">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex flex-col space-y-5">
                <p className="text-center">Will you be joining us?</p>
                <div
                  className="flex flex-row space-x-5 border-red-500 rounded-lg"
                  style={{
                    borderWidth:
                      errorMessageTracking.attending == "Y" ? "2px" : "0px",
                  }}
                >
                  <div
                    className="cursor-pointer w-[50%] text-center border-2 rounded-lg py-2"
                    style={{
                      backgroundColor: data.attending == "Y" ? "green" : "",
                    }}
                    onClick={() => {
                      setData({ ...data, attending: "Y" });
                    }}
                  >
                    <p className="">Yes</p>
                  </div>
                  <div
                    className="cursor-pointer w-[50%] text-center border-2 rounded-lg py-2"
                    style={{
                      backgroundColor: data.attending == "N" ? "red" : "",
                    }}
                    onClick={() => {
                      setData({ ...data, attending: "N" });
                    }}
                  >
                    <p className="">No</p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="">Contact Email</p>
                <input
                  type="text"
                  className="w-full text-black border-red-400"
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
                className="cursor-pointer border-2 py-2 rounded-lg text-center"
              >
                <p> Add guest</p>
              </div>

              <div className="">
                {errorMessage.map((error) => (
                  <p>{error}</p>
                ))}
              </div>

              <input
                type="submit"
                value="Confirm"
                className="text-center border-2 rounded-lg cursor-pointer py-2 w-full"
              />
            </form>
          </div>
        </div>

        <img
          src="background2.jpg"
          className="absolute z-[-10] w-screen h-full object-cover"
        />
      </div>
    </div>
  );
}
