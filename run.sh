#!/bin/bash
echo "adver front is starting..."

STAGING=$REACT_APP_STAGING

if [ -z "$STAGING" ]; then
  STAGING=local
fi
echo "the staging is $STAGING"

yarn $STAGING

echo "adver front is starting completed..."