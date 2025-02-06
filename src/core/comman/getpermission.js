import { jwtDecode } from 'jwt-decode';
export const getPermissionFromToken = () => {
    const token = localStorage.getItem('$2b$10$ehdPSDmr6P');
    if (!token) {
        return null;
    }
    try {
        const decodedToken = jwtDecode(token);
        return decodedToken?.permission;
    } catch (error) {
        console.error('Invalid token', error);
        return null;
    }
  };