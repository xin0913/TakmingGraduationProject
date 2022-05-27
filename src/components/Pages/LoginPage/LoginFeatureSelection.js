import React from 'react'
import '../style.css'

const MusicFeatureSelection = () => {
    return (
        <table className="functiontitle">
            <tbody>
                <tr>
                    <td>
                        <div>
                            <nav>
                                <ul className="inline-block-nav-center">
                                <li><a href='/loginprojectlist'>專案列表</a></li>
                                </ul>
                            </nav>
                        </div>
                    </td>
                    <td>
                        <div>
                            <nav>
                                <ul className="inline-block-nav-center">
                                <li><a href='/loginprojectinvitelist'>邀請列表</a></li>
                                </ul>
                            </nav>
                        </div>    
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default MusicFeatureSelection