var boolflix = new Vue({
    el: '#boolflix',
    data: {
        query: '',
        api_key: 'bc3be1f92a6701a8589c3f5cc8995f46',
        lang: 'it-IT',
        searcharray: [],

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
                this.searcharray = result.data.results;
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
                this.searcharray = this.searcharray.concat(result.data.results);
                this.voteStar(this.searcharray);
            })
            .catch((error) => console.log(error));

            // Svuota il campo di input
            this.query = '';

        },
        voteStar(array){
            array.forEach(element => {
                element.vote_average = Math.round(element.vote_average / 2);
                console.log(element.vote_average);
            });
        }
    }
}); 