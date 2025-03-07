"use client";

import "./styles.css"; 

export default function PostsPage() {
    return(
        <div className="max-w-2xl mx-auto p-6 flex flex-col items-center">
            <div className="flip">
            <div className="content">
                <div className="front flex justify-center items-center">
                    <h2 className="text-white text-2xl">My Learnings</h2>
                </div>
                <div className="back flex justify-center items-center">
                    <p className="text-white text-lg">This page will list all my learning/failures soon!</p>
                </div>
            </div>
        </div>
        </div>
        )
}

