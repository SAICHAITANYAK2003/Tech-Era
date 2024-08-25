import {Link} from 'react-router-dom'
import './index.css'

const Course = props => {
  const {courseDetails} = props
  const {id, logoUrl, name} = courseDetails
  return (
    <li className="course-li-item" key={id}>
      <Link className="course-link" to={`courses/${id}`}>
        <img src={logoUrl} alt={name} className="course-image" />
        <p className="course-title">{name}</p>
      </Link>
    </li>
  )
}

export default Course
