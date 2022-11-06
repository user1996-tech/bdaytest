import excuteQuery from "../../lib/db";

export default async (req, res) => {
  try {
    console.log("req nom", req.body);
    const result = await excuteQuery({
      query: "select * from `guest-list`;",
    });
    console.log("tt", result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
