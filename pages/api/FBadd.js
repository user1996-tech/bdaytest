import { app, db } from "../../firebase/clientApp";
import { useCollection } from "react-firebase-hooks/firestore";
import { getFirestore, collection } from "firebase/firestore";
import { set } from "react-hook-form";

// const addGuest = async (guest) => {
//   await db.collection("votes").doc().set(guest);
// };

export default async (req, res) => {
  try {
    var result = {};

    if (req.method) {
      const JSONdata = req.body;

      result.status = "fail";
      result.message = "";

      if (JSONdata.attending != "Y" || JSONdata.attending != "N") {
        if (JSONdata.contactEmail != "") {
          if (JSONdata.mainGuest.firstName != "") {
            if (JSONdata.mainGuest.lastName != "") {
              // Main Guest
              //   const testData = addGuest(JSONdata.mainGuest);
              const testData = db
                .collection("votes")
                .doc()
                .set(JSONdata.mainGuest);

              result.test = JSON.stringify(testData);
              result.test2 = testString;
            } else {
              result.message = "MAINGUEST LASTNAME error";
            }
          } else {
            result.message = "MAINGUEST FIRSTNAME error";
          }
        } else {
          result.message = "CONTACTEMAIL error";
        }
      } else {
        result.message = "ATTENDING error";
      }
    } else {
      result.status = "fail";
      result.message = "use post method";
    }
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
