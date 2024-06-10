// import { from } from "rxjs";
// import { SignAuthPayload } from "./sign.auth.model";

//  async function getSHA256Hash(str:SignAuthPayload) {
//   const buf = new TextEncoder().encode(str.login + str.password);
//   const digest = await crypto.subtle.digest('SHA-256', buf);
//   return Array.from(new Uint8Array(digest))
//     .map(b => b.toString(16).padStart(2, '0'))
//     .join('');
// }


// export const getSHA256 = (str:SignAuthPayload) => from(getSHA256Hash(str))
