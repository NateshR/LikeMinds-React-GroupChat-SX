<<<<<<< HEAD
import { PropsWithChildren } from "react";
import './imageAndMedia.css'
=======
>>>>>>> release/v1.12.0
type ImageAndMediaType = {
  mediaArray: any;
  setMediaDisplayModel: any;
  setMediaData: any;
};
<<<<<<< HEAD
const ImageAndMedia: React.FC<ImageAndMediaType> = ({
  mediaArray,
  setMediaDisplayModel,
  setMediaData,
}) => (
=======
const ImageAndMedia = ({
  mediaArray,
  setMediaDisplayModel,
  setMediaData,
}: ImageAndMediaType) => (
>>>>>>> release/v1.12.0
  <div className="flex w-full">
    {mediaArray?.length === 1 ? (
      <div
        className="w-full"
        onClick={() => {
          setMediaData({ mediaObj: mediaArray, type: "image" });
          setMediaDisplayModel(true);
        }}
      >
        {mediaArray[0].type === "image" || mediaArray[0].type === "gif" ? (
          <img
            src={mediaArray[0].url!}
            className="max-w-full max-h-full block h-auto w-auto"
          />
        ) : (
          <video
            controls
            preload="none"
            className="max-w-full max-h-full block h-auto w-auto"
            key={mediaArray[0]?.url}
          >
            <source src={mediaArray[0]?.url} type="video/mp4" />
            <source src={mediaArray[0]?.url} type="video/ogg" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    ) : (
      <>
        <div
<<<<<<< HEAD
          // className="max-w-[50%] h-full grow"
          // className=""
=======
          className="max-w-[50%] h-full grow"
>>>>>>> release/v1.12.0
          onClick={() => {
            setMediaData({ mediaObj: mediaArray, type: "image" });
            setMediaDisplayModel(true);
          }}
        >
<<<<<<< HEAD
         
            <div className="multipleImagesContainer">
              <div className="primaryImage imgBubble">
                {mediaArray[0].type === "image" ?<img
                  src={mediaArray[0].url!}
                  alt=""
                  className="max-w-full max-h-full block h-auto w-auto"
                />:   <video
                // controls={false}
              
                className="max-w-full max-h-full block h-auto w-auto"
                key={mediaArray[0]?.url}
              //   onClick={}
              >
                <source src={mediaArray[0]?.url} type="video/mp4" />
                <source src={mediaArray[0]?.url} type="video/ogg" />
                Your browser does not support the video tag.
              </video>
             }
              </div>
              <div className="secondaryImage imgBubble">
                <p className="foregroundCover">+{(mediaArray.length - 1).toString()}</p>
                {mediaArray[1].type === "image" ?<img
                  src={mediaArray[1].url!}
                  alt=""
                  className="max-w-full max-h-full block h-auto w-auto"
                />:    <video
                
                
                className="max-w-full max-h-full block h-auto w-auto"
                key={mediaArray[1]?.url}
              //   onClick={}
              >
                <source src={mediaArray[1]?.url} type="video/mp4" />
                <source src={mediaArray[1]?.url} type="video/ogg" />
                Your browser does not support the video tag.
              </video>}
              </div>
            </div>
           
        </div>
        {/* <div
=======
          {mediaArray[0].type === "image" ? (
            <img
              src={mediaArray[0].url!}
              alt=""
              className="max-w-full max-h-full block h-auto w-auto"
            />
          ) : (
            <video
              controls
              preload="none"
              className="max-w-full max-h-full block h-auto w-auto"
              key={mediaArray[0]?.url}
              //   onClick={}
            >
              <source src={mediaArray[0]?.url} type="video/mp4" />
              <source src={mediaArray[0]?.url} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        <div
>>>>>>> release/v1.12.0
          className="max-w-[50%] grow flex justify-center items-center bg-slate-400"
          style={{ opacity: "50%" }}
        >
          <span className="text-xl text-black  text-center">
            + {(mediaArray.length - 1).toString()}
          </span>
<<<<<<< HEAD
        </div> */}
=======
        </div>
>>>>>>> release/v1.12.0
      </>
    )}
  </div>
);

export default ImageAndMedia;
