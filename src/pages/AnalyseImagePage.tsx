import { useState, useEffect } from "react";

interface AnalyseImagePageProps {
  webpageURL: string;
  title: string;
  setTitle: (title: string) => void;
  imageURLs: string[];
}

interface ImageCaption {
  url: string;
  caption: string;
}

const AnalyseImagePage = (props: AnalyseImagePageProps) => {
  const [captions, setCaptions] = useState<ImageCaption[]>([]);

  // Function to fetch a single caption for an image URL
  const fetchCaption = async (url: string) => {
    props.setTitle("Loading Captions...");
    try {
      const response = await fetch("http://localhost:8000/caption/image/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([url]), // Request body as an array with one image URL
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Check if data.response is defined and has at least one element
      if (data.response && data.response.length > 0) {
        props.setTitle("Analyse Images");
        return { url, caption: data.response[0] };
      } else {
        props.setTitle("Images are Unavailable...");
        return { url, caption: "Caption not found" };
      }
    } catch (error) {
      props.setTitle("Images are Unavailable...");
      console.error("Fetch error:", error);
      return { url, caption: "Error fetching caption" };
    }
  };

  // Function to sequentially fetch captions for all imageURLs
  const fetchCaptionsSequentially = async (urls: string[]) => {
    for (const url of urls) {
      const caption = await fetchCaption(url);
      setCaptions((prevCaptions) => [...prevCaptions, caption]);
    }
  };

  // Effect hook to trigger caption fetching when component mounts or imageURLs prop changes
  useEffect(() => {
    setCaptions([]); // Reset captions before fetching new ones
    fetchCaptionsSequentially(props.imageURLs);
  }, [props.imageURLs]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-between overflow-x-hidden bg-[#F0F0F0] p-4">
      <div className="m-4 w-full rounded-lg bg-[#DCDDDE] py-2 text-center font-medium text-[#62646B]">
        {props.webpageURL || "No WebPage Link Found"}
      </div>
      <h2 className="mb-2 w-full text-center text-xl font-semibold">
        {props.title}
      </h2>

      <div>
        <div className="flex w-full max-w-[200px] flex-col items-center justify-center gap-4">
          {props.imageURLs.map((imageURL, index) => (
            <div
              key={index}
              className="m-2 flex flex-col items-center justify-center"
            >
              <img src={imageURL} alt={`Image ${index + 1}`} className="m-2" />
              <h1 className="mt-2 text-center text-[#FF0000]">
                {captions.find((caption) => caption.url === imageURL)
                  ?.caption || "Fetching caption..."}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyseImagePage;
