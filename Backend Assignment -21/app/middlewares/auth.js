import { TokenDecode } from "../utilities/tokenUtility.js";

export default (req, res, next) => {
  let token = req.cookies["Token"];
  let decoded = TokenDecode(token);

  if (decoded === null) {
    res.status(401).json({ status: "Fail", message: "Unauthorized!" });
  } else {
    // Set cookie for refresh token
    let options = {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };
    res.cookie("Token", decoded.RefreshToken, options);
    let email = decoded.email;

    req.headers.email = email;

    next();
  }
};
