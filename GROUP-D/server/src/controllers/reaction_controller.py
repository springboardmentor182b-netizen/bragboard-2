from src.database.mongodb import db

async def add_reaction(shoutoutId, userId, reactionType):
    await db.reactions.delete_one({"shoutoutId": shoutoutId, "userId": userId})
    reaction = {"shoutoutId": shoutoutId, "userId": userId, "reactionType": reactionType}
    await db.reactions.insert_one(reaction)
    return {"message": "Reaction updated"}

async def remove_reaction(shoutoutId, userId):
    await db.reactions.delete_one({"shoutoutId": shoutoutId, "userId": userId})
    return {"message": "Reaction removed"}
