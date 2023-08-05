const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})


describe('favorite blog', () =>{
  const listWithBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful 2',
      author: 'Robert C. Martin',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0

    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful 3',
      author: 'Robert C. Martin',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0


    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful 4',
      author: 'Robert C. Martin',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0


    }
    
  ]
  test('when list has various  blogs, should return the author with most likes', () => {
    const result = listHelper.favoriteBlog(listWithBlogs)
    const resultExpect = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    }
    expect(result).toEqual(resultExpect)
  })

})



describe('max blogs by a author', () =>{
  const listWithBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful 2',
      author: 'Robert C. Martin',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0

    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful 3',
      author: 'Robert C. Martin',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0


    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful 4',
      author: 'Robert C. Martin',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0


    }
    
  ]
  test('when list has various  blogs, should return the author with most blogs', () => {
    const result = listHelper.mostBlogs(listWithBlogs)
    const resultExpect = {
      author: "Robert C. Martin",
      blogs: 3
    }
    expect(result).toEqual(resultExpect)
  })

})


describe('most likes by author', () =>{
  const listWithBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 17,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful 2',
      author: 'Robert C. Martin',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0

    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful 3',
      author: 'Robert C. Martin',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0


    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful 4',
      author: 'Robert C. Martin',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0


    }
    
  ]
  test('when list has various  blogs, should return the author with most likes', () => {
    const result = listHelper.mostLikes(listWithBlogs)
    const resultExpect = {
      author: "Edsger W. Dijkstra",
      likes: 17
    }
    expect(result).toEqual(resultExpect)
  })

})



