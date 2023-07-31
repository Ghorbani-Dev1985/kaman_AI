

import React, { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );




function DrawPlot({results, name}){

    const options = {
        // responsive: true,
        indexAxis: 'y',
        
        elements: {
          bar: {
            borderWidth: 1,
            borderColor: 'rgba(0, 0, 0, 0.1)',
            
          },
        },
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right' ,
          },
          title: {
            display: true,
            text: ' نمودار ' + name[1]
          },
        },
      };
      
      const labels = results.date1[name[0]].labels;
      
      const data = {
        
        labels,
        datasets: [
          {
            label: 'میزان فروش',
            data: results.date1.gross_sale_per_country.data,
            backgroundColor: 'green',
            maxBarThickness:25,
          },
    
        ],
      };

    return (
        <>
        <div>
        <Bar options={options}
         data={data}
         width={"100%"}
        />
        </div>
        </>
    );
}

function BestSel({results}){

    const [right_box_name, setRightBoxName] = useState(['gross_sale_per_product_category', 'دسته بندی محصولات']);
    const [left_box_name, setLeftBoxName]   = useState(['gross_sale_per_country', 'منطقه جغرافیایی']);
    const [bgc_left1, setbgcLeft1]          = useState('#7dd3fc')
    const [bgc_left2, setbgcLeft2]          = useState('#7dd3fc')
    const [bgc_right1, setbgcRight1]        = useState('#7dd3fc')
    const [bgc_right2, setbgcRight2]        = useState('#7dd3fc')

    return (
        <>
        
        <div className='w-full flex flex-col items-center p-3 gap-3 mb-3'>
            <div className='flex w-full flex-col bg-white dark:bg-navy-700 dark:text-white rounded-md overflow-hidden'>
                <div className='bg-blue-100 dark:bg-navy-600 dark:text-white mb-4 p-3 flex flex-col'>
                    برترین‌های فروش من براساس فروش ناخالص چگونه بوده است؟    
                </div>
                <div className='w-full flex justify-center items-center p-2 gap-2'>
                    <div className='w-full cursor-pointer rounded-md p-2 bg-navy-500 text-white dark:bg-navy-600 dark:text-white' name="button" onClick={() => {
                      setLeftBoxName(['gross_sale_per_country', 'منطقه جغرافیایی']);
                      setbgcLeft1('orange');
                      setbgcLeft2('#3b82f6');
                      } 
                      
                      }>
                        منطقه جغرافیایی
                    </div>
                    <div className='w-full cursor-pointer rounded-md p-2 bg-amber-500 text-white dark:bg-navy-600 dark:text-white' onClick={() =>{
                       setLeftBoxName(['gross_sale_per_customer_gender', 'جنسیت'])
                       setbgcLeft2('orange');
                       setbgcLeft1('#3b82f6');
                      }
                      }>
                        جنسیت
                    </div>
                        
                </div>
                <div className='show-plot'>
                    {
                        results.date1.gross_sale_per_country !== undefined && (
                            <DrawPlot results={results} name={left_box_name} />
                        )
                    }
                    
                </div>
           </div>
           <div className='w-full flex flex-col bg-white dark:bg-navy-700 dark:text-white rounded-md overflow-hidden'>
                <div className='bg-blue-100 dark:bg-navy-600 dark:text-white mb-4 p-3 flex flex-col'>
                    برترین‌های فروش من براساس فروش ناخالص چگونه بوده است؟
                </div>
                <div className='w-full flex justify-center items-center p-2 gap-2'>
                    <div className='w-full cursor-pointer rounded-md p-2 text-xs md:text-base bg-navy-500 text-white dark:bg-navy-600 dark:text-white' onClick={() => {
                      setRightBoxName(['gross_sale_per_product_category', 'دسته بندی محصولات'])
                      setbgcRight1('orange');
                      setbgcRight2('#3b82f6');
                      }
                      }>
                        دسته بندی محصولات
                    </div>
                    <div className='w-full cursor-pointer rounded-md p-2 bg-amber-500 text-white dark:bg-navy-600 dark:text-white' onClick={() => {
                      setRightBoxName(['gross_sale_per_product_brand', 'برند'])
                      setbgcRight2('orange');
                      setbgcRight1('#3b82f6');
                      }
                      }>
                        برند
                    </div>
                </div>
                <div className='w-full h-auto overflow-x-scroll'>
                    {
                        results.date1.gross_sale_per_product_category !== undefined && (
                            <DrawPlot results={results} name={right_box_name} />
                        )
                    }
                </div>
           </div>


        </div>
        </>
    );
}

export {BestSel};