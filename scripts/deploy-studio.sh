#!/bin/sh

set -e

if [ -n "$1" ]; then
    NETWORK="$1"
fi

if [ -z "$NETWORK" ]; then
    echo "Network missing"
    exit 1
fi
if [ -z "$DEPLOY_KEY" ]; then
    echo "DEPLOY_KEY missing"
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

if [ -n "$IPFS" ]; then
    IPFS_FLAG="--ipfs $IPFS"
fi

yarn envsub "./$NETWORK/subgraph.yaml" "./$NETWORK/subgraph.temp.yaml"

yarn graph deploy \
    --product subgraph-studio \
    --deploy-key $DEPLOY_KEY \
    --version-label $VERSION_LABEL \
    --output-dir "./$NETWORK/build/" \
    $IPFS_FLAG \
    $SUBGRAPH_NAME \
    "./$NETWORK/subgraph.temp.yaml"
