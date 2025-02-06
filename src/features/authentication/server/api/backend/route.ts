import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import { SignInFormSchema, SignUpFormSchema } from "@/features/authentication/lib/schemas";
import { createAdminClient } from "@/lib/appwrite";
import { deleteCookie, setCookie } from 'hono/cookie'
import { auth_cookie, auth_cookie_option } from "@/configuration";
import { IAPICurrentResponseData, IAPILoginResponseData, IAPIRegisterResponseData } from "@/features/authentication/lib/interfaces";
import { IAPIResponse } from "@/lib/interfaces";
import { StatusCodes } from "http-status-codes";
import { handleAPIError } from "@/lib/api-errors";
import { ID } from "node-appwrite";
import { sessionMiddleware } from "@/features/authentication/middleware/session-middleware";


const authAPI = new Hono()
      .get('/current', sessionMiddleware, async (context) => {
            try {
                  // Acquisition
                  const user = context.get("user");

                  // Handling
                  const responseData: IAPICurrentResponseData = { id: user.$id, name: user.name, email: user.email, tenantId: user.prefs.tenantId }

                  //Response
                  const response: IAPIResponse<IAPICurrentResponseData> = { success: true, error: undefined, data: responseData }
                  return context.json(response, StatusCodes.OK)

            } catch (error) {
                  //Error Handling
                  console.error('[GET /auth/current] Error:', error)
                  return handleAPIError(error, context)
            }
      })
      .post("/login", zValidator("json", SignInFormSchema), async (context) => {
            try {
                  // Acquisition
                  const { email, password } = context.req.valid('json');
                  const { account, users } = await createAdminClient();

                  // Handling
                  const session = await account.createEmailPasswordSession(email, password)
                  setCookie(context, auth_cookie, session.secret, { ...auth_cookie_option, })
                  const user = await users.get(session.userId);
                  const responseData: IAPILoginResponseData = { id: user.$id, name: user.name }

                  // Response
                  const response: IAPIResponse<IAPILoginResponseData> = { success: true, error: undefined, data: responseData }
                  return context.json(response, StatusCodes.OK)

            } catch (error) {
                  // Handle Error
                  console.error('[POST /auth/login] Error:', error)
                  return handleAPIError(error, context)
            }
      })
      .post("/register", zValidator("json", SignUpFormSchema), async (context) => {
            try {
                  // Acquisition
                  const { name, email, password, tenantId } = context.req.valid('json');
                  const { account, users } = await createAdminClient();

                  // Handling
                  const user = await account.create(ID.unique(), email, password, name)
                  await users.updatePrefs(user.$id,{tenantId: tenantId})
                  const session = await account.createEmailPasswordSession(email, password)
                  setCookie(context, auth_cookie, session.secret, { ...auth_cookie_option, })
                  const responseData: IAPIRegisterResponseData = { id: user.$id, name: user.name }

                  // Response
                  const response: IAPIResponse<IAPIRegisterResponseData> = { success: true, error: undefined, data: responseData }
                  return context.json(response, StatusCodes.OK)

            } catch (error) {
                  // Handle Error
                  console.error('[POST /auth/register] Error:', error)
                  return handleAPIError(error, context)
            }
      })
      .delete('/logout', sessionMiddleware, async (context) => {
            try {
                  // Acquisition
                  const account = context.get("account");

                  // Handling
                  deleteCookie(context, auth_cookie, { path: '/', });
                  await account.deleteSession('current');

                  // Response
                  const response: IAPIResponse<null> = { success: true, error: undefined, data: undefined }
                  return context.json(response, StatusCodes.OK)

            } catch (error) {
                  //Error Handling
                  console.error('[POST /auth/logout] Error:', error)
                  return handleAPIError(error, context)
            }
      })


export default authAPI;