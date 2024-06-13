from openai import OpenAI
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

with open("chatgpt/key.config") as f:
    key=f.readline()

class talkCreate(BaseModel):
    content: str
    model: str

class talkResponse(BaseModel):
    content: str


async def stream_request(req, model="gpt-3.5-turbo"):
    client = OpenAI(
        api_key=key
    )

    stream = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": req}],
        stream=True,
    )
    for chunk in stream:
        if chunk.choices[0].delta.content is not None:
            yield chunk.choices[0].delta["content"]

def normal_request(req, model="gpt-3.5-turbo"):
    client = OpenAI(
        api_key=key
    )
    ans=""
    stream = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": req}],
        stream=True,
    )
    for chunk in stream:
        if chunk.choices[0].delta.content is not None:
           ans+=chunk.choices[0].delta.content

    return ans

origins = [
    "http://localhost:3000",
    "http://localhost:80"
]

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/')
def reply(talk:talkCreate):
    a=normal_request(talk.content, talk.model)
    return a


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='127.0.0.1', port=8001)

