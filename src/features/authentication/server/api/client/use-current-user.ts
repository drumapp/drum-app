import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { client } from "@/lib/hono-rpc";
import { InferResponseType } from 'hono';

type ResponseType = InferResponseType<typeof client.api.auth.current['$get']>;

async function fetchCurrentUser(): Promise<ResponseType> {
      const response = await client.api.auth.current.$get();
      if (response.ok) {
            return await response.json();
      } else {
            throw new Error((await response.json()).error);
      }
}

export function useCurrentUser(): UseQueryResult<ResponseType, Error> {
      const query = useQuery<ResponseType>({
            queryKey: ["auth/current"],
            queryFn: fetchCurrentUser,
      });
      return query;
}