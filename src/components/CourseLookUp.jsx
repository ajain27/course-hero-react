import React, { useState, useEffect, useRef } from 'react'
import '../styles/courses.scss'

function CourseLookUp() {
    const [isValidDepartment, setIsValidDepartment] = useState(true);
    const [isValidCourse, setIsValidCourse] = useState(true);
    const [hasError, setHasError] = useState(false)
    let [course, setCourse] = useState({});
    const [isDisabled, setIsDisabled] = useState(true);
    const [showDetails, setShowDetails] = useState(false);
    let url = '';
    // const isNumber = new RegExp(/^[0-9]+$/);
    // const checkLetter = new RegExp(/[a-z]/i);
    const converStrToArr = new RegExp(/("[^"]+"|[^"\s]+)/g)
    const inputef = useRef(null);

    useEffect(() => {
        // focuses the input box on load
        inputef.current.focus();
        // disabling the button on load
        setIsDisabled(true)
    }, [])

    function handleChange(e) {
        let input = e.target;
        if (!input.value) { // disabling if value is not emplty or null - 
            setIsDisabled(true);
            setShowDetails(false);
        } else {
            setIsDisabled(false);
            setShowDetails(false);
        }
        setCourse(input.value); // Setting the state with input value
        if (input.value.length <= 2) {
            checkValidDepartment(input.value);
        } else if ((input.value.length === 3) && (input.value.charAt(3) === '-' || input.value.charAt(3) === ':' || input.value.charAt(3) === ' ')) {
            setIsDisabled(false);
            setHasError(false)
        } else {
            checkValidCourse(input.value)
        }
        input.value = input.value ? normalizeInput(input.value) : '';
    }

    // Adding space while typing.
    function normalizeInput(courseInfo) {
        if (courseInfo.includes('-') || courseInfo.includes(':') || courseInfo.includes(' ')) {
            if (courseInfo.length === 6) {
                courseInfo = courseInfo + " "
            }
        } else if (courseInfo.includes('.') || courseInfo.includes(',')) {
            setIsDisabled(true);
            setHasError(true);
        } else if (courseInfo.length === 5) {
            courseInfo = courseInfo + " "
        }
        return courseInfo;
    }

    // Checking the the department name is alphabets only
    function checkValidDepartment(dept) {
        const d = dept.substr(0, 2);
        if (d && !hasNumbers(d)) {
            setIsDisabled(false);
            setIsValidDepartment(true);
            setHasError(false);
        } else {
            setIsDisabled(true);
            setIsValidDepartment(false);
            setHasError(true);
        }

    }
    // Checking the the course name is digits only
    function checkValidCourse(crs) {
        const courseNumber = crs.substring(2, 5)
        // const c = checkSpecialCharsinDc(courseNumber);
        // console.log(c);
        if (courseNumber && hasNumbers(courseNumber)) {
            setIsDisabled(false);
            setIsValidCourse(true);
            setHasError(false);
        } else {
            setIsDisabled(true);
            setIsValidCourse(false);
            setHasError(true);
        }
    }

    function checkSpecialCharsinDc(str) {
        // Accepting the special characters
        let dc = str.substr(0, 6);
        if (dc) {
            if (!dc.includes('.') || !dc.includes(',')) {
                if (dc.includes('-')) {
                    dc = dc.split('-').join(" ");
                } else if (dc.includes(':')) {
                    dc = dc.split(':').join(" ");
                }
                return dc;
            } else {
                return;
            }
        }
    }

    function getFulllYear(year) {
        const getLengthOfYear = year.toString().length;
        if (getLengthOfYear === 1) {
            // if the year enteres is 01, 02, we append 0 in front to get thet correct year enetered 
            const leadZero = `0${year}`
            const fullYear = `20${leadZero}` // getting the full year since only 2000 era is to be considered
            return fullYear;
        } else if (getLengthOfYear === 2) {
            const fullYear = `20${year}` // getting the full year since only 2000 era is to be considered
            return fullYear;
        } else {
            return year;
        }
    }

    // Accepting abbreviations for the Semetser names
    function getSemesters(semester) {
        const SemesterAbbr = {
            "S": "Spring",
            "Su": "Summer",
            "F": "Fall",
            "W": "Winter"
        }
        if (semester in SemesterAbbr) {
            return SemesterAbbr[semester]
        } else {
            setHasError(true);
            setIsDisabled(true);
        }
        return semester;
    }

    // Validating the department and course
    function isValidDc(input) {
        let departmentAndCourse = [];
        const deptCrs = input.substr(0, 6);
        if (hasNumbers(deptCrs)) {
            let inputStr = checkSpecialCharsinDc(deptCrs);
            const department = extractAlphabetsOnly(inputStr);
            const courseNumber = extractNumsOnly(inputStr);
            departmentAndCourse.push(...department, ...courseNumber);
            return departmentAndCourse;
        } else {
            setIsDisabled(true);
            setHasError(true);
        }

    }

    // Validating the semester and year
    function isValidSY(input) {
        let validSY;
        let semyear;
        semyear = input.substr(6, 13).trim();
        if (hasNumbers(semyear)) {
            if (!hasWhiteSpace(semyear)) {
                let sem = extractAlphabetsOnly(semyear);
                const year = extractNumsOnly(semyear);
                const SY = [...sem, ...year]
                validSY = SY;
            } else {
                validSY = semyear.match(converStrToArr);
            }
            return validSY;
        } else {
            setHasError(true);
            setIsDisabled(true);
            return;
        }
    }

    // checking if string has white sapce
    function hasWhiteSpace(s) {
        return /\s/g.test(s);
    }

    //checking if string has numbers
    function hasNumbers(str) {
        return /\d/.test(str);
    }

    // extracting only the alphabets from the string
    function extractAlphabetsOnly(a) {
        var b = '';
        for (var i = 0; i < a.length; i++) {
            if (a[i] >= 'A' && a[i] <= 'z') b += a[i];
        }
        return b.match(converStrToArr);
    }
    // extracting only the numbers from the string
    function extractNumsOnly(num) {
        let numberPattern = /\d+/g;
        return num.match(numberPattern);
    }

    function handleEnterClick(e) {
        if (e.which === 13){
            e.preventDefault();
            let input = e.target;
            if (input && input.value) {
                handleSubmit(e);
            } else {
                return;
            }
        }
    }

    // Submitting the entered course to get extracted result
    function handleSubmit(e) {
        // e.preventDefault();
        setCourse(course);
        const departmentAndCourse = isValidDc(course);
        const semesterAndYear = isValidSY(course);
        if (departmentAndCourse !== undefined && semesterAndYear !== undefined) {
            let filteredString = [...departmentAndCourse, ...semesterAndYear]
            if (filteredString.length === 4) {
                let filteredYear = getFulllYear(filteredString[3])
                const semester = getSemesters([filteredString[2]]);
                const year = filteredYear;
                const courseInfo = {};
                courseInfo['department'] = filteredString[0];
                courseInfo['course'] = filteredString[1];
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
                setIsDisabled(false);
                e.target.value = null;
            } else {
                setHasError(true);
                setIsDisabled(true);
            }
        } else {
            setHasError(true);
            setIsDisabled(true);
        }
    }
    return (
        <>
            <div className="container w-100 p-0">
                <header className="mb-5">
                    <nav className="navbar navbar-dark bg-primary text-center">
                        <a className="navbar-brand" href={url}><strong>Course Hero</strong></a>
                    </nav>
                </header>
                <div className="border search-course text-left m-auto shadow p-3 mb-5 bg-white rounded">
                    <form action="submit" className="form">
                        <span htmlFor="course" className="m-0">Course</span>
                        <div className="form-group mb-0">
                            <div className="row d-flex w-100 m-auto">
                                <div className="col-8 pl-0">
                                    <div className="m-0 w-100">
                                        <input type="text"
                                            className={`form-control ${!isValidDepartment || !isValidCourse || hasError ? ' error-state' : ''}`}
                                            name="course"
                                            id="course"
                                            ref={inputef}
                                            value={course.name}
                                            onKeyDown={handleEnterClick}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="col-4 justify-content-center align-self-center">
                                    <button className="btn btn-default float-right w-100" type="button" onClick={handleSubmit} disabled={isDisabled}>Submit</button>
                                </div>
                            </div>
                        </div>
                        {hasError ? <span className="error">Error: Could not parse course</span> : ''}
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
