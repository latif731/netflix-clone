import React from 'react'
import MainModal from './MainModal'
import { Input } from '../UserInput'
import { HiPlusCircle } from 'react-icons/hi'
import { FaFacebook, FaPinterest, FaTelegram, FaTwitter } from 'react-icons/fa'
import {EmailShareButton, FacebookShareButton, PinterestShareButton, TelegramShareButton, TwitterShareButton } from "react-share"
import { MdEmail } from 'react-icons/md'

const ShareMovieModal = ({modalOpen, setModalOpen, movie}) => {
    const shareData = [
        {
            icon: FaFacebook,
            shareButton: FacebookShareButton
        },
        {
            icon: FaTwitter,
            shareButton: TwitterShareButton
        },
        {
            icon: FaTelegram,
            shareButton: TelegramShareButton
        },
        {
            icon: FaPinterest,
            shareButton: PinterestShareButton
        },
        {
            icon: MdEmail, 
            shareButton: EmailShareButton
        },
    ]

    const url = `${window.location.protocol}//${window.location.host}/movie/${movie?.name}`

  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className='inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl'>
            <h2 className='text-3xl font-bold'>share <span className='text-xl font-bold'>"{movie?.title}"</span></h2>
            <form className='flex-rows flex-wrap gap-6 mt-6'>
                {/* <Input
                label="Category Name"
                placeholder={category ? category.title : "Actions"}
                type="text"
                bg={false}
                />
                <button 
                onClick={() => setModalOpen(false)}
                className='w-full flex flex-rows gap-4 py-3 transitions font-bold hover:bg-dry border-2 border-subMain rounded bg-subMain  text-white'>
                {
                  category ? 
                  (
                    "Update"
                  ) 
                  :
                  (
                     "Add"
                  ) 
                }
              
              
                </button> */}
                {
                    shareData.map((data, index) => (
                        <data.shareButton key={index} url={url} quote="Netflix || Free Movies Site">
                            <div className='w-12 transitions hover:bg-subMain flex-colo text-lg h-12 bg-white rounded bg-opacity-30'>
                                <data.icon className='text-white'/>
                            </div>
                        </data.shareButton>
                    ))
                }
            </form>
        </div>
    </MainModal>
  )
}

export default ShareMovieModal