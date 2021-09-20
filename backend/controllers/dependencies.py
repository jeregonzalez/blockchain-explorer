async def pagination_params(page: int = 1, offset: int = 10):
    """
    Pagination params using page and offset
    """
    return {
        'page': page,
        'offset': offset
    }
