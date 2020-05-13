import { connect } from "mongoose";

export default async () => {
  console.log("connecting");
  const mongodb =
    "mongodb+srv://haibinDB:asdfghjkl@cluster0-1nbca.azure.mongodb.net/test?retryWrites=true&w=majority";

  return connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "user",
  })
    .then(() => {
      console.log("connect success");
    })
    .catch((e) => console.log("connect fail", e));
};
