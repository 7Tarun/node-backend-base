import { sign } from "jsonwebtoken";

export function GenerateToken(data: any, expireIn: any = undefined) {
  let { JWT_SECRET_KEY } = process.env;

  return new Promise((resolve) => {
    if (expireIn) {
      let token = sign(data, String(JWT_SECRET_KEY), { expiresIn: expireIn });
      resolve(token);
    } else {
      let token = sign(data, String(JWT_SECRET_KEY));
      resolve(token);
    }
  });
}
