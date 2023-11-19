import { useState } from 'react'


//Define our variables for Azure access
const ApiKey = import.meta.env.VITE_API_KEY;
const AzureEndpoint = import.meta.env.VITE_ENDPOINT_NAME;


function App() {
  //in React we can use setState to define the state of changing variables
  const [data, setData] = useState()
  const [image, setImage] = useState('https://www.toyota.co.nz/globalassets/new-vehicles/camry/2021/camry-zr-axhzr-nm1-axrzr-nm1/clear-cuts/updated-clear-cuts/camry-zr-eclipse.png')
  
  //we  want to ensure we manage the user changing the input field so this will update the image useState
  const handleOnChange = event => {
    setImage(event.target.value)
  }

  //when the user clicks the button, we will initiate our call to the API
  //once the data has been fetched, it will setData with the data useState
  const onButtonClick = async (e) => {
    console.log("Click registered and ready to fetch!")
    e.preventDefault() // e represents the click/event, preventDefault stops the buttons from acting like a default button as we are using it asynchronously
    try {
      const fetchOptions = {
          method: 'POST',
          timeout: 50000,
          headers: {
            'Ocp-Apim-Subscription-Key': ApiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url: image,
          }),
          };

      const response = await fetch(`${AzureEndpoint}computervision/imageanalysis:analyze?api-version=2023-02-01-preview&features=tags,caption`, fetchOptions);
      const resJson = await response.json();
      //setData so we can now call the resJson as a variable called 'data' as defined in setData useState
      setData(resJson)
      console.log(resJson) //by checking the console we can see the raw json data and structure
    } catch (error) {
      console.error("There is an error during fetch:", error)
    }
  }

 
  return (
    <div className="bg-[#0b0f51] text-stone-200 min-h-screen w-full font-inter flex flex-col items-center">

      <div className="flex flex-col justify-center">
      <h1 className="flex font-bold text-6xl py-6">Image Recognition Service</h1>
      </div>

      <div className='flex flex-col justify-center items-center py-6 space-y-4 w-1/4 '>
        <input className="bg-slate-300 text-black inline-block px-2 py-1 w-full rounded-xl "
            placeholder="Enter image URL" value="https://www.toyota.co.nz/globalassets/new-vehicles/camry/2021/camry-zr-axhzr-nm1-axrzr-nm1/clear-cuts/updated-clear-cuts/camry-zr-eclipse.png" onChange={handleOnChange}/>
        <button className="inline-block w-1/3 px-2 py-1 font-semibold bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl drop-shadow-md mt-2 md:mt-0" onClick={onButtonClick}>
            Run Service
          </button>
      </div>


      {/* Start of result area */}
      <section className="flex flex-col items-center justify-center">
      <img src={image} width={220}  height={180} alt={image}/>
      <p className="text-xl font-semibold">
            {data && data.captionResult.text}
            </p>


{data && data.tagsResult && data.tagsResult.values.some(item => item.name === "car") ? (
  
  <ul>
    {data.tagsResult.values
      .map(item => (
        <li key={item.name}>
          <span>
            {item.name} - Confidence level {parseInt(item.confidence * 100)}%
          </span>
        </li>
      ))}
  </ul>
    ) : (
  <p>No vehicle identified</p>
    )}


      </section>
    </div>
  )
}

export default App
