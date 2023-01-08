import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { IoMdSunny, IoMdRainy, IoMdCloudy, IoMdSnow, IoMdThunderstorm, IoMdSearch } from "react-icons/io";
import { BsCloudHaze2Fill, BsCloudDrizzleFill,  BsThermometer, BsWind } from "react-icons/bs";
import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner9 } from "react-icons/im";

const APIkey = '1f3cefdddb282fd103870aadcb9a4f9a'

const App = () => {
  
  const [data, setData] = useState(null)
  const [location, setLocation] = useState('Chennai')
  const [inputValue, setInputValue] = useState('')

  const handleInp = (e) => {
    setInputValue(e.target.value)
  }

  const handleSub = (e) => {
    console.log(inputValue);

    if(inputValue !== ''){
      setLocation(inputValue)
    }
    const input = document.querySelector('input')

    input.value = ''

    e.preventDefault()
  }

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;

    axios.get(url).then((res) => {
      setData(res.data);
    });
  }, [location])


  if(!data) {
    return(
      <div >
        <div className='text-white flex h-screen items-center justify-center bg-gradient-to-br from-orange-400 bg-cover bg-no-repeat to-sky-400 bg-center'>
          <ImSpinner9 className='text-9xl animate-spin'/>
        </div>
      </div>
    )
  }

  let icon;

  switch(data.weather[0].main)
  {
    case 'Clouds':
      icon = <IoMdCloudy />
      break;
    case 'Haze':
      icon = <BsCloudHaze2Fill />
      break;
    case 'Rain':
      icon = <IoMdRainy />
      break;
    case 'Clear':
      icon = <IoMdSunny />
      break;
    case 'Dizzle':
      icon = <BsCloudDrizzleFill />
      break;
    case 'Snow':
      icon = <IoMdSnow />
      break;
    case 'Thuderstorm':
      icon = <IoMdThunderstorm />
      break;
      default:
        break
  }

  const date = new Date();

  return ( 
   <div className='text-white w-full h-screen bg-gradient-to-br from-orange-400 bg-cover bg-no-repeat to-sky-400 bg-center flex flex-col items-center justify-center px-4 sm:px-0'>

    <form className='h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8'>

      <div className='h-full relative flex items-center justify-between p-2'>
        <input onChange={(e) => handleInp(e)} className='flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full' type="text" placeholder='search by city' />

        <button onClick={(e) => handleSub(e)} className='hover:bg-white/10 w-20 h-12 rounded-full flex justify-center items-center transition'>
          <IoMdSearch className='text-2xl text-white' />
        </button>
      </div>
    </form>

    <div className='w-full max-w-[450px] bg-black/20 min-h-[584px backdrop-blur-[32px] rounded-[32px] py-12 px-6'>
      <div>

        <div className='flex items-center gap-x-5'>

          <div className='text-[87px]'>{icon}</div>

          <div>

            <div className='text-2xl font-semibold'>{data.name}, {data.sys.country}</div>

            <div>{date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getFullYear()}</div>

          </div>
        </div>

        <div className='my-20'>
          <div className='flex justify-center items-center'>
            <div className='text-[144px] leading-none font-light'>{parseInt(data.main.temp)}</div>
            
          <div className='text-4xl'><TbTemperatureCelsius /></div>

          </div>
          
          <div className='capitalize text-center'>{data.weather[0].description}</div>
          
        </div>

        <div className='max-w-[378px] mx-auto flexflex-col gap-y-6'>
        <div className='flex justify-between'> 
          <div className='flex items-center gap-x-2'>
            <div className='test-[20px]'>
              <BsThermometer />
            </div>
            <div className='flex'>
              Feels like
              <div className='flex ml-2'>{parseInt(data.main.feels_like)}<TbTemperatureCelsius /> </div>
            </div>
          </div>
          <div className='flex items-center gap-x-2'>
            <div className='test-[20px]'>
              <BsWind />
            </div>
            <div>
              Wind
              <span className='ml-2'>{data.wind.speed} m/s</span>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
    
  </div>
  );



}

export default App;
