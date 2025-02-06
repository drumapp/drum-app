import { appwrite_api_key, appwrite_endpoint, appwrite_project, auth_cookie } from "@/configuration";
import { IUserPreferences } from "@/features/authentication/lib/interfaces";
import { cookies } from "next/headers";
import { Client, Account, Users, Databases, Storage, Models } from "node-appwrite";



export interface IAppwriteError extends Error {
      response?: {
            code?: number
      }
}


interface IAdminClientServices {
      account: Account
      users: Users
}

export async function createAdminClient(): Promise<IAdminClientServices> {
      const client = new Client()
            .setEndpoint(appwrite_endpoint)
            .setProject(appwrite_project)
            .setKey(appwrite_api_key);

      const account = new Account(client);
      const users = new Users(client)
      return { account, users }
}

export interface ISessionClientServices {
      account: Account,
      databases: Databases,
      storage: Storage,
      users: Users,
      user: Models.User<IUserPreferences>
}

export async function createSessionClient(): Promise<ISessionClientServices | null > {
      const client = new Client()
            .setEndpoint(appwrite_endpoint)
            .setProject(appwrite_project);

      const sessionCookie = await cookies();
      const session = sessionCookie.get(auth_cookie);
      if (!session || !session.value) {
            return null
      }
      client.setSession(session.value);

      return {
            account: new Account(client),
            databases: new Databases(client),
            storage: new Storage(client),
            users: new Users(client),
            user: await new Account(client).get()
      }
}