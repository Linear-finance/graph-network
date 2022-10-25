#!/bin/sh

set -e

NETWORK="$1"

if [ -z "$NETWORK" ]; then
    echo "Network missing"
    exit 1
fi

yarn envsub "./$NETWORK/subgraph.yaml" "./$NETWORK/subgraph.temp.yaml"

yarn graph build \
    --output-dir "./$NETWORK/build/" \
    "./$NETWORK/subgraph.temp.yaml"
