'use client'
import { useState } from "react";

export function CustomFilterDataTable(){

    const [practiceModes] = useState([
        'Private Practice',
        'Retail/ Corporate',
        'MD/ OD',
        'Veterans Affairs',
        'Hospital Based',
        'Remote',
        'Other'
    ]);
    
    const [settings] =useState([
        'Urban',
        'Suburban',
        'Rural',
        'Remote'
    ]);
    
    ///header dropdown?
    const statesItemTemplate = (option) => {
        return (
          // <Tag value={option}/>;
          <div className="flex align-items-center gap-2">
              <span>{option}</span>
          </div>
        )
      };
      
      const statesBodyTemplate = (rowData) => {
        return (
          //<Tag value={rowData.practiceMode}/>;
          <div className="flex align-items-center gap-2">
              <span>{rowData.state}</span>
          </div>
        )
      };
      
    //   const statesRowFilterTemplate = (options) => {
    //     return (
    //         <Dropdown 
    //             value={options.value} 
    //             options={practiceModes} 
    //             onChange={(e) => options.filterApplyCallback(e.value)} 
    //             itemTemplate={practiceModesItemTemplate} 
    //             placeholder="Select" 
    //             className="p-column-filter" 
    //             showClear 
    //             style={{ minWidth: '3rem' }} />
    //     );
    //   }



    ///header dropdown?
    const practiceModesItemTemplate = (option) => {
      return (
        // <Tag value={option}/>;
        <div className="flex align-items-center gap-2">
            <span>{option}</span>
        </div>
      )
    };
    
    const practiceModesBodyTemplate = (rowData) => {
      return (
        //<Tag value={rowData.practiceMode}/>;
        <div className="flex align-items-center gap-2">
            <span>{rowData.practiceMode}</span>
        </div>
      )
    };
    
    // const practiceModesRowFilterTemplate = (options) => {
    //   return (
    //       <Dropdown 
    //           value={options.value} 
    //           options={practiceModes} 
    //           onChange={(e) => options.filterApplyCallback(e.value)} 
    //           itemTemplate={practiceModesItemTemplate} 
    //           placeholder="Select" 
    //           className="p-column-filter" 
    //           showClear 
    //           style={{ minWidth: '3rem' }} />
    //   );
    // }
    
    
    
    ///header
    const settingsItemTemplate = (option) => {
        return (
          // return <Tag value={option}/>;
          <div className="flex align-items-center gap-2">
              <span>{option}</span>
          </div>
        )
    };
    
    ///row show
    const settingsBodyTemplate = (rowData) => {
      return (
        // <Tag value={rowData.setting}/>;
        <div className="flex align-items-center gap-2">
            <span>{rowData.setting}</span>
        </div>
      )
    };
    
    // const settingsRowFilterTemplate = (options) => {
    //     return (
    //         <Dropdown 
    //             value={options.value} 
    //             options={settings} 
    //             onChange={(e) => options.filterApplyCallback(e.value)} 
    //             //
    //             itemTemplate={settingsItemTemplate} 
    //             placeholder="Select" 
    //             className="p-column-filter" 
    //             showClear
    //             style={{ minWidth: '8rem' }} 
    //         />
    //     );
    // }

    return (
        // practiceModes,
        // settings,
        statesBodyTemplate,
        statesItemTemplate,
        practiceModesBodyTemplate,
        // practiceModesRowFilterTemplate,
        practiceModesItemTemplate,
        settingsBodyTemplate,
        // settingsRowFilterTemplate,
        settingsItemTemplate
    )
    
}