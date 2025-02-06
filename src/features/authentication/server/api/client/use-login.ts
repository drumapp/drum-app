import { client } from "@/lib/hono-rpc";
import { QueryClient, useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type RequestType = InferRequestType<typeof client.api.auth.login['$post']>;
type ResponseType = InferResponseType<typeof client.api.auth.login['$post']>;

async function login(json:RequestType): Promise<ResponseType> {
      const response = await client.api.auth.login["$post"](json);
      
      if (response.ok) {
            return await response.json();
      } else {
            throw new Error((await response.json()).error);
      }
}

function onSuccess(response:ResponseType, queryClient: QueryClient, router: AppRouterInstance) {
      toast.success(`Welcome back ${response.data?.name}`);
      queryClient.invalidateQueries({ queryKey: ['auth/current'] });
      router.refresh();
}

function onError(error:Error, queryClient: QueryClient) {
      queryClient.invalidateQueries({ queryKey: ['auth/current'] });
      toast.error(error.message);
}

export function useLogin(): UseMutationResult<ResponseType, Error, RequestType> {
      const router = useRouter();
      const queryClient = useQueryClient();
      const mutation = useMutation<ResponseType, Error, RequestType>({
            mutationKey: ["login"],
            mutationFn: login,
            onSuccess: (response) => onSuccess(response, queryClient, router),
            onError: (error) => onError(error, queryClient)
      });
      return mutation;
}