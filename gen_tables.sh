#!/bin/bash

PREFIX='arvore-decisao'
TABLES='01-Restaurante.html 02-Tenis.html 03-Compra.html'
TEMPLATE='TEMPLATE.html'

for F in $TABLES;do
    sed -e "/TABLE_HERE/ {
        r $F
        d
    }" $TEMPLATE > $PREFIX-$F
done
