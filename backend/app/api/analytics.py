from fastapi import APIRouter
from datetime import datetime
from typing import Dict, Any

router = APIRouter()

data = {
    "views": [],
    "searches": [],
    "chats": []
}

@router.post("/analytics/track")
async def track_event(event: Dict[str, Any]):
    type = event.get("type", "unknown")
    if type == "view":
        data["views"].append({
            "time": datetime.now().isoformat(),
            "doc": event.get("doc", ""),
            "user": "anonymous"
        })
    elif type == "search":
        data["searches"].append({
            "time": datetime.now().isoformat(),
            "query": event.get("query", ""),
            "results": event.get("count", 0)
        })
    elif type == "chat":
        data["chats"].append({
            "time": datetime.now().isoformat(),
            "msg": event.get("message", "")[:50]
        })

    return {"status": "ok", "message": "Event tracked"}

@router.get("/analytics/stats")
async def get_stats():
    result = {}
    result["total_views"] = len(data["views"])
    result["total_searches"] = len(data["searches"])
    result["total_chats"] = len(data["chats"])

    temp = {}
    for x in data["views"]:
        doc = x.get("doc", "unknown")
        if doc in temp:
            temp[doc] += 1
        else:
            temp[doc] = 1

    result["popular_docs"] = sorted(temp.items(), key=lambda x: x[1], reverse=True)[:5]

    searches = [x.get("query", "") for x in data["searches"][-10:]]
    result["recent_searches"] = searches

    return result