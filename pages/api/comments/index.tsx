import clientPromise from "../../../utils/mongodb";
import {
  Collection,
  Db,
  FindCursor,
  InsertOneResult,
  ModifyResult,
  MongoClient,
  ObjectId,
} from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { CommentType } from "../../../types/Comment";

type voteProps = {
  id: string;
  vote: number;
  modifyingVote: number;
  path: string;
  email: string;
};

type commentProps = {
  title: string;
  comment: string;
  rating: number;
  path: string;
  user: string;
};

//TODO Add secret key to prevent unauthorized access
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  // const body: voteProps | commentProps = req.body;
  // console.log(body);
  if (req.method === "POST") {
    const body: commentProps = req.body;
    const client: MongoClient = await clientPromise;
    if (!body) {
      return res.status(400).json({ error: "Bad request (No body)" });
    }
    if (
      !body.title ||
      !body.comment ||
      // (typeof body.rating !== 'number' && body.rating !== NaN) ||
      body.rating < 0 ||
      body.rating > 5 ||
      !body.path ||
      !body.user
    ) {
      return res.status(400).json({ error: "Bad request (Missing fields)" });
    }

    try {
      const db: Db = client.db("Climbing-crags");
      const commentsCollection: Collection = db.collection("comments");
      const commentInsertion: InsertOneResult =
        await commentsCollection.insertOne({
          ...body,
          comment_rating: 0,
          id: body.path.split("/")[2],
        });
      return res.status(200).json(commentInsertion);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else if (req.method === "GET") {
    const body: commentProps = req.body;
    const client: MongoClient = await clientPromise;
    try {
      const db: Db = client.db("Climbing-crags");
      const commentsCollection: Collection<CommentType> =
        db.collection("comments");
      const commentsCursor: FindCursor<CommentType> =
        await commentsCollection.find({
          path: body.path,
        });
      const comments: CommentType[] = await commentsCursor.toArray();
      return res.status(200).json(comments);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else if (req.method === "PUT") {
    const body: voteProps = req.body;

    const client: MongoClient = await clientPromise;
    if (!body) {
      return res.status(400).json({ error: "Bad request (No body)" });
    }
    if (
      !body.id ||
      (typeof body.modifyingVote !== "number" && body.modifyingVote !== NaN) ||
      (typeof body.vote !== "number" && body.vote !== NaN) ||
      !body.path ||
      !body.email
    ) {
      return res.status(400).json({ error: "Bad request (Missing fields)" });
    }
    try {
      const email: string = body.email;
      const db: Db = client.db("Climbing-crags");
      const commentsCollection: Collection = db.collection("comments");
      const commentsCursor: ModifyResult =
        await commentsCollection.findOneAndUpdate(
          { _id: new ObjectId(body.id) },
          {
            $inc: { comment_rating: body.modifyingVote },
            $set: {
              votes: {
                [`${email}`]: body.vote,
              },
            },
          }
        );
      return res.status(200).json(commentsCursor);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(400).json({ error: "Bad request (Wrong method)" });
}
