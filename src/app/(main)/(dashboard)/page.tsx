import { authCheckService } from "@/features/authentication/server/service/auth-check-service";


export default async function Home() {

  await authCheckService()

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">Drumbeat your dreams</h1>
    </div>
  );
}
