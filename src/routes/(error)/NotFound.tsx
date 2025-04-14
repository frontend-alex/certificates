import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const NotFound = () => {

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5 justify-center items-center h-[50dvh]">
      <h1 className="text-5xl lg:text-9xl font-corm">Ugh ohhhh.</h1>
      <p className="text-center max-w-[300px]">Hmm.... the page you are looking for doesnt seems to be on here. </p>
      <Button onClick={() => navigate(-1)} variant={'outline'}>Go Back</Button>
    </div>
  )
}

export default NotFound
