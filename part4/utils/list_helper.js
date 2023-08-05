const dash = require('lodash');


const dummy = (blogs) => {
    return 1
  }


const totalLikes = (blogs) =>{
    let sum = blogs.reduce((acc,blog) =>{
        return acc + blog.likes

    },0)
    return sum
}


const favoriteBlog = (blogs) =>{
    const mostLikes =  dash.maxBy(blogs,'likes')
    return {
        'title' : mostLikes.title,
        'author' : mostLikes.author,
        'likes' : mostLikes.likes

    }
}


const mostBlogs = (blogs) =>{
    const blogsOfAuthors = []
    blogs.forEach(blog => {
        const author = blogsOfAuthors.find((element) => blog.author === element.author )
        if(author){
            author.blogs += 1

        }
        else{
            blogsOfAuthors.push({
                'author' : blog.author,
                'blogs' : 1
            })
        }
        
    })
    const mostAuthor = dash.maxBy(blogsOfAuthors,'blogs')

    return mostAuthor

}

const mostLikes = (blogs) =>{
    const mostLikes = favoriteBlog(blogs)
    return {
        'author' : mostLikes.author,
        'likes' : mostLikes.likes
    }
}
  
  module.exports = {
    dummy,totalLikes,favoriteBlog,mostBlogs,mostLikes
  }