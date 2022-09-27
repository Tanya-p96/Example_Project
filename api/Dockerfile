FROM python
ADD . /app
RUN cd app && pip install -r requirements.txt
WORKDIR /app
CMD FLASK_APP=server.py flask run --host 0.0.0.0