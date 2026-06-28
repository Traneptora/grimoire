#!/bin/sh

html="$1"
tmp="${html}.tmp"

if ! [ -r "$html" ] ; then
    exit 1
fi

sed -E 's/\s+$//' <"$html" >"$tmp"
awk 'RS="\n+"' "$tmp" >"$html"
rm -f "$tmp"
