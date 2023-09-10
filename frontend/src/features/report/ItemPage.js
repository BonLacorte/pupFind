import React, { useEffect, useState } from 'react'
import ReportHeader from './ReportHeader'
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBell, faBellConcierge } from '@fortawesome/free-solid-svg-icons';
import Carousel from '../../components/Miscellaneous/Carousel';
import { ChatState } from '../../context/ChatProvider';
import FounderModal from '../../components/FounderModal';
import PulseLoader from 'react-spinners/PulseLoader';


const ItemPage = () => {

  const { accessToken } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedChat, setSelectedChat, chats, setChats, selectedReport, setSelectedReport } = ChatState();

  const [itemId, setItemId] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [dateFound, setDateFound] = useState("");
  const [locationFound, setLocationFound] = useState("");
  const [image, setImage] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [oldImage, setOldImage] = useState([]);

  const [founderId, setFounderId] = useState("")
  const [founderName, setFounderName] = useState("");
  const [founderEmail, setFounderEmail] = useState("");
  const [founderPic, setFounderPic] = useState([])
  const [lostItem, setLostItem] = useState([])
  const [selectedImage, setSelectedImage] = useState(null);
  const [itemFirstImage, setItemFirstImage] = useState('')

  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState()
  const [isSuccess, setIsSuccess] = useState(false)
  const [profile, setProfile] = useState()

  const [loadingChat, setLoadingChat] = useState(false)

  const fetchLostItem = async () => {
    try {
        const config = {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        };

        const { data } = await axios.get(`http://localhost:3500/lostitems/${id}`, config);
        console.log(data)

        setLostItem(data);

        
        
        
        if (lostItem) {
          setIsLoading(false);
          setIsSuccess(true);
        } 
        
    } catch (error) {
        console.log(error);
        setError(error)
        setIsLoading(false);
        setIsError(true);
    }
  };

  useEffect(() => {
    fetchLostItem();

    lostItem ? setIsSuccess(true) : setIsLoading(true)
    
  }, []);

  useEffect(() => {
    console.log('lostItem', lostItem)

    if (lostItem && lostItem.founderId) {
        setItemId(lostItem._id);
        setOldImage(lostItem.itemImage)
        setItemFirstImage(lostItem.itemImage[0].url)
        setDateFound(new Date(lostItem.dateFound).toISOString().slice(0, 10));
        setFounderId(lostItem.founderId._id)
        setFounderPic(lostItem.founderId.pic.url)
        setFounderName(lostItem.founderId.name)
        
    }
}, [lostItem]);

  const handleAccessChat = async (founderId, itemId) => {
    
    // FetchChats
    try {
      const config = {
      headers: {
          token: `Bearer ${accessToken}`,
          },
      };

      const { data } = await axios.get(`http://localhost:3500/chat`, config);
      console.log(`data from FetchChats = data `, data)
      setChats(data);
      console.log(`data from FetchChats = chats `,chats)
      } catch (err) {
        console.log(`${err} - in FetchChats`)
      }
    
    // HandleAccessChat
    try {
      console.log(`HandleAddLostItemProcessesToChatData (founderId)`,founderId)
      console.log('founderId ',founderId)
      console.log('itemId ',itemId)
      setLoadingChat(true);
      const config = {
          headers: {
          "Content-type": "application/json",
          token: `Bearer ${accessToken}`,
          },
      };

      const { data } = await axios.post(`http://localhost:3500/chat/add-lostitem-processes`, { userId: founderId, lostItemId: id }, config);
      console.log(`data from HandleAccessChat = data`, data)

      if (!chats.find((c) => c._id === data._id)) {
          setChats([data, ...chats])
      }
      
      console.log(`List of Chats`,chats)

      setSelectedChat(data)
      console.log(`setSelectedChat`, setSelectedChat)
      setLoadingChat(false)
    } catch (err) {
      console.log(`${err} - in HandleAccessChat`)
    }
  }

  

  let content

  if (isLoading) {
      content = (
        <div className="bg-customBackground min-h-screen">
            <div className="flex justify-center">
                <PulseLoader  color={"#FFF"} />
            </div>
        </div>
    )
  }

  if (isSuccess) {
    content = (
      <>
        <div className="flex items-center justify-center h-screen border border-black">
          <div className="bg-gray-100 rounded-lg border shadow-lg flex flex-col md:flex-row p-10">
            <div className="w-1/2 p-4 border-r border-gray-400">
              {/* Lost Item info */}

              <div className='p-4 border-b border-gray-400'>
                <p className="mb-2">
                  <h1 className="text-2xl font-bold">{lostItem.itemName}</h1>
                </p>
                <p className="mb-2">
                  <span className="font-bold">Date Found:</span> {dateFound}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Founded in:</span> {lostItem.locationFound}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Description:</span> {lostItem.itemDescription}
                </p>
              </div>

              <div className='p-4'>
                <div className='flex flex-row justify-between'>
                  <p className="mb-2">
                      <span className="font-bold">Founder Information:</span>
                  </p>
                  <FounderModal user={lostItem}>
                    <p className="mb-2">
                        Founder details
                    </p>
                  </FounderModal>
                </div>
                <div className='flex flex-row justify-start'>
                  <img
                        src={founderPic}
                        alt={founderPic}
                        className="w-12 rounded-lg mb-2"
                  />
                  <div className='flex flex-col mx-2'>
                    <p className="mb-2">
                        <span className="font-bold">{founderName}</span>
                    </p>
                    <p className="mb-2">
                        <span className="font-bold">Student</span>
                    </p>
                  </div>
                </div>
                <div className='mt-16 flex flex-col'>
                  <p className="mb-2">
                        <span className="font-bold">Send founder a message</span>
                  </p>
                    <Link
                      to={`/dash/chats`}
                      onClick={() => {
                        handleAccessChat(founderId)
                      }} // Set selectedReport when clicking "Edit"
                      className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                      >
                    Message
                    </Link>
                  </div>
              </div>
            </div>
            <div className="w-1/2 p-4 flex justify-center items-center flex-col ">
              <div className='h-80 w-full flex justify-center border border-gray-400'>
                {!selectedImage && (
                  <div className='flex h-auto w-auto justify-center'>
                    {/* <h2>Selected Image:</h2> */}
                    <img className="w-auto h-auto object-contain" src={itemFirstImage} alt="" />
                  </div>
                )}
                {selectedImage && (
                  <div className='flex h-full w-full justify-center'>
                    {/* <h2>Selected Image:</h2> */}
                    <img className="w-auto h-full object-contain" src={selectedImage} alt="Selected Product Preview" />
                  </div>
                )}
              </div>
              
              <div className='flex justify-center '>
                <div className="grid grid-cols-5 gap-4 p-4">
                  {oldImage &&
                    oldImage.map((image, index) => (
                      <img
                        className="w-24 h-auto object-contain cursor-pointer"
                        key={index}
                        src={image.url}
                        alt="itemImage"
                        onClick={() => setSelectedImage(image.url)}
                      />
                    ))}
                </div>
              </div>
              


            </div>
          </div>
        </div>
        
      </>
    )
  }

  if (isError) {
    content = (
      <div className="bg-customBackground min-h-screen">
          <div className="flex justify-center">
              <p className="flex justify-center">{error}</p>
          </div>
      </div>
    )
  }

  return content
}

export default ItemPage