# Backend
Written with FastAPI

## Walrus integration
We're using public publishers and aggregators, and our implementation is in `/internal/walrus.py`

## Local development
Create a Python virtual environment with

`python -m venv .venv`

and activate it

`source .venv/bin/activate`

install dependencies

`pip install -r requirements.txt`

and to run the api in development mode from the `backend` folder

`fastapi dev main.py`


