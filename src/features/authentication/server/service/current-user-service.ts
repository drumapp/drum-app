import { createSessionClient } from "@/lib/appwrite";
import { Models } from "node-appwrite";

export const currentUserService = async (): Promise<Models.User<Models.Preferences> | null> => {
      try {
          const sessionClient = await createSessionClient();
          const user = sessionClient?.user;
          return !!user ? user : null;
      } catch (error) {
          console.error('Failed to get current user:', error);
          return null;
      }
};