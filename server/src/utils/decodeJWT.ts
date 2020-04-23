import dotenv from "dotenv";
import {} from "jsonwebtoken";
import jwt from "jsonwebtoken";
import User from "../entities/User";

dotenv.config();

const decodeJWT = async (token: string): Promise<User | undefined> => {
  try {
    // json web token을 해독함
    const decode: any = jwt.verify(token, process.env.JWT_TOKEN || "");

    // 해독한 정보에서 id를 가져옴
    const { id } = decode;

    const user = await User.findOne({ id });
    return user;
  } catch (error) {
    return undefined;
  }
};

export default decodeJWT;
