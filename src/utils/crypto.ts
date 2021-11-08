import { pbkdf2Sync, randomBytes } from "crypto";
import { generate } from "randomstring";

const cryptString = (password: string) => {
  const salt = randomBytes(16).toString("hex");
  return {
    salt,
    encoded: pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex")
  };
};

const verifyString = (sourcePassword: string, hash: string, salt: string) => {
  const tmpHash = pbkdf2Sync(sourcePassword, salt, 1000, 64, "sha512").toString("hex");

  return hash === tmpHash;
};

const generatedPassword = () => {
  return generate(8);
}

export const cryptUtils = {
  cryptString,
  verifyString,
  generatedPassword
};
