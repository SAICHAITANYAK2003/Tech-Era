import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseItemDetails extends Component {
  state = {
    itemDetails: {},
    apiStatus: apiStatusConstants.initial,
  }
  componentDidMount() {
    this.getCourseItemData()
  }
  getCourseItemData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params

    const itemApiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(itemApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = {
        description: data.course_details.description,
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
      }
      this.setState({
        itemDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }
  renderCourseItemView = () => {
    const {itemDetails} = this.state
    const {name, imageUrl, description} = itemDetails
    return (
      <div className="course-item-details">
        <div className="course-content">
          <img src={imageUrl} alt={name} className="course-item-logo" />
          <div className="course-data">
            <h1 className="course-name">{name}</h1>
            <p className="course-description">{description}</p>
          </div>
        </div>
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
        onClick={this.getCourseItemData}
      >
        Retry
      </button>
    </div>
  )
  renderCourseItemDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderCourseItemView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderCourseItemDetails()}
      </>
    )
  }
}

export default CourseItemDetails
