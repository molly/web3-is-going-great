import { Request, Response } from "express";
import { db } from "./config/firebase";

const getAllEntries = (req: Request, res: Response) => {
  const ref = db.ref("/");
  ref.on(
    "value",
    (snapshot) => {
      res.status(200).json(snapshot.val());
    },
    (error) => {
      res.status(500).json(error);
    }
  );
};

export { getAllEntries };
