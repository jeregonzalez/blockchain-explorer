import uvicorn
from fastapi import FastAPI

from backend import controllers
from backend.core.config import APP_NAME, APP_VERSION, DEBUG
from backend.core.containers import Container
from backend.routes import api_router


def create_app() -> FastAPI:
    config = {
        'title': APP_NAME,
        'version': APP_VERSION,
        'debug': DEBUG,
        'openapi_url': '/openapi.json' if DEBUG else None
    }

    fast_app = FastAPI(**config)

    # Initialize DI container
    container = Container()
    container.wire(modules=[controllers])
    fast_app.container = container

    # Initialize api routes
    fast_app.include_router(api_router)

    return fast_app


app = create_app()

if __name__ == '__main__':
    uvicorn.run('backend.main:backend', host='0.0.0.0', port=8000, reload=True)
