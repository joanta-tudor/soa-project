import React, { useState } from "react";

const List = ({ list, remove, canRemove}) => {
    return (
        <>
            {list?.length > 0 ? (
                <ul className="todo-list">
                    {list.map((entry, index) => (
                        <div key={index} className={canRemove === true ? "car" : "trendingcar" }>
                            <li className={canRemove === true ? "licar" : "litrending"} key={index}>
                                <div>
                                    <b className={"title"}>{entry.name}</b>
                                </div>

                                <div className={"car-description"}>
                                    {entry.description}
                                </div>
                            </li>
                            { canRemove &&
                                <button
                                    className="delete-button"
                                    onClick={() => {
                                        remove(entry);
                                    }}
                                >
                                    Delete
                                </button>
                            }
                        </div>
                    ))}
                </ul>
            ) : (
                <div className="empty">
                    <p>no cars found</p>
                </div>
            )}
        </>
    );
};

export default List;