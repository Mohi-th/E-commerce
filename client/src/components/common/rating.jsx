import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function RatingComponent({rating,handleRatingChange}) {
    return ( 
        [1,2,3,4,5].map((star)=>
        <Button onClick={()=>{handleRatingChange(star)}} className={`p-2 rounded-full transition-colors ${star<=rating?'text-yellow-500 hover:bg-black':'text-black hover:bg-primary hover:text-primary-foreground'}`} key={star} variant="outline" size="icon">
            <StarIcon className={`w-6 h-6 ${star<=rating?'fill-yellow-500':'fill-black'}`}/>
        </Button>)
     );
}

export default RatingComponent;