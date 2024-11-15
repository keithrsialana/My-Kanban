import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
	username: string;
}

/**
 * 
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
	const authArray = req.headers.authorization?.split(" ");
	// if token isn't found, return with error
	if (!authArray) return res.status(401).json({ message: "Token not found" });

	// if found, assign token from array
	const token = authArray[1];

	// validate token (somehow)
	const secret = process.env.JWT_SECRET_KEY as string;
	if (!secret || secret == "")
		return res
			.status(500)
			.json({ message: "Server did not respond as expected" });

	try {
		const decoded:JwtPayload = jwt.verify(token, secret) as JwtPayload;
		// if token is valid, do next()
		if(!decoded.username)
			return res.status(500).json({message:"Could not find username in token"});
		req.user = decoded;
		next();
	} catch (error: any) {
		// if not, return error
		return res;
	}

	return res;
};
