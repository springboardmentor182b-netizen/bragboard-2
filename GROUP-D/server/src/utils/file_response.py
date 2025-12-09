from fastapi.responses import Response
from datetime import datetime


def create_file_response(content: bytes, filename: str, mime_type: str = "application/octet-stream"):
    """
    Create response for file download.

    Args:
        content (bytes): file bytes
        filename (str): name of file
        mime_type (str): file MIME type

    Returns:
        Response: FastAPI response object
    """

    headers = {
        "Content-Disposition": f'attachment; filename="{filename}"',
        "X-Generated-Time": datetime.utcnow().isoformat()
    }

    return Response(content=content, media_type=mime_type, headers=headers)
