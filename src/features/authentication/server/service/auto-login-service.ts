import { redirect } from "next/navigation"
import { currentUserService } from "./current-user-service"

export const autoLoginService = async (): Promise<void> => { 
      const user = await currentUserService()
      if (user) { redirect("/") }
}