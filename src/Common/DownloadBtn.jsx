import { BiCloudDownload } from "react-icons/bi";
import Button from "./Button";



const DownloadBtn = ({handleDownloadFile, table_data , onClick}) => {
    return ( 
        <section className="my-5 rounded-lg border border-gray-300 p-4">
        <Button
          ButtonText="دانلود"
          onClick={onClick}
          class="btn btn-primary btn-sm button"
        >
          <BiCloudDownload className="text-2xl" />
        </Button>
      </section>
     );
}
 
export default DownloadBtn;