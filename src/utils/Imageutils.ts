// ==================================================
// Assets
// ==================================================
import { AvatarImg } from "#theme/Images";

export const getProfileImage = (file: any) => {
  if (file && typeof file == "string") return file;
  if (file && typeof file == "object" && file.uri) return file.uri;

  return AvatarImg;
};
