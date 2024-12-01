FROM python:3.9-slim

WORKDIR /app

COPY requirement.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

CMD ["python", "comsumer.py"]