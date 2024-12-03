const Header = ({name}) => (
    <h2>
      {name}
    </h2>
  )
  
  const Part = ({part}) => (
    <p>
      {part.name} {part.exercises}
    </p>  
  )
  const Content = ({parts}) => (
    <>
      {parts.map((part) => <Part part={part} key={part.id}/>)}
    </>
  )
  
  const Total = ({parts}) => {
    const total = parts.reduce((current, part) => current + part.exercises, 0)
    return (
      <p><b>
        total of {total} of exercises
      </b></p>
    )
  }
  
  const Course = ({ course }) => (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>  
    </div>
  )

export default Course