import { Context } from "hono";
import { IAPIResponse } from "./interfaces";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";
import { IAppwriteError } from "./appwrite";


function isAppwriteError(error: unknown): error is IAppwriteError {
      return (typeof error === 'object' && error !== null && 'response' in error)
}


export function handleAPIError(error: unknown, context: Context) {
      let response: IAPIResponse<null>;
      if (error instanceof z.ZodError) {
            response = { success: false, error: error.message };
            return context.json(response, StatusCodes.BAD_REQUEST);
      }
      if (isAppwriteError(error) && error.response?.code) {

            switch (error.response.code) {
                  case 400:
                        response = { success: false, error: 'Bad request. Please check your input.' };
                        return context.json(response, StatusCodes.BAD_REQUEST);
                  case 401:
                        response = { success: false, error: 'Unauthorized. Please check your credentials.' };
                        return context.json(response, StatusCodes.UNAUTHORIZED);
                  case 403:
                        response = { success: false, error: 'Forbidden. You do not have permission to access this resource.' };
                        return context.json(response, StatusCodes.FORBIDDEN);
                  case 404:
                        response = { success: false, error: 'Resource not found.' };
                        return context.json(response, StatusCodes.NOT_FOUND);
                  case 409:
                        response = { success: false, error: 'Conflict. The resource already exists.' };
                        return context.json(response, StatusCodes.CONFLICT);
                  case 429:
                        response = { success: false, error: 'Too many login attempts. Please try again later.' };
                        return context.json(response, StatusCodes.TOO_MANY_REQUESTS);
                  case 500:
                        response = { success: false, error: 'Internal server error. Please try again later.' };
                        return context.json(response, StatusCodes.INTERNAL_SERVER_ERROR);
                  case 503:
                        response = { success: false, error: 'Service unavailable. Please try again later.' };
                        return context.json(response, StatusCodes.SERVICE_UNAVAILABLE);
                  default:
                        response = { success: false, error: 'An unknown error has occurred.' };
                        return context.json(response, StatusCodes.INTERNAL_SERVER_ERROR);
            }
      }
      response = { success: false, error: 'An unknown error has occured.' };
      if (error instanceof Error) { response.error = error.message; }
      return context.json(response, StatusCodes.INTERNAL_SERVER_ERROR);
}