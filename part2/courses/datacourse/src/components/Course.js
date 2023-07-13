const Course = ({course}) =>{

    const total = course.parts.reduce((accumulator, currentPart) => {
      const sumTotal = accumulator + currentPart.exercises;
      return sumTotal;
    }, 0);
  
    return(
      <div>
        <h1>{course.name}</h1>
        <br></br>
        {course.parts.map((item,index) =>(
          <div key={index}>
          <p>{item.name} {item.exercises}</p>
          <br></br>
          </div>
        ))}
      <h3>total of {total} exercises</h3>
      </div>
  
      
    )
  
  }

  export default Course