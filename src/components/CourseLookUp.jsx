import React, { useState, useEffect, useRef } from 'react'
import '../styles/courses.scss'

function CourseLookUp() {
    // const [validCourse, setValidCourse] = useState('');
    let [course, setCourse] = useState({});
    const [isEnabled, setIsEnabled] = useState(true);
    const [showDetails, setShowDetails] = useState(false);
    let url = '';
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
    }

    function handleSubmit(e) {
        if (e && e.target) {
            e.preventDefault();
            setCourse(course);
            var newString = course.match(/("[^"]+"|[^"\s]+)/g);
            const department = newString[0];
            const classNumber = newString[1];
            const year = newString[2];
            const semester = newString[3];
            const courseInfo = {};
            courseInfo['department'] = department;
            courseInfo['course'] = classNumber;
            courseInfo['year'] = year;
            courseInfo['semester'] = semester;
            course = courseInfo;
            setCourse(course);
            setShowDetails(true);
        } else {
            e.preventDefault();
        }
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
                    {/* <form action="submit" className="form"> */}
                    <div className="form-group">
                        <div className="row d-flex w-100">
                            <div className="col-8 pr-0">
                                <div className="m-0 w-100">
                                    <label htmlFor="course" className="m-0">Course</label>
                                    <input type="text"
                                        className="form-control"
                                        name="course"
                                        id="course"
                                        ref={inputef}
                                        value={course.name}
                                        onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-4 justify-content-center align-self-center">
                                <button className="btn btn-default float-right w-100" type="button" onClick={handleSubmit} disabled={isEnabled}>Submit</button>
                            </div>
                        </div>
                    </div>
                    {/* </form> */}
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
                                            <td>Department</td>
                                            <td>{course.department}</td>
                                        </tr>
                                        <tr>
                                            <td>Course</td>
                                            <td>{course.course}</td>
                                        </tr>
                                        <tr>
                                            <td>Year</td>
                                            <td>{course.year}</td>
                                        </tr>
                                        <tr>
                                            <td>Semester</td>
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
