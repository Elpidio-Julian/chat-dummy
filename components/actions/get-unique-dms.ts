// SELECT DISTINCT sender_id
// FROM direct_messages
// WHERE recipient_id = $1;

// implement an action which queries the supabase
// direct_messages table for all unique sender_ids which have a recipient_id matching a given user_id