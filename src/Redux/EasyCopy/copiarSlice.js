import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Configuration, OpenAIApi } from 'openai'

export const getGpt3 = createAsyncThunk('copia/getGpt3',
    async(data) => {
        const configuration = new Configuration({
            apiKey: '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'
        })
        const openai = new OpenAIApi(configuration);
        try {
            const response = await openai.createCompletion({
                prompt: data.pregunta,
                model: data.modelo,
                temperature: data.temperature,
            })
            console.log(response)
            return response.data.choices[0].text
        }   catch (error) {
            console.log('error');
        }
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
       return await fetch('https://plagiarism-checker-and-auto-citation-generator-multi-lingual.p.rapidapi.com/plagiarism', options)
            .then(response => response.json())
            // .then(response => console.log(response))
            .catch(err => console.error(err));

        // return responde.percentPlagiarism
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
        gptAnswer: '',
        isLoading: false,
        sumIsOpen: false,
        paraIsOpen: false,
        plagIsOpen: false,
        gptIsOpen: false,
    },
    reducers: {
        sumIsOpen: (state) => {
            state.sumIsOpen = !state.sumIsOpen
        },
        paraIsOpen: (state) => {
            state.paraIsOpen = !state.paraIsOpen
        },
        plagIsOpen: (state) => {
            state.plagIsOpen = !state.plagIsOpen
        },
        gptIsOpen: (state) => {
            state.gptIsOpen = !state.gptIsOpen
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
        .addCase(getPlag.pending, (state) => {
            state.isLoading = true
            state.sumCount = null
        })
        .addCase(getPlag.fulfilled, (state, action) => {
            console.log('acciton: ',action)
            let list = []
            state.isLoading = false
            state.plagio = action.payload.percentPlagiarism
            for(let i = 0; i < action.payload.sources.length; i++){
                list.push(action.payload.sources[i].url)
            }
            state.sources = list
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
            let resCount = res.split(' ').filter(word => word !== '').length
            state.isLoading = false
            state.sum = res
            state.sumCount = resCount
        })
        .addCase(getSumText.rejected, (state) => {
            state.isLoading = false
        })
        .addCase(getGpt3.pending, (state) => {
            state.isLoading = true
            state.sumCount = null
        })
        .addCase(getGpt3.fulfilled, (state, action) => {
            console.log('acciton: ',action)
            state.isLoading = false
            state.gptAnswer = action.payload
        })
        .addCase(getGpt3.rejected, (state) => {
            state.isLoading = false
        })
    }
})

export const { sumIsOpen, paraIsOpen, reset, plagIsOpen, gptIsOpen } = copiarSlice.actions

export const paraphrased = (state) => state.copia.paraphrased
export const traduction = (state) => state.copia.traduction
export const plagio = (state) => state.copia.plagio
export const plagSources = (state) => state.copia.sources
export const load = (state) => state.copia.isLoading
export const sumText = (state) => state.copia.sum
export const sumCount = (state) => state.copia.sumCount
export const Loading = (state) => state.copia.isLoading
export const sumView = (state) => state.copia.sumIsOpen
export const paraView = (state) => state.copia.paraIsOpen
export const plagView = (state) => state.copia.plagIsOpen
export const gptView = (state) => state.copia.gptIsOpen
export const gptResponse = (state) => state.copia.gptAnswer

export default copiarSlice.reducer