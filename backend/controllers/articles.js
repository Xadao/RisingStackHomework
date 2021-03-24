const cheerio = require('cheerio');
const axios = require ('axios');

//controller for frontend POST request
exports.getFiltered = async (req, res, next) => {
    let articlesWithoutLinks = [];
    for (let i = 1; i <= req.body.number; i++) 
    {
        try {
            const titles = await  scrapeArticles("https://blog.risingstack.com/page/"+i);
            for (let index = 0; index < titles.length; index++) {
                
                    let filteredLinks = await scrapeFiltered (titles[index].postRoute,titles[index].title );
                    
                    articlesWithoutLinks.push(...filteredLinks);    
            } 
          } catch (error) {
            console.error(error);
          } 
    }

    if(articlesWithoutLinks.length > 0 && typeof articlesWithoutLinks !== 'undefined')
    {
        res.send(JSON.stringify(articlesWithoutLinks));

    }else res.send(status(404) + 'Page not found ');
}
//scrape the article list pages 
async function scrapeArticles(url) {
    let postRoutes = [];
            
           await axios.get(url)
            .then(response => {
                if (response.status === 200) 
                {
                    const html = response.data
                    const $ = cheerio.load(html)
                    $('iframe').remove();
                    $('.main-inner article').each((i, elem) => 
                    {
                            const x = $(elem)

                            const title = x
                            .find('.post-title')
                            .text();

                            const postRoute = x
                            .find('.post-title')
                            .find('a')
                            .attr('href');
                            
                            postRoutes.push({
                               title, postRoute
                            }); 
                        } );  
                }
            })
            .catch((error) => console.log(error))
    
    return postRoutes;
}       
//scrape and filter each articles content
 async function scrapeFiltered(route, title)
 {
    const filteredPosts = [];

    await axios.get('https://blog.risingstack.com'+route)
    .then(response => 
    {
        if (response.status === 200) 
        {
            const article = response.data;
            const $ = cheerio.load(article);
            const substring = "://risingstack.com/";
            const links = {title: title, route : route, filteredLinks: []};
            const articles = [];
            
            $('iframe').remove();
            
            $('.post-content a').each((i, elem) => 
            {
                    const x = $(elem);
                    
                    const Link = x
                    .attr('href')
                    if (Link.includes(substring)) 
                    {
                        links.filteredLinks.push(Link);
                        
                    }       
            });
            articles.push(...articles,links);
            articles.forEach(element => 
                {
               if (element.filteredLinks.length === 0) 
               {
                   filteredPosts.push({title: element.title, post_route :element.route});
               }
            });
        }})
        .catch((error) => console.log(error))

     return filteredPosts;
 }
