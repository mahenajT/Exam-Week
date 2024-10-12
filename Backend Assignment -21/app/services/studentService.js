import RegistrationModel from "../models/registration.js";
import { TokenEncode } from "../utilities/tokenUtility.js";
export const RegistrationService = async (req) => {
  try {
    let reqBody = req.body;
    let data = await RegistrationModel.create(reqBody);
    return { status: "success", data: data };
  } catch (err) {
    return { status: "Failed", message: err.toString() };
  }
};
export const LoginService = async (req, res) => {
  try {
    let reqBody = req.body;
    let data = await RegistrationModel.aggregate([
      { $match: reqBody },
      { $project: { _id: 1, email: 1 } },
    ]);
    if (data.length > 0) {
      let token = TokenEncode(data[0]["email"]);
      let options = {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      };
      res.cookie("Token", token, options);
      return { status: "success", token: token, data: data[0] };
    }
    return { status: "success" };
  } catch (err) {
    return { status: "Failed", message: err.toString() };
  }
};
export const ProfileReadService = async (req) => {
  try {
    let email = req.headers.email;
    let MatchStage = { $match: { email: email } };
    let ProjectionStage = {
      $project: { email: 1, fullName: 1, phoneNumber: 1 },
    };
    let data = await RegistrationModel.aggregate([MatchStage, ProjectionStage]);
    return { status: "success", data: data };
  } catch (err) {
    return { status: "Failed", message: err.toString() };
  }
};
export const ProfileUpdateService = async (req) => {
  try {
    let email = req.headers.email;
    let reqBody = req.body;
    let data = await RegistrationModel.updateOne(
      { email: email },
      { $set: reqBody }
    );
    return { status: "Success", data: data };
  } catch (err) {
    return { status: "Failed", message: err.toString() };
  }
};
