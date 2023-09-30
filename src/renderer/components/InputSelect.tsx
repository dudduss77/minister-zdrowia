import React, { useState, useEffect } from 'react';

interface IInputSelect {
  inputSelectPlaceholder: string;
  inputSelectOnChange: any;
  inputSelectValue: string;
  inputSelectName: string;
  inputSelectErrorMessage: string;
  CryptoList: any;
}

const InputSelect = ({
  inputSelectPlaceholder,
  inputSelectOnChange,
  inputSelectValue,
  inputSelectName,
  inputSelectErrorMessage,
  CryptoList,
}: IInputSelect) => {
  //   const [showOptions, setShowOptions] = useState(false);
  //   const [selectItem, setSelectItem] = useState(inputSelectValue);

  //   useEffect(() => {
  //     inputSelectOnChange(selectItem.shortname);
  //   }, [selectItem]);

  return (
    // <div>
    //   <div
    //     className="relative cursor-pointer"
    //     onClick={() => setShowOptions(!showOptions)}
    //   >
    //     <label className="px-1 text-xs absolute bg-white top-[-0.5rem] left-3">
    //       Select
    //     </label>
    //     <div
    //       className="w-full p-2 text-black border-solid border-2 rounded-lg flex"
    //       style={{
    //         borderColor: false ? '#ff0000' : '#888888',
    //         borderBottomLeftRadius: showOptions ? '0' : '',
    //         borderBottomRightRadius: showOptions ? '0' : '',
    //         borderBottomWidth: showOptions ? '0' : '',
    //       }}
    //     >
    //       {selectItem.name ? selectItem.name : inputSelectPlaceholder}
    //       <div className="flex-1"></div>
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         viewBox="0 0 24 24"
    //         className="text-black w-6"
    //       >
    //         <path d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z"></path>
    //       </svg>
    //     </div>
    //   </div>
    //   {showOptions && (
    //     <div className="flex flex-col border-solid border-2 border-[#888888] rounded-b-lg border-t-0">
    //       {inputSelectOptions.map((value) => (
    //         <div
    //           key={value.shortname}
    //           className="p-2 cursor-pointer hover:bg-gray-200"
    //           onClick={() => {
    //             setSelectItem({ shortname: value.shortname, name: value.name });
    //             setShowOptions(false);
    //           }}
    //         >
    //           {value.name}
    //         </div>
    //       ))}
    //     </div>
    //   )}
    // </div>
    <div>
      <select
        className="w-full p-2 text-black border-solid border-2 rounded-lg flex"
        style={{
          borderColor: inputSelectErrorMessage ? '#ff0000' : '#888888',
        }}
        placeholder={inputSelectPlaceholder}
        value={inputSelectValue}
        onChange={inputSelectOnChange}
        name={inputSelectName}
      >
        {CryptoList.map((value: any) => (
          <option key={value.shortname} className="p-2" value={value.shortname}>
            {value.name}
          </option>
        ))}
      </select>
      {inputSelectErrorMessage && (
        <div className="text-red-600 text-xs pl-2">
          {inputSelectErrorMessage}
        </div>
      )}
    </div>
  );
};

export default InputSelect;
