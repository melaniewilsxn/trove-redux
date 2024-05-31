#!/usr/bin/env bash

# Install system dependencies
apt-get update && apt-get install -y libpq-dev

# Install Python dependencies
pip install -r requirements.txt

# Install Node.js dependencies and build the frontend
npm install --prefix client && npm run build --prefix client