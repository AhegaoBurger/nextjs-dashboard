import AccountForm from './account-form'
import { createClient } from '@/utils/supabase/server'
import Image from "next/image"

export default async function Account() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
	<main className='flex '>
		<AccountForm user={user} />
	</main>
  )
  
}