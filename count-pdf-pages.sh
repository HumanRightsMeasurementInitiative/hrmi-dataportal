#!/bin/bash

for pdf in ../pdfs-prod/*.pdf; do
    count=$(mdls -name kMDItemNumberOfPages $pdf)
    if (( count > 2 )); then
	echo $pdf
    fi
done
