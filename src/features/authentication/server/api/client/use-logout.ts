import { client } from "@/lib/hono-rpc";
import { QueryClient, useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


type ResponseType = InferResponseType<typeof client.api.auth.logout['$delete']>;

async function logout(): Promise<ResponseType> {
      const response = await client.api.auth.logout["$delete"]();
      
      if (response.ok) {
            return await response.json();
      } else {
            throw new Error((await response.json()).error);
      }
}

function onSuccess(queryClient: QueryClient, router: AppRouterInstance) {
      toast.success(`See you soon`);
      queryClient.invalidateQueries({ queryKey: ['auth/current'] });
      router.refresh();
}

function onError(error:Error, queryClient: QueryClient) {
      queryClient.invalidateQueries({ queryKey: ['auth/current'] });
      toast.error(error.message);
}

export function useLogout(): UseMutationResult<ResponseType, Error, null> {
      const router = useRouter();
      const queryClient = useQueryClient();
      const mutation = useMutation<ResponseType, Error, null>({
            mutationKey: ["logout"],
            mutationFn: logout,
            onSuccess: () => onSuccess(queryClient, router),
            onError: (error) => onError(error, queryClient)
      });
      return mutation;
}