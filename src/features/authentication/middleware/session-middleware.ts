import { auth_cookie } from "@/configuration";
import { IAPIResponse } from "@/lib/interfaces";
import { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { StatusCodes } from "http-status-codes";
import { Account, Client, Databases, Models, Storage } from "node-appwrite";
import { type Account as AccountType, type Databases as DatabasesType, type Storage as StorageType, } from "node-appwrite";
import { IUserPreferences } from "../lib/interfaces";
type SessionContext = {
      Variables: {
            account: AccountType,
            databases: DatabasesType,
            storage: StorageType,
            user: Models.User<IUserPreferences>;
      };
};

async function middleware(context: Context, next: Next) {
      // Initialize the Appwrite client
      const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

      // Retrieve the session cookie
      const session = getCookie(context, auth_cookie);
      if (!session) {
            // Respond with 401 Unauthorized if no session is found
            const response: IAPIResponse<null> = { success: false, error: 'Authentication is needed' }
            return context.json(response, StatusCodes.UNAUTHORIZED)
      }

      // Set the session in the Appwrite client
      client.setSession(session);

      // Initialize Appwrite services
      const account = new Account(client);
      const databases = new Databases(client);
      const storage = new Storage(client);

      // Retrieve the authenticated user's details
      const user = await account.get<IUserPreferences>();

      // Add Appwrite services and user to the context
      context.set("account", account);
      context.set("databases", databases);
      context.set("storage", storage);
      context.set("user", user);

      // Pass control to the next middleware or handler
      await next();
}

// Export the middleware wrapped in a creator function
export const sessionMiddleware = createMiddleware<SessionContext>(middleware);