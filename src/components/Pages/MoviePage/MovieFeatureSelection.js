import React from 'react'
import '../style.css'

const MovieFeatureSelection = () => {
    return (
        <table className="functiontitle">
            <tbody>
                <tr>
                    <td>
                        <div>
                            <nav>
                                <ul className="inline-block-nav-center">
                                    <li><a href='/moviematchpage'>發起專案</a></li>
                                </ul>
                            </nav>
                        </div>
                    </td>
                    <td>
                        <div>
                            <nav>
                                <ul className="inline-block-nav-center">
                                    <li><a href="/movieconsultpage">新創諮詢</a></li>
                                </ul>
                            </nav>
                        </div>    
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default MovieFeatureSelection