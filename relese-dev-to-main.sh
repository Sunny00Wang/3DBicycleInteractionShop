#!/bin/bash

set -e

echo "Current branch:"
git branch --show-current

if [ "$(git branch --show-current)" != "dev" ]; then
  echo "Error: Please run this script from dev branch."
  exit 1
fi

echo "Git status:"
git status

read -p "Commit message: " message

if [ -z "$message" ]; then
  echo "Error: commit message cannot be empty."
  exit 1
fi

git add .
git commit -m "$message"

git checkout main
git merge dev

git push origin main

git checkout dev

echo "Done. Changes merged to main, pushed, and switched back to dev."
