import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Course from '../Course'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    coursesList: [],
    apiStatus: apiStatusConstants.initial,
  }
  componentDidMount() {
    this.getCoursesData()
  }
  getCoursesData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apirUrl = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apirUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.courses.map(eachObject => ({
        id: eachObject.id,
        logoUrl: eachObject.logo_url,
        name: eachObject.name,
      }))
      this.setState({
        coursesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }
  renderCoursesview = () => {
    const {coursesList} = this.state
    return (
      <div className="courses-container">
        <h1 className="courses-title">Courses</h1>
        <ul className="courses-list">
          {coursesList.map(eachCourse => (
            <Course courseDetails={eachCourse} key={eachCourse.id} />
          ))}
        </ul>
      </div>
    )
  }
  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader width="50" height="50" />
    </div>
  )
  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="not-found-title">Oops! Something Went Wrong</h1>
      <p className="not-found-subtitle">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getCoursesData}
      >
        Retry
      </button>
    </div>
  )

  renderCourseDetiails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderCoursesview()
      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-container">
        <Header />
        {this.renderCourseDetiails()}
      </div>
    )
  }
}

export default Home
