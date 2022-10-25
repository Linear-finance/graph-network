#!/bin/sh

set -e

if [ -n "$1" ]; then
    NETWORK="$1"
fi

if [ -z "$NETWORK" ]; then
    echo "Network missing"
    exit 1
fi

yarn envsub "./$NETWORK/subgraph.yaml" "./$NETWORK/subgraph.temp.yaml"

yarn graph codegen \
    --output-dir "./$NETWORK/generated/" \
    "./$NETWORK/subgraph.temp.yaml"
