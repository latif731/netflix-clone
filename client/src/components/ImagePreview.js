import pp from "../images/pp.jpg"

export const ImagePreview = ({image, name}) => {
    console.log("imagePreview",image)
    return (
        <div className="w-36 mt-2 h-36 p-2 bg-main border border-border rounded">
            <img 
            src= {image ? image : `${pp}`} 
            alt={name} 
            className="w-full h-full object-cover rounded"/>
        </div>
    )
}