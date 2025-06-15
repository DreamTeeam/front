
import axios from "axios";

export async function logout() {
  await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
    {},
    { withCredentials: true }
  );
}
