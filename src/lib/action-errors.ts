import { IActionResponse} from "./interfaces";
import { z } from "zod";
import { IAppwriteError } from "./appwrite";


function isAppwriteError(error: unknown): error is IAppwriteError {
      return (typeof error === 'object' && error !== null && 'response' in error)
}


export function handleActionError(error: unknown): IActionResponse<null> {
      let response: IActionResponse<null>;
      if (error instanceof z.ZodError) {
            response = { success: false, error: error.message };
            return response;
      }
      if (isAppwriteError(error) && error.response?.code) {

            switch (error.response.code) {
                  case 400:
                        return { success: false, error: 'Mauvaise requête. Veuillez vérifier votre saisie.' };
                  case 401:
                        return { success: false, error: 'Non autorisé. Veuillez vérifier vos identifiants.' };
                  case 403:
                        return { success: false, error: 'Interdit. Vous n\'avez pas la permission d\'accéder à cette ressource.' };
                  case 404:
                        return { success: false, error: 'Ressource non trouvée.' };
                  case 409:
                        return { success: false, error: 'Conflit. La ressource existe déjà.' };
                  case 429:
                        return { success: false, error: 'Trop de tentatives de connexion. Veuillez réessayer plus tard.' };
                  case 500:
                        return { success: false, error: 'Erreur interne du serveur. Veuillez réessayer plus tard.' };
                  case 503:
                        return { success: false, error: 'Service indisponible. Veuillez réessayer plus tard.' };
                  default:
                        return { success: false, error: 'Une erreur inconnue est survenue.' };
            }
      }
      response = { success: false, error: 'Une erreur inconnue est survenue.' };
      if (error instanceof Error) { response.error = error.message; }
      return response;
}