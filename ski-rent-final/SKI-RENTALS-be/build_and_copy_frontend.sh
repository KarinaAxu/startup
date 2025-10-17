#!/usr/bin/env bash
set -e
FRONTEND_DIR="../ski-rent-frontend"
DJANGO_ROOT="$(pwd)"
echo "Building frontend from $FRONTEND_DIR ..."
cd "$FRONTEND_DIR"
npm install
npm run build
echo "Copying build output to Django frontend_build ..."
rm -rf "$DJANGO_ROOT/frontend_build"
mkdir -p "$DJANGO_ROOT/frontend_build"
cp -r build/* "$DJANGO_ROOT/frontend_build"
echo "Done. Now run: python manage.py collectstatic --noinput"