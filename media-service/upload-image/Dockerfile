# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install -r requirement.txt

# Make port 5000 available to the world outside this container
EXPOSE 8000

# Define environment variable to avoid buffering of logs
ENV PYTHONUNBUFFERED 1

# Run run.py when the container launches
CMD ["python", "entrypoint.py"]