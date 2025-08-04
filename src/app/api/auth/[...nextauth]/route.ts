// MODIFICAR: c:\Users\Lian Li\Desktop\FrontEnd_Solcial\solcial\src\app\api\auth\[...nextauth]\route.ts

import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };