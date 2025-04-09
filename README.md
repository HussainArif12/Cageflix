# The website is [deployed](https://cageflix-blue.vercel.app/)

Hello Trivago!

This is a [Next.js](https://nextjs.org) project.

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Notes:

For processing of the TSV files, I used Python. The code is in the `processing_utils` folder. It reads from the .tsv files and then produces a JSON file in the src/assets/ folder.
To update the JSON file, download the following files from the [IdMb website](https://developer.imdb.com/non-commercial-datasets/)

- title.principals.tsv.gz
- title.basics.tsv.gz
- name.basics.tsv.gz
- title.ratings.tsv.gz

Additionally, you would also need to get an API key from the [OMDb Website](https://www.omdbapi.com/). Please place an environment variable called `OMDB_API_KEY` in the `.env` folder at the root of the project.

To run the Python script

```
#make sure you've made a virtual environment!
pip install -r ./requirements.txt
python processing_utils/process_tsv.py
```
