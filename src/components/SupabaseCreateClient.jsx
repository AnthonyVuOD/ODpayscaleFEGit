import { createClient } from "@supabase/supabase-js"

export function SupabaseCreateClient(){

    const supabase = createClient(
        'https://tsrrewcbkzocevvrlsih.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzcnJld2Nia3pvY2V2dnJsc2loIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5MDMzNjksImV4cCI6MjAxNzQ3OTM2OX0.H3QUkTtGrRxO1OvDE9kU49sILeYydS1zGdZnXZ-P29o'
    )
    

    return (
        supabase
    )

}