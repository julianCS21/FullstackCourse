const NewBlog = ({title,author,url,changeTitle,changeAuthor,changeUrl,createBlogProccess}) =>{
    return (
        <div>
            <form onSubmit={(event) =>{
                createBlogProccess(event)
            }}>
                title : <input type="text" value={title} name="title" onChange={({target}) =>{changeTitle(target)}}></input>
                <br></br>
                author : <input type="text" value={author} name="author" onChange={({target}) =>{changeAuthor(target)}}></input>
                <br></br>
                url: <input type="text" value={url} name="url" onChange={({target}) =>{changeUrl(target)}}></input>
                <br></br>
                <button type="sumbit">Create</button>
            </form>

        </div>
    )
    

}


export default NewBlog