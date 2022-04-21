import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Employees from '../employees'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    employees: [],
    apiStatus: apiStatusConstants.initial,
    searchText: '',
  }

  componentDidMount() {
    this.employeeDetails()
  }

  employeeDetails = apiEmployesData => ({
    employeeId: apiEmployesData.employee_id,
    employeeName: apiEmployesData.employee_name,
    dateOfBirth: apiEmployesData.date_of_birth,
    designation: apiEmployesData.designation,
  })

  bookDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = ``
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const apiEmployesData = await response.json()
      const updatedEmployeesDetails = this.booksDetails(apiEmployesData)
      this.setState({
        employees: updatedEmployeesDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  employeeDetailsPass = () => {
    const {employees} = this.state

    return (
      <ul className="book-select-ul-container">
        {employees.map(eachItem => (
          <Employees key={eachItem.employeeId} employeeLists={eachItem} />
        ))}
      </ul>
    )
  }

  employeeFailureView = () => (
    <div className="no-found-container">
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={this.onTryAgain}>
        Try Again
      </button>
    </div>
  )

  employeeLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  onChangeSearch = event => {
    this.setState({searchText: event.target.value})
  }

  renderEmployeeDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.employeeDetailsPass()
      case apiStatusConstants.failure:
        return this.employeeFailureView()
      case apiStatusConstants.inProgress:
        return this.employeeLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <input type="search" onChange={this.onChangeSearch} />
        {this.renderEmployeeDetails()}
      </div>
    )
  }
}
export default Home
