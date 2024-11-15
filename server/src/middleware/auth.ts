import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
	username: string;
}

/**
 * Takes the token from the body of the request and attempts to verify the authentication using jwt.
 * @param {Request} req:Request
 * @param {Response} res:Response
 * @param {NextFunction} next:NextFunction - signals the middleware to go to the next route function
 * @returns {Response}
 */
export const authenticateToken = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// verify the token exists and add the user data to the request object
	const { token } = req.body;
	if (!token)
		return res
			.status(401)
			.json({ message: "Could not find authentication token" });

	let decoded = {} as JwtPayload;
	try {
		const secret = process.env.JWT_SECRET_KEY as string;
		if (!secret || secret == '')
			return res.status(500).json({message:"Something went wrong"});
		decoded = jwt.verify(token, secret) as JwtPayload;
	} catch (error) {
		console.error("jwt could not verify a token:", error);
	}

	if (decoded.username) req.body.username = decoded.username;
	next();

	return res
		.status(500)
		.json({
			message:
				"Something went wrong with trying to authenticate your credentials",
		});
};
