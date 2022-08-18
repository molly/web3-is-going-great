import { getMetadata } from "../../db/metadata";

export default async function handler(req, res) {
  const metadata = await getMetadata();
  res.status(200).json({ total: metadata.griftTotal });
}
