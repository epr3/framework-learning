FROM python:3
ENV PYTHONUNBUFFERED 1
RUN pip install pipenv
RUN mkdir /code
WORKDIR /code
COPY Pipfile* ./
RUN pipenv lock --requirements > requirements.txt
RUN pipenv lock --dev > requirements-dev.txt
RUN pip install -r requirements.txt
RUN pip install -r requirements-dev.txt
COPY . /code/
WORKDIR /code/src