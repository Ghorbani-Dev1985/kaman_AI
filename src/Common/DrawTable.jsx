import { Card, Typography } from "@material-tailwind/react";

function DrawTable({graph_data}){
    return (
        <>
        <Card className="mx-auto h-full max-w-[16rem] overflow-x-auto md:max-w-lg lg:max-w-2xl xl:max-w-4xl 2xl:max-w-full">
        <table className="w-full min-w-max table-auto text-center">
          <thead>
            <tr>
            {graph_data['labels'].map((data)  => {
                return (
                  <th
                    key={data}
                    className="border-b border-navy-500 bg-navy-100 p-4 text-base text-navy-900"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="text-center font-bold leading-none opacity-70"
                    >
                      {data}
                    </Typography>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
          {graph_data['data'].map((data) => {
              return (
                <tr key={data} className="odd:bg-gray-50 even:bg-gray-100">
                  {data.map((value , index) => {
                    return (
                      <td key={index} className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-center font-normal"
                        >
                          {value}
                        </Typography>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
        </>
    );
  }

  export default DrawTable;