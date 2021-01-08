import React, { useState, useEffect, useRef } from 'react'
import '../styles/courses.scss'

function CourseLookUp() {
    const [isValidDepartment, setIsValidDepartment] = useState(true);
    const [isValidCourse, setIsValidCourse] = useState(true);
    const [hasError, setHasError] = useState(false)
    let [course, setCourse] = useState({});
    const [isEnabled, setIsEnabled] = useState(true);
    const [showDetails, setShowDetails] = useState(false);
    let url = '';
    const isNumber = new RegExp(/^[0-9]+$/);
    const checkLetter = new RegExp(/[a-z]/i);
    const converStrToArr = new RegExp(/("[^"]+"|[^"\s]+)/g)
    const SemesterAbbr = {
        "S": "Spring",
        "Su": "Summer",
        "F": "Fall",
        "W": "Winter"
    }

    const inputef = useRef(null);

    useEffect(() => {
        inputef.current.focus();
    }, [])

    function handleChange(e) {
        if (!e.target.value) {
            setIsEnabled(true)
        } else {
            setIsEnabled(false);
            setShowDetails(false);
        }
        setCourse(e.target.value);
        var newString = e.target.value.match(converStrToArr);
        let department = newString ? newString[0] : ''
        let course = newString ? newString[1] : ''
        if (department) {
            checkValidDepartment(department);
        }
        else if (course) {
            checkValidCourse(course);
        }
    }

    function checkValidDepartment(dept) {
        if (dept && dept.match(checkLetter)) {
            setIsValidDepartment(true);
        } else {
            setIsValidDepartment(false);
        }
    }

    function checkValidCourse(crs) {
        if (crs && crs.match(isNumber)) {
            setIsValidCourse(true);
        } else {
            setIsValidCourse(false);
        }
    }

    function checkSpecialCharsinStr(str) {
        if (str.includes('-')) {
            str = str.split('-').join(" ");
        } else if (str.includes('.')) {
            str = str.split('.').join(" ");
        } else if (str.includes(':')) {
            str = str.split(':').join(" ");
        }
        return str;
    }

    function handleSubmit(e) {
        // e.preventDefault();
        setCourse(course);
        let filteredString = checkSpecialCharsinStr(course);
        filteredString = filteredString.match(converStrToArr);
        const department = filteredString[0];
        const classNumber = filteredString[1];
        const semester = SemesterAbbr[filteredString[2]];
        const year = filteredString[3];
        const courseInfo = {};
        courseInfo['department'] = department;
        courseInfo['course'] = classNumber;
        courseInfo['year'] = year;
        courseInfo['semester'] = semester;
        if (courseInfo.department !== undefined && courseInfo.course !== undefined && courseInfo.year !== undefined && courseInfo.semester !== undefined) {
            course = courseInfo;
            setCourse(course);
            setShowDetails(true);
            setHasError(false);
        } else {
            setHasError(true);
        }
        setIsEnabled(false);
        e.target.value = null;
    }
    return (
        <>
            <div className="container w-100 p-0">
                <header>
                    <nav className="navbar navbar-dark bg-primary text-center">
                        <a className="navbar-brand" href={url}><strong>Course Hero</strong></a>
                    </nav>
                </header> <br />
                <div className="border search-course text-left m-auto shadow p-3 mb-5 bg-white rounded">
                    <form action="submit" className="form">
                        <div className="form-group">
                            <div className="row d-flex w-100 m-auto">
                                <div className="col-8 pr-0">
                                    <div className="m-0 w-100">
                                        <label htmlFor="course" className="m-0">Course</label>
                                        <input type="text"
                                            className={`form-control ${!isValidDepartment || !isValidCourse || hasError ? ' error-state' : ''}`}
                                            name="course"
                                            id="course"
                                            ref={inputef}
                                            value={course.name}
                                            onChange={handleChange} />
                                        {hasError ? <span className="error">Error: Could not parse course</span> : ''}
                                    </div>
                                </div>
                                <div className="col-4 justify-content-center align-self-center">
                                    <button className="btn btn-default float-right w-100" type="button" onClick={handleSubmit} disabled={isEnabled}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    {
                        showDetails ?
                            <div className="card mt-3">
                                <div className="card-header">
                                    {course.department} {course.course}
                                </div>
                                <div className="card-body">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td className="columnWidth">Department</td>
                                                <td>{course.department}</td>
                                            </tr>
                                            <tr>
                                                <td className="columnWidth">Course</td>
                                                <td>{course.course}</td>
                                            </tr>
                                            <tr>
                                                <td className="columnWidth">Year</td>
                                                <td>{course.year}</td>
                                            </tr>
                                            <tr>
                                                <td className="columnWidth">Semester</td>
                                                <td>{course.semester}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div> : null
                    }

                </div>
            </div>
        </>
    )
}

export default CourseLookUp
