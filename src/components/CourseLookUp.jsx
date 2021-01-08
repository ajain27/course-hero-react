import React, { useState } from 'react'
import '../styles/courses.scss'

function CourseLookUp() {

    const [validCourse, setValidCourse] = useState('');
    const [course, setCourse] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        console.log(course);
    }

    return (
        <>
            <div className="container w-100 p-0">
                <header>
                    <nav className="navbar navbar-dark bg-primary text-center">
                        <a className="navbar-brand" href="#"><strong>Course Hero</strong></a>
                    </nav>
                </header> <br />
                <div className="border search-course text-left m-auto shadow p-3 mb-5 bg-white rounded">
                    <form action="submit" className="form">
                        <div className="form-group">
                            <div className="row d-flex w-100">
                                <div className="col-8 pr-0">
                                    <div className="m-0 w-100">
                                        <label htmlFor="course" className="m-0">Course</label>
                                        <input type="text"
                                            className="form-control"
                                            name="course"
                                            id="course"
                                            value={course}
                                            onChange={(e) => setCourse(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-4 justify-content-center align-self-center">
                                    <button className="btn btn-default float-right w-100" type="button" onClick={handleSubmit}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="card mt-3">
                        <div className="card-header">
                            CS 11
                    </div>
                        <div className="card-body">
                            <table className="table">
                                <tr>
                                    <td>Department</td>
                                    <td>CS</td>
                                </tr>
                                <tr>
                                    <td>Course</td>
                                    <td>11</td>
                                </tr>
                                <tr>
                                    <td>Year</td>
                                    <td>2020</td>
                                </tr>
                                <tr>
                                    <td>Semester</td>
                                    <td>Fall</td>
                                </tr>
                            </table>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default CourseLookUp
