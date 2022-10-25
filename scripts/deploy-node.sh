#!/bin/sh

set -e

if [ -n "$1" ]; then
    NETWORK="$1"
fi

if [ -z "$NETWORK" ]; then
    echo "Network missing"
    exit 1
fi
if [ -z "$NODE" ]; then
    echo "NODE missing"
    exit 1
fi
if [ -z "$SUBGRAPH_NAME" ]; then
    echo "SUBGRAPH_NAME missing"
    exit 1
fi
if [ -z "$VERSION_LABEL" ]; then
    echo "VERSION_LABEL missing"
    exit 1
fi

if [ -n "$ACCESS_TOKEN" ]; then
    ACCESS_TOKEN_FLAG="--access-token $ACCESS_TOKEN"
fi
if [ -n "$IPFS" ]; then
    IPFS_FLAG="--ipfs $IPFS"
fi

yarn envsub "./$NETWORK/subgraph.yaml" "./$NETWORK/subgraph.temp.yaml"

yarn graph deploy \
    --product hosted-service \
    --node $NODE \
    --version-label $VERSION_LABEL \
    --output-dir "./$NETWORK/build/" \
    $ACCESS_TOKEN_FLAG \
    $IPFS_FLAG \
    $SUBGRAPH_NAME \
    "./$NETWORK/subgraph.temp.yaml"
