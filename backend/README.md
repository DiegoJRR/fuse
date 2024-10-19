# Backend

## API
Written with FastAPI, under `/api`

## Walrus integration
We're using public publishers and aggregators, and our implementation is in `/walrus`

## Local development
Create a Python virtual environment with

`python -m venv .venv`

and activate it

`source .venv/bin/activate`

install dependencies

`pip install -r requirements.txt`

and to run the api in development mode

`fastapi dev api/main.py`


