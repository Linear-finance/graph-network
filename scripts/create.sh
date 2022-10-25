#!/bin/sh

set -e

if [ -z "$NODE" ]; then
    echo "NODE missing"
    exit 1
fi
if [ -z "$SUBGRAPH_NAME" ]; then
    echo "SUBGRAPH_NAME missing"
    exit 1
fi

if [ -n "$ACCESS_TOKEN" ]; then
    ACCESS_TOKEN_FLAG="--access-token $ACCESS_TOKEN"
fi

yarn graph create \
    --node $NODE \
    $ACCESS_TOKEN_FLAG \
    $SUBGRAPH_NAME
