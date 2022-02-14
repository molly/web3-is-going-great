import { getBytes, ref } from "firebase/storage";
import { storage } from "../db/db";

const Feed = () => null;

export const getServerSideProps = async ({ res }) => {
  const fileRef = ref(storage, "static/rss.xml");
  try {
    res.setHeader("Content-Type", "application/atom+xml;charset=UTF-8");
    const bytes = await getBytes(fileRef);
    res.write(bytes);
    res.end();
  } catch (e) {
    res.status = 500;
    res.end();
  }
  return { props: {} };
};

export default Feed;
