import React from 'react'
import './dashboard-cards.scss'
interface StatsCardProps {
    icon: React.ReactNode;
    value: string;
    description: string;
}
const DashboardCards: React.FC<StatsCardProps> = ({ icon, value, description }) => {
    return (
        <>
            <div className="col-md-3 mb-3">
                <div className="card p-3 shadow-sm border-0">
                    <div className="d-flex">
                        <div><div className="icon-circle me-3">{icon}</div></div>
                        <div>
                            <h3 className="mb-0">{value}</h3>
                            <p className="mb-1">{description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardCards