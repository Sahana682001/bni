import { useAuth0 } from "@auth0/auth0-react";
import { jwtDecode } from "jwt-decode";

export const useUserRole = () => {
  const { getIdTokenClaims } = useAuth0();

  const getRoles = async () => {
    const claims = await getIdTokenClaims();
    const decoded = jwtDecode(claims.__raw);
    console.log(claims.__raw); // Log the raw ID token
    return decoded["https://dev-60d5b8n8v2gcn4ol.us.auth0.com/"] || [];
  };

  return { getRoles };
};
