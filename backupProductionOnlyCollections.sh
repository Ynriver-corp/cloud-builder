#!/usr/bin/env bash
gcloud config set project cloud-builder-330002
gcloud beta firestore export gs://cloud-builder-330002-backups/games/8febr --collection-ids='games'