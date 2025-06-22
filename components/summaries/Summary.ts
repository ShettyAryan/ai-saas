import { getDbConnection } from "@/lib/db";

export async function getSummaryById(id: string) {
  try {
    const sql = await getDbConnection();
    const [summary] = await sql`SELECT 
    id, 
    user_id, 
    title, 
    original_file_url, 
    summary_text, 
    created_at, 
    updated_at, 
    status, 
    file_name, 
    LENGTH(summary_text) - LENGTH(REPLACE (summary_text, ' ', '')) + 1 as word_count  
    FROM pdf_summaries where id = ${id}`;
    return summary;
  } catch (error) {
    console.log("Error fetching summary by id", error);
    return null;
  }
}
