import {
  RegistrationService,
  LoginService,
  ProfileReadService,
  ProfileUpdateService,
} from "../services/studentService.js";

export const Registration = async (req, res) => {
  let result = await RegistrationService(req);
  return res.json(result);
};

export const Login = async (req, res) => {
  let result = await LoginService(req, res);
  return res.json(result);
};

export const ProfileRead = async (req, res) => {
  let result = await ProfileReadService(req);
  return res.json(result);
};
export const ProfileUpdate = async (req, res) => {
  let result = await ProfileUpdateService(req);
  return res.json(result);
};
