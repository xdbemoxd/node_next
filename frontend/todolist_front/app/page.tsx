import { auth } from "@/auth";

import AuthForms from "./optionClient/page";


export default async function Home() {

  const session = await auth()

  if (session?.user === undefined) {
    return(
      <div>

        <AuthForms/>
        
      </div>
    )
  }
}