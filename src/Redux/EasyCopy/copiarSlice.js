import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getTradX3 = createAsyncThunk('copia/getTradX3',
    async() => {
        // Quedamos aqui:
        //Falta hacer que el contenido sea el state.quote y hay q cambiarlo
        let contenido = 'Hello my name is Jacob. I like coding'
        const options = [
            {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': 'f3c8d2d1a7msh7de89f612a4c0a2p1d77dajsn3158ae64833f',
                'X-RapidAPI-Host': 'translator82.p.rapidapi.com'
            },
            body: `{"language":"es", "text": "${contenido}"}`
            },
            {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': 'f3c8d2d1a7msh7de89f612a4c0a2p1d77dajsn3158ae64833f',
                'X-RapidAPI-Host': 'translator82.p.rapidapi.com'
            },
            body: `{"language":"zh", "text": "${contenido}"}`
            },
            {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': 'f3c8d2d1a7msh7de89f612a4c0a2p1d77dajsn3158ae64833f',
                'X-RapidAPI-Host': 'translator82.p.rapidapi.com'
            },
            body: `{"language":"en", "text": "${contenido}"}`
            }
    ]
        for(let i = 0; i < options.length; i++){
            await fetch('https://translator82.p.rapidapi.com/api/translate',options[i])
            .then(response => response.json())
            .then((response) => {
                let contenido = response.result
                // list.push(contenido)
                console.log(contenido)
            })
            .catch(err => console.error(err))
        }
        return contenido

	// .then(response => console.log(response.result))
    }
)

export const getParaph = createAsyncThunk('copia/getParaphrase',
async(texto) => {
    const encodedParams = new URLSearchParams();
    encodedParams.append("text", `${texto}`);
    encodedParams.append("lang", "en");
    encodedParams.append("paraphrase_capital", "true");

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': 'f3c8d2d1a7msh7de89f612a4c0a2p1d77dajsn3158ae64833f',
            'X-RapidAPI-Host': 'rimedia-paraphraser.p.rapidapi.com'
        },
        body: encodedParams
    };
    return await fetch('https://rimedia-paraphraser.p.rapidapi.com/api_paraphrase.php', options)
        .then(response => response.json())
        // .then(response => console.log(response))
        .catch(err => console.error(err));

    }
)

export const getPlag = createAsyncThunk('copia/getPlag',
    async(contenido) => {
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': 'f3c8d2d1a7msh7de89f612a4c0a2p1d77dajsn3158ae64833f',
                'X-RapidAPI-Host': 'plagiarism-checker-and-auto-citation-generator-multi-lingual.p.rapidapi.com'
            },
            body: `{"text":"${contenido}","language":"en","includeCitations":false,"scrapeSources":false}`
        };
       const responde = await fetch('https://plagiarism-checker-and-auto-citation-generator-multi-lingual.p.rapidapi.com/plagiarism', options)
            .then(response => response.json())
            .catch(err => console.error(err));

        return responde.percentPlagiarism
    }
)

export const getSumText = createAsyncThunk('copia/getSumText',
        async(texto) => {
            const options = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': 'f3c8d2d1a7msh7de89f612a4c0a2p1d77dajsn3158ae64833f',
                    'X-RapidAPI-Host': 'gpt-summarization.p.rapidapi.com'
                },
                body: `{"text": "${texto}","num_sentences":3}`
            };
            
            return await fetch('https://gpt-summarization.p.rapidapi.com/summarize', options)
                .then(response => response.json())
                // .then(response => console.log(response.summary))
                .catch(err => console.error(err));

            // return summarizedText.summary
        }
    )




export const copiarSlice = createSlice({
    name: 'copia',
    initialState:{
        paraphrased: '',
        traduction: 'none',
        plagio: 0,
        isLoading: false,
        sumIsOpen: false,
    },
    reducers: {
        sumIsOpen: (state) => {
            state.sumIsOpen = !state.sumIsOpen
        },
        reset: (state) => {
            state.quote = ''
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getParaph.pending, (state) => {
            state.isLoading = true
            state.sumCount = null
        })
        .addCase(getParaph.fulfilled, (state, action) => {
            console.log('acciton: ',action)
            const res = action.payload.result_text_new.split(' ').length
            state.isLoading = false
            state.paraphrased = action.payload.result_text_new
            state.sumCount = res
        })
        .addCase(getParaph.rejected, (state) => {
            state.isLoading = false

        })
        .addCase(getTradX3.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getTradX3.fulfilled, (state, action) => {
            console.log('acciton: ',action)
            state.isLoading = false
            state.traduction = action.payload
        })
        .addCase(getTradX3.rejected, (state) => {
            state.isLoading = false

        })
        .addCase(getPlag.pending, (state) => {
            state.isLoading = true
            state.sumCount = null
        })
        .addCase(getPlag.fulfilled, (state, action) => {
            console.log('acciton: ',action)
            state.isLoading = false
            state.plagio = action.payload
        })
        .addCase(getPlag.rejected, (state) => {
            state.isLoading = false

        })
        .addCase(getSumText.pending, (state) => {
            state.isLoading = true
            state.sumCount = null
        })
        .addCase(getSumText.fulfilled, (state, action) => {
            console.log('acciton: ',action)
            let res = action.payload.summary
            let resCount = res.split(' ').length
            state.isLoading = false
            state.sum = res
            state.sumCount = resCount
        })
        .addCase(getSumText.rejected, (state) => {
            state.isLoading = false
        })
    }
})

export const { sumIsOpen, reset } = copiarSlice.actions

export const paraphrased = (state) => state.copia.paraphrased
export const traduction = (state) => state.copia.traduction
export const plagio = (state) => state.copia.plagio
export const load = (state) => state.copia.isLoading
export const sumText = (state) => state.copia.sum
export const sumCount = (state) => state.copia.sumCount
export const Loading = (state) => state.copia.isLoading
export const sumView = (state) => state.copia.sumIsOpen

export default copiarSlice.reducer