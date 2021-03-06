var boolflix = new Vue({
    el: '#boolflix',
    data: {
        query: '',
        api_key: 'bc3be1f92a6701a8589c3f5cc8995f46',
        lang: 'it-IT',
        trend: [],
        savearray: [],
        searcharray: [],
        generi:[],
        genreSelected: ''

    },
    methods: {
        search() {

            // Chiamata axios per film
            axios
            .get('https://api.themoviedb.org/3/search/movie', {
                params: {
                    api_key: this.api_key,
                    query: this.query,
                    language: this.lang
                }
            })
            .then(result => {
                this.savearray = result.data.results;
            })
            .catch((error) => console.log(error));

            // Chiamata axios per serie tv
            axios
            .get('https://api.themoviedb.org/3/search/tv', {
                params: {
                    api_key: this.api_key,
                    query: this.query,
                    language: this.lang
                }
            })
            .then(result => {
                // Ho creato tutto in un'altro array per evitare di avere ritardo sulla visualizzzione
                // Corretta delle stelline, altrimenti capitava di vedere sempre tutte le stelline piene
                this.savearray = this.savearray.concat(result.data.results);
                this.voteStar(this.savearray);
                this.searcharray = this.savearray;
            })
            .catch((error) => console.log(error));
            console.log(this.generi);

            // Svuota il campo di input
            this.query = '';
            this.trend = [];

        },
        voteStar(array){
            array.forEach(element => {
                element.vote_average = Math.round(element.vote_average / 2);
            });
        },
        homeTrend(){
            axios
            .get('https://api.themoviedb.org/3/trending/all/week', {
                params: {
                    api_key: this.api_key,
                    query: this.query,
                    language: this.lang
                }
            })
            .then(result => {
                this.trend = result.data.results;
                this.voteStar(this.trend);
            })
            .catch((error) => console.log(error));
            
            this.searcharray = [];
        }
    },
    mounted(){
        axios
        .get('https://api.themoviedb.org/3/trending/all/week', {
            params: {
                api_key: this.api_key,
                query: this.query,
                language: this.lang
            }
        })
        .then(result => {
            this.trend = result.data.results;
            this.voteStar(this.trend);
        })
        .catch((error) => console.log(error));

        axios
        .get('https://api.themoviedb.org/3/genre/movie/list', {
            params: {
                api_key: this.api_key,
                language: this.lang
            }
        })
        .then(result => {
            this.generi = result.data.genres;
        })
    }
}); 