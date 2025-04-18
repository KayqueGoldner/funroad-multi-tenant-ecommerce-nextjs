import configPromise from "@payload-config";
import { getPayload } from "payload";

const Home = async () => {
  const payload = await getPayload({ config: configPromise });
  const data = await payload.find({ collection: "categories" });

  return <div>{JSON.stringify(data, null, 2)}</div>;
};

export default Home;
