import excuteQuery from "../../lib/db";

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
              var DBquery =
                "insert into `guest-list` (firstName, lastName, email, notes, attending) values ('" +
                JSONdata.mainGuest.firstName +
                "', '" +
                JSONdata.mainGuest.lastName +
                "', '" +
                JSONdata.contactEmail +
                "', '" +
                JSONdata.mainGuest.notes +
                "', '" +
                JSONdata.attending +
                "');";
              var DBresponse = await excuteQuery({
                query: DBquery,
              });

              if (DBresponse.error == undefined) {
                result.status = "success";
                result.message = "results have been recorded";
              } else {
                result.status = "failed";
                result.message = "something went wrong at db";
              }

              var testString = "";
              // Additional Guests
              if (JSONdata.additionalGuests.length != 0) {
                testString = "in 1";

                for (var i = 0; i < JSONdata.additionalGuests.length; i++) {
                  testString = "in 2";
                  DBquery =
                    "insert into `guest-list` (firstName, lastName, email, notes, attending) values ('" +
                    JSONdata.additionalGuests[i].firstName +
                    "', '" +
                    JSONdata.additionalGuests[i].lastName +
                    "', '" +
                    JSONdata.contactEmail +
                    "', '" +
                    JSONdata.additionalGuests[i].notes +
                    "', '" +
                    JSONdata.attending +
                    "');";
                  DBresponse = await excuteQuery({
                    query: DBquery,
                  });

                  if (DBresponse.error == undefined) {
                    result.status = "success";
                    result.message = "results have been recorded";
                  } else {
                    result.status = "failed";
                    result.message = "something went wrong at db";
                  }
                }
              }

              //   to do
              // check if firstName, lastName, and email exist
              // update edditedAt time
              // insert additional guest entries --> DOING
              // strip spaces before API call
              // admin page
              // how to send link
              // firebase switch over or find online MySql server
              // popup to string ---> DONE

              result.DBresponse = JSON.stringify(DBresponse);
              result.test = JSON.stringify(
                JSONdata.additionalGuests[0].firstName
              );
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
