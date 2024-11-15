import { JwtPayload, jwtDecode } from "jwt-decode";

class AuthService {
	getProfile() {
		// return the decoded token
		const token = this.getToken() || "";
		const decoded: JwtPayload = jwtDecode(token);

		return decoded;
	}

	loggedIn() {
		// return a value that indicates if the user is logged in
		const token = this.getToken();
		if (!token || token == "") return false;
		return true;
	}

	isTokenExpired(token: string) {
		// TODO: return a value that indicates if the token is expired
		const decoded: JwtPayload = jwtDecode(token);
		console.log("Decoded:", decoded);
	}

	getToken(): string {
		// return the token
		try {
			const token = localStorage.getItem("auth_token") as string;
			return token;
		} catch (error) {
			console.error("Could not find authentication token");
			return "";
		}
	}

	login(idToken: string) {
		// set the token to localStorage
		localStorage.setItem("auth_token", idToken);
		// redirect to the home page
		window.open("/", "_self");
	}

	logout() {
		// remove the token from localStorage
		localStorage.removeItem("auth_token");
		// redirect to the login page
		window.open("/login", "_self");
	}
}

export default new AuthService();
