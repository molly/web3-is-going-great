import { getBytes, ref } from "firebase/storage";
import { staticStorage } from "../db/db";

const Feed = () => null;

export const getServerSideProps = async ({ res }) => {
  const fileRef = ref(staticStorage, "rss.xml");
  try {
    res.setHeader("Content-Type", "application/atom+xml;charset=UTF-8");
    const bytes = await getBytes(fileRef);
    const buffer = Buffer.from(bytes);
    res.write(buffer);
    res.end();
  } catch (e) {
    console.log(e);
    res.status = 500;
    res.end("Something went wrong.");
  }
  return { props: {} };
};

export default Feed;
