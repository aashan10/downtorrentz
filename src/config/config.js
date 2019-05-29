export default config = {
    color : {
        primary : '#4dad4a',
        secondary : '#b62628',
        statusBar : '#3e883c'
    },

    apiConfig :  {
        apiRootUrl : 'https://yts.am/api/v2/list_movies.json',
        searchParams : {
            genre : 'All',
            minimum_rating : 0,
            sort_by : 'date_added',
            order_by : 'desc',
            limit : 20,
            page : 1
        }
    },
    movies : [],
    getPrimaryColor : () => {
        return this.color.primary;
    },
    setPrimaryColor :  (color) => {
        this.color.primary = color;
    },
    
}