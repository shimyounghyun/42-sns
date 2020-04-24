import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const createJWT = (id: number): string => {
  const token = jwt.sign(
    {
      id,
    },
    process.env.JWT_TOKEN || ""
  );
  return token;
};

export default createJWT;
