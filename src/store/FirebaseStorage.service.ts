import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { FIREBASE_STORAGE } from "#config/Firebase.config";

/**
 *
 * @param {string} uid: User's uid
 * @param {string} imageUri: Selected image uri on the user's phone
 * @returns {Promise<string>}: Download URL for the stored image
 */
export async function uploadAvatarImage(
  uid: string,
  imageUri: string
): Promise<string> {
  const blob: Blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
      resolve(xhr.response);
    };

    xhr.onerror = function () {
      reject(new TypeError("Network request failed"));
    };

    xhr.responseType = "blob";
    xhr.open("GET", imageUri, true);
    xhr.send(null);
  });

  const avatarRef = ref(FIREBASE_STORAGE, `avatars/${uid}.jpg`);
  await uploadBytes(avatarRef, blob);

  return await getDownloadURL(avatarRef);
}
