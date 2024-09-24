import React from 'react'
import { nanoid } from 'nanoid'

const CurrencyExchange = ({
    selectLablelHtmlFor,
    selectTitle,
    selectName,
    selectId,
    value,
    currencyAvailable,
    handleSelectChange,

    inputLabelHtmlFor,
    inputValue,
    errorMessage,
    handleFromValueChange,

    readOnly

    }) => {


  return (
    <div className="flex flex-col w-[80%] lg:max-w-[30%] border-black mb-2">
        <label htmlFor={selectLablelHtmlFor} className="block font-bold text-base sm:text-xl">{selectTitle}</label>
        <select
            name={selectName}
            id={selectId}
            value={value}
            className="h-full w-full overflow-x-scroll  py-2 border-2 border-purple-400 rounded-md outline-none"
            onChange={handleSelectChange}
        >
            {Object.keys(currencyAvailable).map((currency) => (
            <option value={currency} key={nanoid()} className='w-full overflow-x-scroll text-sm'>
                {`${currencyAvailable[currency]} - ${currency}`}
            </option>
            ))}
        </select>
        <label htmlFor={inputLabelHtmlFor} className='mt-5 lg:mt-10'>{value}</label>
        <input
            type="text"
            value={inputValue}
            onChange={handleFromValueChange}
            className=" outline-none text-gray-800 border-2 rounded-md border-purple-400 focus:border-2 focus-within:border-yellow-400 h-[50px] md:h-[100px] text-xl md:text-4xl px-5 py-2"
            readOnly={readOnly}
        />
        <p className=' text-red-600 mt-3' >{errorMessage}</p>
        </div>
  )
}

export default CurrencyExchange
