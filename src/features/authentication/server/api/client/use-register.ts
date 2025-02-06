import { client } from "@/lib/hono-rpc";
import { QueryClient, useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type RequestType = InferRequestType<typeof client.api.auth.register['$post']>;
type ResponseType = InferResponseType<typeof client.api.auth.register['$post']>;

async function register(json:RequestType): Promise<ResponseType> {
      const response = await client.api.auth.register['$post'](json);
      if (response.ok) {
            return await response.json();
      } else {
            throw new Error((await response.json()).error);
      }
}

function onSuccess(response:ResponseType, queryClient: QueryClient, router: AppRouterInstance) {
      toast.success(`Welcome aboard ${response.data?.name}`);
      queryClient.invalidateQueries({ queryKey: ['auth/current'] });
      router.refresh();
}

function onError(error:Error, queryClient: QueryClient) {
      queryClient.invalidateQueries({ queryKey: ['auth/current'] });
      toast.error(error.message);
}

export function useRegister(): UseMutationResult<ResponseType, Error, RequestType> {
      const router = useRouter()
      const queryClient = useQueryClient();
      const mutation = useMutation<ResponseType,Error,RequestType>({
            mutationKey: ["register"],
            mutationFn: register,
            onSuccess: (response) => onSuccess(response, queryClient, router),
            onError: (error) => onError(error, queryClient)
      })
      return mutation
}