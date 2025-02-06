import { redirect } from "next/navigation";
import { currentUserService } from "./current-user-service";


export const authCheckService = async (): Promise<void> => { 
      const user = await currentUserService()
      if (user == null) {
            redirect("/sign-in")
      }
}