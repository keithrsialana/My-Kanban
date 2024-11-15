import { Router, Request, Response } from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response) => {
	// If the user exists and the password is correct, return a JWT token
	const { username, password } = req.body;

	if (username) {
		// get user from database
		await User.findOne({
			where: {
				username: username,
			},
		})
			.then(async (user: any) => {
				// compare passwords using bcrypt
				const result: boolean = await bcrypt.compare(password, user.password);
				if (result) {
					// return JWT token
					const secret = process.env.JWT_SECRET_KEY as string;
					if (!secret || secret == "")
						return res.status(500).json({ message: "Something went wrong" });
					const payload = { username: username };
					const newToken = jwt.sign(payload, secret, { expiresIn: "1h" });
					return res.status(200).json({ token: newToken });
				}
				// return nothing
				return res.status(401).json({ message: "Invalid credentials" });
			})
			.catch((_error) => {
				console.log("Could not find user", username);
			});
		// return res.status(500).json({message: "Server did not respond expectedly"});
	}
	// else return error
	// return res.status(500).json({message: "Something went wrong with trying to authenticate your credentials"});
};

const router = Router();

// POST /login - Login a user
router.post("/login", login);

export default router;
