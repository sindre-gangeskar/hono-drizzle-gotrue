import db from "../../db/db";
import { createAndThrowHttpError } from "../../helpers/utils";

const invalidCredentials: string = "Invalid credentials";
const invalidCredentialsError: string = "INVALID_CREDENTIALS";

async function login(email: string, password: string) {
	try {
		const user = await db.query.users.findFirst({ where: { email } });
		if (!user)
			return createAndThrowHttpError(
				invalidCredentials,
				400,
				invalidCredentialsError,
			);

		const validatedPassword = Bun.password.verifySync(password, user?.password);
		if (!validatedPassword)
			return createAndThrowHttpError(
				invalidCredentials,
				400,
				invalidCredentialsError,
			);
		return user;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export { login };
