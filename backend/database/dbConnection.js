import mongoose from "mongoose";

export const dbConnection = async () => {
  mongoose
    .connect(
      "mongodb+srv://Hosbital:Hosbital@cluster0.7r6769n.mongodb.net/System-H"
    )
    .then(() => {
      console.log("DB Connect");
    })
    .catch((err) => {
      console.error("Some error occured while connecting to database:", err);
    });
};
