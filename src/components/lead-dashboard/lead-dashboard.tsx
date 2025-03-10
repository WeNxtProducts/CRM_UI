/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from 'react'
import DashBoardHeader from './DashBoardHeader'
import LeadDetails from './LeadDetails'
import Events from './Events'
import Activity from './Activity'
import TaskToDo from './TaskToDo'

const LeadDashboard = () => {
    const [leftExpanded, setLeftExpanded] = useState(false)
    const [rightExpanded, setRightExpanded] = useState<string | null>(null)

    return (
        <div className='p-3'>
            <DashBoardHeader />

            <div className="grid grid-cols-10 gap-4 mt-4">
                {/* Left section: using flex-col instead of grid-rows-2 */}
                <div className="col-span-7 flex flex-col gap-4">
                    {!leftExpanded && (
                        <div className="transition-all duration-300">
                            <LeadDetails />
                        </div>
                    )}

                    <div
                        className={`bg-white ${leftExpanded ? 'h-[85vh]' : 'max-h-[250px]'} rounded-xl p-3 transition-all duration-300 overflow-y-auto overflow-x-hidden custom-scrollbar-lead-dashoard`}
                    >
                        <Activity setLeftExpanded={setLeftExpanded} leftExpanded={leftExpanded}/>
                    </div>
                </div>

                {/* Right section remains as grid with 2 rows */}
                <div className="col-span-3 grid grid-cols-1 gap-4">
                    {rightExpanded !== 'tasks' && (
                        <div
                            className={`bg-white rounded-xl ${rightExpanded === 'events' ? 'h-[121vh]' : 'max-h-[415px]'} p-3 transition-all duration-300
                             overflow-y-auto overflow-x-hidden custom-scrollbar-lead-dashoard`}
                        >
                            <Events
                                setRightExpanded={setRightExpanded}
                                rightExpanded={rightExpanded}
                            />
                        </div>
                    )}

                    {rightExpanded !== 'events' && (
                        <div
                            className={`bg-[#E5E9F2] relative ${rightExpanded === 'tasks' ? 'h-[121vh]' : 'h-[250px]'} rounded-xl p-0 transition-all duration-300 
                                overflow-y-auto overflow-x-hidden custom-scrollbar-lead-dashoard`}
                        >
                            <TaskToDo 
                             setRightExpanded={setRightExpanded}
                             rightExpanded={rightExpanded}
                             />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LeadDashboard
