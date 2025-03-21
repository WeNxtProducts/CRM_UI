/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useContext } from 'react';
import { assets } from '@/assets'
import Image from 'next/image';
import { LeadContext } from './LeadDetails';

const LeadCards = () => {
    const { cardDetails }: any = useContext(LeadContext);
    const { completed = 0, newlyAdded = 0, onPriority = 0, totalCount = 0 } = cardDetails
    const { rocketIcon, userIcon, priorityIcon, graphIcon } = assets.icons
    const cardsData = [
        { id: 1, badgeCount: totalCount, totalCount: 'Total Count', backgroundClr: "#FFF8C5", icon: rocketIcon, width: 18, height: 18 },
        { id: 2, badgeCount: newlyAdded, totalCount: 'Newly Added', backgroundClr: "#C7E9F9", icon: userIcon, width: 18, height: 18 },
        { id: 3, badgeCount: onPriority, totalCount: 'On Priority', backgroundClr: "#CFF3AF", icon: priorityIcon, width: 8, height: 8 },
        { id: 4, badgeCount: completed, totalCount: 'Completed', backgroundClr: "#FFD9D9", icon: graphIcon, width: 18, height: 18 },
    ];

    return (
        <div className="grid grid-cols-4 gap-3 mt-3">
            {cardsData.map((card) => (
                <div key={card.id} className="bg-white border border-gray-300 p-2 rounded-xl">
                    <div className="flex items-center">
                        <div className="relative">
                            <div
                                style={{ backgroundColor: card?.backgroundClr }}
                                className="w-10 h-10 rounded-full flex items-center justify-center"
                            >
                                <span className="text-white font-bold"> <Image
                                    src={card?.icon}
                                    alt="Icon"
                                    width={card?.width}
                                    height={card?.height}
                                    className="rounded-full"
                                /></span>
                            </div>
                        </div>
                        <div className="ml-3">
                            <span className="text-gray-700 text-[25px] font-semibold">{card.badgeCount}</span>
                        </div>
                    </div>
                    <div className="mt-0 flex justify-center">
                        <span className="text-gray-500">{card.totalCount}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LeadCards;
