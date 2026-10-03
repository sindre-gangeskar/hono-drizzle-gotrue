import db from "../../db/db";
import { createAndThrowHttpError } from "../../helpers/utils";

const invalidCredentials: string = "Invalid credentials";
const invalidCredentialsError: string = "INVALID_CREDENTIALS";

async function login(email: string, password: string) {
	try {
		const user = await db.query.users.findFirst({ where: { email } });
		if (!user)
			return createAndThrowHttpError({
				message: invalidCredentials,
				statusCode: 400,
				name: invalidCredentialsError,
			});

		const validatedPassword = Bun.password.verifySync(password, user?.password);
		if (!validatedPassword)
			return createAndThrowHttpError({
				message: invalidCredentials,
				statusCode: 400,
				name: invalidCredentialsError,
			});
		return user;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export { login };
