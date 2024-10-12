import jwt from "jsonwebtoken";
export const TokenEncode = (email) => {
  let KEY = "ABC-abc-123";
  let JWT_EXPIRES = 30 * 24 * 60 * 60;
  let JWT_PAYLOAD = { email };
  return jwt.sign(JWT_PAYLOAD, KEY, { expiresIn: JWT_EXPIRES });
};

export const TokenDecode = (token) => {
  try {
    let KEY = "ABC-abc-123";
    let JWT_EXPIRES = 30 * 24 * 60 * 60;
    let Decoded = jwt.verify(token, KEY);

    // Refresh Token
    if (!!Decoded.email === true) {
      let RefreshToken = jwt.sign({ email: Decoded.email }, KEY, {
        expiresIn: JWT_EXPIRES,
      });
      return { RefreshToken, email: Decoded.email };
    }
  } catch (error) {
    return null;
  }
};
