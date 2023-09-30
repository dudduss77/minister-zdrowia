import React from 'react';

interface IInput {
  inputPlaceholder: string;
  inputOnChange: any;
  inputValue: string;
  inputName: string;
  inputErrorMessage: string;
  inputLabel: string;
}

const Input = ({
  inputPlaceholder,
  inputOnChange,
  inputValue,
  inputName,
  inputErrorMessage,
  inputLabel
}: IInput) => {
  return (
    <div className='relative'>
      <label className='px-1 text-xs absolute bg-white top-[-0.5rem] left-3'>{inputLabel}</label>
      <div>
        <input
          type="text"
          className={`w-full p-2 text-black border-solid border-2 rounded-lg`}
          style={{
            borderColor: inputErrorMessage !== '' ? '#ff0000' : '#888888',
          }}
          name={inputName}
          value={inputValue}
          placeholder={inputPlaceholder}
          onChange={inputOnChange}
        />
        {inputErrorMessage && (
          <div className="text-red-600 text-xs pl-2">{inputErrorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default Input;
