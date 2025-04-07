import ProxyForm from "./form";
import {  isAdminUser } from "@/user_auth/clerk_user_auth";

async function ProxyFormPage() {
  const isAdmin = await isAdminUser();

  return ( <div>
    {isAdmin ? <ProxyForm/>:<h1 className="text-center">Not Allowed</h1>}
    
  </div> );
}

export default ProxyFormPage;