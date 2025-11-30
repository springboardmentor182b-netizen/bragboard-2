from src.database.mongodb import db

async def get_all_shoutouts():
    shoutouts = await db.shoutouts.find({}).to_list(500)

    # Add reactions to each shoutout
    for s in shoutouts:
        reactions = await db.reactions.find({"shoutoutId": str(s["_id"])}).to_list(500)
        s["reactions"] = reactions

    return shoutouts
