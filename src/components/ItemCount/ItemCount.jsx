import React from "react";

function ItemCount({ counter, onAdd, onSubtract, onChange }) {
    const handleAdd = () => {
        onAdd(counter + 1);
    };

    const handleSubtract = () => {
        if (counter > 0) {
            onSubtract(counter - 1);
        }
    };

    const handleChange = (e) => {
        const value = parseInt(e.target.value);
        onChange(value);
    };

    return (
        <div>
            <div className="row">
                <div className="col-xs-3 col-xs-offset-3">
                    <div className="flex items-center justify-center">
                        <button
                            className="bg-[#fef3ed] hover:bg-gray-200 text-gray-700 font-bold mv:h-10 md:h-12 py-2 px-4 rounded-l"
                            onClick={handleSubtract}
                        >
                            -
                        </button>

                        <input
                            type="text"
                            onChange={handleChange}
                            className="form-control text-center mv:w-10 mv:h-10 md:w-24 md:h-12"
                            value={counter}
                        />
                        <button
                            className="bg-[#fef3ed] hover:bg-gray-200 text-gray-700 font-bold mv:h-10 md:h-12 py-2 px-4 rounded-r"
                            onClick={handleAdd}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemCount;
